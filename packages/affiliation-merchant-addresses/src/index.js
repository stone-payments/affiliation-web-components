import { registerComponent } from 'sling-helpers';
import { connect } from 'customer-js-sdk';
import { AffiliationMerchantAddresses, mapStateToProps, mapDispatchToProps }
  from './component/MerchantAddresses.js';

registerComponent('affiliation-merchant-addresses', connect(mapStateToProps,
  mapDispatchToProps)(AffiliationMerchantAddresses));
