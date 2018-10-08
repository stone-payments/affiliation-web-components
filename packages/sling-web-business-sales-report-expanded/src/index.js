import { registerComponent } from 'sling-helpers';
import { connect } from 'customer-js-sdk';
import { SalesReportExpanded, mapDispatchToProps, mapStateToProps } from './component/SalesReportExpanded.js';

registerComponent('sling-sales-report-expanded',
  connect(mapStateToProps, mapDispatchToProps)(SalesReportExpanded));
