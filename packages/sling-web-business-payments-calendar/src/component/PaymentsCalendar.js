import { SlingBusinessElement, html } from 'sling-framework';
import { paymentsActions, bindActionCreators } from 'customer-js-sdk';
import { formatCurrency } from 'sling-helpers';
import 'sling-web-component-calendar';
import 'sling-web-component-loader';
import 'sling-web-business-payment-status';

let instanceName;

export class SlingPaymentsCalendar extends SlingBusinessElement {
  constructor() {
    super();
    instanceName = this.localName;
    this.paymentsCalendarConfiguration = {
      onDaySelection: (day) => {
        this.selecteddate = day;
      },
      onMonthChange: (viewPeriod) => {
        this.startdate = viewPeriod.start;
        this.finaldate = viewPeriod.end;
      },
      field: field => html`
        ${field.map(item => html`
          <p
            className="calendar__info calendar__status
            calendar__status_${item.settlement_status_id}"
            title="${item.status}">
            <span style="white-space: nowrap">
              ${formatCurrency(item.amount)}
            </span>
          </p>
        `)}
      `,
    };
  }

  // extend SlingBusinessElement default properties
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
        callSdk: 'required',
        reflectToAttribute: true,
      },
      selecteddate: {
        type: String,
        reflectToAttribute: true,
      },
      showpaymentstatus: {
        type: Boolean,
        reflectToAttribute: true,
      },
    };
  }

  renderPaymentStatusComponent() {
    return this.showpaymentstatus
      ? html`
      <div class="business-component payment-status">
        <sling-payment-status
          stonecode="${this.stonecode}"
          apitoken="${this.apitoken}"></sling-payment-status>
      </div>
      `
      : '';
  }

  render() {
    return html`
      <style>
        @import url('sling-web-business-payments-calendar/src/index.css');
      </style>
      <div class="business-component">
        <sling-loader loading="${this.loading > 0}"></sling-loader>
        <sling-calendar srcdata="${this.apidata}"
          eventhandler="${this.eventhandler}"
          configuration="${this.paymentsCalendarConfiguration}">
        </sling-calendar>
      </div>
      ${this.renderPaymentStatusComponent()}
    `;
  }
}

export const mapStateToProps = state => ({
  apidata: state.paymentsReducer.paymentsCalendarInfo,
  loading: state.globalReducer.loaders[instanceName],
});

export const mapDispatchToProps = dispatch => ({
  getdata: bindActionCreators(
    paymentsActions.getCalendarPaymentsInfo, dispatch),
});
