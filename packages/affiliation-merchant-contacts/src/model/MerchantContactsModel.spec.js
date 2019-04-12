import { expect } from 'chai';
import {
  MerchantContactsPayloadModel,
  ContactsModel,
  ModelEmailsList,
  ModelPhonesList,
  UpdateContactstList,
} from './MerchantContactsModel.js';

const mockData = [
  {
    data: [
      {
        key: 'Test key',
        type: {
          id: 1,
          name: 'Administrativo',
        },
        friendlyName: 'teste tomador2',
        phones: [
          {
            key: '111111',
            type: {
              id: 1,
              name: 'Desconhecido',
            },
            countryCode: 55,
            areaCode: 11,
            phoneNumber: 12341234,
          },
          {
            key: '222222',
            type: {
              id: 1,
              name: 'Desconhecido',
            },
            countryCode: 55,
            areaCode: 11,
            phoneNumber: 2222222,
          },
        ],
        emails: [
          {
            key: '1111111',
            email: 'test1@email.com',
          },
          {
            key: '2222222',
            email: 'test2@email.com',
          },
        ],
      },
    ],
  }];

const mockUpdatedData = [
  {
    data: {
      key: 'Test key',
      type: {
        id: 1,
        name: 'Administrativo',
      },
      friendlyName: 'Test Updated',
      phones: [
        {
          key: '111111',
          type: {
            id: 1,
            name: 'Desconhecido',
          },
          countryCode: 55,
          areaCode: 11,
          phoneNumber: 11111111,
        },
        {
          key: '222222',
          type: {
            id: 1,
            name: 'Desconhecido',
          },
          countryCode: 55,
          areaCode: 11,
          phoneNumber: 2222222,
        },
      ],
      emails: [
        {
          key: '1111111',
          email: 'test1@email.com',
        },
        {
          key: '2222222',
          email: 'test2@email.com',
        },
      ],
    },
  }];

const mockModeledGetResponse = [
  {
    key: 'Test key',
    friendlyName: 'teste tomador2',
    typeName: 'Administrativo',
    typeId: 1,
    emails: [
      {
        key: '1111111',
        email: 'test1@email.com',
      },
      {
        key: '2222222',
        email: 'test2@email.com',
      },
    ],
    phones: [
      {
        key: '111111',
        type: {
          id: 1,
          name: 'Desconhecido',
        },
        countryCode: 55,
        areaCode: 11,
        phoneNumber: 12341234,
      },
      {
        key: '222222',
        type: {
          id: 1,
          name: 'Desconhecido',
        },
        countryCode: 55,
        areaCode: 11,
        phoneNumber: 2222222,
      },
    ],
    email: 'test1@email.com',
    phoneNumber: '12341234',
    countryCode: '55',
    areaCode: '11',
    displayPhone: '1112341234',
  },
];

const mockContactsEventData = {
  'areaCode-111111': 11,
  'areaCode-222222': 11,
  'countryCode-111111': 55,
  'countryCode-222222': 55,
  'email-1111111': 'test1@email.com',
  'email-2222222': 'test2@email.com',
  friendlyName: 'teste tomador2',
  key: 'Test key',
  'phoneNumber-111111': 12341234,
  'phoneNumber-222222': 2222222,
  typeId: '1',
};

describe('', () => {
  it('Should return correct Merchant Contacts model.', () => {
    expect(ContactsModel(mockData))
      .to.deep.equal(mockModeledGetResponse);
  });

  it('Should return correct Put Merchant Contacts model.', () => {
    const modeledResponse = {
      emails: [
        {
          email: 'test1@email.com',
          key: '1111111',
        },
        {
          email: 'test2@email.com',
          key: '2222222',
        }],
      phones: [
        {
          areaCode: 11,
          countryCode: 55,
          key: '111111',
          phoneNumber: 12341234,
        },
        {
          areaCode: 11,
          countryCode: 55,
          key: '222222',
          phoneNumber: 2222222,
        }],
      friendlyName: 'teste tomador2',
      typeId: 1,
    };

    expect(MerchantContactsPayloadModel(mockContactsEventData))
      .to.deep.equal(modeledResponse);
  });

  it('Should return correct modeled email list.', () => {
    const modeledPhonesList = [
      {
        email: 'test1@email.com',
        key: '1111111',
      },
      {
        email: 'test2@email.com',
        key: '2222222',
      }];

    expect(ModelEmailsList(mockContactsEventData))
      .to.deep.equal(modeledPhonesList);
  });

  it('Should return correct modeled phone list.', () => {
    const modeledEmailsList = [
      {
        areaCode: 11,
        countryCode: 55,
        key: '111111',
        phoneNumber: 12341234,
      },
      {
        areaCode: 11,
        countryCode: 55,
        key: '222222',
        phoneNumber: 2222222,
      }];

    expect(ModelPhonesList(mockContactsEventData))
      .to.deep.equal(modeledEmailsList);
  });

  it('Should return correct UpdateContactstList.', () => {
    const modeledUpdatedResponse = [
      {
        key: 'Test key',
        friendlyName: 'Test Updated',
        typeName: 'Administrativo',
        typeId: 1,
        emails: [
          {
            key: '1111111',
            email: 'test1@email.com',
          },
          {
            key: '2222222',
            email: 'test2@email.com',
          },
        ],
        phones: [
          {
            key: '111111',
            type: {
              id: 1,
              name: 'Desconhecido',
            },
            countryCode: 55,
            areaCode: 11,
            phoneNumber: 11111111,
          },
          {
            key: '222222',
            type: {
              id: 1,
              name: 'Desconhecido',
            },
            countryCode: 55,
            areaCode: 11,
            phoneNumber: 2222222,
          },
        ],
        email: 'test1@email.com',
        phoneNumber: '11111111',
        countryCode: '55',
        areaCode: '11',
        displayPhone: '1111111111',
      },
    ];

    expect(UpdateContactstList(mockModeledGetResponse, mockUpdatedData))
      .to.deep.equal(modeledUpdatedResponse);
  });
});
