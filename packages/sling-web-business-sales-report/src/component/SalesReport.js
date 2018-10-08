import { html, SlingBusinessElement } from 'sling-framework';
import 'sling-web-component-button';
import 'sling-web-business-aggregate-sales';
import 'sling-web-business-sales-report-expanded';

export class SalesReport extends SlingBusinessElement {
  constructor() {
    super();
    this.handleProductTypeClick = this.handleProductTypeClick.bind(this);
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
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
      producttypeid: {
        type: Number,
        reflectToAttribute: true,
      },
      open: {
        type: Boolean,
        reflectToAttribute: true,
      },
    };
  }

  handleProductTypeClick(event) {
    this.producttypeid = event.detail.productTypeId;
    this.openExpandedItem();
  }

  handleGoBackClick() {
    this.closeExpandedItem();
  }

  openExpandedItem() {
    this.open = true;
  }

  closeExpandedItem() {
    this.open = false;
  }

  render() {
    return html`
      <style>
        @import url('sling-web-business-sales-report/src/index.css');
      </style>
      <sling-aggregate-sales
        ondetailproducttype="${this.handleProductTypeClick}"
        stonecode="${this.stonecode}"
        apitoken="${this.apitoken}"
        startdate="${this.startdate}"
        finaldate="${this.finaldate}"
        apiurl="${this.apiurl}"
        detailitembutton></sling-aggregate-sales>
      <sling-sales-report-expanded
        ongobackclick="${this.handleGoBackClick}"
        stonecode="${this.stonecode}"
        apitoken="${this.apitoken}"
        startdate="${this.startdate}"
        finaldate="${this.finaldate}"
        producttypeid="${this.producttypeid}"
        apiurl="${this.apiurl}"></sling-sales-report-expanded>
    `;
  }
}
