import { registerComponent } from 'sling-helpers';
import { AggregateSales } from './AggregateSales';

registerComponent('sling-sales-simulator', AggregateSales);

const salesReportMock = [
  {
    brandId: 1,
    brandName: 'Visa',
    productTypeId: 2,
    productTypeName: 'Débito',
    presentationDate: '2018-08-01T00:00:00.000Z',
    amount: 28697.28,
    quantity: 158,
    average: 181.628354,
    standardDeviation: 102.4327604894,
    minimumAmount: 2.68,
    maximumAmount: 500,
  },
  {
    brandId: 2,
    brandName: 'MasterCard',
    productTypeId: 1,
    productTypeName: 'Crédito',
    presentationDate: '2018-08-01T00:00:00.000Z',
    amount: 36513.7,
    quantity: 211,
    average: 173.05071,
    standardDeviation: 103.32357515507,
    minimumAmount: 7.68,
    maximumAmount: 604,
  },
  {
    brandId: 2,
    brandName: 'MasterCard',
    productTypeId: 2,
    productTypeName: 'Débito',
    presentationDate: '2018-08-01T00:00:00.000Z',
    amount: 1827.49,
    quantity: 9,
    average: 203.054444,
    standardDeviation: 119.22941888552,
    minimumAmount: 45,
    maximumAmount: 400,
  },
];

const groupedProductTypeAmountMock = [
  {
    productTypeId: 1,
    productTypeName: 'Crédito',
    productTypeAmount: 36513.70,
  },
  {
    productTypeId: 2,
    productTypeName: 'Débito',
    productTypeAmount: 30524.77,
  },
];

describe('Class SalesSimulator', () => {
  describe('#getFormattedDateRange(startDate, finalDate)', () => {
    it('should return dd/mm/yyyy - dd/mm/yyyy', () => {
      expect(AggregateSales.getFormattedDateRange('2018-01-01', '2018-01-02'))
        .to.equal('01/01/2018 – 02/01/2018');
    });
    it('should return only dd/mm/yyyy for dates are equal', () => {
      expect(AggregateSales.getFormattedDateRange('2018-01-01', '2018-01-01'))
        .to.equal('01/01/2018');
    });
  });

  describe('#sumByProperty(array, propertyName)', () => {
    it('should correctly return the sum of property x', () => {
      expect(AggregateSales.sumByProperty([{ x: 10 }, { x: 10.5 }], 'x'))
        .to.deep.equal(20.5);
    });
    it('should return NaN if property does not exist', () => {
      expect(AggregateSales.sumByProperty([{ y: 10 }, { y: 10.5 }], 'x'))
        .to.deep.equal(NaN);
    });
    it('should return 0 if array is empty', () => {
      expect(AggregateSales.sumByProperty([], 'x'))
        .to.deep.equal(0);
    });
  });

  describe('#getGroupedProductTypeAmount(salesReport = [])', () => {
    it('should return grouped product types and their amounts', () => {
      expect(AggregateSales.getGroupedProductTypeAmount(salesReportMock))
        .to.deep.equal(groupedProductTypeAmountMock);
    });

    it('should return an empty array', () => {
      expect(AggregateSales.getGroupedProductTypeAmount([]))
        .to.deep.equal([]);
    });
  });

  describe('#renderDetailItemButton(fieldValue)', () => {
    const fieldValue = { productTypeId: 1 };
    it('should return sling-button correct template', () => {
      const aggregateSales = new AggregateSales();
      aggregateSales.detailitembutton = true;
      expect(aggregateSales.renderDetailItemButton(fieldValue))
        .to.contain('sling-button');
    });
  });
});
