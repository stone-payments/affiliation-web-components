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
} from '../model/MerchantPartnersModel.js';

const notEmpty = arg => arg != null;

export const AffiliationMerchantPartners = (base = class {}) =>
  class extends withRequest(withSetState(base)) {
    constructor() {
      super();

      this.handleUpdateEditLegalPartnerForm =
        this.handleUpdateEditLegalPartnerForm.bind(this);
      this.handleSubmitEditLegalPartnerForm =
        this.handleSubmitEditLegalPartnerForm.bind(this);
      this.handleStartEditLegalPartner =
        this.handleStartEditLegalPartner.bind(this);
      this.handleStopEditLegalPartner =
        this.handleStopEditLegalPartner.bind(this);

      this.handleUpdateEditNaturalPartnerForm =
        this.handleUpdateEditNaturalPartnerForm.bind(this);
      this.handleSubmitEditNaturalPartnerForm =
        this.handleSubmitEditNaturalPartnerForm.bind(this);
      this.handleStartEditNaturalPartner =
        this.handleStartEditNaturalPartner.bind(this);
      this.handleStopEditNaturalPartner =
        this.handleStopEditNaturalPartner.bind(this);

      this.handleStartCreatePartner =
        this.handleStartCreatePartner.bind(this);
      this.handleSubmitCreatePartner =
        this.handleSubmitCreatePartner.bind(this);
      this.handleStopCreatePartner =
        this.handleStopCreatePartner.bind(this);

      this.handleDeleteNaturalPartner =
        this.handleDeleteNaturalPartner.bind(this);

      this.state = {
        partners: {
          naturalPartners: [],
          legalPartners: [],
        },
        legalPartnerformData: {},
        naturalPartnerformData: {},
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
        naturalPartners: {
          type: Boolean,
          reflectToAttribute: true,
        },
        legalPartners: {
          type: Boolean,
          reflectToAttribute: true,
        },
        isEditingLegalPartner: {
          type: Boolean,
          reflectToAttribute: true,
        },
        isEditingNaturalPartner: {
          type: Boolean,
          reflectToAttribute: true,
        },
      };
    }

    // delet partner
    handleDeleteNaturalPartner(key) {
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

      this.handleStopEditNaturalPartner();
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

      this.handleStopEditNaturalPartner();
    }

    // Edit legal Partner.
    handleUpdateEditLegalPartnerForm(evt) {
      if (evt.detail) {
        this.setState({
          legalPartnerformData: evt.detail,
        });
      } else {
        evt.stopPropagation();
      }
    }

    handleStartEditLegalPartner(evt) {
      this.isEditingLegalPartner = true;
      this.handleUpdateEditLegalPartnerForm(evt);
    }

    handleStopEditLegalPartner() {
      this.isEditingLegalPartner = false;
    }

    handleSubmitEditLegalPartnerForm(evt) {
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

      this.handleStopEditLegalPartner();
    }

    // Edit natural Partner
    handleUpdateEditNaturalPartnerForm(evt) {
      if (evt.detail) {
        this.setState({
          naturalPartnerformData: evt.detail,
        });
      } else {
        evt.stopPropagation();
      }
    }

    handleStartEditNaturalPartner(evt) {
      this.isEditingNaturalPartner = true;
      this.handleUpdateEditNaturalPartnerForm(evt);
    }

    handleStopEditNaturalPartner() {
      this.isEditingNaturalPartner = false;
    }

    handleSubmitEditNaturalPartnerForm(evt) {
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

      this.handleStopEditNaturalPartner();
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
          ])
          .then((responses) => {
            if (responses.every(notEmpty)) {
              const partners = PartnersModel(responses);

              this.setState({
                partners,
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
