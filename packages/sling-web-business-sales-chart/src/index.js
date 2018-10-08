import { registerComponent } from 'sling-helpers';
import { connect } from 'customer-js-sdk';
import { SalesChart, mapDispatchToProps, mapStateToProps } from './component/SalesChart';

registerComponent('sling-sales-chart',
  connect(mapStateToProps, mapDispatchToProps)(SalesChart));
