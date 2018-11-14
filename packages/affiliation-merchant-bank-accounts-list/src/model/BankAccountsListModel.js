export const BankAccountsListModel = (responses) => {
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

  modeledData.banks = modeledData.banks.map(el => ({
    bankName: el.bankName,
    typeName: el.typeName,
    agencyNumber: el.agencyNumber,
    agencyNumberVerificationCode: el.agencyNumberVerificationCode,
    accountNumber: el.accountNumber,
    accountNumberVerificationCode: el.accountNumberVerificationCode,
  }));

  return modeledData;
};
