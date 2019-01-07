import { html } from 'sling-framework';

const columns = [{
  title: 'Nome',
  field: 'name',
}, {
  title: 'Tipo de documento',
  field: 'document',
}, {
  title: 'N° documento',
  field: 'documentId',
}];

export const getMerchantPartnersView = ({
  state,
  editable,
  addable,
  isLoading,
  requestErrors,
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
        srcdata="${state.partners}"
        srccolumns="${columns}">
      </sling-table>
    </div>
  `;
