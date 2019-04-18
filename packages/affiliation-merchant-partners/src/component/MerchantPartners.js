import { withRequest, withSetState } from 'sling-framework';
import { v0 as sdk } from 'customer-js-sdk';
import 'sling-web-component-table';
import 'sling-web-component-loader';
import 'sling-web-component-message';
import 'sling-web-component-button';
import { getMerchantPartnersView } from '../views/MerchantPartnersView';
import {
  PartnersModel,
  PayloadLegalModel,
  PayloadNaturalModel,
  PartnersLegalFormResponseModel,
  PartnersNaturalFormResponseModel,
  PayloadCreatePartnerlModel,
} from '../model/MerchantPartnersModel.js';

const notEmpty = arg => arg != null;

export const AffiliationMerchantPartners = (base = class {}) =>
  class extends withRequest(withSetState(base)) {
    constructor() {
      super();

      this.handleUpdateEditeLegalPersonForm =
        this.handleUpdateEditeLegalPersonForm.bind(this);
      this.handleSubmitEditeLegalPersonForm =
        this.handleSubmitEditeLegalPersonForm.bind(this);
      this.handleStartEditeLegalPerson =
        this.handleStartEditeLegalPerson.bind(this);
      this.handleStopEditeLegalPerson =
        this.handleStopEditeLegalPerson.bind(this);

      this.handleUpdateEditeNaturalPersonForm =
        this.handleUpdateEditeNaturalPersonForm.bind(this);
      this.handleSubmitEditeNaturalPersonForm =
        this.handleSubmitEditeNaturalPersonForm.bind(this);
      this.handleStartEditeNaturalPerson =
        this.handleStartEditeNaturalPerson.bind(this);
      this.handleStopEditeNaturalPerson =
        this.handleStopEditeNaturalPerson.bind(this);

      this.handleStartCreatePartner =
        this.handleStartCreatePartner.bind(this);
      this.handleSubmitCreatePartner =
        this.handleSubmitCreatePartner.bind(this);
      this.handleStopCreatePartner =
        this.handleStopCreatePartner.bind(this);

      this.handleDeleteNaturalPerson =
        this.handleDeleteNaturalPerson.bind(this);

      this.state = {
        partners: {
          naturalPersons: [],
          legalPerson: [],
        },
        legalPersonformData: {},
        naturalPersonformData: {},
      };
    }

    static get properties() {
      return {
        state: {
          type: Object,
          reflectToAttribute: false,
        },
        isLoading: {
          type: Boolean,
          reflectToAttribute: false,
        },
        requestErrors: {
          type: Array,
          reflectToAttribute: false,
        },
        editable: {
          type: Boolean,
          reflectToAttribute: true,
        },
        addable: {
          type: Boolean,
          reflectToAttribute: true,
        },
        isCreatingPartner: {
          type: Boolean,
          reflectToAttribute: true,
        },
        naturalPersons: {
          type: Boolean,
          reflectToAttribute: true,
        },
        legalPersons: {
          type: Boolean,
          reflectToAttribute: true,
        },
        isEditingLegalPerson: {
          type: Boolean,
          reflectToAttribute: true,
        },
        isEditingNaturalPerson: {
          type: Boolean,
          reflectToAttribute: true,
        },
      };
    }

    // delet partner
    handleDeleteNaturalPerson(key) {
      if (key) {
        const requestParams = {
          affiliationCode: this.state.affiliationCode,
          key,
        };

        this
          .request([
            sdk.affiliation.partners.delete(requestParams),
          ]);

        this
          .request([
            sdk.affiliation.partners.get(this.state.affiliationCode),
          ])
          .then((responses) => {
            const partners = PartnersModel(responses);
            this.setState({ partners });
          });
      }

      this.handleStopEditeNaturalPerson();
    }

    // create partner
    handleStartCreatePartner() {
      this.isCreatingPartner = true;
    }

    handleStopCreatePartner() {
      this.isCreatingPartner = false;
    }

    handleSubmitCreatePartner(evt) {
      if (evt.detail) {
        const requestParams = {
          affiliationCode: this.state.affiliationCode,
        };

        const payload = PayloadCreatePartnerlModel(evt.detail);

        this
          .request([
            sdk.affiliation.partners.post(requestParams, payload),
          ]);

        // Criar feedBack para o usuario que foi criado com sucesso

        this
          .request([
            sdk.affiliation.partners.get(this.state.affiliationCode),
          ])
          .then((responses) => {
            const partners = PartnersModel(responses);
            this.setState({ partners });
          });
      }

      this.handleStopEditeNaturalPerson();
    }

    // Edite legal person.
    handleUpdateEditeLegalPersonForm(evt) {
      if (evt.detail) {
        this.setState({
          legalPersonformData: evt.detail,
        });
      } else {
        evt.stopPropagation();
      }
    }

    handleStartEditeLegalPerson(evt) {
      this.isEditingLegalPerson = true;
      this.handleUpdateEditeLegalPersonForm(evt);
    }

    handleStopEditeLegalPerson() {
      this.isEditingLegalPerson = false;
    }

    handleSubmitEditeLegalPersonForm(evt) {
      if (evt.detail) {
        const requestParams = {
          affiliationCode: this.state.affiliationCode,
          key: evt.detail.key,
        };
        const payload = PayloadLegalModel(evt.detail);

        this
          .request([
            sdk.affiliation.partners.put(requestParams, payload),
          ])
          .then((responses) => {
            const partners =
              PartnersLegalFormResponseModel(this.state.partners, responses);
            this.setState({
              partners,
            });
          });
      }

      this.handleStopEditeLegalPerson();
    }

    // Edite natural person
    handleUpdateEditeNaturalPersonForm(evt) {
      if (evt.detail) {
        this.setState({
          naturalPersonformData: evt.detail,
        });
      } else {
        evt.stopPropagation();
      }
    }

    handleStartEditeNaturalPerson(evt) {
      this.isEditingNaturalPerson = true;
      this.handleUpdateEditeNaturalPersonForm(evt);
    }

    handleStopEditeNaturalPerson() {
      this.isEditingNaturalPerson = false;
    }

    handleSubmitEditeNaturalPersonForm(evt) {
      if (evt.detail) {
        const requestParams = {
          affiliationCode: this.state.affiliationCode,
          key: evt.detail.key,
        };
        const payload = PayloadNaturalModel(evt.detail);

        this
          .request([
            sdk.affiliation.partners.put(requestParams, payload),
          ])
          .then((responses) => {
            const partners =
              PartnersNaturalFormResponseModel(this.state.partners, responses);
            this.setState({
              partners,
            });
          });
      }

      this.handleStopEditeNaturalPerson();
    }

    static get requestParamNames() {
      return ['affiliationCode'];
    }

    // List partners
    fetchData({ affiliationCode }) {
      if (affiliationCode) {
        this
          .request([
            sdk.affiliation.partners.get({ affiliationCode }),
          ])
          .then((responses) => {
            if (responses.every(notEmpty)) {
              const partners = PartnersModel(responses);
              this.setState({ partners, affiliationCode });
            }
          });
      }
    }

    requestParamsChangedCallback(requestParams) {
      this.fetchData(requestParams);
    }

    render() {
      return getMerchantPartnersView(this);
    }
  };
