import sinon from 'sinon';
import { SlingBusinessElement } from 'sling-framework';
import { registerComponent } from 'sling-helpers';
import { SlingPaymentsCalendar, mapStateToProps, mapDispatchToProps } from './PaymentsCalendar.js';

registerComponent('sling-payments-calendar', SlingPaymentsCalendar);

let $paymentsCalendar;
let bindActionCreators;

describe('PaymentsCalendar', () => {
  beforeEach((done) => {
    SlingBusinessElement.updateData = sinon.spy();
    $paymentsCalendar = document.createElement('sling-payments-calendar');
    document.body.appendChild($paymentsCalendar);
    setTimeout(done);
  });

  afterEach((done) => {
    document.body.removeChild($paymentsCalendar);
    $paymentsCalendar = undefined;
    setTimeout(done);
  });

  describe('Init', () => {
    it('Should init constructor with initial properties.', () => {
      expect($paymentsCalendar.paymentsCalendarConfiguration.onDaySelection)
        .to.be.a('function');
      expect($paymentsCalendar.paymentsCalendarConfiguration.onMonthChange)
        .to.be.a('function');
      expect($paymentsCalendar.paymentsCalendarConfiguration.field)
        .to.be.a('function');
    });
  });

  describe('paymentsCalendarConfiguration calls', () => {
    it('Should call day selection handler and set calendar start and end ' +
      'to the same day.', () => {
      $paymentsCalendar.paymentsCalendarConfiguration
        .onDaySelection('2013-04-01');

      expect($paymentsCalendar.selecteddate).to.equal('2013-04-01');
    });

    it('Should call month change handler and set calendar start and end.',
      () => {
        $paymentsCalendar.paymentsCalendarConfiguration
          .onMonthChange({ start: '2013-04-01', end: '2013-05-01' });

        expect($paymentsCalendar.startdate).to.equal('2013-04-01');
        expect($paymentsCalendar.finaldate).to.equal('2013-05-01');
      });

    it('Should calendar day field formatter.', () => {
      const html = sinon.spy();
      $paymentsCalendar.paymentsCalendarConfiguration
        .field([{ amount: 1000, status: 'agendado' }]);

      expect(html.called);
    });
  });

  describe('maps props', () => {
    beforeEach(() => {
      bindActionCreators = sinon.spy();
    });

    it('Should map state to property.', () => {
      const state = {
        paymentsReducer: {
          paymentsCalendarInfo: 'mock',
        },
        globalReducer: {
          loaders: {},
        },
      };
      state.globalReducer.loaders['sling-payments-calendar'] = true;
      expect(mapStateToProps(state)).to.deep
        .equal({ apidata: 'mock', loading: true });
    });

    it('Should map dispatch to property.', () => {
      mapDispatchToProps('mock');
      expect(bindActionCreators.calledOnce);
    });
  });
});
