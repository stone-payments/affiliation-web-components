import { registerComponent } from 'sling-helpers';
import { connect } from 'customer-js-sdk';
import { SlingMerchantInfoList, mapStateToProps, mapDispatchToProps }
  from './component/MerchantInfoList.js';

registerComponent('sling-merchant-info-list', connect(mapStateToProps,
  mapDispatchToProps)(SlingMerchantInfoList));
