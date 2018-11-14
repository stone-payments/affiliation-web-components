import { registerComponent } from 'sling-helpers';
import { SlingElement } from 'sling-framework';
import { AffiliationMerchantPartners } from './MerchantPartners.js';

registerComponent('affiliation-merchant-partners',
  AffiliationMerchantPartners(SlingElement));

describe('Merchant Partners', () => {
  let $merchantPartners;

  beforeEach(() => {
    $merchantPartners = document.createElement('affiliation-merchant-partners');
    document.body.appendChild($merchantPartners);
  });

  afterEach(() => {
    document.body.removeChild($merchantPartners);
    $merchantPartners = null;
  });

  it('Should reflect "affiliationCode", "state", "isLoading", "requestErrors"' +
  ', "addable", "editable" attributes to properties.', () => {
    $merchantPartners.setAttribute('affiliationCode', '111111111');
    $merchantPartners.setAttribute('state', []);
    $merchantPartners.setAttribute('isLoading', '');
    $merchantPartners.setAttribute('requestErrors', {});
    $merchantPartners.setAttribute('addable', '');
    $merchantPartners.setAttribute('editable', '');

    expect($merchantPartners.hasAttribute('affiliationCode')).to.be.true;
    expect($merchantPartners.hasAttribute('state')).to.be.true;
    expect($merchantPartners.hasAttribute('isLoading')).to.be.true;
    expect($merchantPartners.hasAttribute('requestErrors')).to.be.true;
    expect($merchantPartners.hasAttribute('addable')).to.be.true;
    expect($merchantPartners.hasAttribute('editable')).to.be.true;
  });

  it('Should reflect "affiliationCode", "state", "isLoading", "requestErrors"' +
  ', "addable", "editable" properties to atributes.', () => {
    $merchantPartners.affiliationCode = false;
    $merchantPartners.state = false;
    $merchantPartners.isLoading = false;
    $merchantPartners.requestErrors = false;
    $merchantPartners.addable = false;
    $merchantPartners.editable = false;

    expect($merchantPartners.hasAttribute('affiliationCode')).to.be.false;
    expect($merchantPartners.hasAttribute('state')).to.be.false;
    expect($merchantPartners.hasAttribute('isLoading')).to.be.false;
    expect($merchantPartners.hasAttribute('requestErrors')).to.be.false;
    expect($merchantPartners.hasAttribute('addable')).to.be.false;
    expect($merchantPartners.hasAttribute('editable')).to.be.false;
  });
});
