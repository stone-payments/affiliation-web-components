import { withRequest, withSetState } from 'sling-framework';
import { v0 as sdk } from 'customer-js-sdk';
import { getMerchantPartnersView } from '../views/MerchantPartnersView';
import {
  PartnersModel,
  PayloadLegalModel,
  PayloadNaturalModel,
  PartnersLegalFormResponseModel,
  PartnersNaturalFormResponseModel,
  PayloadCreatePartnerlModel,
  CountriesModel,
} from '../model/MerchantPartnersModel.js';

const notEmpty = arg => arg != null;

export const AffiliationMerchantPartners = (base = class {}) =>
  class extends withRequest(withSetState(base)) {
    constructor() {
      super();

      this.handleUpdateEditLegalPersonForm =
        this.handleUpdateEditLegalPersonForm.bind(this);
      this.handleSubmitEditLegalPersonForm =
        this.handleSubmitEditLegalPersonForm.bind(this);
      this.handleStartEditLegalPerson =
        this.handleStartEditLegalPerson.bind(this);
      this.handleStopEditLegalPerson =
        this.handleStopEditLegalPerson.bind(this);

      this.handleUpdateEditNaturalPersonForm =
        this.handleUpdateEditNaturalPersonForm.bind(this);
      this.handleSubmitEditNaturalPersonForm =
        this.handleSubmitEditNaturalPersonForm.bind(this);
      this.handleStartEditNaturalPerson =
        this.handleStartEditNaturalPerson.bind(this);
      this.handleStopEditNaturalPerson =
        this.handleStopEditNaturalPerson.bind(this);

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
        countries: [],
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
            this.setState({
              partners,
            });
          });
      }

      this.handleStopEditNaturalPerson();
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

        // @TODO Criar feedBack para o usuario que foi criado com sucesso

        this
          .request([
            sdk.affiliation.partners.get(this.state.affiliationCode),
          ])
          .then((responses) => {
            const partners = PartnersModel(responses);
            this.setState({
              partners,
            });
          });
      }

      this.handleStopEditNaturalPerson();
    }

    // Edit legal person.
    handleUpdateEditLegalPersonForm(evt) {
      if (evt.detail) {
        this.setState({
          legalPersonformData: evt.detail,
        });
      } else {
        evt.stopPropagation();
      }
    }

    handleStartEditLegalPerson(evt) {
      this.isEditingLegalPerson = true;
      this.handleUpdateEditLegalPersonForm(evt);
    }

    handleStopEditLegalPerson() {
      this.isEditingLegalPerson = false;
    }

    handleSubmitEditLegalPersonForm(evt) {
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

      this.handleStopEditLegalPerson();
    }

    // Edit natural person
    handleUpdateEditNaturalPersonForm(evt) {
      if (evt.detail) {
        this.setState({
          naturalPersonformData: evt.detail,
        });
      } else {
        evt.stopPropagation();
      }
    }

    handleStartEditNaturalPerson(evt) {
      this.isEditingNaturalPerson = true;
      this.handleUpdateEditNaturalPersonForm(evt);
    }

    handleStopEditNaturalPerson() {
      this.isEditingNaturalPerson = false;
    }

    handleSubmitEditNaturalPersonForm(evt) {
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

      this.handleStopEditNaturalPerson();
    }

    static get requestParamNames() {
      return ['affiliationCode'];
    }

    // List partners
    fetchData({
      affiliationCode,
    }) {
      if (affiliationCode) {
        this
          .request([
            sdk.affiliation.partners.get({
              affiliationCode,
            }),
            sdk.affiliation.countries.get(),
          ])
          .then((responses) => {
            if (responses.every(notEmpty)) {
              const partners = PartnersModel(responses);
              const countries = CountriesModel(responses);

              this.setState({
                partners,
                countries,
                affiliationCode,
              });
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
