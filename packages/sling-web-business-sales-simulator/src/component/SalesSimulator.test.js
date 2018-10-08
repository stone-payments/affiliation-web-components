import { registerComponent } from 'sling-helpers';
import { SlingSalesSimulator } from './SalesSimulator.js';

registerComponent('sling-sales-simulator', SlingSalesSimulator);

const merchantFeesMock = [
  {
    cardBrandId: 1,
    cardBrandName: 'Visa',
    transactionProfileId: 1,
    transactionProfileName: 'Crédito à Vista',
    rate: 1.99,
  },
  {
    cardBrandId: 1,
    cardBrandName: 'Visa',
    transactionProfileId: 2,
    transactionProfileName: 'Crédito de 2 a 6 parcelas s/ juros',
    rate: 2.28,
  },
  {
    cardBrandId: 2,
    cardBrandName: 'MasterCard',
    transactionProfileId: 1,
    transactionProfileName: 'Crédito à Vista',
    rate: 1.99,
  },
];

const expectedCardBrands = [
  {
    id: 1,
    name: 'Visa',
  },
  {
    id: 2,
    name: 'MasterCard',
  },
];

const expectedTrxProfiles = [
  {
    id: 1,
    name: 'Crédito à Vista',
  },
  {
    id: 2,
    name: 'Crédito de 2 a 6 parcelas s/ juros',
  },
];

describe('Class SalesSimulator', () => {
  describe('#getCardBrands(merchantFees)', () => {
    it('should return an array of card brands', () => {
      expect(SlingSalesSimulator.getCardBrands(merchantFeesMock))
        .to.deep.equal(expectedCardBrands);
    });
    it('should return an empty array if merchantFees is empty array', () => {
      expect(SlingSalesSimulator.getCardBrands([]))
        .to.deep.equal([]);
    });
    it('should return an empty array if merchantFees is undefined', () => {
      expect(SlingSalesSimulator.getCardBrands(undefined))
        .to.deep.equal([]);
    });
  });

  describe('#getTrxProfiles(merchantFees, cardBrandId)', () => {
    it('should return an array of Visa trxProfiles', () => {
      const visaId = 1;
      expect(SlingSalesSimulator.getTrxProfiles(merchantFeesMock, visaId))
        .to.deep.equal(expectedTrxProfiles);
    });
    it('should return an empty array if merchantFees is empty array', () => {
      expect(SlingSalesSimulator.getTrxProfiles([]))
        .to.deep.equal([]);
    });
    it('should return an empty array if merchantFees is undefined', () => {
      expect(SlingSalesSimulator.getTrxProfiles(undefined))
        .to.deep.equal([]);
    });
  });

  describe('#calculateResult(fields, merchantFees)', () => {
    const templateSrcData = [
      {
        label: 'Valor Bruto',
        value: 100,
      },
      {
        label: 'Taxa',
        value: -(100 - 98.01), // Thanks to JS floating points handling
      },
      {
        label: 'Valor Líquido',
        value: 98.01,
      },
    ];

    const zeroedSrcData = [
      {
        label: 'Valor Bruto',
        value: 0,
      },
      {
        label: 'Taxa',
        value: -0,
      },
      {
        label: 'Valor Líquido',
        value: 0,
      },
    ];

    it('should return expected array of srcdata values', () => {
      const fields = {
        salesAmount: 100,
        cardBrandId: 1,
        trxProfileId: 1,
      };
      const expectedSrcData = templateSrcData;
      expect(SlingSalesSimulator.calculateResult(fields, merchantFeesMock))
        .to.deep.equal(expectedSrcData);
    });
    it('should return zeroed srcdata values if fields is undefined', () => {
      const fields = undefined;
      expect(SlingSalesSimulator.calculateResult(fields, merchantFeesMock))
        .to.deep.equal(zeroedSrcData);
    });
  });
});
