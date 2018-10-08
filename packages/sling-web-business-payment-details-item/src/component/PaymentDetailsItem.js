import { html, SlingBusinessElement } from 'sling-framework';
import { paymentsActions, bindActionCreators } from 'customer-js-sdk';
import 'sling-web-component-table';
import 'sling-web-component-card';
import 'sling-web-component-button';
import 'sling-web-component-loader';
import { isDateRange, formatDateRange, formatDate } from 'sling-helpers';

let instanceName;

const detailcolumns = [
  {
    title: '',
    field: 'movementCategory',
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

export class PaymentDetailsItem extends SlingBusinessElement {
  constructor() {
    super();
    instanceName = this.localName;
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
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
      wallettypeid: {
        type: Number,
        reflectToAttribute: true,
        callSdk: 'required',
      },
    };
  }

  handleGoBackClick() {
    this.dispatchEventAndMethod('gobackclick');
  }

  render() {
    const { total } = this.apidata || [];

    const { brandId, walletTypeName } = this.apidata[0] || {};

    const dateRange = isDateRange(this.startdate, this.finaldate);

    const date = dateRange
      ? formatDateRange(this.startdate, this.finaldate)
      : formatDate(this.startdate);

    return html`
      <style>
        @import url('sling-web-business-payment-details-item/src/index.css');
      </style>
      <div class="business-component">
        <sling-loader loading="${this.loading > 0}"></sling-loader>
        <sling-card nopaddingbody nopaddingfooter>
          <div  class="business-component__header business-component__header_primary" slot="header">
            <div>
              <span class="business-component__card-head_title">Detalhes do Pagamento</span>
              <span class="business-component__card-head_date">${date}</span>
            </div>
            <sling-button
              layout="text"
              size="small"
              onclick="${this.handleGoBackClick}">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
              Voltar
            </sling-button>
          </div>
          <div class="business-component__header business-component__header_secondary">
            <sling-brand-icon
              brandid="${brandId}"
              width="40px"
              height="25px"></sling-brand-icon>
            <div class="business-component__description">
              ${walletTypeName}
            </div>
          </div>
          <div slot="footer">
            <div class="business-component__header business-component__header_total">
              <div class="business-component__description">
                Total
              </div>
            </div>
            <sling-table noheader srcdata="${total}"
              srccolumns="${totalcolumns}"></sling-table>
          </div>
          <sling-table noheader srcdata="${this.apidata}"
            srccolumns="${detailcolumns}"></sling-table>
        </sling-card>
      </div>
    `;
  }
}

export const mapStateToProps = state => ({
  apidata: state.paymentsReducer.paymentDetailsInfoByWalletTypeId,
  loading: state.globalReducer.loaders[instanceName],
});

export const mapDispatchToProps = dispatch => ({
  getdata: bindActionCreators(
    paymentsActions.getPaymentDetailsInfoByWalletTypeId, dispatch),
});
