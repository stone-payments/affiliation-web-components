import { registerComponent } from 'sling-helpers';
import { PaymentDetails } from './PaymentDetails.js';

registerComponent('sling-payment-details', PaymentDetails);

describe('Class PaymentDetails', () => {
  let paymentDetails;

  beforeEach(() => {
    paymentDetails = document.createElement('sling-payment-details');
    document.body.appendChild(paymentDetails);
  });

  afterEach(() => {
    document.body.removeChild(paymentDetails);
    paymentDetails = null;
  });

  it('Should reflect "stonecode" attribute to property.', () => {
    paymentDetails.setAttribute('stonecode', '616565655');

    expect(paymentDetails.hasAttribute('stonecode')).to.be.true;
  });

  it('Should reflect "apitoken" property to attribute.', (done) => {
    paymentDetails.apitoken = '12312321';

    setTimeout(() => {
      expect(paymentDetails.hasAttribute('apitoken')).to.be.true;
      done();
    });
  });

  it('Should have two business elements as dependencies.', () => {
    expect(paymentDetails.shadowRoot
      .querySelectorAll('sling-payment-details-item'))
      .not.to.be.empty;

    expect(paymentDetails.shadowRoot
      .querySelectorAll('sling-payment-details-summary'))
      .not.to.be.empty;
  });
});
