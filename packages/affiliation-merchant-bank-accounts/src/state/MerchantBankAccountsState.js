export const findAccountType = (availableBanks, bankId = undefined) => {
  const bank = availableBanks.find(el => el.id === Number(bankId));
  return bank ? bank.accountTypes : [];
};
