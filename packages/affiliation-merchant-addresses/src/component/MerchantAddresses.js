import { v0 as sdk } from 'customer-js-sdk';
import { withRequest, withSetState } from 'sling-framework';
import { getMerchantAddressesView } from '../view/MerchantAddressesView.js';
import {
  AddressesModel,
  StatesModel,
  PayloadModel,
  AddressesUpdatedResponseModel,
} from '../model/MerchantAddressesModel.js';

const notEmpty = arg => arg != null;

export const AffiliationMerchantAddresses = (Base = class {}) => class extends
  withRequest(withSetState(Base)) {
  constructor() {
    super();

    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleStartEditing = this.handleStartEditing.bind(this);
    this.handleStopEditing = this.handleStopEditing.bind(this);


    this.state = {
      addresses: [],
      states: [],
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
      editing: {
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

  handleFormUpdate(evt) {
    this.setState({
      formdata: evt.detail,
    });
  }

  handleFormSubmit(evt) {
    if (evt.detail) {
      const requestParams = {
        affiliationCode: this.state.affiliationCode,
        key: evt.detail.key,
      };

      const payload = PayloadModel(evt.detail);

      this
        .request([
          sdk.affiliation.addresses.put(requestParams, payload),
        ])
        .then((responses) => {
          const addresses =
            AddressesUpdatedResponseModel(this.state.addresses, responses);
          this.setState({
            addresses,
          });
        });
    }

    this.handleStopEditing();
  }

  handleStartEditing(evt) {
    this.editing = true;
    this.handleFormUpdate(evt);
  }

  handleStopEditing() {
    this.editing = false;
  }

  static get requestParamNames() {
    return ['affiliationCode'];
  }

  fetchData({ affiliationCode }) {
    if (affiliationCode) {
      this
        .request([
          sdk.affiliation.addresses.get({ affiliationCode }),
          sdk.affiliation.states.get(),
        ])
        .then((responses) => {
          if (responses.every(notEmpty)) {
            const addresses = AddressesModel(responses);
            const states = StatesModel(responses);
            this.setState({ addresses, states, affiliationCode });
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
