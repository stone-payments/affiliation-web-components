export const getInfo = (state) => {
  const [infoData] = state.info;
  const [responseMerchant] = state.apiResponse;

  if (infoData) {
    return {
      ...infoData,
      mccId: responseMerchant.mcc.id,
    };
  }

  return '';
};

