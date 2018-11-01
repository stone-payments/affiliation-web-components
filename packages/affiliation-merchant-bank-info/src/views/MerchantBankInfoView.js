import { html } from 'sling-framework';
import 'sling-web-component-message';
import 'sling-web-component-loader';
import 'sling-web-component-table';
import 'sling-web-component-button';
import { getWrappedFromView } from './WrappedFormView.js';

const columns = [{
  title: 'Banco',
  field: 'bankName',
}, {
  title: 'Tipo',
  field: 'typeName',
}, {
  title: 'Agência',
  field: 'agencyNumber',
}, {
  title: 'Dígito',
  field: 'agencyNumberVerificationCode',
}, {
  title: 'Conta',
  field: 'accountNumber',
}, {
  title: 'Dígito',
  field: 'accountNumberVerificationCode',
}];

export const getMerchantBankInfoView = ({
  state,
  isLoading,
  requestErrors,
  addable,
  editable,
  handleStartEditing,
  handleStopEditing,
  handleFormSubmit,
  handleFormUpdate,
}) => html`
  <style>
    @import url('affiliation-merchant-bank-info/src/index.css');
  </style>
  <sling-message
    aim="error"
    srcdata="${requestErrors.length > 0 ? ['Ocorreu um erro ao acessar os dados.'] : []}"
    layout="outline">
  </sling-message>
  ${getWrappedFromView(state, handleStopEditing, handleFormSubmit, handleFormUpdate)}
  <div class="business-component">
    <sling-loader loading="${isLoading}"></sling-loader>
    ${addable ? html`
      <div class="business-component__button">
        <sling-button
          size="big"
          color="success"
          type="text">
          adicionar dados bancários
        </sling-button>
      </div>
    ` : ''}
    <sling-table
      editable="${editable}"
      onrowclicked="${handleStartEditing}"
      srcdata="${state.banks}"
      srccolumns="${columns}">
    </sling-table>
  </div>
  `;
