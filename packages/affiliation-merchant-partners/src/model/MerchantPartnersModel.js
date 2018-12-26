export const PartnersModel = ([data]) => data.map(item => ({
  name: item.name,
  email: item.email,
  rg: item.rg,
  cpf: item.cpf,
}));

export const NewPartnersModel = ([data]) =>
  data.reduce((allPartners, partner) => {
    console.log(partner);
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
    console.log('batman', allPartners);
    return allPartners;
  }, []);
