import { registerComponent } from 'sling-helpers';
import { SlingElement } from 'sling-framework';
import { AffiliationMerchantAddresses } from './MerchantAddresses.js';

registerComponent('affiliation-merchant-addresses',
  AffiliationMerchantAddresses(SlingElement));

describe('Class AffiliationMerchantAddresses', () => {
  let merchantAddresses;

  beforeEach(() => {
    merchantAddresses = document.createElement(
      'affiliation-merchant-addresses');
    document.body.appendChild(merchantAddresses);
  });

  afterEach(() => {
    document.body.removeChild(merchantAddresses);
    merchantAddresses = null;
  });

  it('Should reflect "affiliationCode" attribute to property ', () => {
    merchantAddresses.setAttribute('affiliationCode', '0000000');
    expect(merchantAddresses.hasAttribute('affiliationCode')).to.be.true;
  });
});
