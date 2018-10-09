import { html, SlingBusinessElement } from 'sling-framework';
import { merchantActions, bindActionCreators } from 'customer-js-sdk';
import 'sling-web-component-list';

const keys = [
  'Nome',
  'E-mail',
  'RG',
  'CPF',
];

export class SlingMerchantPartnersList extends SlingBusinessElement {
  render() {
    return html`
      <sling-list cascadelist srcdata="${this.apidata}"
        srckeys="${keys}">
      </sling-list>
    `;
  }
}

export const mapStateToProps = state => ({
  apidata: state.merchantReducer.merchantPartners,
});

export const mapDispatchToProps = dispatch => ({
  getdata: bindActionCreators(merchantActions.getMerchantPartners, dispatch),
});
