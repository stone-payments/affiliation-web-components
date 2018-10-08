import { registerComponent } from 'sling-helpers';
import { SlingPaymentOperations } from './PaymentOperations.js';

registerComponent('sling-web-business-payment-operations',
  SlingPaymentOperations);

describe('Payment Operations', () => {
  let $el;

  beforeEach(() => {
    $el = document.createElement(
      'sling-web-business-payment-operations');
    document.body.appendChild($el);
  });

  afterEach(() => {
    document.body.removeChild($el);
    $el = null;
  });

  it('Should reflect "stonecode" attribute to property ', () => {
    $el.setAttribute('startdate', '2018-09-01');
    $el.setAttribute('finaldate', '2018-09-10');
    $el.setAttribute('page', '1');

    expect($el.startdate).to.equal('2018-09-01');
    expect($el.finaldate).to.equal('2018-09-10');
    expect($el.page).to.equal('1');
  });

  it('Should reflect "apitoken" property to attribute ', (done) => {
    $el.startdate = '2018-09-10';
    $el.finaldate = '2018-09-30';
    $el.page = '0';

    setTimeout(() => {
      expect($el.getAttribute('startdate')).to.equal('2018-09-10');
      expect($el.getAttribute('finaldate')).to.equal('2018-09-30');
      expect($el.getAttribute('page')).to.equal('0');
      done();
    });
  });
});
