import { v0 as sdk } from 'customer-js-sdk';
import { withRequest, withSetState } from 'sling-framework';
import { AddressesModel } from '../model/MerchantAddressesModel.js';
import { getMerchantAddressesView } from '../view/MerchantAddressesView.js';

const notEmpty = arg => arg != null;

export const AffiliationMerchantAddresses = (Base = class {}) => class extends
  withRequest(withSetState(Base)) {
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
      editable: {
        type: Boolean,
        reflectToAttribute: true,
      },
      addable: {
        type: Boolean,
        reflectToAttribute: true,
      },
      isLoading: {
        type: Boolean,
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
            const addresses = AddressesModel(responses);
            this.setState({ addresses });
          }
        });
    }
  }

  requestParamsChangedCallback(requestParams) {
    this.fetchData(requestParams);
  }

  render() {
    return getMerchantAddressesView(this);
  }
};
