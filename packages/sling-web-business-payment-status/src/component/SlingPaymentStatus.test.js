import sinon from 'sinon';

import { registerComponent } from 'sling-helpers';
import { SlingPaymentStatus } from './SlingPaymentStatus';

registerComponent('sling-payment-status', SlingPaymentStatus);

const mockApiData = {
  data: [
    {
      id: 1,
      name: 'Aberto',
    },
    {
      id: 2,
      name: 'Agendado',
    },
    {
      id: 3,
      name: 'Rejeitado',
    },
    {
      id: 4,
      name: 'Pago',
    },
    {
      id: 5,
      name: 'Unknown',
    },
  ],
};

describe('Class SlingPaymentStatus', () => {
  let instance;

  beforeEach(() => {
    instance = document.createElement('sling-payment-status');
    document.body.appendChild(instance);
  });

  afterEach(() => {
    document.body.removeChild(instance);
    instance = null;
  });

  describe('#getTooltipClass(statusId)', () => {
    it('should return payment__open string', () => {
      expect(instance.getTooltipClass(1))
        .to.equal(instance.mapStatusIdToTooltipClass[1]);
    });
    it('should return payment__scheduled string', () => {
      expect(instance.getTooltipClass(2))
        .to.equal(instance.mapStatusIdToTooltipClass[2]);
    });
    it('should return payment__rejected string', () => {
      expect(instance.getTooltipClass(3))
        .to.equal(instance.mapStatusIdToTooltipClass[3]);
    });
    it('should return payment__paid string', () => {
      expect(instance.getTooltipClass(4))
        .to.equal(instance.mapStatusIdToTooltipClass[4]);
    });
    it('should return payment__unmapped string', () => {
      expect(instance.getTooltipClass(9999))
        .to.equal(instance.unmappedClass);
    });
  });

  describe('#getTooltipText(statusId)', () => {
    it('should return expected string for statusId = 1', () => {
      expect(instance.getTooltipText(1))
        .to.equal(instance.mapStatusIdToTooltipText[1]);
    });
    it('should return expected string for statusId = 2', () => {
      expect(instance.getTooltipText(2))
        .to.equal(instance.mapStatusIdToTooltipText[2]);
    });
    it('should return expected string for statusId = 3', () => {
      expect(instance.getTooltipText(3))
        .to.equal(instance.mapStatusIdToTooltipText[3]);
    });
    it('should return expected string for statusId = 4', () => {
      expect(instance.getTooltipText(4))
        .to.equal(instance.mapStatusIdToTooltipText[4]);
    });
    it('should return undefined for unknown statusId', () => {
      expect(instance.getTooltipText(5))
        .to.be.undefined;
    });
  });

  describe('#renderTooltip(statusId, statusName)', () => {
    beforeEach(() => {
      sinon.spy(instance, 'getTooltipClass');
      sinon.spy(instance, 'getTooltipText');
    });

    afterEach(() => {
      instance.getTooltipClass.restore();
      instance.getTooltipText.restore();
    });

    it('should call getTooltipText and getTooltipClass', () => {
      instance.renderTooltip(1, 'Aberto');
      expect(instance.getTooltipClass.firstCall.calledWith(1))
        .to.be.true;
      expect(instance.getTooltipText.firstCall.calledWith(1))
        .to.be.true;
      expect(instance.getTooltipClass.calledOnce)
        .to.be.true;
      expect(instance.getTooltipText.calledOnce)
        .to.be.true;
    });
  });

  describe('#renderTooltips(paymentStatus)', () => {
    beforeEach(() => {
      sinon.spy(instance, 'renderTooltip');
    });

    afterEach(() => {
      instance.renderTooltip.restore();
    });

    it('should call renderTooltip with status.id and status.name', () => {
      instance.renderTooltips(mockApiData.data);
      expect(instance.renderTooltip.callCount)
        .to.equal(5);
      expect(instance.renderTooltip.firstCall.calledWith(1, 'Aberto'))
        .to.be.true;
    });
  });

  describe('#render()', () => {
    beforeEach(() => {
      sinon.spy(instance, 'renderTooltips');
    });

    afterEach(() => {
      instance.renderTooltips.restore();
    });

    it('should pass empty array to #renderTooltips', () => {
      instance.apidata = undefined;
      instance.render();
      expect(instance.renderTooltips.calledWith([]))
        .to.be.true;
    });
    it('should pass apidata.data to #renderTooltips', () => {
      instance.apidata = mockApiData;
      instance.render();
      expect(instance.renderTooltips.calledWith(mockApiData.data))
        .to.be.true;
      instance.apidata = [];
    });
    it('should correctly render the component', (done) => {
      instance.apidata = mockApiData;
      // must use setTimeout to make sure the component is fully rendered
      setTimeout(() => {
        const renderedComponent = instance.shadowRoot.querySelector('div');
        expect(renderedComponent.innerHTML)
          .to.include.all.string(
            'payment-status',
            'class="payment-status--item payment__open"',
            'class="payment-status--item payment__scheduled"',
            'class="payment-status--item payment__rejected"',
            'class="payment-status--item payment__paid"',
            `title="${instance.mapStatusIdToTooltipText[1]}"`,
          );
        instance.apidata = [];
        done();
      }, 100);
    });
  });
});
