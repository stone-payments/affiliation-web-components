import { registerComponent } from 'sling-helpers';
import { SlingMerchantAddresses } from './MerchantAddresses.js';

registerComponent('sling-merchant-addresses', SlingMerchantAddresses);

describe('Class SlingMerchantAddresses', () => {
  let merchantAddresses;

  beforeEach(() => {
    merchantAddresses = document.createElement('sling-merchant-addresses');
    document.body.appendChild(merchantAddresses);
  });

  afterEach(() => {
    document.body.removeChild(merchantAddresses);
    merchantAddresses = null;
  });

  it('Should reflect "stonecode" attribute to property ', () => {
    merchantAddresses.setAttribute('stonecode', '616565655');

    expect(merchantAddresses.hasAttribute('stonecode')).to.be.true;
  });

  it('Should reflect "apitoken" property to attribute ', (done) => {
    merchantAddresses.apitoken = '12312321';

    setTimeout(() => {
      expect(merchantAddresses.hasAttribute('apitoken')).to.be.true;
      done();
    });
  });
});
