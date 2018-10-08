import { html, SlingBusinessElement } from 'sling-framework';
import { salesActions, bindActionCreators } from 'customer-js-sdk';
import 'sling-web-component-loader';
import 'sling-web-component-card';


let instanceName;

export class SalesAmount extends SlingBusinessElement {
  constructor() {
    super();
    instanceName = this.localName;
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
      label: {
        type: String,
        reflectToAttribute: true,
        callSdk: 'required',
      },
      producttypeid: {
        type: Number,
        reflectToAttribute: true,
      },
    };
  }

  getSalesAmount() {
    const salesReport = this.apidata || [];
    return salesReport
      .filter((report) => {
        if (this.producttypeid) {
          return report.productTypeId === this.producttypeid;
        }
        return true;
      })
      .reduce((prev, curr) => prev + curr.quantity, 0);
  }

  render() {
    return html`
      <style>
        @import url('sling-web-business-sales-amount/src/index.css');
      </style>
      <sling-loader loading="${this.loading > 0}"></sling-loader>
      <sling-card nopaddingbody nopaddingfooter nopaddingheader>
        <div class="sales-amount__header" slot="header">${this.label}</div>
        <div class="sales-amount__footer--value" slot="footer">${this.getSalesAmount().toLocaleString()}</div>
      </sling-card>
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
