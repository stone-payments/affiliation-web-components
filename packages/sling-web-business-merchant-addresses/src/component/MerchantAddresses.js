import { html, SlingBusinessElement } from 'sling-framework';
import { merchantActions, bindActionCreators } from 'customer-js-sdk';
import 'sling-web-component-table';
import 'sling-web-component-form';
import 'sling-web-component-input';
import 'sling-web-component-select';
import 'sling-web-component-loader';
import 'sling-web-component-message';
import 'sling-web-component-button';

const columns = [{
  title: 'Descrição',
  field: 'description',
}, {
  title: 'UF',
  field: 'uf',
}, {
  title: 'Cidade',
  field: 'city',
}, {
  title: 'Endereço',
  field: 'street',
}, {
  title: 'Nº',
  field: 'number',
}, {
  title: 'Complem.',
  field: 'complement',
}, {
  title: 'Bairro',
  field: 'neighborhood',
}];

let instanceName;

export class SlingMerchantAddresses extends SlingBusinessElement {
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
      @import url('sling-web-business-merchant-addresses/src/index.css');
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
            color="success"
            type="text">
            adicionar endereço
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
  apidata: state.merchantReducer.merchantAddresses,
  loading: state.globalReducer.loaders[instanceName],
  errors: state.globalReducer.errors[instanceName],
});

export const mapDispatchToProps = dispatch => ({
  getdata: bindActionCreators(merchantActions.getMerchantAddresses, dispatch),
});
