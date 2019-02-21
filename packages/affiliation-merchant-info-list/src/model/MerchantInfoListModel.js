const formatDocument = (document) => {
  let formatedDocument;

  if (document.length === 14) {
    formatedDocument = document.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1 $2 $3/$4-$5');

    return formatedDocument;
  }

  if (document.length === 11) {
    formatedDocument = document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    return formatedDocument;
  }

  return 'Documento invalido';
};

const formatDate = (date) => {
  const tempDate = new Date(date);
  let day = tempDate.getDate().toString();
  let month = (tempDate.getMonth() + 1).toString();
  const year = tempDate.getFullYear();

  day = (day.length === 1) ? `0${day}` : day;
  month = (month.length === 1) ? `0${month}` : month;

  return `${day}/${month}/${year}`;
};

export const MerchantInfoListPayloadModel = state => ({
  tradeName: state.formData.fantasyName,
  mccId: state.formData.mccId,
});

export const MerchantInfoListResponseModel = ([data], [oldValue]) => {
  const modeledData = {
    ...oldValue,
    tradeName: data.data.fantasyName,
  };

  return [modeledData];
};

export const MerchantInfoListModel = (
  [data], affiliationCode, showAdditionalData, showBasicData) => {
  const modeledData = {
    basicData: [],
    additionalData: [],
  };

  console.log(data);

  if (showAdditionalData && showBasicData) {
    modeledData.basicData.push({
      affiliationCode,
      documentNumber: formatDocument(data.taxId),
      legalName: data.legalName,
      tradeName: data.tradeName,
      mccDescription: data.mcc.name,
    });

    modeledData.additionalData.push({
      // @TODO Update logic to be generic to all additional data array
      additionalDocumentIdentifier:
        formatDocument(data.additionalDocuments.documentIdentifier),
      issueBy: data.additionalDocuments.issueBy,
      issueDate: formatDate(data.additionalDocuments.issueDate),
      expirationDate: formatDate(data.additionalDocuments.expirationDate),
      extimatedMonthlyBilling: `R$ ${data.additionalDocuments.extimatedMonthlyBilling}`,
      birthDate: formatDate(data.additionalDocuments.birthDate),
      birthPlace: data.additionalDocuments.birthPlace,
      birthCountry: data.additionalDocuments.birthCountry.name,
    });

    return modeledData;
  }

  if (showAdditionalData && !showBasicData) {
    return [{
      // @TODO Update logic to be generic to all additional data array
      additionalDocumentIdentifier: data.additionalDocumentIdentifier,
      issueBy: data.issueBy,
      issueDate: data.issueDate,
      expirationDate: data.expirationDate,
      extimatedMonthlyBilling: `R$ ${data.extimatedMonthlyBilling}`,
      birthDate: data.birthDate,
      birthPlace: data.birthPlace,
      birthCountry: data.birthCountry.name,
    }];
  }

  return [{
    affiliationCode,
    documentNumber: formatDocument(data.taxId),
    legalName: data.legalName,
    tradeName: data.tradeName,
    mccDescription: data.mcc.name,
  }];
};
