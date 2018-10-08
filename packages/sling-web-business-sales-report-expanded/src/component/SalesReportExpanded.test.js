import { registerComponent } from 'sling-helpers';
import { SalesReportExpanded } from './SalesReportExpanded.js';

registerComponent('sling-sales-report-expanded', SalesReportExpanded);

describe('Class SalesReportExpanded', () => {
  let $dummy;

  beforeEach(() => {
    $dummy = document.createElement('sling-sales-report-expanded');
    document.body.appendChild($dummy);
  });

  afterEach(() => {
    document.body.removeChild($dummy);
    $dummy = null;
  });

  describe('#getFormattedDateRange(startDate, finalDate)', () => {
    it('should return dd/mm/yyyy - dd/mm/yyyy', () => {
      $dummy.startdate = '2019-02-01';
      $dummy.finaldate = '2019-03-02';
      expect($dummy.getFormattedDateRange())
        .to.equal('01/02/2019 – 02/03/2019');
    });
    it('should return only dd/mm/yyyy for dates are equal', () => {
      $dummy.startdate = '2019-01-01';
      $dummy.finaldate = '2019-01-01';
      expect($dummy.getFormattedDateRange())
        .to.equal('01/01/2019');
    });
  });

  describe('#getViewData(apidata = [], productTypeId)', () => {
    it('should return modeled view data', () => {
      const salesReportMock = [
        {
          brandId: 1,
          brandName: 'Visa',
          productTypeId: 1,
          productTypeName: 'Débito',
          presentationDate: '2018-08-15T00:00:00.000Z',
          amount: 1.11,
        },
        {
          brandId: 1,
          brandName: 'Visa',
          productTypeId: 1,
          productTypeName: 'Débito',
          presentationDate: '2018-08-14T00:00:00.000Z',
          amount: 2.11,
        },
        {
          brandId: 1,
          brandName: 'Visa',
          productTypeId: 1,
          productTypeName: 'Débito',
          presentationDate: '2018-08-13T00:00:00.000Z',
          amount: 3.11,
        },
      ];
      expect($dummy.constructor.getViewData(salesReportMock, 1))
        .to.deep.equal([{
          amount: 6.33,
          brandId: 1,
          brandName: 'Visa',
          productTypeId: 1,
          productTypeName: 'Débito',
        }]);
    });
    it('should return empty array when there is no product type id', () => {
      const salesReportMock = [{
        productTypeId: 1,
      }];
      expect($dummy.constructor.getViewData(salesReportMock, 2))
        .to.deep.equal([]);
    });

    it('should return an empty array', () => {
      expect($dummy.constructor.getViewData([]))
        .to.deep.equal([]);
    });
  });
});
