import { registerComponent } from 'sling-helpers';
import { connect } from 'customer-js-sdk';
import { SlingPaymentsCalendar, mapStateToProps, mapDispatchToProps }
  from './component/PaymentsCalendar.js';

registerComponent('sling-payments-calendar', connect(mapStateToProps,
  mapDispatchToProps)(SlingPaymentsCalendar));
