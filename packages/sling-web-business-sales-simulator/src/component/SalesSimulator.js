import { groupByDeep, isNotEmpty, isPositiveNumber } from 'sling-helpers';
import { html, SlingBusinessElement } from 'sling-framework';
import { merchantActions, bindActionCreators } from 'customer-js-sdk';
import 'sling-web-component-table';
import 'sling-web-component-form';
import 'sling-web-component-loader';
import 'sling-web-component-message';
import 'sling-web-component-button';
import 'sling-web-component-input';
import 'sling-web-component-select';

let instanceName;

const validation = [
  isNotEmpty('salesAmount'),
  isPositiveNumber('salesAmount'),
  isNotEmpty('cardBrandId'),
  isNotEmpty('trxProfileId'),
];

const simulateResultColumns = [
  {
    field: 'label',
  },
  {
    field: 'value',
    type: 'currency',
    align: 'right',
  },
];

export class SlingSalesSimulator extends SlingBusinessElement {
  constructor() {
    super();
    instanceName = this.localName;
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.showSimulateForm = true;
  }

  static get properties() {
    return {
      ...super.properties,
      formdata: {
        type: Object,
      },
      showSimulateForm: {
        type: Boolean,
      },
    };
  }

  static getCardBrands(merchantFees = []) {
    return Object.values(groupByDeep(merchantFees, fee => fee.cardBrandId))
      .map(cardBrandArray => ({
        id: cardBrandArray[0].cardBrandId,
        name: cardBrandArray[0].cardBrandName,
      }));
  }

  static getTrxProfiles(merchantFees = [], cardBrandId = undefined) {
    return Object.values(
      merchantFees.filter(fee => fee.cardBrandId === Number(cardBrandId)),
    ).map(fee => ({
      id: fee.transactionProfileId,
      name: fee.transactionProfileName,
    })) || [];
  }

  static calculateResult(fields = {}, merchantFees = []) {
    const salesAmount = fields.salesAmount || 0;
    const { cardBrandId, trxProfileId } = fields;

    const retrievedFee = merchantFees
      .find(fee => fee.cardBrandId === Number(cardBrandId) &&
        fee.transactionProfileId === Number(trxProfileId));
    const rate = retrievedFee ? retrievedFee.rate : 0;
    const netAmount = salesAmount - (salesAmount * (rate / 100));
    const feeAmount = salesAmount - netAmount;

    return [
      {
        label: 'Valor Bruto',
        value: salesAmount,
      },
      {
        label: 'Taxa',
        value: -feeAmount,
      },
      {
        label: 'Valor Líquido',
        value: netAmount,
      },
    ];
  }

  handleFormUpdate(evt) {
    this.formdata = {
      ...evt.detail,
    };
  }

  handleFormSubmit() {
    this.showSimulateForm = !this.showSimulateForm;
  }

  renderSimulateForm(fields, cardBrands = [], trxProfiles = []) {
    return html`
    <div class="business-component__form" style="display: ${this.showSimulateForm ? 'block' : 'none'}">
      <div class="business-component__inner">
        <sling-form
          onformsubmit="${this.handleFormSubmit}"
          onformupdate="${this.handleFormUpdate}"
          validation=${validation}>
          <sling-input
            type="number"
            name="salesAmount"
            label="Valor da venda"
            placeholder="Digite o valor da venda">
          </sling-input>
          <sling-select
            label="Bandeira"
            name="cardBrandId"
            value="${fields.cardBrandId}"
            srcoptions="${cardBrands}"
            disabled="${this.loading > 0 || !cardBrands[0]}">
          </sling-select>
          <sling-select
            label="Tipo"
            name="trxProfileId"
            value="${fields.trxProfileId}"
            srcoptions="${trxProfiles}"
            disabled="${this.loading > 0 || !fields.cardBrandId}">
          </sling-select>
          <sling-button
            size="big"
            color="primary"
            type="submit"
            disabled="${!fields.salesAmount || !fields.cardBrandId || !fields.trxProfileId}">
            Simular venda
          </sling-button>
        </sling-form>
      </div>
    </div>
    `;
  }

  renderSimulateResult(fields, merchantFees) {
    return html`
    <sling-form onformsubmit="${this.handleFormSubmit}">
    <div style="display: ${this.showSimulateForm ? 'none' : 'block'}">
      <sling-table
        noheader
        srccolumns="${simulateResultColumns}"
        srcdata="${SlingSalesSimulator.calculateResult(fields, merchantFees)}">
      </sling-table>
      <div class="card__prepay-text">O valor líquido não inclui taxa de antecipação.</div>
      <!-- Re-simulate button -->
      <sling-button
        type="submit"
        size="big"
        color="primary"
        layout="outline"
        class="button__simulate-button">
        Simular novamente
      </sling-button>
    </div>
    </sling-form>
    `;
  }

  render() {
    const merchantFees = this.apidata || [];
    const fields = this.formdata || {};
    const cardBrands = SlingSalesSimulator.getCardBrands(merchantFees);
    const trxProfiles = SlingSalesSimulator
      .getTrxProfiles(merchantFees, fields.cardBrandId);

    return html`
      <style>
        @import url('sling-web-business-sales-simulator/src/index.css');
      </style>
      <sling-message
        aim="error"
        srcdata="${this.errors}"
        layout="outline"></sling-message>
      <sling-loader loading="${this.loading > 0}"></sling-loader>
      <div>
        <p class="card__title">Simulador de vendas</p>
        <p class="card__subtitle">Teste valores para ver quanto você receberia.</p>
        <hr class="card__divider">
      </div>
      <div>
        ${this.renderSimulateForm(fields, cardBrands, trxProfiles)}
        ${this.renderSimulateResult(fields, merchantFees)}
      </div>
    `;
  }
}

export const mapStateToProps = state => ({
  apidata: state.merchantReducer.merchantFees,
  loading: state.globalReducer.loaders[instanceName],
  errors: state.globalReducer.errors[instanceName],
});

export const mapDispatchToProps = dispatch => ({
  getdata: bindActionCreators(merchantActions.getMerchantFees, dispatch),
});
