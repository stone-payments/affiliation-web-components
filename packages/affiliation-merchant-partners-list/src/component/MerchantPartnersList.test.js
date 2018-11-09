import { registerComponent } from 'sling-helpers';
import { SlingElement } from 'sling-framework';
import { AffiliationMerchantPartnersList } from './component/MerchantPartnersList.js';

registerComponent('affiliation-merchant-partners-list',
  AffiliationMerchantPartnersList(SlingElement));

describe('Partners list', () => {
  let $el;

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
