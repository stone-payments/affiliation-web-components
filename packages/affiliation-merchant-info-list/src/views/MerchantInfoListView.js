import { html } from 'sling-framework';
import 'sling-web-component-list';
import 'sling-web-component-button';
import 'sling-web-component-loader';
import 'sling-web-component-message';
import { getWrappedFormView } from './WrappedFormView.js';

const keys = [
  'StoneCode',
  'CNPJ',
  'Razão Social',
  'Nome Fantasia',
  'Ramo de Atividade',
];

export const getMerchantInfoListView = ({
  state,
  requestErrors,
  isLoading,
  cascadelist,
  editable,
  handleFormSubmit,
  handleFormUpdate,
  handleStartEditing,
  handleStopEditing,
}) => html`
  <style>
    @import url('affiliation-merchant-info-list/src/index.css');
  </style>
  <sling-message
    aim="error"
    srcdata="${requestErrors.length > 0 ? ['Ocorreu um erro ao acessar os dados.'] : []}"
    layout="outline">
  </sling-message>
  <div class="business-component">
  <sling-loader loading="${isLoading}"></sling-loader>
  ${getWrappedFormView(state, handleStopEditing, handleFormSubmit, handleFormUpdate)}
  <sling-list
    cascadelist="${cascadelist}"
    srcdata="${state.info}"
    srckeys="${keys}">
  </sling-list>
  ${editable ? html`
    <sling-button
      onclick="${handleStartEditing}">
      Editar
    </sling-button>
  ` : ''}
  </div>
`;
