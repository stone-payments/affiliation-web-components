import { html } from 'sling-framework';
import '@stone-payments/emd-basic-table';
import { getWrappedFormView } from './WrappedLegalForm.js';

const LegalPersonColumns = [{
  title: 'Nome Fantasia',
  field: 'tradeName',
}, {
  title: 'Tipo de documento',
  field: 'document',
}, {
  title: 'N° documento',
  field: 'documentId',
  type: 'cnpj',
}];

const naturalPrsonColumns = [{
  title: 'Nome',
  field: 'name',
}, {
  title: 'Tipo de documento',
  field: 'document',
}, {
  title: 'N° documento',
  field: 'documentId',
  type: 'CPF',
}];

export const getMerchantPartnersView = ({
  state,
  editable,
  addable,
  naturalPersons,
  legalPersons,
  isLoading,
  requestErrors,
  createPartner,
  handleStartEditeLegalPerson,
  handleStopEditeLegalPerson,
  handleSubmitEditeLegalPersonForm,
  handleUpdateEditeLegalPersonForm,
}) => html`
    <style>
      @import url('affiliation-merchant-partners/src/index.css');
    </style>
    <sling-message
      aim="error"
      srcdata="${requestErrors.length > 0 ? ['Ocorreu um erro ao acessar os dados.'] : []}"
      layout="outline">
    </sling-message>
    ${getWrappedFormView(
    state,
    handleStopEditeLegalPerson,
    handleSubmitEditeLegalPersonForm,
    handleUpdateEditeLegalPersonForm)}
    <div class="business-component">
      <sling-loader loading="${isLoading}"></sling-loader>
      ${addable ? html`
        <div class="business-component__button">
          <sling-button
            onclick="${createPartner}"
            size="big"
            color="success"
            type="text">
            adicionar contato
          </sling-button>
        </div>
      ` : ''}
    ${legalPersons
    ? html`
    <h3>Legal Person</h3>
      <sling-table
        onrowclicked="${handleStartEditeLegalPerson}"
        editable="${editable}"
        srcdata="${state.partners.legalPersons}"
        srccolumns="${LegalPersonColumns}">
      </sling-table>
      `
    : ''}
    ${naturalPersons
    ? html`
    <h3>Neutral Person</h3>
      <sling-table
        onrowclicked="${''}"
        editable="${editable}"
        srcdata="${state.partners.naturalPersons}"
        srccolumns="${naturalPrsonColumns}">
      </sling-table>
      `
    : ''}
    </div>
  `;
