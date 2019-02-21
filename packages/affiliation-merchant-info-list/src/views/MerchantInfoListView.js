import { html } from 'sling-framework';
import 'sling-web-component-list';
import 'sling-web-component-button';
import 'sling-web-component-loader';
import 'sling-web-component-message';
import { getWrappedFormView } from './WrappedFormView.js';


const basicDataKeys = [
  'StoneCode',
  'Documento',
  'Razão Social',
  'Nome Fantasia',
  'Ramo de Atividade',
];

const additionalDataKeys = [
  'Documento adicional',
  'Publicador',
  'Data de publicação',
  'Data de validade',
  'Faturamento mensal estimado',
  'Data de Nascimento',
  'Local de nascimento',
  'País de nascimento',
];

export const getMerchantInfoListView = ({
  state,
  requestErrors,
  isLoading,
  showAdditionalData,
  showBasicData,
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
    ${showBasicData
    ? html`
      <sling-list
        cascadelist="${cascadelist}"
        srcdata="${state.info.basicData}"
        srckeys="${basicDataKeys}">
      </sling-list>
      `
    : ''}
    ${showAdditionalData
    ? html`
      <sling-list
        cascadelist="${cascadelist}"
        srcdata="${state.info.additionalData}"
        srckeys="${additionalDataKeys}">
      </sling-list>
    `
    : ''}
    ${editable && showBasicData
    ? html`
      <sling-button
        onclick="${handleStartEditing}">
        Editar
      </sling-button>
    `
    : ''}
    </div>
  `;
