import { v0 as SDK } from 'customer-js-sdk';
import { withRequest, withSetState } from 'sling-framework';
import { addressesModel } from '../model/MerchantAddressesModel.js';
import { MerchantAddressesView } from '../view/MerchantAddressesView.js';

const notEmpty = arg => arg != null;

export const AffiliationMerchantAddresses = (Base = class {}) => class extends
  withRequest(withSetState(Base)) {
  constructor() {
    super();

    this.state = {
      apidata: [],
    };
  }

  static get properties() {
    return {
      ...super.properties,
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
          SDK.merchants.addresses.get({ affiliationCode }),
        ])
        .then((responses) => {
          console.log('res', responses)
          if (responses.every(notEmpty)) {
            const apidata = addressesModel(responses);
            console.log('MODELED DATA', apidata);
            this.setState({ apidata });
            console.log('state', this.state);
          }
        });
    }
  }

  requestParamsChangedCallback(requestParams) {
    this.fetchData(requestParams);
  }

  render() {
    console.log('state', this.state);
    return MerchantAddressesView(this);
  }
};
