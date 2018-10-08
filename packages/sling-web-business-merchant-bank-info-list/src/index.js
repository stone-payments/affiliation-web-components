import { registerComponent } from 'sling-helpers';
import { connect } from 'customer-js-sdk';
import { SlingMerchantBankInfoList, mapStateToProps, mapDispatchToProps }
  from './component/MerchantBankInfoList.js';

registerComponent('sling-merchant-bank-info-list',
  connect(mapStateToProps, mapDispatchToProps)(SlingMerchantBankInfoList));
