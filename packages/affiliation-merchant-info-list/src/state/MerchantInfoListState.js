export const getInfo = (state) => {
  const [infoData] = state.info.basicData || [];
  const [responseMerchant] = state.apiResponse;
  console.log(infoData, 'batman');
  console.log(responseMerchant, 'flash');
  if (infoData) {
    return {
      ...infoData,
      mccId: responseMerchant.data.mcc.id,
    };
  }

  return '';
};

