import { registerComponent } from 'sling-helpers';
import { connect } from 'customer-js-sdk';
import { SlingSalesSimulator, mapStateToProps, mapDispatchToProps } from './component/SalesSimulator.js';

registerComponent(
  'sling-sales-simulator',
  connect(mapStateToProps, mapDispatchToProps)(SlingSalesSimulator));
