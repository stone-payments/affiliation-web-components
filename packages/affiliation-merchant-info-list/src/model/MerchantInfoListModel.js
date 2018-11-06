export const MerchantInfoListPayloadModel = state =>
  ({ fantasyName: state.formData.fantasyName });

export const MerchantInfoListModel = ([data], affiliationCode) => [{
  affiliationCode,
  cnpj: data.data.document,
  companyName: data.data.companyName,
  fantasyName: data.data.fantasyName,
  mccDescription: data.data.mccDescription,
}];

export const MerchantInfoListresponseModel = ([data], [oldValue]) => {
  console.log('aaaaaaaaaaaaaaaaa', data.data.fantasyName);
  const modeledData = {
    ...oldValue,
    fantasyName: data.data.fantasyName,
  };
  console.log('MODELED', modeledData);
  return [modeledData];
};

