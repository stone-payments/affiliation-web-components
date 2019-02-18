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
  const [data] = responses;
  const modeledArray = [];

  state.map((el) => {
    if (el.key === data.key) {
      const newEl = {
        ...el,
        key: data.key,
        bankId: data.bank.id,
        bankName: data.bank.name,
        branchCode: data.branchCode,
        branchCodeCheckDigit: data.branchCodeCheckDigit,
        accountNumber: data.accountNumber,
        accountNumberCheckDigit: data.accountNumberCheckDigit,
        accountTypeId: data.accountType.id,
        accountTypeName: data.accountType.name,
        statusId: data.status.id,
        statusName: data.status.name,

        branchCodeDisplay: data.branchCodeCheckDigit
          ? `${data.branchCode}-${data.branchCodeCheckDigit}`
          : data.branchCode,
        accountDisplayNmae: `${data.accountNumber}-${data.accountNumberCheckDigit}`,
      };

      return modeledArray.push(newEl);
    }

    return modeledArray.push(el);
  });

  return modeledArray;
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
