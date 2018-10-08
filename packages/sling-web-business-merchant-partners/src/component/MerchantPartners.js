import { html, SlingBusinessElement } from 'sling-framework';
import { merchantActions, bindActionCreators } from 'customer-js-sdk';
import 'sling-web-component-table';
import 'sling-web-component-loader';
import 'sling-web-component-message';
import 'sling-web-component-button';

let instanceName;

const columns = [{
  title: 'Nome',
  field: 'name',
}, {
  title: 'E-mail',
  field: 'email',
}, {
  title: 'RG',
  field: 'rg',
}, {
  title: 'CPF',
  field: 'cpf',
  type: 'cpf',
}];

export class SlingMerchantPartners extends SlingBusinessElement {
  constructor() {
    super();
    instanceName = this.localName;
  }

  static get properties() {
    return {
      ...super.properties,
      editable: {
        type: Boolean,
        reflectToAttribute: true,
      },
      addable: {
        type: Boolean,
        reflectToAttribute: true,
      },
    };
  }

  render() {
    return html`
      <style>
        @import url('sling-web-business-merchant-partners/src/index.css');
      </style>
      <sling-message
        aim="error"
        srcdata="${this.errors}"
        layout="outline"></sling-message>
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
          srcdata="${this.apidata}"
          srccolumns="${columns}">
        </sling-table>
      </div>
    `;
  }
}

export const mapStateToProps = state => ({
  apidata: state.merchantReducer.merchantPartners,
  loading: state.globalReducer.loaders[instanceName],
  errors: state.globalReducer.errors[instanceName],
});

export const mapDispatchToProps = dispatch => ({
  getdata: bindActionCreators(merchantActions.getMerchantPartners, dispatch),
});
