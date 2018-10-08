import { html, SlingBusinessElement } from 'sling-framework';
import { merchantActions, bindActionCreators } from 'customer-js-sdk';
import 'sling-web-component-list';

const keys = [
  'Nome',
  'Cargo',
  'E-mail',
  'Telefone',
  'Celular',
];

export class SlingMerchantContactsList extends SlingBusinessElement {
  render() {
    return html`
      <sling-list cascadelist srcdata="${this.apidata}"
        srckeys="${keys}">
      </sling-list>
    `;
  }
}

export const mapStateToProps = state => ({
  apidata: state.merchantReducer.merchantContacts,
});

export const mapDispatchToProps = dispatch => ({
  getdata: bindActionCreators(merchantActions.getMerchantContacts, dispatch),
});
