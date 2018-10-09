import { registerComponent } from 'sling-helpers';
import { connect } from 'customer-js-sdk';
import { SlingMerchantAddressesList, mapStateToProps, mapDispatchToProps }
  from './component/MerchantAddressesList.js';

registerComponent('sling-merchant-addresses-list',
  connect(mapStateToProps, mapDispatchToProps)(SlingMerchantAddressesList));
