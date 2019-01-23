export const MerchantInfoListPayloadModel = state =>
  ({ fantasyName: state.formData.fantasyName });

export const MerchantInfoListResponseModel = ([data], [oldValue]) => {
  const modeledData = {
    ...oldValue,
    fantasyName: data.data.fantasyName,
  };

  return [modeledData];
};

export const MerchantInfoListModel = ([data], affiliationCode) => [{
  affiliationCode,
  cnpj: data.taxId,
  companyName: data.legalName,
  fantasyName: data.tradeName,
  mccDescription: data.mcc.name,
}];
