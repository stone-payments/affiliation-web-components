import { registerComponent } from 'sling-helpers';
import { SlingElement } from 'sling-framework';
import { AffiliationMerchantAddresses } from './MerchantAddresses.js';

registerComponent('affiliation-merchant-addresses',
  AffiliationMerchantAddresses(SlingElement));

describe('Merchant Addresses', () => {
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

  it('Should reflect "editable" and "addable attributes to property ', () => {
    merchantAddresses.setAttribute('editable', '');
    merchantAddresses.setAttribute('addable', '');

    expect(merchantAddresses.hasAttribute('editable')).to.be.true;
    expect(merchantAddresses.hasAttribute('addable')).to.be.true;
  });
});
