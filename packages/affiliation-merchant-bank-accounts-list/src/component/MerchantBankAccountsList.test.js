import { registerComponent } from 'sling-helpers';
import { SlingElement } from 'sling-framework';
import { AffiliarionMerchantBankAccountsList } from './MerchantBankAccountsList.js';

registerComponent('affiliation-merchant-bank-accounts-list',
  AffiliarionMerchantBankAccountsList(SlingElement));

let $el;

describe('Merchant Bank Accounts list', () => {
  beforeEach(() => {
    $el = document.createElement('affiliation-merchant-bank-accounts-list');
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

