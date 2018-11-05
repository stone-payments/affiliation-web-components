import { registerComponent } from 'sling-helpers';
import { SlingMerchantInfoList } from './MerchantInfoList.js';

registerComponent('sling-merchant-info-list', SlingMerchantInfoList);

describe('MerchantInfoList', () => {
  let $merchantInfoList;

  beforeEach((done) => {
    $merchantInfoList = document.createElement('sling-merchant-info-list');
    document.body.appendChild($merchantInfoList);
    setTimeout(done);
  });

  afterEach((done) => {
    document.body.removeChild($merchantInfoList);
    $merchantInfoList = undefined;
    setTimeout(done);
  });

  it('should handleStartEditing when editing is false', () => {
    $merchantInfoList.editing = false;
    $merchantInfoList.handleStartEditing();
    expect($merchantInfoList.editing).to.be.true;
  });
  it('should handleStartEditing when editing is false', () => {
    $merchantInfoList.editing = true;
    $merchantInfoList.handleStartEditing();
    expect($merchantInfoList.editing).to.be.true;
  });
  it('should set form data when handleStartEditing', () => {
    const fantasyNameValue = 'fantasyNameValue';
    $merchantInfoList.apidata = [{ fantasyName: fantasyNameValue }];
    $merchantInfoList.handleStartEditing();
    expect($merchantInfoList.formdata.fantasyName).to.equal(fantasyNameValue);
  });
  it('should handleFormUpdate', () => {
    const fantasyNameValue = 'fantasyNameValue';
    $merchantInfoList.apidata = [{ fantasyName: fantasyNameValue }];
    $merchantInfoList.handleFormUpdate();
    expect($merchantInfoList.formdata.fantasyName).to.equal(fantasyNameValue);
  });
});
