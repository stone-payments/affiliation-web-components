import { registerComponent } from 'sling-helpers';
import { SlingElement } from 'sling-framework';
import sinon from 'sinon';
import { AffiliationMerchantInfoList } from './MerchantInfoList.js';

registerComponent('affiliation-merchant-info-list',
  AffiliationMerchantInfoList(SlingElement));

describe('Merchant Info List', () => {
  let $merchantInfoList;

  beforeEach((done) => {
    $merchantInfoList =
      document.createElement('affiliation-merchant-info-list');
    document.body.appendChild($merchantInfoList);
    setTimeout(done);
  });

  afterEach((done) => {
    document.body.removeChild($merchantInfoList);
    $merchantInfoList = undefined;
    setTimeout(done);
  });

  it('Should start submit form', () => {
    const myEvent = new CustomEvent('myEvent', {
      detail: {
        tradeName: 'test',
      },
    });

    $merchantInfoList.handleStopEditing = sinon.spy();

    $merchantInfoList.handleFormSubmit(myEvent);

    expect($merchantInfoList.handleStopEditing).to.be.callCount(1);
  });

  it('Should stop editing', (done) => {
    $merchantInfoList.editing = true;
    $merchantInfoList.handleStopEditing();

    setTimeout(() => {
      expect($merchantInfoList.editing).to.be.false;
      done();
    });
  });

  it('Should reflect "isLoading", "requestErrors"' +
   ', "cascadelist", "editable", "showAdditionalData", "showBasicData" and' +
    '"editing" attributes to properties.', () => {
    $merchantInfoList.setAttribute('isLoading', '');
    $merchantInfoList.setAttribute('requestErrors', {});
    $merchantInfoList.setAttribute('cascadelist', '');
    $merchantInfoList.setAttribute('editable', '');
    $merchantInfoList.setAttribute('editing', '');
    $merchantInfoList.setAttribute('showAdditionalData', '');
    $merchantInfoList.setAttribute('showBasicData', '');

    expect($merchantInfoList.hasAttribute('isLoading')).to.be.true;
    expect($merchantInfoList.hasAttribute('requestErrors')).to.be.true;
    expect($merchantInfoList.hasAttribute('cascadelist')).to.be.true;
    expect($merchantInfoList.hasAttribute('editable')).to.be.true;
    expect($merchantInfoList.hasAttribute('editing')).to.be.true;
    expect($merchantInfoList.hasAttribute('showAdditionalData')).to.be.true;
    expect($merchantInfoList.hasAttribute('showBasicData')).to.be.true;
  });

  it('Should reflect "state", "isLoading", "requestErrors"' +
  ', "cascadelist", "editable", "showAdditionalData", "showBasicData" and' +
  '"editing" properties to atributes.', (done) => {
    $merchantInfoList.state = undefined;
    $merchantInfoList.isLoading = false;
    $merchantInfoList.requestErrors = undefined;
    $merchantInfoList.cascadelist = false;
    $merchantInfoList.editable = false;
    $merchantInfoList.editing = false;
    $merchantInfoList.showAdditionalData = false;
    $merchantInfoList.showBasicData = false;

    setTimeout(() => {
      expect($merchantInfoList.hasAttribute('state')).to.be.false;
      expect($merchantInfoList.hasAttribute('isLoading')).to.be.false;
      expect($merchantInfoList.hasAttribute('requestErrors')).to.be.false;
      expect($merchantInfoList.hasAttribute('cascadelist')).to.be.false;
      expect($merchantInfoList.hasAttribute('editable')).to.be.false;
      expect($merchantInfoList.hasAttribute('editing')).to.be.false;
      expect($merchantInfoList.hasAttribute('showAdditionalData')).to.be.false;
      expect($merchantInfoList.hasAttribute('showBasicData')).to.be.false;
      done();
    });
  });
});
