import { withRequest, withSetState } from 'sling-framework';
import { v0 as sdk } from 'customer-js-sdk';
import 'sling-web-component-table';
import 'sling-web-component-loader';
import 'sling-web-component-message';
import 'sling-web-component-button';
import { getMerchantPartnersView } from '../views/MerchantPartnersView';
import { PartnersModel, NewPartnersModel } from '../model/MerchantPartnersModel';

const notEmpty = arg => arg != null;

export const AffiliationMerchantPartners = (base = class {}) =>
  class extends withRequest(withSetState(base)) {
    constructor() {
      super();

      this.state = {
        newData: [
          [
            {
              naturalPerson: {
                key: 'C20A3719-0804-4B91-B50F-24D33938087F',
                name: 'José Alves Junior',
                taxId: '97557466926',
                taxIdType: {
                  id: 2,
                  name: 'CPF',
                },
                ownershipPercentage: 0.25,
                birthdate: '1984-02-07T00:00:00Z',
                birthPlace: 'Rio de Janeiro',
                birthCountry: {
                  id: 76,
                  name: 'Brazil',
                  iso31661Alpha3: 'BRA',
                  iso31661Alpha2: 'BR',
                },
                fatherName: 'José Alves Camargo',
                motherName: 'Maria Sandra Alves',
                spouseName: 'Brenda Carvalho',
                spouseTaxId: '13415229548',
                spouseTaxIdType: {
                  id: 2,
                  name: 'CPF',
                },
              },
            },
          ],
        ],
        partners: [],
      };

      const test = NewPartnersModel(this.state.newData);
      this.setState({ partners: test });
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
        addable: {
          type: Boolean,
          reflectToAttribute: true,
        },
      };
    }

    static get requestParamNames() {
      return ['affiliationCode'];
    }

    fetchData({ affiliationCode }) {
      if (affiliationCode) {
        sdk.headers.append('StoneCode', affiliationCode);
        this
          .request([
            sdk.merchants.partners.get(sdk.PORTAL_API_URL, { affiliationCode }),
          ])
          .then((responses) => {
            if (responses.every(notEmpty)) {
              const partners = PartnersModel(responses);
              this.setState({ partners });
            }
          });
      }
    }

    requestParamsChangedCallback(requestParams) {
      this.fetchData(requestParams);
    }

    render() {
      return getMerchantPartnersView(this);
    }
  };
