import { v0 as sdk } from 'customer-js-sdk';
import { withRequest, withSetState } from 'sling-framework';
import { getMerchantAddressesView } from '../view/MerchantAddressesView.js';
import {
  AddressesModel,
  StatesModel,
  CitiesModel,
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
              id: 3,
              name: 'city3',
              countrySubdivision: {
                id: 'test',
                name: 'test',
                iso31662Short: 'SP',
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

    this.citiesSP = {
      data: [
        {
          name: 'city1',
        }, {
          name: 'city2',
        }, {
          name: 'city3',
        },
      ],
    };

    this.citiesRJ = {
      data: [
        {
          name: 'city4',
        }, {
          name: 'city5',
        }, {
          name: 'city6',
        },
      ],
    };

    this.citiesAC = {
      data: [
        {
          name: 'city7',
        }, {
          name: 'city8',
        }, {
          name: 'city9',
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
    console.log(evt.detail, 'evento -----');
    console.log(evt.detail.stateCode, 'evt statecode');
    console.log(this.state.formdata.stateCode, 'form statecode');
    if ((evt.detail.stateCode !== this.state.formdata.stateCode) &&
      (evt.detail.stateCode)) {
      // this
      //   .request([
      //     sdk.affiliation.cities.get(evt.detail.stateCode),
      //   ])
      //   .then((responses) => {
      //     if (responses.every(notEmpty)) {
      //       const addresses = AddressesModel(responses);
      //       this.setState({ addresses });
      //     }
      //   });
      if (evt.detail.stateCode === 'SP') {
        debugger;
        this.setState({ cities: CitiesModel(this.citiesSP) });
      }
      if (evt.detail.stateCode === 'RJ') {
        debugger;
        this.setState({ cities: CitiesModel(this.citiesRJ) });
      }
      if (evt.detail.stateCode === 'AC') {
        debugger;        
        this.setState({ cities: CitiesModel(this.citiesAC) });
      }
    }
    this.setState({
      formdata: evt.detail,
    });

    console.log('AQUI CARALHO', this.state);
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
