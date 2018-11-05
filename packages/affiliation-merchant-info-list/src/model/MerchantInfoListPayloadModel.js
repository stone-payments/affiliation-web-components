export const MerchantInfoListPayloadModel = state =>
  ({ fantasyName: state.formdata.fantasyName });

export const MerchantInfoListModel = ([data], affiliationCode) => [{
  affiliationCode,
  cnpj: data.data.document,
  companyName: data.data.companyName,
  fantasyName: data.data.fantasyName,
  mccDescription: data.data.mccDescription,
}];
