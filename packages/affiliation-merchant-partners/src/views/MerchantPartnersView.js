import { html } from 'sling-framework';
import '@stone-payments/emd-basic-table';
import { getWrappedLegalFormView } from './WrappedLegalForm.js';
import { getWrappedNaturalFormView } from './WrappedNaturalForm.js';
import { getWrappedCreatePartnerFormView } from './WrappedCreatePartnerForm.js';

const LegalPersonColumns = [{
  title: 'Nome Fantasia',
  field: 'tradeName',
}, {
  title: 'CNPJ',
  field: 'taxId',
  type: 'cnpj',
}];

const naturalPersonColumns = [{
  title: 'Nome',
  field: 'name',
}, {
  title: 'CPF',
  field: 'taxId',
  type: 'CPF',
}, {
  title: 'Nome da Mãe',
  field: 'motherName',
}, {
  title: 'Data de Nascimento',
  field: 'displayBirthDate',
}, {
  title: 'Cidade de nascimento',
  field: 'birthPlace',
}, {
  title: 'RG',
  field: 'additionalDocumentIdentifier',
}, {
  title: 'Emissão',
  field: 'displayAdditionalDocumentIssueDate',
}, {
  title: 'Expedidor',
  field: 'additionalDocumentIssuedBy',
},
];


export const getMerchantPartnersView = ({
  state,
  editable,
  addable,
  naturalPersons,
  legalPersons,
  isLoading,
  requestErrors,
  handleStartCreatePartner,
  handleStopCreatePartner,
  handleSubmitCreatePartner,
  handleStartEditLegalPerson,
  handleStopEditLegalPerson,
  handleSubmitEditLegalPersonForm,
  handleUpdateEditLegalPersonForm,
  handleStartEditNaturalPerson,
  handleStopEditNaturalPerson,
  handleSubmitEditNaturalPersonForm,
  handleUpdateEditNaturalPersonForm,
  handleDeleteNaturalPerson,
}) => html`
    <style>
      @import url('affiliation-merchant-partners/src/index.css');
    </style>
    <sling-message
      aim="error"
      srcdata="${requestErrors.length > 0 ? ['Ocorreu um erro ao acessar os dados.'] : []}"
      layout="outline">
    </sling-message>

    <div class="business-component">
      <sling-loader loading="${isLoading}"></sling-loader>


    ${getWrappedLegalFormView(
    state,
    handleStopEditLegalPerson,
    handleSubmitEditLegalPersonForm,
    handleUpdateEditLegalPersonForm)}
    ${legalPersons
    ? html`
      <sling-table
        onrowclicked="${handleStartEditLegalPerson}"
        editable="${editable}"
        srcdata="${state.partners.legalPersons}"
        srccolumns="${LegalPersonColumns}">
      </sling-table>
      `
    : ''}

    ${addable ? html`
    ${getWrappedCreatePartnerFormView(
    state,
    handleStopCreatePartner,
    handleSubmitCreatePartner)}
      <div class="business-component__button">
        <sling-button
          onclick="${handleStartCreatePartner}"
          size="big"
          color="success"
          type="submit">
          adicionar sócio Pessoa Física
        </sling-button>
      </div>
    ` : ''}
    ${getWrappedNaturalFormView(
    state,
    handleStopEditNaturalPerson,
    handleSubmitEditNaturalPersonForm,
    handleUpdateEditNaturalPersonForm,
    handleDeleteNaturalPerson)}
    ${naturalPersons
    ? html`
      <sling-table
        onrowclicked="${handleStartEditNaturalPerson}"
        editable="${editable}"
        srcdata="${state.partners.naturalPersons}"
        srccolumns="${naturalPersonColumns}">
      </sling-table>
      `
    : ''}
    </div>
  `;
