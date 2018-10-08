import { registerComponent } from 'sling-helpers';
import { SlingMerchantPartnersList } from './MerchantPartnersList.js';


registerComponent('sling-web-business-merchant-partners-list',
  SlingMerchantPartnersList);

let $el;

describe('Partners list', () => {
  beforeEach(() => {
    $el = document.createElement('sling-web-business-merchant-partners-list');
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
