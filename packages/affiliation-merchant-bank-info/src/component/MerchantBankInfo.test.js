import sinon from 'sinon';
import { registerComponent } from 'sling-helpers';
import { SlingElement } from 'sling-framework';
import { AffiliationMerchantBankInfo } from './MerchantBankInfo.js';

registerComponent('affiliation-merchant-bank-info',
  AffiliationMerchantBankInfo(SlingElement));

describe('Merchant Bank Info', () => {
  let merchantBankInfo;

  beforeEach(() => {
    merchantBankInfo = document.createElement('affiliation-merchant-bank-info');
    document.body.appendChild(merchantBankInfo);
  });

  afterEach(() => {
    document.body.removeChild(merchantBankInfo);
    merchantBankInfo = null;
  });

  it('Should reflect "affiliationCode", "state", "isLoading", "requestErrors"' +
   ', "addable", "editable", "editing" attributes to properties.', () => {
    merchantBankInfo.setAttribute('affiliationCode', '111111111');
    merchantBankInfo.setAttribute('state', []);
    merchantBankInfo.setAttribute('isLoading', '');
    merchantBankInfo.setAttribute('requestErrors', {});
    merchantBankInfo.setAttribute('addable', '');
    merchantBankInfo.setAttribute('editable', '');
    merchantBankInfo.setAttribute('editing', '');

    expect(merchantBankInfo.hasAttribute('affiliationCode')).to.be.true;
    expect(merchantBankInfo.hasAttribute('state')).to.be.true;
    expect(merchantBankInfo.hasAttribute('isLoading')).to.be.true;
    expect(merchantBankInfo.hasAttribute('requestErrors')).to.be.true;
    expect(merchantBankInfo.hasAttribute('addable')).to.be.true;
    expect(merchantBankInfo.hasAttribute('editable')).to.be.true;
    expect(merchantBankInfo.hasAttribute('editing')).to.be.true;
  });


  it('Should reflect "affiliationCode", "state", "isLoading", "requestErrors"' +
  ', "addable", "editable", "editing" properties to atributes.', () => {
    merchantBankInfo.affiliationCode = false;
    merchantBankInfo.state = undefined;
    merchantBankInfo.isLoading = false;
    merchantBankInfo.requestErrors = false;
    merchantBankInfo.addable = false;
    merchantBankInfo.editable = false;
    merchantBankInfo.editing = false;

    expect(merchantBankInfo.hasAttribute('affiliationCode')).to.be.false;
    expect(merchantBankInfo.hasAttribute('state')).to.be.false;
    expect(merchantBankInfo.hasAttribute('isLoading')).to.be.false;
    expect(merchantBankInfo.hasAttribute('requestErrors')).to.be.false;
    expect(merchantBankInfo.hasAttribute('addable')).to.be.false;
    expect(merchantBankInfo.hasAttribute('editable')).to.be.false;
    expect(merchantBankInfo.hasAttribute('editing')).to.be.false;
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

    merchantBankInfo.handleStopEditing = sinon.spy();

    merchantBankInfo.handleFormSubmit(myEvent);

    expect(merchantBankInfo.handleStopEditing).to.be.callCount(1);
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

    merchantBankInfo.handleFormUpdate = sinon.spy();

    merchantBankInfo.handleStartEditing(myEvent);

    expect(merchantBankInfo.editing).to.be.true;
    expect(merchantBankInfo.handleFormUpdate).to.be.callCount(1);
  });

  it('Should stop editing', (done) => {
    merchantBankInfo.editing = true;
    merchantBankInfo.handleStopEditing();

    setTimeout(() => {
      expect(merchantBankInfo.editing).to.be.false;
      done();
    });
  });
});
