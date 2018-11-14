import { withRequest, withSetState } from 'sling-framework';
import { v0 as sdk } from 'customer-js-sdk';
import { getMerchantPartnersListView } from '../views/MerchantPartnersListView';
import { PartnersListModel } from '../model/MerchantPartnersListModel.js';

const notEmpty = arg => arg != null;

export const AffiliationMerchantPartnersList = (base = class {}) =>
  class extends withRequest(withSetState(base)) {
    constructor() {
      super();

      this.state = {
        partners: [],
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
      };
    }

    static get requestParamNames() {
      return ['affiliationCode'];
    }

    fetchData({ affiliationCode }) {
      if (affiliationCode) {
        sdk.headers.append('StoneCode', affiliationCode);
        this
          .request([
            sdk.merchants.partners.get(sdk.PORTAL_API_URL,
              { affiliationCode }),
          ])
          .then((responses) => {
            if (responses.every(notEmpty)) {
              const partners = PartnersListModel(responses);
              this.setState({ partners });
            }
          });
      }
    }

    requestParamsChangedCallback(requestParams) {
      this.fetchData(requestParams);
    }

    render() {
      return getMerchantPartnersListView(this);
    }
  };
