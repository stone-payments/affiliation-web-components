export const MerchantInfoListPayloadModel = state => ({
  tradeName: state.formData.fantasyName,
  mccId: state.formData.mccId,
});

export const MerchantInfoListResponseModel = ([data], [oldValue]) => {
  const modeledData = {
    ...oldValue,
    tradeName: data.data.fantasyName,
  };

  return [modeledData];
};

export const MerchantInfoListModel = ([data], affiliationCode) => [{
  affiliationCode,
  cnpj: data.taxId,
  legalName: data.legalName,
  tradeName: data.tradeName,
  mccDescription: data.mcc.name,
}];
