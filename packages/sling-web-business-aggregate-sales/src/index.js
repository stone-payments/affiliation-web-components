import { registerComponent } from 'sling-helpers';
import { connect } from 'customer-js-sdk';
import { AggregateSales, mapDispatchToProps, mapStateToProps } from './component/AggregateSales.js';

registerComponent('sling-aggregate-sales',
  connect(mapStateToProps, mapDispatchToProps)(AggregateSales));

