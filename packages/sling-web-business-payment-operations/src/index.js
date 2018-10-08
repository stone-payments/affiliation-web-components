import { registerComponent } from 'sling-helpers';
import { connect } from 'customer-js-sdk';
import { SlingPaymentOperations, mapStateToProps, mapDispatchToProps }
  from './component/PaymentOperations.js';

registerComponent('sling-payment-operations', connect(mapStateToProps,
  mapDispatchToProps)(SlingPaymentOperations));

