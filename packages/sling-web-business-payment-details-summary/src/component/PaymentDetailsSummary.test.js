import { registerComponent } from 'sling-helpers';
import { PaymentDetailsSummary } from './PaymentDetailsSummary.js';

registerComponent('sling-payment-details-item', PaymentDetailsSummary);

describe('Class PaymentDetailsSummary', () => {
  let paymentSummary;

  beforeEach(() => {
    paymentSummary = document.createElement('sling-payment-details-item');
    document.body.appendChild(paymentSummary);
  });

  afterEach(() => {
    document.body.removeChild(paymentSummary);
    paymentSummary = null;
  });

  it('Should reflect "stonecode" attribute to property.', () => {
    paymentSummary.setAttribute('stonecode', '616565655');

    expect(paymentSummary.hasAttribute('stonecode')).to.be.true;
  });

  it('Should reflect "apitoken" property to attribute.', (done) => {
    paymentSummary.apitoken = '12312321';

    setTimeout(() => {
      expect(paymentSummary.hasAttribute('apitoken')).to.be.true;
      done();
    });
  });
});
