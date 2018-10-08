import { registerComponent } from 'sling-helpers';
import { SlingMerchantPartners } from './MerchantPartners.js';

registerComponent('sling-merchant-partners', SlingMerchantPartners);

describe('Class MerchantPartners', () => {
  let merchantPartners;

  beforeEach(() => {
    merchantPartners = document.createElement('sling-merchant-partners');
    document.body.appendChild(merchantPartners);
  });

  afterEach(() => {
    document.body.removeChild(merchantPartners);
    merchantPartners = null;
  });

  it('Should reflect "stonecode" attribute to property ', () => {
    merchantPartners.setAttribute('stonecode', '616565655');

    expect(merchantPartners.hasAttribute('stonecode')).to.be.true;
  });

  it('Should reflect "apitoken" property to attribute ', (done) => {
    merchantPartners.apitoken = '12312321';

    setTimeout(() => {
      expect(merchantPartners.hasAttribute('apitoken')).to.be.true;
      done();
    });
  });
});
