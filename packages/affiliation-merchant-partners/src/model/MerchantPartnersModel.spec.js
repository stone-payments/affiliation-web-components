import { expect } from 'chai';
import { PartnersModel } from './MerchantPartnersModel.js';

describe('Merchant Partners Model', () => {
  it('Should return correct PartnerModel response', () => {
    const mockPartnersResponse = [
      {
        data: [
          {
            naturalPerson: {
              key: 'test',
              name: 'Nome Completo',
              taxId: 11144455578,
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
              additionalDocuments: [
                {
                  documentTypeId: 1,
                  documentIdentifier: '123456789',
                  issuedBy: 'Issuer name',
                  issueDate: '1990-12-31',
                  expirationDate: '2025-04-01',
                },
              ],
              fatherName: 'Father Name',
              motherName: 'Mother Name',
              spouseName: 'Spouse Name',
              spouseTaxId: 111111111111,
              spouseTaxIdType: 2,
            },
          },
          {
            legalPerson: {
              ownershipPercentage: 0.85,
              key: 'test',
              tradeName: 'Campbelo Gestora',
              legalName: ' Campbelo Gestão de Recursos S.A.',
              legalPersonality: {
                id: 1,
                name: 'Pessoa Jurídica',
              },
              taxId: '111111111111',
              taxIdType: {
                id: 1,
                name: 'CNPJ',
              },
              stateInscription: 'SP',
              municipalInscription: 'São Paulo',
              websiteUrl: 'campbelo.com.b',
              addresses: {
                href: '',
              },
              createdOn: '2017-08-10T17:12:33.917',
              lastModifiedOn: '2017-08-10T17:12:33.917',
            },
          },
        ],
      },
    ];

    const mockModeledResponse = {
      naturalPersons: [
        {
          key: 'test',
          name: 'Nome Completo',
          motherName: 'Mother Name',
          fatherName: 'Father Name',
          spouseName: 'Spouse Name',
          spouseTaxId: 111111111111,
          spouseTaxIdType: 2,
          birthDate: '1984-02-06',
          birthPlace: 'Rio de Janeiro',
          birthCountryId: 76,
          taxId: 11144455578,
          document: 'CPF',
          documentTypeId: 2,
          additionalDocumentId: 1,
          additionalDocumentIdentifier: '123456789',
          additionalDocumentIssueDate: '1990-12-30',
          additionalDocumentIssuedBy: 'Issuer name',
          partnerType: 'natural',
          displayAdditionalDocumentIssueDate: '30/12/1990',
          displayBirthDate: '06/02/1984',
        },
      ],
      legalPersons: [
        {
          key: 'test',
          tradeName: 'Campbelo Gestora',
          taxId: '111111111111',
          document: 'CNPJ',
          documentTypeId: 1,
          partnerType: 'legal',
        },
      ],
    };

    expect(PartnersModel(mockPartnersResponse))
      .to
      .deep
      .equal(mockModeledResponse);
  });
});
