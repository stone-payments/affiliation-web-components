export const PartnersModel = ([{ data }]) => {
  const modeledPartnersData =
  {
    naturalPersons: [],
    legalPersons: [],
  };

  return data.reduce((allPartners, partner) => {
    console.log(allPartners, partner);
    if (partner.naturalPerson) {
      const modeledPartner = {
        name: partner.naturalPerson.name,
        documentId: partner.naturalPerson.taxId,
        document: partner.naturalPerson.taxIdType.name,
        partnerType: 'natural',
      };
      allPartners.naturalPersons.push(modeledPartner);
    } else {
      const modeledPartner = {
        tradeName: partner.legalPerson.tradeName,
        documentId: partner.legalPerson.taxId,
        document: partner.legalPerson.taxIdType.name,
        partnerType: 'legal',
      };
      allPartners.legalPersons.push(modeledPartner);
    }
    return allPartners;
  }, modeledPartnersData);
};

export const PayloadLegalModel = () => {};

export const PartnersLegalFormResponseModel = () => {};

export const PartnersNaturalFormResponseModel = () => {};

export const PayloadNaturalModel = () => {};
