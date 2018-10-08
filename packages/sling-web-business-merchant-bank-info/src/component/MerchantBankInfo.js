import { html, SlingBusinessElement } from 'sling-framework';
import { merchantActions, bindActionCreators } from 'customer-js-sdk';
import { isNotEmpty, isValidBankId, isValidBankAgencyNumber, isValidBankAccountNumber } from 'sling-helpers';
import 'sling-web-component-table';
import 'sling-web-component-form';
import 'sling-web-component-loader';
import 'sling-web-component-message';
import 'sling-web-component-button';
import 'sling-web-component-input';
import 'sling-web-component-select';

let instanceName;

const columns = [{
  title: 'Banco',
  field: 'bankName',
}, {
  title: 'Tipo',
  field: 'typeName',
}, {
  title: 'Agência',
  field: 'agencyNumber',
}, {
  title: 'Dígito',
  field: 'agencyNumberVerificationCode',
}, {
  title: 'Conta',
  field: 'accountNumber',
}, {
  title: 'Dígito',
  field: 'accountNumberVerificationCode',
}];

const validation = [
  isNotEmpty('bankId'),
  isValidBankId('bankId'),

  isNotEmpty('typeId'),

  isNotEmpty('agencyNumber'),
  isValidBankAgencyNumber('agencyNumber'),

  isNotEmpty('accountNumber'),
  isValidBankAccountNumber('accountNumber'),

  isNotEmpty('accountNumberVerificationCode'),
];

export class SlingMerchantBankInfo extends SlingBusinessElement {
  constructor() {
    super();
    instanceName = this.localName;
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleStartEditing = this.handleStartEditing.bind(this);
    this.handleStopEditing = this.handleStopEditing.bind(this);
  }

  static get properties() {
    return {
      ...super.properties,
      addable: {
        type: Boolean,
        reflectToAttribute: true,
      },
      editable: {
        type: Boolean,
        reflectToAttribute: true,
      },
      editing: {
        type: Boolean,
        reflectToAttribute: true,
      },
      formdata: {
        type: Object,
      },
    };
  }

  static findAccountType(availableBanks, bankId = undefined) {
    const bank = availableBanks.find(el => el.id === Number(bankId));
    return bank ? bank.accountTypes : [];
  }

  handleFormUpdate(evt) {
    this.formdata = {
      ...evt.detail,
    };
  }

  handleFormSubmit(evt) {
    this.senddata({
      stonecode: this.stonecode,
      apitoken: this.apitoken,
      apiurl: this.apiurl,
      payload: evt.detail,
    }, { id: instanceName });

    this.handleStopEditing();
  }

  handleStartEditing(evt) {
    this.editing = true;
    this.handleFormUpdate(evt);
  }

  handleStopEditing() {
    this.editing = false;
  }

  renderForm() {
    const fields = this.formdata || {};
    const { availableBanks = [] } = this.apidata || [];
    const accType = this.constructor
      .findAccountType(availableBanks, fields.bankId);

    return html`
      <sling-form
        onformsubmit="${this.handleFormSubmit}"
        onformupdate="${this.handleFormUpdate}"
        validation=${validation}>
        <sling-select
          label="Banco"
          name="bankId"
          value="${fields.bankId}"
          srcoptions="${availableBanks}">
        </sling-select>
         <sling-select
          label="Tipo"
          name="typeId"
          value="${fields.typeId}"
          srcoptions="${accType}">
        </sling-select>
        <sling-input
          type="digits"
          name="agencyNumber"
          label="Agencia"
          maxLength="5"
          value="${fields.agencyNumber}">
        </sling-input>
        <sling-input
          type="text"
          name="agencyNumberVerificationCode"
          label="Dígito"
          maxLength="2"
          value="${fields.agencyNumberVerificationCode}">
        </sling-input>
        <sling-input
          type="digits"
          name="accountNumber"
          label="Conta"
          maxLength="12"
          value="${fields.accountNumber}">
        </sling-input>
        <sling-input
          type="text"
          name="accountNumberVerificationCode"
          label="Dígito"
          maxLength="2"
          value="${fields.accountNumberVerificationCode}">
        </sling-input>
        <sling-input
          type="hidden"
          name="statusId"
          value="${fields.statusId}">
        </sling-input>
        <sling-input
          type="hidden"
          name="centralizedPayment"
          value="${fields.centralizedPayment}">
        </sling-input>
        <sling-input
          type="hidden"
          name="id"
          value="${fields.id}">
        </sling-input>
        <sling-button
          color="success"
          type="submit">
          Enviar
        </sling-button>
      </sling-form>
    `;
  }

  renderWrappedForm() {
    return html`
      <div class="business-component__form">
        <div class="business-component__inner">
          <svg
            onclick="${this.handleStopEditing}"
            class="business-component__close"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
          ${this.renderForm()}
        </div>
      </div>
    `;
  }

  render() {
    const { banks } = this.apidata;

    return html`
      <style>
        @import url('sling-web-business-merchant-bank-info/src/index.css');
      </style>
      <sling-message
        aim="error"
        srcdata="${this.errors}"
        layout="outline"></sling-message>
      ${this.renderWrappedForm()}
      <div class="business-component">
        <sling-loader loading="${this.loading > 0}"></sling-loader>
        ${this.addable ? html`
          <div class="business-component__button">
            <sling-button
              size="big"
              color="success"
              type="text">
              adicionar dados bancários
            </sling-button>
          </div>
        ` : ''}
        <sling-table
          editable="${this.editable}"
          onrowclicked="${this.handleStartEditing}"
          srcdata="${banks}"
          srccolumns="${columns}">
        </sling-table>
      </div>
    `;
  }
}

export const mapStateToProps = state => ({
  apidata: state.merchantReducer.merchantBankInfo,
  loading: state.globalReducer.loaders[instanceName],
  errors: state.globalReducer.errors[instanceName],
});

export const mapDispatchToProps = dispatch => ({
  getdata: bindActionCreators(merchantActions.getMerchantBankInfo, dispatch),
  senddata: bindActionCreators(merchantActions.updateBankAccounts, dispatch),
});
