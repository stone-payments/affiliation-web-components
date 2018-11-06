import { withRequest, withSetState } from 'sling-framework';
import { v0 as sdk } from 'customer-js-sdk';
import { getMerchantInfoListView } from '../views/MerchantInfoListView';
import {
  MerchantInfoListPayloadModel,
  MerchantInfoListModel,
  MerchantInfoListresponseModel,
} from '../model/MerchantInfoListModel.js';

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
        formData: {},
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
      this.setState({
        formData: evt.detail,
      });
    }

    handleFormSubmit(evt) {
      if (evt.detail) {
        const requestParams = {
          affiliationCode: this.state.affiliationCode,
          id: evt.detail.id,
        };
        const payload = MerchantInfoListPayloadModel(this.state);
        this
          .request([
            sdk.merchants.merchant.patch(requestParams, payload),
          ])
          .then((responses) => {
            console.log(responses, this.state.info);
            const data =
              MerchantInfoListresponseModel(responses, this.state.info);
            this.setState({
              info: data,
            });
          });
      }
      this.handleStopEditing();
    }

    handleStartEditing() {
      this.editing = true;
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
