import { html } from 'sling-framework';
import 'sling-web-component-table';
import 'sling-web-component-loader';
import 'sling-web-component-message';
import 'sling-web-component-button';
import { getWrappedForm } from './WrappedFormView';

const columns = [{
  title: 'Nome',
  field: 'name',
}, {
  title: 'Cargo',
  field: 'typeName',
}, {
  title: 'E-mail',
  field: 'email',
}, {
  title: 'Telefone',
  field: 'phone',
  type: 'phone',
}];

export const getMerchantContactsView = ({
  state,
  addable,
  editable,
  requestErrors,
  isLoading,
  handleStartEditing,
  handleStopEditing,
  handleFormSubmit,
  handleFormUpdate,
}) => html`
    <style>
      @import url('affiliation-merchant-contacts/src/index.css');
      </style>
      <sling-message
        aim="error"
        srcdata="${requestErrors.length > 0 ? ['Ocorreu um erro ao acessar os dados.'] : []}"
        layout="outline"></sling-message>
      ${getWrappedForm(state, handleStopEditing, handleFormSubmit, handleFormUpdate)}
      <div class="business-component">
      <sling-loader loading="${isLoading}"></sling-loader>
        ${addable ? html`
          <div class="business-component__button">
            <sling-button
              size="big"
              color="success"
              type="text">
              adicionar contato
            </sling-button>
          </div>
        ` : ''}
        <sling-table
          editable="${editable}"
          onrowclicked="${handleStartEditing}"
          srcdata="${state.contacts}"
          srccolumns="${columns}">
        </sling-table>
      </div>
    `;
