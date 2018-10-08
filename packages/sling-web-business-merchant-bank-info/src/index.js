import { registerComponent } from 'sling-helpers';
import { connect } from 'customer-js-sdk';
import { SlingMerchantBankInfo, mapStateToProps, mapDispatchToProps }
  from './component/MerchantBankInfo.js';

registerComponent('sling-merchant-bank-info', connect(mapStateToProps,
  mapDispatchToProps)(SlingMerchantBankInfo));
