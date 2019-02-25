export const BankAccountsModel = (responses) => {
  const [banks, bankAccounts] = responses;

  const modeledData = {
    bankAccounts: bankAccounts.data,
    banks: banks.data,
  };

  modeledData.bankAccounts = modeledData.bankAccounts.map(item => ({
    key: item.key,
    bankId: item.bank.id,
    bankName: item.bank.name,
    branchCode: item.branchCode,
    branchCodeCheckDigit: item.branchCodeCheckDigit,
    accountNumber: item.accountNumber,
    accountNumberCheckDigit: item.accountNumberCheckDigit,
    accountTypeId: item.accountType.id,
    accountTypeName: item.accountType.name,
    statusId: item.status.id,
    statusName: item.status.name,

    branchCodeDisplay: item.branchCodeCheckDigit
      ? `${item.branchCode}-${item.branchCodeCheckDigit}`
      : item.branchCode,
    accountDisplayName: `${item.accountNumber}-${item.accountNumberCheckDigit}`,
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
        accountDisplayName: `${data.accountNumber}-${data.accountNumberCheckDigit}`,
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
