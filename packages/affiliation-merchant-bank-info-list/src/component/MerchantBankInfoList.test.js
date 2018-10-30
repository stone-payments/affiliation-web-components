import { registerComponent } from 'sling-helpers';
import { SlingElement } from 'sling-framework';
import { AffiliarionMerchantBankInfoList } from './MerchantBankInfoList.js';

registerComponent('affiliation-merchant-bank-info-list',
  AffiliarionMerchantBankInfoList(SlingElement));

let $el;

describe('Merchant Bank info list', () => {
  beforeEach(() => {
    $el = document.createElement('affiliation-merchant-bank-info-list');
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

