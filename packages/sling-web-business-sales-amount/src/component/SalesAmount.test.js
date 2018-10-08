import { registerComponent } from 'sling-helpers';
import { SalesAmount } from './SalesAmount';

registerComponent('sling-sales-amount', SalesAmount);

// Total quantity: 11
// Total productTypeId(2): 7
// Total productTypeId(10): 4
const salesReportMock = [
  {
    brandId: 1,
    productTypeId: 2,
    presentationDate: '2018-08-01T00:00:00.000Z',
    amount: 1607,
    quantity: 1,
    average: 1607,
    standardDeviation: null,
    minimumAmount: 1607,
    maximumAmount: 1607,
  },
  {
    brandId: 2,
    productTypeId: 2,
    presentationDate: '2018-08-01T00:00:00.000Z',
    amount: 22084.75,
    quantity: 3,
    average: 7361.583333,
    standardDeviation: 4818.8179000076,
    minimumAmount: 2694.3,
    maximumAmount: 12318.84,
  },
  {
    brandId: 1033,
    productTypeId: 10,
    presentationDate: '2018-08-01T00:00:00.000Z',
    amount: 2161.94,
    quantity: 2,
    average: 1080.97,
    standardDeviation: 1061.8481111722,
    minimumAmount: 330.13,
    maximumAmount: 1831.81,
  },
  {
    brandId: 1,
    productTypeId: 2,
    presentationDate: '2018-08-02T00:00:00.000Z',
    amount: 543.53,
    quantity: 1,
    average: 543.53,
    standardDeviation: null,
    minimumAmount: 543.53,
    maximumAmount: 543.53,
  },
  {
    brandId: 2,
    productTypeId: 2,
    presentationDate: '2018-08-02T00:00:00.000Z',
    amount: 966.03,
    quantity: 2,
    average: 483.015,
    standardDeviation: 89.823774414127,
    minimumAmount: 419.5,
    maximumAmount: 546.53,
  },
  {
    brandId: 1033,
    productTypeId: 10,
    presentationDate: '2018-08-02T00:00:00.000Z',
    amount: 2199.55,
    quantity: 2,
    average: 1099.775,
    standardDeviation: 232.46135431508,
    minimumAmount: 935.4,
    maximumAmount: 1264.15,
  },
];

describe('Class SalesAmount', () => {
  let instance;

  beforeEach(() => {
    instance = document.createElement('sling-sales-amount');
    document.body.appendChild(instance);
  });

  afterEach(() => {
    document.body.removeChild(instance);
    instance = null;
  });

  describe('#getSalesAmount()', () => {
    it('should return 7 if productTypeId = 2', () => {
      instance.apidata = salesReportMock;
      instance.producttypeid = 2;
      expect(instance.getSalesAmount()).to.deep.equal(7);
    });

    it('should return 4 if productTypeId = 1', () => {
      instance.apidata = salesReportMock;
      instance.producttypeid = 10;
      expect(instance.getSalesAmount()).to.deep.equal(4);
    });

    it('should return 11 (total) if productypeid is null', () => {
      instance.apidata = salesReportMock;
      instance.producttypeid = undefined;
      expect(instance.getSalesAmount()).to.deep.equal(11);
    });

    it('should return 0 if apidata is empty', () => {
      instance.apidata = [];
      instance.producttypeid = undefined;
      expect(instance.getSalesAmount()).to.deep.equal(0);
    });

    it('should return 0 if producttypeid is not in apidata', () => {
      instance.apidata = [];
      instance.producttypeid = 123123;
      expect(instance.getSalesAmount()).to.deep.equal(0);
    });
  });

  describe('#render()', () => {
    it('should render component with this.label and sales amount', (done) => {
      instance.apidata = salesReportMock;
      instance.label = 'Vendas Crédito';
      instance.producttypeid = 2;
      setTimeout(() => {
        const renderedComponent = instance.shadowRoot.querySelector(
          'sling-card');
        expect(renderedComponent.innerHTML).to.include.all.string(
          '<div class="sales-amount__header" slot="header">Vendas Crédito</div>', // eslint-disable-line max-len
          '<div slot="footer" class="sales-amount__footer--value">7</div>',
        );
        done();
      }, 100);
    });
  });
});
