export const ModelEmailsList = (data) => {
  const modeledEmails = [];
  const dataEntries = Object.entries(data);

  dataEntries.forEach((item) => {
    const itemParts = item[0].split('-');

    if (itemParts[0] === 'email') {
      modeledEmails.push({
        key: String(itemParts[1]),
        email: item[1],
      });
    }
  });

  return modeledEmails;
};

export const ModelPhonesList = (data) => {
  const modeledPhones = [];
  const dataEntries = Object.entries(data);

  const modeledPhonesObject = {};

  dataEntries.forEach((item) => {
    const itemParts = item[0].split('-');

    switch (itemParts[0]) {
      case 'phoneNumber':
        modeledPhonesObject[itemParts[1]] = {
          ...modeledPhonesObject[itemParts[1]],
          key: String(itemParts[1]),
          phoneNumber: item[1],
        };
        break;

      case 'areaCode':
        modeledPhonesObject[itemParts[1]] = {
          ...modeledPhonesObject[itemParts[1]],
          areaCode: item[1],
        };
        break;

      case 'countryCode':
        modeledPhonesObject[itemParts[1]] = {
          ...modeledPhonesObject[itemParts[1]],
          countryCode: item[1],
        };
        break;

      case 'phoneTypeId':
        modeledPhonesObject[itemParts[1]] = {
          ...modeledPhonesObject[itemParts[1]],
          typeId: item[1],
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

export const ContactsModel = ([contacts]) => contacts.data.map(contact => ({
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

export const MerchantContactsPayloadModel = data => ({
  emails: ModelEmailsList(data),
  phones: ModelPhonesList(data),
  friendlyName: data.friendlyName,
  typeId: Number(data.typeId),
});

export const UpdateContactstList = (contactsList, [updatedContact]) =>
  contactsList.map((el => (el.key === updatedContact.data.key
    ? ({
      ...el,
      key: updatedContact.data.key,
      friendlyName: updatedContact.data.friendlyName,
      typeName: updatedContact.data.type.name,
      typeId: updatedContact.data.type.id,
      emails: updatedContact.data.emails,
      phones: updatedContact.data.phones,
      email: updatedContact.data.emails[0]
        ? updatedContact.data.emails[0].email
        : '',
      phoneNumber: String(updatedContact.data.phones[0].phoneNumber),
      countryCode: String(updatedContact.data.phones[0].countryCode),
      areaCode: String(updatedContact.data.phones[0].areaCode),
      displayPhone: updatedContact.data.phones[0]
        ? `${updatedContact.data.phones[0].areaCode}${updatedContact.data.phones[0].phoneNumber}`
        : '',
    })
    : el
  )));
