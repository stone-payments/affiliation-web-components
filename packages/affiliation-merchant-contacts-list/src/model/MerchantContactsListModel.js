export const ContactsListModel = ([data]) => data.data.map(item => ({
  Nome: item.name,
  Cargo: item.typeName,
  Email: item.email,
  Telefone: item.phone,
  Celular: item.mobilePhone,
}));
