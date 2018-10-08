import { SlingBusinessElement, html } from 'sling-framework';
import { paymentsActions, bindActionCreators } from 'customer-js-sdk';
import 'sling-web-component-table';
import 'sling-web-component-paginator';
import 'sling-web-component-loader';
import { columns } from './columns.js';

let instanceName;

const ITEMS_PER_PAGE = 30;

export class SlingPaymentOperations extends SlingBusinessElement {
  constructor() {
    super();
    instanceName = this.localName;
    this.setPaginateRequest = this.setPaginateRequest.bind(this);
  }

  static get properties() {
    const businessElementProperties = {
      ...super.properties,
      startdate: {
        type: String,
        reflectToAttribute: true,
        callSdk: 'required',
      },
      finaldate: {
        type: String,
        callSdk: 'required',
        reflectToAttribute: true,
      },
      page: {
        type: String,
        callSdk: 'optional',
        reflectToAttribute: true,
      },
    };
    return businessElementProperties;
  }

  setPaginateRequest(evt) {
    this.page = String(evt.detail.index - 1);
  }

  render() {
    const { data, total = 1 } = this.apidata;

    if (data && data.length === 0) {
      return html``;
    }

    return html`
      <style>
        @import url('sling-web-business-payment-operations/src/index.css');
      </style>
      <div class="emd-table emd-table__paginator">
        <sling-paginator
          total="${Math.ceil(total / ITEMS_PER_PAGE)}"
          onpaginate="${this.setPaginateRequest}">
        </sling-paginator>
      </div>
      <div className="business-component loading_${this.loading > 0}">
        <sling-loader loading="${this.loading > 0}"></sling-loader>
        <sling-table
          clickablerows
          onrowclicked="${this.bubbleEvent}"
          srcdata="${data}" srccolumns="${columns}">
        </sling-table>
      </div>
    `;
  }
}

export const mapStateToProps = state => ({
  apidata: state.paymentsReducer.paymentOperationsInfo,
  loading: state.globalReducer.loaders[instanceName],
});

export const mapDispatchToProps = dispatch => ({
  getdata: bindActionCreators(
    paymentsActions.getPaymentOperationsInfo, dispatch),
});
