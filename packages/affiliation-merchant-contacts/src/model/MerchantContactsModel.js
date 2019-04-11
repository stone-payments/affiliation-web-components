import { replaceNonDigits } from 'sling-helpers';

export const ModelEmailsList = (data) => {
  const modeledEmails = [];
  const dataEntries = Object.entries(data);

  dataEntries.forEach((item) => {
    if (item[0].split('-')[0] === 'email') {
      modeledEmails.push({
        key: item[0].split('-')[1],
        email: item[1],
      });
    }
  });

  return modeledEmails;
};

export const ModelPhonesList = (data) => {
  debugger;
  const modeledPhones = [];
  const dataEntries = Object.entries(data);

  let modeledPhonesObject = {};

  dataEntries.forEach((item) => {
    switch (item[0].split('-')[0]) {
      case 'phoneNumber':
        modeledPhonesObject[item[0].split('-')[1]] = {
          ...modeledPhonesObject[item[0].split('-')[1]],
          key: item[0].split('-')[1],
          phoneNumber: item[1],
        };
        break;

      case 'areaCode':
        modeledPhonesObject[item[0].split('-')[1]] = {
          ...modeledPhonesObject[item[0].split('-')[1]],
          areaCode: item[1],
        };
        break;

      case 'countryCode':
        modeledPhonesObject[item[0].split('-')[1]] = {
          ...modeledPhonesObject[item[0].split('-')[1]],
          countryCode: item[1],
        };
        break;

      case 'typeId':
        modeledPhonesObject[item[0].split('-')[1]] = {
          ...modeledPhonesObject[item[0].split('-')[1]],
          areaCode: item[1],
        };
        break;

      default:
        break;
    }
  });

  Object
    .keys(modeledPhonesObject)
    .map(key => modeledPhones.push(modeledPhonesObject[key]));

  return modeledPhones;
};

// const ModelEmailsList = data => Object
//   .entries(data)
//   .reduce((result, [key, email]) => {
//     return (key.split('-')[0] === 'email')
//       ? [ ...result, { key: key.split('-')[1], email } ]
//       : result;
//   }, []);

export const ContactsModel = ([data]) => data.map(contact => ({
  key: contact.key,
  friendlyName: contact.friendlyName,
  typeName: contact.type.name,
  typeId: contact.type.id,
  emails: contact.emails,
  phones: contact.phones,
  email: contact.emails[0] ? contact.emails[0].email : '',
  phoneNumber: String(contact.phones[0].phoneNumber),
  countryCode: String(contact.phones[0].countryCode),
  areaCode: String(contact.phones[0].areaCode),
  displayPhone: contact.phones[0]
    ? `${contact.phones[0].areaCode}${contact.phones[0].phoneNumber}`
    : '',
}));

export const MerchantContactsPayloadModel = (data) => {
  return {
    emails: ModelEmailsList(data),
    phones: ModelPhonesList(data),
    friendlyName: data.friendlyName,
    typeId: Number(data.typeId),
    phone: replaceNonDigits(data.phone),
  };
};

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
