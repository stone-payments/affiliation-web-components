import { html, SlingBusinessElement } from 'sling-framework';
import { paymentsActions, bindActionCreators } from 'customer-js-sdk';


export class SlingPaymentStatus extends SlingBusinessElement {
  constructor() {
    super();

    this.mapStatusIdToTooltipText = {
      1: 'Valores que ainda serão enviados para pagamento.',
      2: 'O valor foi enviado para o fluxo de pagamento e aguarda aprovação.',
      3: 'O pagamento não foi aceito por algum problema durante o fluxo ou rejeição do próprio banco.', // eslint-disable-line max-len
      4: 'Pedido de pagamento confirmado pelo banco.',
    };
    this.mapStatusIdToTooltipClass = {
      1: 'payment__open',
      2: 'payment__scheduled',
      3: 'payment__rejected',
      4: 'payment__paid',
    };
    this.unmappedClass = 'payment__unmapped';
  }

  static get properties() {
    return {
      ...super.properties,
    };
  }

  getTooltipClass(statusId) {
    return this.mapStatusIdToTooltipClass[statusId] || this.unmappedClass;
  }

  getTooltipText(statusId) {
    return this.mapStatusIdToTooltipText[statusId];
  }

  // TODO: replace svg by sling-icon once the lit-html problem is resolved
  renderTooltip(statusId, statusName) {
    return html`
      <div title="${this.getTooltipText(statusId)}"
        className="payment-status--item ${this.getTooltipClass(statusId)}">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        <span class="label">${statusName}</span>
      </div>
    `;
  }

  renderTooltips(paymentStatus = []) {
    return html`
      <div class="payment-status">
        ${paymentStatus.map(status => this.renderTooltip(status.id, status.name))}
      </div>
    `;
  }

  render() {
    const paymentStatus = this.apidata ? this.apidata.data : [];

    return html`
      <style>
        @import url('sling-web-business-payment-status/src/index.css');
      </style>
      ${this.renderTooltips(paymentStatus)}
    `;
  }
}

export const mapStateToProps = state => ({
  apidata: state.paymentsReducer.paymentStatusInfo,
});

export const mapDispatchToProps = dispatch => ({
  getdata: bindActionCreators(paymentsActions.getPaymentStatusInfo, dispatch),
});
