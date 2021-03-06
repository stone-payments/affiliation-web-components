import { replaceNonDigits } from 'sling-helpers';

export const ContactsModel = ([data]) => data.map(contact => ({
  name: contact.friendlyName,
  typeName: contact.type.name,
  typeId: contact.type.id,
  email: contact.emails[0] ? contact.emails[0].email : 'N/A',
  phone: contact.phones[0]
    ? `${contact.phones[0].areaCode}${contact.phones[0].phoneNumber}`
    : 'N/A',
}));

export const MerchantContactsPayloadModel = data => ({
  name: data.name,
  typeId: Number(data.typeId),
  email: data.email,
  phone: replaceNonDigits(data.phone),
});

export const UpdateContactstList = (list, [item]) =>
  list.map((el => (el.id === item.data.id
    ? ({
      ...el,
      name: item.data.name,
      typeId: item.data.typeId,
      email: item.data.email,
      phone: item.data.phone,
    })
    : el
  )));
