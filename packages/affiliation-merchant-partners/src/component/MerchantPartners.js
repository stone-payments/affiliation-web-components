import { withRequest, withSetState } from 'sling-framework';
import { v0 as sdk } from 'customer-js-sdk';
import 'sling-web-component-table';
import 'sling-web-component-loader';
import 'sling-web-component-message';
import 'sling-web-component-button';
import { getMerchantPartnersView } from '../views/MerchantPartnersView';
import { PartnersModel, NewPartnersModel } from '../model/MerchantPartnersModel';

const notEmpty = arg => arg != null;

export const AffiliationMerchantPartners = (base = class {}) =>
  class extends withRequest(withSetState(base)) {
    constructor() {
      super();

      this.state = {
        partners: [],
      };

      const test = NewPartnersModel(this.state.newData);
      this.setState({ partners: test });
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
            sdk.affiliation.partners.get(
              sdk.PORTAL_API_URL, { affiliationCode }),
          ])
          .then((responses) => {
            if (responses.every(notEmpty)) {
              const partners = PartnersModel(responses);
              this.setState({ partners });
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
