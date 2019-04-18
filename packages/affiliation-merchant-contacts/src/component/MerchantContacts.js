import { withRequest, withSetState } from 'sling-framework';
import { v0 as sdk } from 'customer-js-sdk';
import { getMerchantContactsView } from '../views/MerchantContactsView';
import {
  ContactsModel,
  MerchantContactsPayloadModel,
  UpdateContactstList,
} from '../model/MerchantContactsModel';

const notEmpty = arg => arg != null;

export const AffiliationMerchantContacts = (base = class {}) =>
  class extends withRequest(withSetState(base)) {
    constructor() {
      super();

      this.handleFormUpdate = this.handleFormUpdate.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.handleStartEditing = this.handleStartEditing.bind(this);
      this.handleStopEditing = this.handleStopEditing.bind(this);

      this.state = {
        contacts: [],
        editedContact: {},
        formData: {
          emails: [],
          phones: [],
        },
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
      };
    }

    handleFormUpdate(evt) {
      if (evt.detail.emails !== undefined ||
          evt.detail.phones !== undefined) {
        this.setState({
          formData: evt.detail,
        });
      } else {
        evt.stopPropagation();
      }
    }

    handleFormSubmit(evt) {
      if (evt.detail) {
        const requestParams = {
          affiliationCode: this.state.affiliationCode,
          id: evt.detail.key,
        };
        const payload = MerchantContactsPayloadModel(evt.detail);
        this
          .request([
            // @TODO Change the sdk method to sdk.affiliation.contacts.put.
            sdk.affiliation.contacts.put(requestParams, payload),
          ])
          .then((responses) => {
            const data = UpdateContactstList(this.state.contacts, responses);
            this.setState({
              contacts: data,
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
            sdk.affiliation.contacts.get({ affiliationCode }),
          ])
          .then((responses) => {
            if (responses.every(notEmpty)) {
              const contacts = ContactsModel(responses);
              this.setState({
                affiliationCode,
                contacts,
              });
            }
          });
      }
    }

    requestParamsChangedCallback(requestParams) {
      this.fetchData(requestParams);
    }

    render() {
      return getMerchantContactsView(this);
    }
  };
