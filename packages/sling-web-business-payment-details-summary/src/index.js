import { registerComponent } from 'sling-helpers';
import { connect } from 'customer-js-sdk';
import { PaymentDetailsSummary, mapStateToProps, mapDispatchToProps } from './component/PaymentDetailsSummary.js';

registerComponent('sling-payment-details-summary',
  connect(mapStateToProps, mapDispatchToProps)(PaymentDetailsSummary));

