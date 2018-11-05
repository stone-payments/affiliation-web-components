/* eslint-disable */
import { AffiliationMerchantContactsList } from './MerchantContactsList.js';
import { SlingElement } from 'sling-framework';
import { registerComponent } from 'sling-helpers';

registerComponent('affiliation-merchant-contacts-list',
  AffiliationMerchantContactsList(SlingElement));

describe('Merchant Contacts list', () => {
  let $contactsList;

  beforeEach(() => {
    $contactsList = document.createElement('affiliation-merchant-contacts-list');
    document.body.appendChild($contactsList);
  });

  afterEach(() => {
    document.body.removeChild($contactsList);
    $contactsList = undefined;
  });
  it('Should check if the element is in the DOM.', () => {
    expect(document.body.contains($contactsList)).to.be.true;
  });
});
