export const PartnersModel = ([data]) => data.map(item => ({
  name: item.name,
  email: item.email,
  rg: item.rg,
  cpf: item.cpf,
}));
