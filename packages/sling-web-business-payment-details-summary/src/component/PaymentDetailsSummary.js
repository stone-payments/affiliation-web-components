import { html, SlingBusinessElement } from 'sling-framework';
import 'sling-web-component-table';
import 'sling-web-component-card';
import 'sling-web-component-button';
import 'sling-web-component-brand-icon';
import { paymentsActions, bindActionCreators } from 'customer-js-sdk';
import { isDateRange, formatDateRange, formatDate } from 'sling-helpers';

let instanceName;

const totalcolumns = [
  {
    title: 'Tipo',
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

export class PaymentDetailsSummary extends SlingBusinessElement {
  constructor() {
    super();
    instanceName = this.localName;
    this.handleRowClick = this.handleRowClick.bind(this);

    this.summarycolumns = [
      ...totalcolumns,
      {
        title: 'Ação',
        field: 'walletTypeId',
        align: 'right',
        type: fieldValue => `
          <sling-button
            size="small"
            color="success"
            layout="text"
            data-wallettypeid="${fieldValue.walletTypeId}">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </sling-button>
        `,
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
    };
  }

  handleRowClick(evt) {
    const { walletTypeId } = evt.detail;

    if (walletTypeId != null) {
      this.dispatchEventAndMethod('detailclick', {
        selectedId: walletTypeId,
      });
    }
  }

  render() {
    const {
      apidata = [],
      summarycolumns = [],
    } = this;

    const {
      summary = {},
      other = [],
      total = [],
    } = apidata[0] || {};

    const summaryItems = Object.values(summary);

    const hasOther = other.length > 0;
    const showBody = hasOther || summaryItems.length > 0;
    const dateRange = isDateRange(this.startdate, this.finaldate);

    const date = dateRange
      ? formatDateRange(this.startdate, this.finaldate)
      : formatDate(this.startdate);

    return html`
      <style>
        @import url('sling-web-business-payment-details-summary/src/index.css');
      </style>
      <div class="business-component">
        <sling-loader loading="${this.loading > 0}"></sling-loader>
        <sling-card nopaddingbody nopaddingfooter>
          <div slot="header">
            <span class="business-component__card-head_title">Detalhes do Pagamento</span>
            <span class="business-component__card-head_date">${date}</span>
          </div>

          ${(showBody) ? html`
            <div class="business-component__body">
              ${summaryItems.map(item => html`
                <div class="business-component__header business-component__header_secondary">
                  <sling-brand-icon
                    brandid="${item[0].brandId}"
                    width="40px"
                    height="25px"></sling-brand-icon>
                  <div class="business-component__description">
                    ${item[0].brandName}
                  </div>
                </div>
                <sling-table
                  noheader
                  clickablerows
                  onrowclicked="${this.handleRowClick}"
                  srcdata="${item}"
                  srccolumns="${summarycolumns}">
                </sling-table>
              `)}

              ${(hasOther) ? html`
                <div class="business-component__header business-component__header_secondary">
                  <div class="business-component__description">
                    Diversos
                  </div>
                </div>
                <sling-table
                  noheader
                  clickablerows
                  onrowclicked="${this.handleRowClick}"
                  srcdata="${other}"
                  srccolumns="${summarycolumns}">
                </sling-table>
              ` : ''}
            </div>
          ` : ''}

            <div slot="footer">
              <div class="business-component__header business-component__header_total">
                <div class="business-component__description">
                  Total
                </div>
              </div>
              <sling-table noheader srcdata="${total}"
                srccolumns="${totalcolumns}">
              </sling-table>
            </div>
        </sling-card>
      </div>
    `;
  }
}

export const mapStateToProps = state => ({
  apidata: state.paymentsReducer.paymentDetailsInfo,
  loading: state.globalReducer.loaders[instanceName],
});

export const mapDispatchToProps = dispatch => ({
  getdata: bindActionCreators(paymentsActions.getPaymentDetailsInfo, dispatch),
});
