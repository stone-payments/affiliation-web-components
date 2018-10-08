import { html, SlingBusinessElement } from 'sling-framework';
import 'sling-web-component-button';
import 'sling-web-business-payment-details-summary';
import 'sling-web-business-payment-details-item';

export class PaymentDetails extends SlingBusinessElement {
  constructor() {
    super();
    this.handleDetailsClick = this.handleDetailsClick.bind(this);
    this.handlegobackclick = this.handlegobackclick.bind(this);
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
      wallettypeid: {
        type: String,
        reflectToAttribute: true,
      },
      open: {
        type: Boolean,
        reflectToAttribute: true,
      },
    };
  }

  handleDetailsClick(event) {
    this.wallettypeid = event.detail.selectedId;
    this.openDetails();
  }

  handlegobackclick() {
    this.closeDetails();
  }

  openDetails() {
    this.open = true;
  }

  closeDetails() {
    this.open = false;
  }

  render() {
    return html`
      <style>
        @import url('sling-web-business-payment-details/src/index.css');
      </style>
      <sling-payment-details-summary
        ondetailclick="${this.handleDetailsClick}"
        stonecode="${this.stonecode}"
        apitoken="${this.apitoken}"
        startdate="${this.startdate}"
        finaldate="${this.finaldate}"
        apiurl="${this.apiurl}">
      </sling-payment-details-summary>
      <sling-payment-details-item
        ongobackclick="${this.handlegobackclick}"
        stonecode="${this.stonecode}"
        apitoken="${this.apitoken}"
        startdate="${this.startdate}"
        finaldate="${this.finaldate}"
        wallettypeid="${this.wallettypeid}"
        apiurl="${this.apiurl}">
      </sling-payment-details-item>
    `;
  }
}
