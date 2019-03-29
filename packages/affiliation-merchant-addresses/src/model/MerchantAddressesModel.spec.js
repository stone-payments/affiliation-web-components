import { expect } from 'chai';
import {
  AddressesModel,
  StatesModel,
  PayloadModel,
  AddressesUpdatedResponseModel,
} from './MerchantAddressesModel.js';

const mockData = [
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
  {
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

describe('Merchant Addresses Model', () => {
  it('Should return a sucesses AddressesModel modeled data', () => {
    const expctedeData = [{
      key: 'test',
      typeId: 1,
      typeName: 'test',
      postalCode: 'test',
      stateCode: 'test',
      cityName: 'test',
      streetName: 'test',
      number: 1,
      complement: 'N/A',
      neighborhood: 'test',
      cityDisplay: 'test / test',
      streetDisplay: 'test, 1 N/A',
    }];

    const testData = AddressesModel(mockData);

    expect(testData).to.deep.equal(expctedeData);
  });

  it('Should return a sucesses StatesModel data', () => {
    const expctedeData = [
      {
        id: 'AC',
        name: 'Acre',
      }, {
        id: 'RJ',
        name: 'Rio de janeiro',
      }, {
        id: 'SP',
        name: 'São Paulo',
      }];

    const testData = StatesModel(mockData);

    expect(testData).to.deep.equal(expctedeData);
  });

  it('Should return a sucesses PayloadModel data', () => {
    const mockPayload = {
      key: 'test',
      typeId: 1,
      typeName: 'test',
      postalCode: 'test',
      stateCode: 'test',
      cityName: 'test',
      streetName: 'test street name',
      number: 1,
      complement: 'N/A',
      neighborhood: 'test',
    };

    const expctedeData = {
      typeId: 1,
      entranceNumber: 1,
      streetName: 'test street name',
      neighborhood: 'test',
      postalCode: 'test',
      cityName: 'test',
      countrySubdivisionCode: 'test',
    };

    const testData = PayloadModel(mockPayload);

    expect(testData).to.deep.equal(expctedeData);
  });

  it('Should return a sucesses AddressesUpdatedResponseModel data', () => {
    const mockCurrentState = [
      {
        key: '1111',
        typeId: 1,
        typeName: 'test',
        postalCode: 'test',
        stateCode: 'test',
        cityName: 'test',
        streetName: 'test',
        number: 1,
        complement: 'N/A',
        neighborhood: 'test',
        cityDisplay: 'test / test',
        streetDisplay: 'test, 1 N/A',
      },
      {
        key: '1111-1111',
        typeId: 1,
        typeName: 'test',
        postalCode: 'test',
        stateCode: 'test',
        cityName: 'test',
        streetName: 'test',
        number: 1,
        complement: 'N/A',
        neighborhood: 'test',
        cityDisplay: 'test / test',
        streetDisplay: 'test, 1 N/A',
      },
    ];

    const mockResponse = [
      {
        data: {
          key: '1111-1111',
          entranceNumber: 1,
          streetName: 'test street name',
          neighborhood: 'test',
          postalCode: 'test',
          city: {
            id: 'test',
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
      },
    ];
    const mockModeledData = [
      {
        key: '1111',
        typeId: 1,
        typeName: 'test',
        postalCode: 'test',
        stateCode: 'test',
        cityName: 'test',
        streetName: 'test',
        number: 1,
        complement: 'N/A',
        neighborhood: 'test',
        cityDisplay: 'test / test',
        streetDisplay: 'test, 1 N/A',
      },
      {
        key: '1111-1111',
        typeId: 1,
        typeName: 'test',
        postalCode: 'test',
        stateCode: 'test',
        cityName: 'test',
        streetName: 'test street name',
        number: 1,
        complement: 'N/A',
        neighborhood: 'test',
        cityDisplay: 'test / test',
        streetDisplay: 'test street name, 1 N/A',
      },
    ];

    const testData =
      AddressesUpdatedResponseModel(mockCurrentState, mockResponse);

    expect(testData).to.deep.equal(mockModeledData);
  });
});
