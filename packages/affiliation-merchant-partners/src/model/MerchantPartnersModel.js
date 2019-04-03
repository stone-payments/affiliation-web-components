export const PartnersModel = ([{ data }]) =>
  data.reduce((allPartners, partner) => {
    if (partner.naturalPerson) {
      const modeledPartner = {
        name: partner.naturalPerson.name,
        documentId: partner.naturalPerson.taxId,
        document: partner.naturalPerson.taxIdType.name,
        partnerType: 'natural',
      };
      allPartners.push(modeledPartner);
    } else {
      const modeledPartner = {
        name: partner.legalPerson.name,
        documentId: partner.legalPerson.taxId,
        document: partner.legalPerson.taxIdType.name,
        partnerType: 'legal',
      };
      allPartners.push(modeledPartner);
    }
    return allPartners;
  }, []);
