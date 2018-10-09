import { registerComponent } from 'sling-helpers';
import { connect } from 'customer-js-sdk';
import { SlingMerchantContacts, mapStateToProps, mapDispatchToProps }
  from './component/MerchantContacts.js';

registerComponent('sling-merchant-contacts', connect(mapStateToProps,
  mapDispatchToProps)(SlingMerchantContacts));
