import { withRequest, withSetState } from 'sling-framework';
import { v0 as sdk } from 'customer-js-sdk';
import { getMerchantContactsListView } from '../views/MerchantContactsListVew.js';
import { ContactsListModel } from '../model/MerchantContactsListModel.js';

const notEmpty = arg => arg != null;

export const AffiliationMerchantContactsList = (base = class {}) =>
  class extends withRequest(withSetState(base)) {
    constructor() {
      super();

      this.state = {
        contacts: [],
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
            sdk.merchants.contacts.get({ affiliationCode }),
          ])
          .then((responses) => {
            if (responses.every(notEmpty)) {
              const data = ContactsListModel(responses);
              this.setState({
                affiliationCode,
                contacts: data,
              });
            }
          });
      }
    }

    requestParamsChangedCallback(requestParams) {
      this.fetchData(requestParams);
    }

    render() {
      return getMerchantContactsListView(this);
    }
  };
