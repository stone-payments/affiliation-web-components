import { html, SlingBusinessElement } from 'sling-framework';
import { merchantActions, bindActionCreators } from 'customer-js-sdk';
import { isNotEmpty, isValidEmail, isValidPhone } from 'sling-helpers';
import 'sling-web-component-table';
import 'sling-web-component-loader';
import 'sling-web-component-message';
import 'sling-web-component-button';
import 'sling-web-component-input';
import 'sling-web-component-select';
import 'sling-web-component-form';

let instanceName;

const columns = [{
  title: 'Nome',
  field: 'name',
}, {
  title: 'Cargo',
  field: 'typeName',
}, {
  title: 'E-mail',
  field: 'email',
}, {
  title: 'Telefone',
  field: 'phone',
  type: 'phone',
}, {
  title: 'Celular',
  field: 'mobilePhone',
  type: 'phone',
}];

const validation = [
  isNotEmpty('name'),

  isNotEmpty('email'),
  isValidEmail('email'),

  isNotEmpty('phone'),
  isValidPhone('phone'),

  isNotEmpty('mobilePhone'),
  isValidPhone('mobilePhone'),

];

export class SlingMerchantContacts extends SlingBusinessElement {
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
      editable: {
        type: Boolean,
        reflectToAttribute: true,
      },
      editing: {
        type: Boolean,
        reflectToAttribute: true,
      },
      addable: {
        type: Boolean,
        reflectToAttribute: true,
      },
      formdata: {
        type: Object,
      },
    };
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

    return html`
      <sling-form
        onformsubmit="${this.handleFormSubmit}"
        onformupdate="${this.handleFormUpdate}"
        validation=${validation}>
        <sling-input
          type="text"
          name="name"
          label="Nome"
          value="${fields.name}">
        </sling-input>
        <sling-input
          type="hidden"
          name="typeId"
          value="${fields.typeId}">
        </sling-input>
        <sling-input
          type="email"
          name="email"
          label="Email"
          value="${fields.email}">
        </sling-input>
        <sling-input
          type="phone"
          name="phone"
          label="Telefone"
          value="${fields.phone}">
        </sling-input>
        <sling-input
          type="phone"
          name="mobilePhone"
          label="Celular"
          value="${fields.mobilePhone}">
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
    return html`
    <style>
     @import url('sling-web-business-merchant-contacts/src/index.css');
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
            adicionar contato
          </sling-button>
        </div>
      ` : ''}
      <sling-table
        editable="${this.editable}"
        onrowclicked="${this.handleStartEditing}"
        srcdata="${this.apidata}"
        srccolumns="${columns}">
      </sling-table>
    </div>
    `;
  }
}

export const mapStateToProps = state => ({
  apidata: state.merchantReducer.merchantContacts,
  loading: state.globalReducer.loaders[instanceName],
  errors: state.globalReducer.errors[instanceName],
});

export const mapDispatchToProps = dispatch => ({
  getdata: bindActionCreators(merchantActions.getMerchantContacts, dispatch),
  senddata: bindActionCreators(merchantActions.putMerchantContacts, dispatch),
});
