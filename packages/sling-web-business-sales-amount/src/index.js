import { registerComponent } from 'sling-helpers';
import { connect } from 'customer-js-sdk';
import { SalesAmount, mapDispatchToProps, mapStateToProps } from './component/SalesAmount.js';

registerComponent('sling-sales-amount',
  connect(mapStateToProps, mapDispatchToProps)(SalesAmount));

