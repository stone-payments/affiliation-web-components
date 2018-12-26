export const PartnersModel = ([data]) => data.map(item => ({
  name: item.name,
  email: item.email,
  rg: item.rg,
  cpf: item.cpf,
}));

export const NewPartnersModel = ([data]) => {
  console.log('model', data);
  const newData = data.map((item) => {
    if (item.naturalPerson) {
      return {
        name: item.naturalPerson.name,
        document: item.naturalPerson.taxId,
        email: item.naturalPerson.email ? item.naturalPerson.email : 'N/A',
        rg: item.naturalPerson.rg ? item.naturalPerson.rg : 'N/A',
      };
    }
    return '';
  });
  return newData;
};
