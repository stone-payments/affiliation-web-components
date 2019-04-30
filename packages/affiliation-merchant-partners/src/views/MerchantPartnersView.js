import 'sling-web-component-message';
import 'sling-web-component-loader';
import 'sling-web-component-table';
import 'sling-web-component-button';

import { html } from 'sling-framework';
import { getWrappedLegalFormView } from './WrappedLegalForm.js';
import { getWrappedNaturalFormView } from './WrappedNaturalForm.js';
import { getWrappedCreatePartnerFormView } from './WrappedCreatePartnerForm.js';

const LegalPartnerColumns = [{
  title: 'Nome Fantasia',
  field: 'tradeName',
}, {
  title: 'CNPJ',
  field: 'taxId',
  type: 'cnpj',
}];

const NaturalPartnerColumns = [{
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
  title: 'Cidade de Nascimento',
  field: 'birthPlace',
}, {
  title: 'RG',
  field: 'additionalDocumentIdentifier',
}, {
  title: 'Data de Emissão',
  field: 'displayAdditionalDocumentIssueDate',
}, {
  title: 'Órgão Expedidor',
  field: 'additionalDocumentIssuedBy',
},
];


export const getMerchantPartnersView = ({
  state,
  editable,
  addable,
  naturalPartners,
  legalPartners,
  isLoading,
  requestErrors,
  handleStartCreatePartner,
  handleStopCreatePartner,
  handleSubmitCreatePartner,
  handleStartEditLegalPartner,
  handleStopEditLegalPartner,
  handleSubmitEditLegalPartnerForm,
  handleUpdateEditLegalPartnerForm,
  handleStartEditNaturalPartner,
  handleStopEditNaturalPartner,
  handleSubmitEditNaturalPartnerForm,
  handleUpdateEditNaturalPartnerForm,
  handleDeleteNaturalPartner,
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
    handleStopEditLegalPartner,
    handleSubmitEditLegalPartnerForm,
    handleUpdateEditLegalPartnerForm)}
    ${legalPartners
    ? html`
      <sling-table
        onrowclicked="${handleStartEditLegalPartner}"
        editable="${editable}"
        srcdata="${state.partners.legalPartners}"
        srccolumns="${LegalPartnerColumns}">
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
    handleStopEditNaturalPartner,
    handleSubmitEditNaturalPartnerForm,
    handleUpdateEditNaturalPartnerForm,
    handleDeleteNaturalPartner)}
    ${naturalPartners
    ? html`
      <sling-table
        onrowclicked="${handleStartEditNaturalPartner}"
        editable="${editable}"
        srcdata="${state.partners.naturalPartners}"
        srccolumns="${NaturalPartnerColumns}">
      </sling-table>
      `
    : ''}
    </div>
  `;
