import { registerComponent } from 'sling-helpers';
import { SlingMerchantBankInfo } from './MerchantBankInfo.js';

registerComponent('sling-merchant-bank-info', SlingMerchantBankInfo);

describe('Class MerchantBankInfo', () => {
  let merchantBankInfo;

  beforeEach(() => {
    merchantBankInfo = document.createElement('sling-merchant-bank-info');
    document.body.appendChild(merchantBankInfo);
  });

  afterEach(() => {
    document.body.removeChild(merchantBankInfo);
    merchantBankInfo = null;
  });

  it('Should reflect "stonecode" attribute to property ', () => {
    merchantBankInfo.setAttribute('stonecode', '616565655');

    expect(merchantBankInfo.hasAttribute('stonecode')).to.be.true;
  });

  it('Should reflect "apitoken" property to attribute ', (done) => {
    merchantBankInfo.apitoken = '12312321';

    setTimeout(() => {
      expect(merchantBankInfo.hasAttribute('apitoken')).to.be.true;
      done();
    });
  });
});
