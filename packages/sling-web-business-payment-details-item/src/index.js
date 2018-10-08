import { registerComponent } from 'sling-helpers';
import { connect } from 'customer-js-sdk';
import { PaymentDetailsItem, mapDispatchToProps, mapStateToProps } from './component/PaymentDetailsItem.js';

registerComponent('sling-payment-details-item',
  connect(mapStateToProps, mapDispatchToProps)(PaymentDetailsItem));

