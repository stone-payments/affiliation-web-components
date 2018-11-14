import { replaceNonDigits } from 'sling-helpers';

export const contactsModel = ([data]) => data.data;

export const merchantContactsPayloadModel = (data) => {
  const modeledData = {
    name: data.name,
    typeId: Number(data.typeId),
    email: data.email,
    phone: replaceNonDigits(data.phone),
    mobilePhone: replaceNonDigits(data.mobilePhone),
  };

  return modeledData;
};

export const updateContactstList = (list, [item]) => {
  const data = list.map((el => (el.id === item.data.id
    ? ({
      ...el,
      name: item.data.name,
      typeId: item.data.typeId,
      email: item.data.email,
      phone: item.data.phone,
      mobilePhone: item.data.mobilePhone,
    })
    : el
  )));

  return data;
};
