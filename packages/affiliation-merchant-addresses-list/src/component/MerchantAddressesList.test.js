import { registerComponent } from 'sling-helpers';
import { SlingElement } from 'sling-framework';
import { AffiliationMerchantAddressesList } from './MerchantAddressesList.js';

registerComponent('sling-merchant-addresses-list',
  AffiliationMerchantAddressesList(SlingElement));
let $el;

describe('Addresses list', () => {
  beforeEach(() => {
    $el = document.createElement('sling-merchant-addresses-list');
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
