import sinon from 'sinon';
import { registerComponent } from 'sling-helpers';
import { SlingElement } from 'sling-framework';
import { AffiliationMerchantBankAccounts } from './MerchantBankAccounts.js';

registerComponent('affiliation-merchant-bank-accounts',
  AffiliationMerchantBankAccounts(SlingElement));

describe('Merchant Bank Accounts', () => {
  let merchantBankAccounts;

  beforeEach(() => {
    merchantBankAccounts =
      document.createElement('affiliation-merchant-bank-accounts');
    document.body.appendChild(merchantBankAccounts);
  });

  afterEach(() => {
    document.body.removeChild(merchantBankAccounts);
    merchantBankAccounts = null;
  });

  it('Should start submit form', () => {
    const myEvent = new CustomEvent('myEvent', {
      detail: {
        bankId: '341',
        typeId: '1',
        agencyNumber: '0332',
        agencyNumberVerificationCode: '8',
        accountNumber: '25003',
        accountNumberVerificationCode: '4',
        statusId: 1,
        centralizedPayment: false,
        id: 454489,
      },
    });

    merchantBankAccounts.handleStopEditing = sinon.spy();

    merchantBankAccounts.handleFormSubmit(myEvent);

    expect(merchantBankAccounts.handleStopEditing).to.be.callCount(1);
  });

  it('Should start editing', () => {
    const myEvent = new CustomEvent('myEvent', {
      detail: {
        bankId: '341',
        typeId: '1',
        agencyNumber: '0332',
        agencyNumberVerificationCode: '8',
        accountNumber: '25003',
        accountNumberVerificationCode: '4',
        statusId: 1,
        centralizedPayment: false,
        id: 454489,
      },
    });

    merchantBankAccounts.handleFormUpdate = sinon.spy();

    merchantBankAccounts.handleStartEditing(myEvent);

    expect(merchantBankAccounts.editing).to.be.true;
    expect(merchantBankAccounts.handleFormUpdate).to.be.callCount(1);
  });

  it('Should top editing', (done) => {
    merchantBankAccounts.editing = true;
    merchantBankAccounts.handleStopEditing();

    setTimeout(() => {
      expect(merchantBankAccounts.editing).to.be.false;
      done();
    });
  });

  it('Should reflect "affiliationCode", "state", "isLoading", "requestErrors"' +
   ', "addable", "editable", "editing" attributes to properties.', () => {
    merchantBankAccounts.setAttribute('affiliationCode', '111111111');
    merchantBankAccounts.setAttribute('state', []);
    merchantBankAccounts.setAttribute('isLoading', '');
    merchantBankAccounts.setAttribute('requestErrors', {});
    merchantBankAccounts.setAttribute('addable', '');
    merchantBankAccounts.setAttribute('editable', '');
    merchantBankAccounts.setAttribute('editing', '');

    expect(merchantBankAccounts.hasAttribute('affiliationCode')).to.be.true;
    expect(merchantBankAccounts.hasAttribute('state')).to.be.true;
    expect(merchantBankAccounts.hasAttribute('isLoading')).to.be.true;
    expect(merchantBankAccounts.hasAttribute('requestErrors')).to.be.true;
    expect(merchantBankAccounts.hasAttribute('addable')).to.be.true;
    expect(merchantBankAccounts.hasAttribute('editable')).to.be.true;
    expect(merchantBankAccounts.hasAttribute('editing')).to.be.true;
  });


  it('Should reflect "affiliationCode", "state", "isLoading", "requestErrors"' +
  ', "addable", "editable", "editing" properties to atributes.', (done) => {
    merchantBankAccounts.affiliationCode = false;
    merchantBankAccounts.state = false;
    merchantBankAccounts.isLoading = false;
    merchantBankAccounts.requestErrors = false;
    merchantBankAccounts.addable = false;
    merchantBankAccounts.editable = false;
    merchantBankAccounts.editing = false;

    setTimeout(() => {
      expect(merchantBankAccounts.hasAttribute('affiliationCode')).to.be.false;
      expect(merchantBankAccounts.hasAttribute('state')).to.be.false;
      expect(merchantBankAccounts.hasAttribute('isLoading')).to.be.false;
      expect(merchantBankAccounts.hasAttribute('requestErrors')).to.be.false;
      expect(merchantBankAccounts.hasAttribute('addable')).to.be.false;
      expect(merchantBankAccounts.hasAttribute('editable')).to.be.false;
      expect(merchantBankAccounts.hasAttribute('editing')).to.be.false;
      done();
    });
  });
});
