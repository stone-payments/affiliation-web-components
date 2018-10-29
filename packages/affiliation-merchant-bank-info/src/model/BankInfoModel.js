export const bankInfoModel = (responses) => {
  const [availableBanks, banks] = responses;
  const modeledData = {
    banks: banks.data,
    availableBanks: availableBanks.data,
  };

  modeledData.banks = modeledData.banks.reduce((result, current) => {
    const repeatedAccountNumbers = result.map(item => item.accountNumber);
    const repeatedAgencyNumbers = result.map(item => item.agencyNumber);
    const repeatedBankIds = result.map(item => item.bankId);

    if (repeatedAccountNumbers.includes(current.accountNumber) &&
      repeatedAgencyNumbers.includes(current.agencyNumber) &&
      repeatedBankIds.includes(current.bankId)) {
      return result;
    }

    return [...result, current];
  }, []);

  return modeledData;
};

export const bankInfoResponseModel = (state, responses) => {
  const [oldValue] = state;
  const [data] = responses;

  const modeledData = {
    bankName: data.data.bankName || oldValue.bankName,
    typeName: data.data.typeName ? data.data.typeName : oldValue.typeName,
    accountNumber: data.data.accountNumber,
    accountNumberVerificationCode: data.data.accountNumberVerificationCode,
    agencyNumber: data.data.agencyNumber,
    agencyNumberVerificationCode: data.data.agencyNumberVerificationCode,
    bankId: data.data.bankId,
    statusId: data.data.statusId,
    typeId: data.data.typeId,
    centralizedPayment: data.data.centralizedPayment,
  };

  return [modeledData];
};

