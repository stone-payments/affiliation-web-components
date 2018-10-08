import { html, SlingBusinessElement } from 'sling-framework';
import { v0 as customerSdk, salesActions, bindActionCreators } from 'customer-js-sdk';
import 'sling-web-component-loader';
import 'sling-web-component-button';

import * as chartRenderer from './chartRenderer.js';

let instanceName;
let productTypeIds;

export class SalesChart extends SlingBusinessElement {
  constructor() {
    super();
    instanceName = this.localName;
    this.charttitle = this.charttitle || 'Vendas por modalidade';
    this.charttype = this.charttype || 'line';
    this.changebuttontext = this.changebuttontext || 'Alterar gráfico';
    this.changeChartType = this.changeChartType.bind(this);
    customerSdk.authorization.set(customerSdk.BEARER, this.apitoken);
  }
  static get properties() {
    return {
      ...super.properties,
      startdate: {
        type: String,
        reflectToAttribute: true,
        callSdk: 'required',
      },
      finaldate: {
        type: String,
        reflectToAttribute: true,
        callSdk: 'required',
      },
      charttype: {
        type: String,
        reflectToAttribute: true,
      },
      apidata: {
        type: Array,
        value: [],
        observer: 'callRenderChart',
      },
      charttitle: {
        type: String,
        reflectToAttribute: true,
      },
      showtitle: {
        type: Boolean,
        reflectToAttribute: true,
      },
      showlegend: {
        type: Boolean,
        reflectToAttribute: true,
      },
      changebuttontext: {
        type: String,
        reflectToAttribute: true,
      },
      showchangebutton: {
        type: Boolean,
        reflectToAttribute: true,
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.chartCanvas = this.shadowRoot.querySelector('canvas');
  }

  callRenderChart() {
    if (this.chartCanvas && this.apidata.length > 0) {
      const cleanSalesReport = this.apidata.map(report => ({
        productTypeId: report.productTypeId,
        presentationDate: report.presentationDate.substring(0, 10),
        amount: report.amount,
      }));
      if (!productTypeIds) {
        customerSdk.transactions.productTypes.get()
          .then((resp) => {
            productTypeIds = resp.data.map(el => el.id);
            chartRenderer.renderChart(this.chartCanvas,
              cleanSalesReport, productTypeIds, this);
          })
          .catch(err => err);
      } else {
        chartRenderer.renderChart(this.chartCanvas,
          cleanSalesReport, productTypeIds, this);
      }
    }
  }

  changeChartType() {
    this.charttype = this.charttype === 'line' ? 'bar' : 'line';
    this.callRenderChart();
  }

  // Wrap into a div element: https://stackoverflow.com/questions/40529006/chartjs-and-polymer-1-7-0
  render() {
    return html`
    <style>
      @import url('sling-web-business-sales-chart/src/index.css');
    </style>
    <sling-loader loading="${this.loading > 0}"></sling-loader>
    ${this.showchangebutton ? html`
      <sling-button size="small"
       color="primary"
       layout="outline"
       onclick="${this.changeChartType}">${this.changebuttontext || 'Alterar gráfico'}</sling-button>
      ` : ''}
    <div>
      <canvas></canvas>
    </div>
    `;
  }
}
export const mapStateToProps = state => ({
  apidata: state.salesReducer.salesReport,
  loading: state.globalReducer.loaders[instanceName],
});
export const mapDispatchToProps = dispatch => ({
  getdata: bindActionCreators(salesActions.getSalesReportInfo, dispatch),
});
