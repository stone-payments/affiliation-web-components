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
      addresses: [
        {
          key: '826CB172-5DA7-4E66-BBAB-0487129758C4',
          entranceNumber: '58',
          streetName: 'Monsenhor pio ragazinskas',
          neighborhood: 'Parque da vila prudente',
          postalCode: '03141-090',
          complement: 'Seven Houses',
          city: {
            id: 5351,
            name: 'São Paulo',
            countrySubdivision: {
              id: 'BR-AL',
              name: 'Alagoas',
              iso31662Short: 'AL',
              country: {
                id: 76,
                name: 'Brazil',
                iso31661Alpha3: 'BRA',
                iso31661Alpha2: 'BR',
              },
            },
          },
          type: {
            id: 1,
            name: 'Principal (Operação)',
          },
        },
      ],
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
      states: [
        {
          id: 'BR-AC',
          name: 'Acre',
          iso31662Short: 'AC',
          country: {
            id: 76,
            name: 'Brazil',
            iso31661Alpha3: 'BRA',
            iso31661Alpha2: 'BR',
          },
          cities: {
            href: 'test',
          },
        },
        {
          id: 'BR-AL',
          name: 'Alagoas',
          iso31662Short: 'AL',
          country: {
            id: 76,
            name: 'Brazil',
            iso31661Alpha3: 'BRA',
            iso31661Alpha2: 'BR',
          },
          cities: {
            href: 'test',
          },
        }],
      cities: [
        {
          id: 3594,
          name: 'Angra dos Reis',
          countrySubdivision: {
            id: 'BR-RJ',
            name: 'Rio de Janeiro',
            iso31662Short: 'RJ',
            country: {
              id: 76,
              name: 'Brazil',
              iso31661Alpha3: 'BRA',
              iso31661Alpha2: 'BR',
            },
          },
        },
        {
          id: 3595,
          name: 'Aperibé',
          countrySubdivision: {
            id: 'BR-RJ',
            name: 'Rio de Janeiro',
            iso31662Short: 'RJ',
            country: {
              id: 76,
              name: 'Brazil',
              iso31661Alpha3: 'BRA',
              iso31661Alpha2: 'BR',
            },
          },
        }],
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
