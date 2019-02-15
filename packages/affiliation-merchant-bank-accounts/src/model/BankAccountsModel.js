export const BankAccountsModelWithAvailableBanks = (responses) => {
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

export const BankAccountsModel = (responses) => {
  const [availableBanks, banks] = responses;

  const modeledData = {
    banks: banks.data,
    availableBanks: availableBanks.data,
  };

  modeledData.banks = modeledData.banks.map(bank => ({
    key: bank.key,
    bankId: bank.bank.id,
    bankName: bank.bank.name,
    branchCode: bank.branchCode,
    branchCodeCheckDigit: bank.branchCodeCheckDigit,
    accountNumber: bank.accountNumber,
    accountNumberCheckDigit: bank.accountNumberCheckDigit,
    accountTypeId: bank.accountType.id,
    accountTypeName: bank.accountType.name,
    statusId: bank.status.id,
    statusName: bank.status.name,

    branchCodeDisplay: bank.branchCodeCheckDigit
      ? `${bank.branchCode}-${bank.branchCodeCheckDigit}`
      : bank.branchCode,
    accountDisplayNmae: `${bank.accountNumber}-${bank.accountNumberCheckDigit}`,
  }));
  return modeledData;
};

export const BankAccountsFormResponseModel = (state, responses) => {
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

export const PayloadModel = payloadData => ({
  bankId: Number(payloadData.bankId),
  branchCode: payloadData.branchCode,
  branchCodeCheckDigit: payloadData.branchCodeCheckDigit
    ? payloadData.branchCodeCheckDigit
    : null,
  accountNumber: payloadData.accountNumber,
  accountNumberCheckDigit: payloadData.accountNumberCheckDigit,
  accountTypeId: Number(payloadData.accountTypeId),
  statusId: Number(payloadData.statusId),
});
