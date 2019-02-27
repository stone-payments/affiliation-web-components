export const getInfo = (state) => {
  const [infoData] = state.info.basicData || [];
  const [responseMerchant] = state.apiResponse;
  if (infoData) {
    return {
      ...infoData,
      mccId: responseMerchant.data.mcc.id,
    };
  }

  return '';
};

