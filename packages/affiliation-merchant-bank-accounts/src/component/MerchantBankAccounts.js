import { withRequest, withSetState } from 'sling-framework';
import { v0 as sdk } from 'customer-js-sdk';
import { getMerchantBankAccountsView } from '../views/MerchantBankAccountsView.js';
import {
  BankAccountsModel,
  BankAccountsFormResponseModel,
} from '../model/BankAccountsModel.js';

const notEmpty = arg => arg != null;

export const AffiliationMerchantBankAccounts = (base = class {}) =>
  class extends withRequest(withSetState(base)) {
    constructor() {
      super();

      this.handleFormUpdate = this.handleFormUpdate.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.handleStartEditing = this.handleStartEditing.bind(this);
      this.handleStopEditing = this.handleStopEditing.bind(this);

      this.state = {
        banks: [],
        availableBanks: [],
        formdata: {},
        instanceName: this.localName,
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
        addable: {
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
        formdata: evt.detail,
      });
    }

    handleFormSubmit(evt) {
      if (evt.detail) {
        const requestParams = {
          affiliationCode: this.state.affiliationCode,
          id: evt.detail.id,
        };

        const payload = {
          accountNumber: evt.detail.accountNumber,
          accountNumberVerificationCode:
            evt.detail.accountNumberVerificationCode,
          agencyNumber: evt.detail.agencyNumber,
          agencyNumberVerificationCode: evt.detail.agencyNumberVerificationCode,
          bankId: Number(evt.detail.bankId),
          statusId: evt.detail.statusId,
          typeId: Number(evt.detail.typeId),
          centralizedPayment: evt.detail.centralizedPayment,
        };

        this
          .request([
            sdk.merchants.bankAccounts.put(requestParams, payload),
          ])
          .then((responses) => {
            const data =
              BankAccountsFormResponseModel(this.state.banks, responses);
            this.setState({
              banks: data,
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
            sdk.merchants.availableBanks.get({ affiliationCode }),
            sdk.affiliation.bankAccounts.get({ affiliationCode }),
          ])
          .then((responses) => {
            if (responses.every(notEmpty)) {
              const data = BankAccountsModel(responses);
              this.setState({
                affiliationCode,
                banks: data.banks,
                availableBanks: data.availableBanks,
              });
            }
          });
      }
    }

    requestParamsChangedCallback(requestParams) {
      this.fetchData(requestParams);
    }

    render() {
      return getMerchantBankAccountsView(this);
    }
  };
