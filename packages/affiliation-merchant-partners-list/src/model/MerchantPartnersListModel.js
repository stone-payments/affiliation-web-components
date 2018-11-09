export const PartnersListModel = ([data]) => data.map(item => ({
  Nome: item.name,
  email: item.email,
  RG: item.rg,
  CPF: item.cpf,
}));

