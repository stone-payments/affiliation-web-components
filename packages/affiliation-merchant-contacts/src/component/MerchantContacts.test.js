import { registerComponent } from 'sling-helpers';
import { SlingMerchantContacts } from './MerchantContacts.js';


registerComponent('sling-web-business-merchant-contacts',
  SlingMerchantContacts);

let $merchantContacts;

describe('Merchant contacts', () => {
  beforeEach(() => {
    $merchantContacts = document.createElement(
      'sling-web-business-merchant-contacts');
    document.body.appendChild($merchantContacts);
  });

  afterEach(() => {
    document.body.removeChild($merchantContacts);
    $merchantContacts = null;
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
});
