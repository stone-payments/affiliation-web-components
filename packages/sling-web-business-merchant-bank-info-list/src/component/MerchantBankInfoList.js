import { html, SlingBusinessElement } from 'sling-framework';
import { merchantActions, bindActionCreators } from 'customer-js-sdk';
import 'sling-web-component-list';

const keys = [
  'Banco',
  'Tipo',
  'Agência',
  'Dígito',
  'Conta',
  'Dígito',
];

export class SlingMerchantBankInfoList extends SlingBusinessElement {
  render() {
    const { banks } = this.apidata;
    return html`
      <sling-list cascadelist srcdata="${banks}"
        srckeys="${keys}">
      </sling-list>
    `;
  }
}

export const mapStateToProps = state => ({
  apidata: state.merchantReducer.merchantBankInfo,
});

export const mapDispatchToProps = dispatch => ({
  getdata: bindActionCreators(merchantActions.getMerchantBankInfo, dispatch),
});
