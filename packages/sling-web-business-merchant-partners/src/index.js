import { registerComponent } from 'sling-helpers';
import { connect } from 'customer-js-sdk';
import { SlingMerchantPartners, mapStateToProps, mapDispatchToProps }
  from './component/MerchantPartners.js';

registerComponent('sling-merchant-partners', connect(mapStateToProps,
  mapDispatchToProps)(SlingMerchantPartners));
