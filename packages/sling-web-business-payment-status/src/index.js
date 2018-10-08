import { registerComponent } from 'sling-helpers';
import { connect } from 'customer-js-sdk';
import { SlingPaymentStatus, mapStateToProps, mapDispatchToProps } from './component/SlingPaymentStatus.js';

registerComponent(
  'sling-payment-status',
  connect(mapStateToProps, mapDispatchToProps)(SlingPaymentStatus));
