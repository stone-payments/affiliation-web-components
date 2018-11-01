import { registerComponent } from 'sling-helpers';
import { SlingElement } from 'sling-framework';
import { AffiliationMerchantAddressesList } from './MerchantAddressesList.js';

registerComponent('affiliation-addresses-list',
  AffiliationMerchantAddressesList(SlingElement));

describe('Merchant Addresses list', () => {
  let $el;

  beforeEach(() => {
    $el = document.createElement('affiliation-addresses-list');
    document.body.appendChild($el);
  });

  afterEach(() => {
    document.body.removeChild($el);
    $el = undefined;
  });
  it('Should check if the element is in the DOM.', () => {
    expect(document.body.contains($el)).to.be.true;
  });
});
