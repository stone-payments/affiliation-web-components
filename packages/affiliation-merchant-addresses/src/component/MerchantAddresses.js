import { v0 as sdk } from 'customer-js-sdk';
import { withRequest, withSetState } from 'sling-framework';
import { AddressesModel } from '../model/MerchantAddressesModel.js';
import { getMerchantAddressesView } from '../view/MerchantAddressesView.js';

const notEmpty = arg => arg != null;

export const AffiliationMerchantAddresses = (Base = class { }) => class extends
  withRequest(withSetState(Base)) {
  constructor() {
    super();

    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleStartEditing = this.handleStartEditing.bind(this);
    this.handleStopEditing = this.handleStopEditing.bind(this);

    this.state = {
      addresses: [],
      types: [
        {
          id: 2,
          name: 'Administrativo',
        },
        {
          id: 3,
          name: 'Entrega',
        },
        {
          id: 1,
          name: 'Principal (Operação)',
        },
        {
          id: 4,
          name: 'Residencial',
        },
      ],
    };
    this.mockData = [
      {
        data: [
          {
            key: 'test',
            entranceNumber: 1,
            streetName: 'test',
            neighborhood: 'test',
            postalCode: 'test',
            city: {
              id: 1,
              name: 'test',
              countrySubdivision: {
                id: 'test',
                name: 'test',
                iso31662Short: 'test',
                country: {
                  id: 1,
                  name: 'test',
                  iso31661Alpha3: 'test',
                  iso31661Alpha2: 'test',
                },
              },
            },
            type: {
              id: 1,
              name: 'test',
            },
          },
        ],
      },
    ];
    this.setState({
      address: AddressesModel(this.mockData),
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
    this.handleStateChange(evt);
    const myEvt = document.getElementById('MySelect');
    myEvt.addEventListener('onchange', (event) => {
      console.log('CHANGE EVENT', event);
    });

    this.setState({
      formdata: evt.detail,
    });
  }

  handleStateChange(evt) {
    if (evt.detail.key === undefined) {
      const address = this.state.addresses.find(x => x.key === evt.detail.key);

      if (evt.detail.stateId !== address.city.countrySubdivision.id) {
        console.log(`Get related cities of ${address.city.countrySubdivision.iso31662Short}`);
        // this.request([
        //     sdk.affiliation.cities.get({
        //       stateCode: address.countrySubdivision.iso31662Short,
        //     }),
        //   ])
        //   .then((responses) => {
        //     this.setState({ cities: responses });
        //   });
      }
    }
  }

  handleFormSubmit(evt) {
    if (evt.detail) {
      const requestParams = {
        affiliationCode: this.state.affiliationCode,
        key: evt.detail.key,
      };

      const payload = {};

      this
        .request([
          sdk.merchants.addresses.put(requestParams, payload),
        ])
        .then((responses) => {
          console.log(responses);
          // const data = BankAccountsFormResponseModel(this.state.banks, responses);
          // this.setState({
          //   banks: data,
          // });
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
        ])
        .then((responses) => {
          if (responses.every(notEmpty)) {
            const addresses = AddressesModel(responses);
            this.setState({ addresses });
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
