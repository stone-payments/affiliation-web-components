import {
  DATE_LENGTH_VERIFY_NUMBER,
  RG_DOCUMENT_IDENTIFIER,
  MONTH_SUM_NUMBER,
} from '../contants/MerchantPartnersModelConstants.js';

export const formatDate = (date, target) => {
  const tempDate = new Date(date);

  let day = tempDate.getDate().toString();
  let month = (tempDate.getMonth() + MONTH_SUM_NUMBER).toString();
  const year = tempDate.getFullYear();

  day = (day.length === DATE_LENGTH_VERIFY_NUMBER) ? `0${day}` : day;
  month = (month.length === DATE_LENGTH_VERIFY_NUMBER) ? `0${month}` : month;

  if (target === 'display') {
    return `${day}/${month}/${year}`;
  }

  if (target === 'BR') {
    return `${day}-${month}-${year}`;
  }

  return `${year}-${month}-${day}`;
};

const findByDocumentTypeId = data =>
  data.find(item => item.documentTypeId === RG_DOCUMENT_IDENTIFIER);

export const PartnersModel = ([{ data }]) => {
  const modeledPartnersData =
  {
    naturalPartners: [],
    legalPartners: [],
  };

  return data.reduce((allPartners, partner) => {
    if (partner.naturalPerson) {
      const additionalDocument =
        findByDocumentTypeId(partner.naturalPerson.additionalDocuments);

      const modeledPartner = {
        key: partner.naturalPerson.key,
        name: partner.naturalPerson.name,
        motherName: partner.naturalPerson.motherName,
        fatherName: partner.naturalPerson.fatherName,
        spouseName: partner.naturalPerson.spouseName,
        spouseTaxId: partner.naturalPerson.spouseTaxId,
        spouseTaxIdType: partner.naturalPerson.spouseTaxIdType,
        birthDate: formatDate(partner.naturalPerson.birthdate),
        birthPlace: partner.naturalPerson.birthPlace,
        birthCountryId: partner.naturalPerson.birthCountry.id,
        taxId: partner.naturalPerson.taxId,
        documentTypeName: partner.naturalPerson.taxIdType.name,
        documentTypeId: partner.naturalPerson.taxIdType.id,
        additionalDocumentId: additionalDocument.documentTypeId,
        additionalDocumentIdentifier: additionalDocument.documentIdentifier,
        additionalDocumentIssueDate: formatDate(additionalDocument.issueDate),
        additionalDocumentIssuedBy: additionalDocument.issuedBy,
        partnerType: 'natural',

        displayAdditionalDocumentIssueDate:
          formatDate(additionalDocument.issueDate, 'display'),
        displayBirthDate:
          formatDate(partner.naturalPerson.birthdate, 'display'),
      };
      allPartners.naturalPartners.push(modeledPartner);
    } else {
      const modeledPartner = {
        key: partner.legalPerson.key,
        tradeName: partner.legalPerson.tradeName,
        taxId: partner.legalPerson.taxId,
        documentTypeName: partner.legalPerson.taxIdType.name,
        documentTypeId: partner.legalPerson.taxIdType.id,
        partnerType: 'legal',
      };
      allPartners.legalPartners.push(modeledPartner);
    }
    return allPartners;
  }, modeledPartnersData);
};

export const PayloadLegalModel = data => data;

export const PartnersLegalFormResponseModel = data => data;

export const PayloadNaturalModel = data => ({
  taxId: data.taxId,
  name: data.name,
  birthdate: data.birthDate,
  birthPlace: data.birthPlace,
  birthCountryId: data.birthCountryId,
  fatherName: data.fatherName,
  motherName: data.motherName,
  spouseTaxId: data.spouseName,
  spouseTaxIdType: data.spouseTaxIdType,
  spouseName: data.spouseName,
  additionalDocuments: [
    {
      documentTypeId: data.additionalDocumentId,
      documentIdentifier: data.additionalDocumentIdentifier,
      issuedBy: data.additionalDocumentIssuedBy,
      issueDate: data.additionalDocumentIssueDate,
    },
  ],
});

export const PartnersNaturalFormResponseModel = data => data;

export const PayloadCreatePartnerlModel = data => data;
