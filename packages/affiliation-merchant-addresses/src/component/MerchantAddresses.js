import { v0 as sdk } from 'customer-js-sdk';
import { withRequest, withSetState } from 'sling-framework';
import { getMerchantAddressesView } from '../view/MerchantAddressesView.js';
import {
  AddressesModel,
  StatesModel,
  PayloadModel,
  AddressesResponseModel,
} from '../model/MerchantAddressesModel.js';

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
      states: [],
      cities: [],
      formdata: {},
    };

    this.mockData = [
      {
        // mock data
        data: [
          {
            key: 'test',
            entranceNumber: 1,
            streetName: 'test',
            neighborhood: 'test',
            postalCode: '11111111',
            city: {
              id: 1,
              name: 'Rio de Janeiro',
              countrySubdivision: {
                id: 'test',
                name: 'test',
                iso31662Short: 'RJ',
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
      {
        // mock states
        data: [
          {
            code: 'AC',
            name: 'Acre',
          }, {
            code: 'RJ',
            name: 'Rio de janeiro',
          }, {
            code: 'SP',
            name: 'São Paulo',
          },
        ],
      },
    ];

    this.citiesSP =
    {
      data: [
        {
          name: 'citie1',
        },
        {
          name: 'citie2',
        },
        {
          name: 'citie3',
        },
      ],
    };

    this.citiesRJ = {
      data: [
        {
          name: 'citie4',
        },
        {
          name: 'citie5',
        },
        {
          name: 'citie6',
        },
      ],
    };

    this.citiesAC = {
      data: [
        {
          name: 'citie7',
        },
        {
          name: 'citie8',
        },
        {
          name: 'citie8',
        },
      ],
    };

    this.setState({
      addresses: AddressesModel(this.mockData),
      states: StatesModel(this.mockData),
    });
  }

  static get properties() {
    return {
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
        key: evt.detail.key,
      };

      const payload = PayloadModel(evt.detail);

      this
        .request([
          sdk.affiliation.addresses.put(requestParams, payload),
        ])
        .then((responses) => {
          const data = AddressesResponseModel(this.state.addresses, responses);
          this.setState({
            addresses: data,
          });
        });
    }

    this.handleStopEditing();
  }

  handleStartEditing(evt) {
    this.setState({
      cities: this.cities,
    });
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
            this.setState({
              addresses,
              states,
            });
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
