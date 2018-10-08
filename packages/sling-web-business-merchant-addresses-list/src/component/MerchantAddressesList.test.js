import { registerComponent } from 'sling-helpers';
import { SlingMerchantAddressesList } from './MerchantAddressesList.js';

registerComponent('sling-merchant-addresses-list', SlingMerchantAddressesList);

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
