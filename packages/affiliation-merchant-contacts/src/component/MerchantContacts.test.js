import sinon from 'sinon';
import { registerComponent } from 'sling-helpers';
import { SlingElement } from 'sling-framework';
import { AffiliationMerchantContacts } from './MerchantContacts.js';

registerComponent('affiliation-merchant-contacts',
  AffiliationMerchantContacts(SlingElement));

describe('Merchant Contacts', () => {
  let $merchantContacts;

  beforeEach(() => {
    $merchantContacts = document.createElement(
      'affiliation-merchant-contacts');
    document.body.appendChild($merchantContacts);
  });

  afterEach(() => {
    document.body.removeChild($merchantContacts);
    $merchantContacts = null;
  });

  it('Should reflect "affiliationCode", "state", "isLoading", "requestErrors"' +
  ', "addable", "editable" attributes to properties.', () => {
    $merchantContacts.setAttribute('affiliationCode', '111111111');
    $merchantContacts.setAttribute('state', []);
    $merchantContacts.setAttribute('isLoading', '');
    $merchantContacts.setAttribute('requestErrors', {});
    $merchantContacts.setAttribute('addable', '');
    $merchantContacts.setAttribute('editable', '');

    expect($merchantContacts.hasAttribute('affiliationCode')).to.be.true;
    expect($merchantContacts.hasAttribute('state')).to.be.true;
    expect($merchantContacts.hasAttribute('isLoading')).to.be.true;
    expect($merchantContacts.hasAttribute('requestErrors')).to.be.true;
    expect($merchantContacts.hasAttribute('addable')).to.be.true;
    expect($merchantContacts.hasAttribute('editable')).to.be.true;
  });

  it('Should reflect "editable", "editing" and "addable" ' +
   'attribute to property ', () => {
    $merchantContacts.setAttribute('editable', '');
    $merchantContacts.setAttribute('editing', '');
    $merchantContacts.setAttribute('addable', '');

    expect($merchantContacts.hasAttribute('editable')).to.be.true;
    expect($merchantContacts.hasAttribute('editing')).to.be.true;
    expect($merchantContacts.hasAttribute('addable')).to.be.true;
  });

  it('Should reflect "editable", "editing" and "addable" ' +
  'property to attribute ', (done) => {
    $merchantContacts.editable = false;
    $merchantContacts.editing = false;
    $merchantContacts.addable = false;

    setTimeout(() => {
      expect($merchantContacts.hasAttribute('editable')).to.be.false;
      expect($merchantContacts.hasAttribute('editing')).to.be.false;
      expect($merchantContacts.hasAttribute('addable')).to.be.false;
      done();
    });
  });
  it('Should start submit form', () => {
    const myEvent = new CustomEvent('myEvent', {
      detail: {
        email: 'test',
        id: 11111,
        mobilePhone: '(11) 1111-1111',
        name: 'test',
        phone: '(22) 2222-2222',
        typeId: 1,
      },
    });

    $merchantContacts.handleStopEditing = sinon.spy();

    $merchantContacts.handleFormSubmit(myEvent);

    expect($merchantContacts.handleStopEditing).to.be.callCount(1);
  });

  it('Should start editing', () => {
    const myEvent = new CustomEvent('myEvent', {
      detail: {
        affiliationCode: '111111',
        email: 'test',
        id: 11111,
        mobilePhone: '1111111111',
        name: 'test',
        phone: '2222222222',
        typeId: 1,
        typeName: 'test',
      },
    });

    $merchantContacts.handleFormUpdate = sinon.spy();

    $merchantContacts.handleStartEditing(myEvent);

    expect($merchantContacts.editing).to.be.true;
    expect($merchantContacts.handleFormUpdate).to.be.callCount(1);
  });

  it('Should stop editing', (done) => {
    $merchantContacts.editing = true;
    $merchantContacts.handleStopEditing();

    setTimeout(() => {
      expect($merchantContacts.editing).to.be.false;
      done();
    });
  });
});
