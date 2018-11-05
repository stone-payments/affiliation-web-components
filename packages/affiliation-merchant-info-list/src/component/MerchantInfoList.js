import { withRequest, withSetState } from 'sling-framework';
import { v0 as sdk } from 'customer-js-sdk';
import { getMerchantInfoListView } from '../views/MerchantInfoListView';
import {
  MerchantInfoListPayloadModel,
  MerchantInfoListModel,
} from '../model/MerchantInfoListPayloadModel.js';

const notEmpty = arg => arg != null;

export const AffiliationMerchantInfoList = (base = class {}) =>
  class extends withRequest(withSetState(base)) {
    constructor() {
      super();
      this.handleFormUpdate = this.handleFormUpdate.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.handleStartEditing = this.handleStartEditing.bind(this);
      this.handleStopEditing = this.handleStopEditing.bind(this);

      this.state = {
        info: [],
        formdata: {},
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
        cascadelist: {
          type: Boolean,
          reflectToAttribute: true,
        },
        editable: {
          type: Boolean,
          reflectToAttribute: true,
        },
        editing: {
          type: Boolean,
          reflectToAttribute: true,
        },
      };
    }

    handleFormUpdate(evt) {
      console.log('evt', evt.detail);
      this.setState({
        formdata: evt.detail,
      });
    }

    handleFormSubmit(evt) {
      if (evt.detail) {
        const requestParams = {
          affiliationCode: this.state.affiliationCode,
          id: evt.detail.id,
        };
        console.log('formadata', this.state.formdata);
        const payload = MerchantInfoListPayloadModel(this.state);
        console.log('payload', payload);
        this
          .request([
            sdk.merchants.merchant.patch(requestParams, payload),
          ])
          .then((responses) => {
            const data = responses;
            console.log(responses);
            this.setState({
              contacts: data,
            });
          });
      }
      this.handleStopEditing();
    }

    handleStartEditing(evt) {
      console.log('evt', evt.detail);
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
            sdk.merchants.merchant.get({ affiliationCode }),
          ])
          .then((responses) => {
            if (responses.every(notEmpty)) {
              const data = MerchantInfoListModel(responses, affiliationCode);
              this.setState({
                affiliationCode,
                info: data,
              });
            }
          });
      }
    }

    requestParamsChangedCallback(requestParams) {
      this.fetchData(requestParams);
    }

    render() {
      return getMerchantInfoListView(this);
    }
  };
