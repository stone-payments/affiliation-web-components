import { html } from 'sling-framework';
import 'sling-web-component-table';
import 'sling-web-component-form';
import 'sling-web-component-input';
import 'sling-web-component-select';
import 'sling-web-component-loader';
import 'sling-web-component-message';
import 'sling-web-component-button';
import { getWrappedFormView } from './WrappedFormView.js';

const columns = [
  {
    title: 'Descrição',
    field: 'typeName',
  },
  {
    title: 'Endereço',
    field: 'streetDisplay',
  },
  {
    title: 'Bairro',
    field: 'neighborhood',
  },
  {
    title: 'Cidade / UF',
    field: 'cityDisplay',
  },
  {
    title: 'CEP',
    field: 'postalCode',
  },
];

export const getMerchantAddressesView = ({
  requestErrors,
  editable,
  addable,
  state,
  isLoading,
  handleStartEditing,
  handleStopEditing,
  handleFormSubmit,
  handleFormUpdate,
}) => {
  console.log('view', state);
  return html`
  <style>
    @import url('affiliation-merchant-addresses/src/index.css');
  </style>
  <sling-message
    aim="error"
    srcdata="${requestErrors.length > 0 ? ['Ocorreu um erro ao acessar os dados'] : []}"
    layout="outline">
  </sling-message>
  ${getWrappedFormView(state, handleStopEditing, handleFormSubmit, handleFormUpdate)}
  <div class="business-component">
    <sling-loader loading="${isLoading}"></sling-loader>
    ${addable ? html`
      <div class="business-component__button">
        <sling-button
          color="success"
          type="text">
          adicionar endereço
        </sling-button>
      </div>
    ` : ''}
    <sling-table
      editable="${editable}"
      onrowclicked="${handleStartEditing}"
      srcdata="${state.addresses}"
      srccolumns="${columns}">
    </sling-table>
  </div>
`;
};
