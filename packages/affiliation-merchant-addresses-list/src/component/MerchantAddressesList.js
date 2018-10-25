import { v0 as sdk } from 'customer-js-sdk';
import { withRequest, withSetState } from 'sling-framework';
import { addressesListModel } from '../model/MerchantAddressesListModel.js';
import { MerchantAddressesListView } from '../views/MerchantAddressesListView.js';

const notEmpty = arg => arg != null;

export const AffiliationMerchantAddressesList = (base = class {}) =>
  class extends withRequest(withSetState(base)) {
    constructor() {
      super();

      this.state = {
        addresses: [],
      };
    }

    static get properties() {
      return {
        state: {
          type: Object,
          reflectToAttribute: false,
        },
      };
    }

    static get requestParamNames() {
      return ['affiliationCode'];
    }

    fetchData({ affiliationCode }) {
      if (affiliationCode) {
        this
          .request([
            sdk.merchants.addresses.get({ affiliationCode }),
          ])
          .then((responses) => {
            if (responses.every(notEmpty)) {
              const addresses = addressesListModel(responses);
              this.setState({ addresses });
            }
          });
      }
    }

    requestParamsChangedCallback(requestParams) {
      this.fetchData(requestParams);
    }

    render() {
      return MerchantAddressesListView(this);
    }
  };
