import { replaceNonDigits } from 'sling-helpers';

export const ContactsModel = ([data]) => data.map(contact => ({
  key:contact.key,
  friendlyName: contact.friendlyName,
  typeName: contact.type.name,
  typeId: contact.type.id,
  emails: contact.emails,
  phones: contact.phones || [],
  email: contact.emails[0] ? contact.emails[0].email : '',
  phoneNumber: String(contact.phones[0].phoneNumber),
  countryCode: String(contact.phones[0].countryCode),
  areaCode: String(contact.phones[0].areaCode),
  displayPhone: contact.phones[0]
    ? `${contact.phones[0].areaCode}${contact.phones[0].phoneNumber}`
    : '',
}));

export const MerchantContactsPayloadModel = (data) => {
 
  const modeledEmails = Object.entries

  
    const modeledData = {
    name: data.name,
    typeId: Number(data.typeId),
    email: data.email,
    phone: replaceNonDigits(data.phone),
  };
}

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
