import { withRequest, withSetState } from 'sling-framework';
import { v0 as sdk } from 'customer-js-sdk';
import { getMerchantBankAccountsListView } from '../views/MerchantBankAccountsListView.js';
import { BankAccountsListModel } from '../model/BankAccountsListModel.js';

const notEmpty = arg => arg != null;

export const AffiliationMerchantBankAccountsList = (base = class {}) =>
  class extends withRequest(withSetState(base)) {
    constructor() {
      super();

      this.state = {
        banks: [],
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
        this
          .request([
            sdk.merchants.availableBanks.get({ affiliationCode }),
            sdk.merchants.bankAccounts.get({ affiliationCode }),
          ])
          .then((responses) => {
            if (responses.every(notEmpty)) {
              const data = BankAccountsListModel(responses);
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
      return getMerchantBankAccountsListView(this);
    }
  };

