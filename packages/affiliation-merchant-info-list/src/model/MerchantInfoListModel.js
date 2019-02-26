const formatDocument = (document) => {
  let formattedDocument;
  if (document.length === 14) {
    formattedDocument = document.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');

    return formattedDocument;
  }

  if (document.length === 11) {
    formattedDocument = document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    return formattedDocument;
  }

  return 'Documento inválido';
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
  [{ data }], affiliationCode, showBasicData, showAdditionalData) => {
  const modeledData = {
    basicData: [],
    additionalData: [],
  };

  if (showAdditionalData && showBasicData) {
    modeledData.basicData.push({
      affiliationCode,
      documentType: data.taxIdType.name,
      documentNumber: formatDocument(data.taxId),
      legalName: data.legalName,
      tradeName: data.tradeName,
      mccDescription: data.mcc.name,
    });

    modeledData.additionalData.push({
      // @TODO Update logic to be generic to all additional data array
      additionalDocumentType: data.additionalDocuments[0].documentType.name,
      additionalDocumentIdentifier:
        formatDocument(data.additionalDocuments[0].documentIdentifier),
      issueBy: data.additionalDocuments[0].issuedBy,
      issueDate: formatDate(data.additionalDocuments[0].issueDate),
      expirationDate: formatDate(data.additionalDocuments[0].expirationDate),
      estimatedMonthlyBilling: `R$ ${data.estimatedMonthlyBilling}`,
      birthDate: formatDate(data.birthDate),
      birthPlace: data.birthPlace,
      birthCountry: data.birthCountry.name,
      motherName: data.motherName,
    });

    return modeledData;
  }

  if (showAdditionalData && !showBasicData) {
    modeledData.additionalData.push({
      // @TODO Update logic to be generic to all additional data array
      additionalDocumentType: data.additionalDocuments[0].documentType.name,
      additionalDocumentIdentifier:
        formatDocument(data.additionalDocuments[0].documentIdentifier),
      issueBy: data.additionalDocuments[0].issuedBy,
      issueDate: formatDate(data.additionalDocuments[0].issueDate),
      expirationDate: formatDate(data.additionalDocuments[0].expirationDate),
      estimatedMonthlyBilling: `R$ ${data.estimatedMonthlyBilling}`,
      birthDate: formatDate(data.birthDate),
      birthPlace: data.birthPlace,
      birthCountry: data.birthCountry.name,
      motherName: data.motherName,
    });

    return modeledData;
  }
  if (showBasicData && !showAdditionalData) {
    modeledData.basicData.push({
      affiliationCode,
      documentType: data.taxIdType.name,
      documentNumber: formatDocument(data.taxId),
      legalName: data.legalName,
      tradeName: data.tradeName,
      mccDescription: data.mcc.name,
    });

    return modeledData;
  }

  return modeledData;
};
