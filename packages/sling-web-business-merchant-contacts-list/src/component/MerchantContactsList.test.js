/* eslint-disable */
import { SlingMerchantContactsList } from './MerchantContactsList.js';
import { registerComponent } from 'sling-helpers';

registerComponent('sling-merchant-constacts-list', SlingMerchantContactsList);

let $el;

describe('Contacts list', () => {
  beforeEach(() => {
    $el = document.createElement('sling-merchant-constacts-list');
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
