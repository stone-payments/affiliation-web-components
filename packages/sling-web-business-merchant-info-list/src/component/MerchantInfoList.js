import { html, SlingBusinessElement } from 'sling-framework';
import { merchantActions, bindActionCreators } from 'customer-js-sdk';
import { isNotEmpty } from 'sling-helpers';
import 'sling-web-component-list';
import 'sling-web-component-form';
import 'sling-web-component-input';
import 'sling-web-component-loader';
import 'sling-web-component-message';
import 'sling-web-component-button';

let instanceName;

const keys = [
  'StoneCode',
  'CNPJ',
  'Razão Social',
  'Nome Fantasia',
  'Ramo de Atividade',
];

const validation = [
  isNotEmpty('fantasyName'),
];

export class SlingMerchantInfoList extends SlingBusinessElement {
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
      formdata: {
        type: Object,
        value: {},
      },
      cascadelist: {
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
    };
  }

  handleFormUpdate() {
    if (this.apidata[0] != null) {
      const { fantasyName } = this.apidata[0];
      this.formdata = { fantasyName };
    }
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

  handleStartEditing() {
    this.editing = true;
    this.handleFormUpdate();
  }

  handleStopEditing() {
    this.editing = false;
  }

  renderForm() {
    return html`
      <sling-form
        validation="${validation}"
        onformsubmit="${this.handleFormSubmit}"
        onformupdate="${this.handleFormUpdate}">
        <sling-input
          label="Nome Fantasia"
          value="${this.formdata.fantasyName}"
          type="text"
          name="fantasyName">${this.formdata.fantasyName}</sling-input>
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
        @import url('sling-web-business-merchant-info-list/src/index.css')
      </style>
      <sling-message
        aim="error"
        srcdata="${this.errors}"
        layout="outline"></sling-message>
      <div class="business-component">
        <sling-loader loading="${this.loading > 0}"></sling-loader>
        ${this.renderWrappedForm()}
        <sling-list
          cascadelist="${this.cascadelist}"
          srcdata="${this.apidata}"
          srckeys="${keys}">
        </sling-list>
        ${this.editable ? html`
          <sling-button
            onclick="${this.handleStartEditing}">
            Editar
          </sling-button>
        ` : ''}
      </div>
    `;
  }
}

export const mapStateToProps = state => ({
  apidata: state.merchantReducer.merchantInfo,
  loading: state.globalReducer.loaders[instanceName],
  errors: state.globalReducer.errors[instanceName],
});

export const mapDispatchToProps = dispatch => ({
  getdata: bindActionCreators(merchantActions.getMerchantInfo, dispatch),
  senddata: bindActionCreators(merchantActions.patchMerchantInfo, dispatch),
});
