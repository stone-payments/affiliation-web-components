export const PartnersListModel = ([data]) => data.map(item => ({
  name: item.name,
  email: item.email,
  rg: item.rg,
  cpf: item.cpf,
}));

