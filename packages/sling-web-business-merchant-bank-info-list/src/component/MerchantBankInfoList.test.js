import { registerComponent } from 'sling-helpers';
import { SlingMerchantBankInfoList } from './MerchantBankInfoList.js';

registerComponent('sling-merchant-bank-info-list', SlingMerchantBankInfoList);

let $el;

describe('Bank info list', () => {
  beforeEach(() => {
    $el = document.createElement('sling-merchant-bank-info-list');
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

