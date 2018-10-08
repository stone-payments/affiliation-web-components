import { registerComponent } from 'sling-helpers';
import { PaymentDetailsItem } from './PaymentDetailsItem.js';

registerComponent('sling-payment-details-item', PaymentDetailsItem);

describe('Class PaymentDetailsItem', () => {
  let paymentItem;

  beforeEach(() => {
    paymentItem = document.createElement('sling-payment-details-item');
    document.body.appendChild(paymentItem);
  });

  afterEach(() => {
    document.body.removeChild(paymentItem);
    paymentItem = null;
  });

  it('Should reflect "stonecode" attribute to property.', () => {
    paymentItem.setAttribute('stonecode', '616565655');

    expect(paymentItem.hasAttribute('stonecode')).to.be.true;
  });

  it('Should reflect "apitoken" property to attribute.', (done) => {
    paymentItem.apitoken = '12312321';

    setTimeout(() => {
      expect(paymentItem.hasAttribute('apitoken')).to.be.true;
      done();
    });
  });
});
