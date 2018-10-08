import { html, SlingBusinessElement } from 'sling-framework';
import { salesActions, bindActionCreators } from 'customer-js-sdk';
import { formatDateRange, isDateRange, groupByDeep, formatDate } from 'sling-helpers';
import 'sling-web-component-table';
import 'sling-web-component-card';
import 'sling-web-component-button';
import 'sling-web-component-loader';

let instanceName;

export class AggregateSales extends SlingBusinessElement {
  constructor() {
    super();
    instanceName = this.localName;
    this.handleClick = this.handleClick.bind(this);
    this.renderDetailItemButton = this.renderDetailItemButton.bind(this);


    this.totalcolumns = [
      {
        field: 'name',
        align: 'left',
        width: '80%',
      },
      {
        field: 'amount',
        type: 'currency',
        align: 'right',
      },

    ];

    this.producttypescolumns = [
      {
        field: 'productTypeName',
        align: 'left',
        width: '80%',
      }, {
        field: 'productTypeAmount',
        type: 'currency',
        align: 'right',
      },
      {
        align: 'right',
        type: this.renderDetailItemButton,
      },
    ];
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
      showdaterange: {
        type: Boolean,
        reflectToAttribute: true,
      },
      detailitembutton: {
        type: Boolean,
        reflectToAttribute: true,
      },
    };
  }

  static getFormattedDateRange(startDate, finalDate) {
  /*
   * Receives two dates (range) and returns them in the format:
   * "dd/mm/yyyy - dd/mm/yyyy"
   * If they are the same, the response is just "dd/mm/yyyy"
   */
    const date = isDateRange(startDate, finalDate)
      ? formatDateRange(startDate, finalDate)
      : formatDate(startDate);
    return date;
  }

  static sumByProperty(array = [], propertyName) {
    return array.reduce((prev, curr) => prev + curr[propertyName], 0);
  }

  static getGroupedProductTypeAmount(salesReport = []) {
    const groupedByProductType = groupByDeep(
      salesReport, report => report.productTypeId);
    return Object.values(groupedByProductType)
      .map(productTypeArray => ({
        productTypeId: productTypeArray[0].productTypeId,
        productTypeName: productTypeArray[0].productTypeName,
        productTypeAmount: productTypeArray.reduce(
          (prev, curr) => prev + curr.amount, 0),
      }));
  }

  renderDetailItemButton(fieldValue = {}) {
    return this.detailitembutton
      ? `
        <sling-button
          color="success"
          layout= "text"
          data-producttypeid="${fieldValue.productTypeId}">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </sling-button>
      `
      : '';
  }

  handleClick(evt = {}) {
    const { productTypeId, productTypeName } = evt.detail;
    this.dispatchEventAndMethod('detailproducttype', {
      productTypeId,
      productTypeName,
    });
  }

  renderHeader() {
    return this.showdaterange
      ? html`
        <div  class="business-component__header business-component__header_date" slot="header">
          <div>
            <span class="business-component__card-head_title">Resumo de suas vendas</span>
            <span class="business-component__card-head_date">${AggregateSales.getFormattedDateRange(this.startdate, this.finaldate)}</span>
          </div>
        </div>
      `
      : html`
        <div class="business-component__header business-component__header_title" slot="header">
          <div>
            <span class="business-component__card-head_title">Resumo</span>
          </div>
        </div>
      `;
  }

  renderBody() {
    return html`
      <sling-table
        noheader
        clickablerows
        onrowclicked="${this.handleClick}"
        srcdata="${AggregateSales.getGroupedProductTypeAmount(this.apidata)}"
        srccolumns="${this.producttypescolumns}">
      </sling-table>
    `;
  }

  renderFooter() {
    const totalSalesAmount = AggregateSales.sumByProperty(
      this.apidata, 'amount');
    const totalsrcdata = [{
      name: 'Saldo bruto de vendas',
      amount: totalSalesAmount,
    }];
    return html`
      <div slot="footer">
        <div class="business-component__header business-component__header_total">
          <div class="business-component__description">
            Total do período
          </div>
        </div>
        <sling-table
          noheader
          srcdata="${totalsrcdata}"
          srccolumns="${this.totalcolumns}">
        </sling-table>
      </div>
    `;
  }

  render() {
    return html`
      <style>
        @import url('sling-web-business-aggregate-sales/src/index.css');
      </style>
      <div class="business-component">
        <sling-loader loading="${this.loading > 0}"></sling-loader>
        <sling-card nopaddingbody nopaddingfooter>
          ${this.renderHeader()}
          ${this.renderBody()}
          ${this.renderFooter()}
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
  getdata: bindActionCreators(salesActions.getSalesReportInfo, dispatch),
});
