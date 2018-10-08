import { html, SlingBusinessElement } from 'sling-framework';
import { merchantActions, bindActionCreators } from 'customer-js-sdk';
import 'sling-web-component-list';

const keys = [
  'Descrição',
  'UF',
  'Cidade',
  'Endereço',
  'Número',
  'Complemento',
  'Bairro',
];

export class SlingMerchantAddressesList extends SlingBusinessElement {
  render() {
    return html`
      <sling-list cascadelist srcdata="${this.apidata}"
        srckeys="${keys}">
      </sling-list>
    `;
  }
}

export const mapStateToProps = state => ({
  apidata: state.merchantReducer.merchantAddresses,
});

export const mapDispatchToProps = dispatch => ({
  getdata: bindActionCreators(merchantActions.getMerchantAddresses, dispatch),
});
