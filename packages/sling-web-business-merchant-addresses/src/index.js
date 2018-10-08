import { registerComponent } from 'sling-helpers';
import { connect } from 'customer-js-sdk';
import { SlingMerchantAddresses, mapStateToProps, mapDispatchToProps }
  from './component/MerchantAddresses.js';

registerComponent('sling-merchant-addresses', connect(mapStateToProps,
  mapDispatchToProps)(SlingMerchantAddresses));
