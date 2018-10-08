import moment from 'moment/moment';
import * as chartRenderer from './chartRenderer.js';

describe('Module chartRenderer', () => {
  describe('#filterTypes(chartType)', () => {
    it('should return defaultChartType if chartType is invalid', () => {
      expect(chartRenderer.filterTypes('IAmInvalid')).to.be.equal('line');
    });
    it('should return given chart type if chartType is valid', () => {
      expect(chartRenderer.filterTypes('bar')).to.be.equal('bar');
    });
  });

  describe('#getZeroedSalesreport', () => {
    it('should return a zeroed sales report data for the given range', () => {
      expect(chartRenderer.getZeroedSalesReport('2018-01-01', '2018-01-03',
        [1, 2, 10]))
        .to.deep.equal([
          {
            amount: 0,
            presentationDate: '2018-01-01',
            productTypeId: 1,
          },
          {
            amount: 0,
            presentationDate: '2018-01-01',
            productTypeId: 2,
          },
          {
            amount: 0,
            presentationDate: '2018-01-01',
            productTypeId: 10,
          },
          {
            amount: 0,
            presentationDate: '2018-01-02',
            productTypeId: 1,
          },
          {
            amount: 0,
            presentationDate: '2018-01-02',
            productTypeId: 2,
          },
          {
            amount: 0,
            presentationDate: '2018-01-02',
            productTypeId: 10,
          },
          {
            amount: 0,
            presentationDate: '2018-01-03',
            productTypeId: 1,
          },
          {
            amount: 0,
            presentationDate: '2018-01-03',
            productTypeId: 2,
          },
          {
            amount: 0,
            presentationDate: '2018-01-03',
            productTypeId: 10,
          },
        ]);
    });
  });

  describe('#getDataForProductType', () => {
    it('should return mapped data', () => {
      const unorderedInput = [
        {
          productTypeId: 1,
          presentationDate: '2018-08-03',
          amount: 0,
        },
        {
          productTypeId: 1,
          presentationDate: '2018-08-01',
          amount: 1,
        },
        {
          productTypeId: 2,
          presentationDate: '2018-08-01',
          amount: 1,
        },
        {
          productTypeId: 1,
          presentationDate: '2018-08-02',
          amount: 0,
        },
        {
          productTypeId: 1,
          presentationDate: '2018-08-01',
          amount: 1,
        },
        {
          productTypeId: 1,
          presentationDate: '2018-08-01',
          amount: 0,
        },
        {
          productTypeId: 1,
          presentationDate: '2018-08-03',
          amount: 1,
        },
      ];
      expect(chartRenderer.getDataForProductType(1, unorderedInput))
        .to.deep.equal([
          {
            x: moment('2018-08-01').utc().toDate(),
            y: 2,
          },
          {
            x: moment('2018-08-02').utc().toDate(),
            y: 0,
          },
          {
            x: moment('2018-08-03').utc().toDate(),
            y: 1,
          },
        ]);
    });
  });
});
