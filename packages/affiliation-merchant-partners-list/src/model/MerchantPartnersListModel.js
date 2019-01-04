export const PartnersListModel = ([data]) =>
  data.data.reduce((allPartners, partner) => {
    if (partner.naturalPerson) {
      const modeledPartner = {
        name: partner.naturalPerson.name,
        documentType: partner.naturalPerson.taxIdType.name,
        documentNumber: partner.naturalPerson.taxId,
      };
      allPartners.push(modeledPartner);
    } else {
      const modeledPartner = {
        name: partner.legalPerson.name,
        documentType: partner.legalPerson.taxIdType.name,
        documentNumber: partner.legalPerson.taxId,
      };
      allPartners.push(modeledPartner);
    }
    return allPartners;
  }, []);
