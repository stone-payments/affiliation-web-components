import { registerComponent } from 'sling-helpers';
import { connect } from 'customer-js-sdk';
import { SlingMerchantPartnersList, mapStateToProps, mapDispatchToProps }
  from './component/MerchantPartnersList.js';

registerComponent('sling-merchant-partners-list',
  connect(mapStateToProps, mapDispatchToProps)(SlingMerchantPartnersList));
