export const bankInfoListModel = (responses) => {
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

  modeledData.banks = {
    bankName: modeledData.banks.bankName,
    typeName: modeledData.banks.typeName,
    agencyNumber: modeledData.banks.agencyNumber,
    agencyNumberVerificationCode:
      modeledData.banks.agencyNumberVerificationCode,
    accountNumber: modeledData.banks.accountNumber,
    accountNumberVerificationCode:
      modeledData.banks.accountNumberVerificationCode,
  };

  console.log('aqui', modeledData);

  return [modeledData];
};
