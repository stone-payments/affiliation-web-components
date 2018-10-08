import { html, SlingBusinessElement } from 'sling-framework';
import { salesActions, bindActionCreators } from 'customer-js-sdk';
import 'sling-web-component-table';
import 'sling-web-component-card';
import 'sling-web-component-button';
import 'sling-web-component-loader';

import { isDateRange, formatDateRange, formatDate, groupByDeep } from 'sling-helpers';

let instanceName;

const detailcolumns = [
  {
    title: '',
    field: 'brandId',
    width: '50px',
    type: 'brand_icon',
  },
  {
    title: '',
    field: 'brandName',
  }, {
    title: '',
    field: 'amount',
    type: 'currency',
    align: 'right',
  },
];

const totalcolumns = [
  {
    title: 'Saldo Final',
    field: 'name',
    align: 'left',
    width: '80%',
  },
  {
    title: 'Valor',
    field: 'amount',
    type: 'currency',
    align: 'right',
  },
];

export class SalesReportExpanded extends SlingBusinessElement {
  constructor() {
    super();
    instanceName = this.localName;
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
    this.showdaterange = false;
    this.gobackbutton = true;
  }

  static get properties() {
    return {
      ...super.properties,
      startdate: {
        type: String,
        reflectToAttribute: true,
        callSdk: 'required',
      },
      finaldate: {
        type: String,
        reflectToAttribute: true,
        callSdk: 'required',
      },
      producttypeid: {
        type: Number,
        reflectToAttribute: true,
        callSdk: 'required',
      },
      showdaterange: {
        type: Boolean,
        reflectToAttribute: true,
      },
      gobackbutton: {
        type: Boolean,
        reflectToAttribute: true,
      },
    };
  }

  handleGoBackClick() {
    this.dispatchEventAndMethod('gobackclick');
  }

  getFormattedDateRange() {
    return isDateRange(this.startdate, this.finaldate)
      ? formatDateRange(this.startdate, this.finaldate)
      : formatDate(this.startdate);
  }

  renderGoBackButton() {
    return this.gobackbutton
      ? html`
    <sling-button
      layout="text"
      size="small"
      onclick="${this.handleGoBackClick}">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
      Voltar
    </sling-button>` : '';
  }

  renderHeader() {
    return this.showdaterange
      ? html`
        <div  class="business-component__header business-component__header_primary" slot="header">
          <div>
            <span class="business-component__card-head_title">Resumo das suas vendas</span>
            <span class="business-component__card-head_date">${this.getFormattedDateRange()}</span>
          </div>
          ${this.renderGoBackButton()}
        </div>`
      : html`
        <div  class="business-component__header business-component__header_primary" slot="header">
          <div>
            <span class="business-component__card-head_title">Resumo</span>
          </div>
          ${this.renderGoBackButton()}
        </div>
      `;
  }


  static getViewData(apidata = [], productTypeId) {
    return Object.values(groupByDeep(
      apidata.filter(item => item.productTypeId === productTypeId),
      item => item.brandId))
      .map(brand => brand.reduce(
        (acc, current) => {
          acc.amount += current.amount;
          return {
            amount: acc.amount,
            brandId: current.brandId,
            brandName: current.brandName,
            productTypeId: current.productTypeId,
            productTypeName: current.productTypeName,
          };
        }, { amount: 0 }));
  }

  render() {
    const productTypeId = Number(this.producttypeid);
    const sales = this.constructor.getViewData(this.apidata, productTypeId);
    const { productTypeName } = sales[0] || {};
    const total = [{
      name: 'Total',
      amount: sales.reduce((acc, sale) => acc + sale.amount, 0),
    }];
    return html`
      <style>
        @import url('sling-web-business-sales-report-expanded/src/index.css');
      </style>
      <div class="business-component">
        <sling-loader loading="${this.loading > 0}"></sling-loader>
        <sling-card nopaddingbody nopaddingfooter>
          ${this.renderHeader()}
          <div class="business-component__header business-component__header_secondary">
            <div class="business-component__description">
              ${productTypeName}
            </div>
          </div>
          <sling-table noheader srcdata="${sales}"
            srccolumns="${detailcolumns}"></sling-table>
          <div slot="footer">
            <div class="business-component__header business-component__header_total">
                <div class="business-component__description">
                  Total ${productTypeName}
                </div>
            </div>
            <sling-table noheader srcdata="${total}"
              srccolumns="${totalcolumns}"></sling-table>
          </div>
        </sling-card>
      </div>
    `;
  }
}

export const mapStateToProps = state => ({
  apidata: state.salesReducer.salesReport,
  loading: state.globalReducer.loaders[instanceName],
});

export const mapDispatchToProps = dispatch => ({
  getdata: bindActionCreators(
    salesActions.getSalesReportInfo, dispatch),
});
