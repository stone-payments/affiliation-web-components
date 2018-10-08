import { registerComponent } from 'sling-helpers';
import { SalesChart } from './SalesChart.js';

registerComponent('sling-sales-chart', SalesChart);

describe('Class SalesChart', () => {
  let instance;

  beforeEach(() => {
    instance = document.createElement('sling-sales-chart');
    document.body.appendChild(instance);
  });

  afterEach(() => {
    document.body.removeChild(instance);
    instance = null;
  });

  describe('#constructor', () => {
    it('should set charttitle and instanceName', () => {
      expect(instance.charttitle).to.be.equal('Vendas por modalidade');
    });
  });

  describe('#connectedCallback', () => {
    it('should set this.chartCanvas to canvas element', () => {
      expect(instance.chartCanvas).to.not.be.undefined;
    });
  });
});
