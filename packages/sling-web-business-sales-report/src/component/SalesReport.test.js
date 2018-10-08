import { registerComponent } from 'sling-helpers';
import { SalesReport } from './SalesReport.js';


registerComponent('sling-sales-report', SalesReport);

let $el;

describe('Sales Report.', () => {
  beforeEach(() => {
    $el = document.createElement('sling-sales-report');
    document.body.appendChild($el);
  });

  afterEach(() => {
    document.body.removeChild($el);
    $el = undefined;
  });

  it('Should reflect "startdate", "finaldate", ' +
  '"producttype" and open attributes to properties ', () => {
    $el.setAttribute('startdate', '2018-09-10');
    $el.setAttribute('finaldate', '2018-09-30');
    $el.setAttribute('producttypeid', '6');
    $el.setAttribute('open', '');

    expect($el.startdate).to.equal('2018-09-10');
    expect($el.finaldate).to.equal('2018-09-30');
    expect($el.producttypeid).to.equal(6);
    expect($el.open).to.be.true;
  });

  it('Should reflect "startdate", "finaldate", ' +
  '"producttype" and open properties to attributes', (done) => {
    $el.startdate = '2018-09-01';
    $el.finaldate = '2018-09-10';
    $el.producttypeid = 2;

    setTimeout(() => {
      expect($el.getAttribute('startdate')).to.equal('2018-09-01');
      expect($el.getAttribute('finaldate')).to.equal('2018-09-10');
      expect($el.getAttribute('producttypeid')).to.equal('2');
      expect($el.hasAttribute('open')).to.be.false;
      done();
    });
  });
});
