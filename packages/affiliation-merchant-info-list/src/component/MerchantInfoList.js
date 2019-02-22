import { withRequest, withSetState } from 'sling-framework';
import { v0 as sdk } from 'customer-js-sdk';
import { getMerchantInfoListView } from '../views/MerchantInfoListView';
import {
  MerchantInfoListPayloadModel,
  MerchantInfoListModel,
  MerchantInfoListResponseModel,
} from '../model/MerchantInfoListModel.js';

const notEmpty = arg => arg != null;

export const AffiliationMerchantInfoList = (base = class { }) =>
  class extends withRequest(withSetState(base)) {
    constructor() {
      super();
      this.handleFormUpdate = this.handleFormUpdate.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.handleStartEditing = this.handleStartEditing.bind(this);
      this.handleStopEditing = this.handleStopEditing.bind(this);

      this.state = {
        info: [],
        apiResponse: [],
        formData: {},
      };

      this.test = [
        {
          data: {
            memberKey: 'test',
            mcc: {
              id: 1,
              name: 'Test Name',
            },
            legalName: 'Test Legal Name',
            tradeName: 'Test Trade Name',
            legalPersonality: {
              id: 1,
              name: 'Test Name',
            },
            taxId: '12345678911',
            taxIdType: {
              id: 1,
              name: 'CPF',
            },
            additionalDocuments: [
              {
                documentType: {
                  id: 1,
                  name: 'CNPJ',
                },
                documentIdentifier: '11111111111111',
                issuedBy: 'test',
                issueDate: new Date(),
                expirationDate: new Date(),
              },
            ],
            estimatedMonthlyBilling: 10000,
            birthDate: new Date(),
            birthPlace: 'test',
            motherName: 'izabel',
            birthCountry: {
              id: 1,
              name: 'test',
            },
          },
        },
      ];

      this.setState({
        info: MerchantInfoListModel(this.test, '1234123', true, true),
        apiResponse: this.test,
      });
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
        showAdditionalData: {
          type: Boolean,
          reflectToAttribute: true,
        },
        showBasicData: {
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
            const data =
              MerchantInfoListResponseModel(responses, this.state.info);
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
            sdk.affiliation.merchant.get({ affiliationCode }),
          ])
          .then((responses) => {
            if (responses.every(notEmpty)) {
              const data = MerchantInfoListModel(responses, affiliationCode);
              this.setState({
                affiliationCode,
                apiResponse: responses,
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
