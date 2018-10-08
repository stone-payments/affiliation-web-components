import { registerComponent } from 'sling-helpers';
import { connect } from 'customer-js-sdk';
import { SlingMerchantContactsList, mapStateToProps, mapDispatchToProps }
  from './component/MerchantContactsList.js';

registerComponent('sling-merchant-contacts-list',
  connect(mapStateToProps, mapDispatchToProps)(SlingMerchantContactsList));
