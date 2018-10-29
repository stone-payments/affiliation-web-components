import { html } from 'sling-framework';
import 'sling-web-component-table';
import 'sling-web-component-form';
import 'sling-web-component-input';
import 'sling-web-component-select';
import 'sling-web-component-loader';
import 'sling-web-component-message';
import 'sling-web-component-button';

const columns = [{
  title: 'Descrição',
  field: 'description',
}, {
  title: 'UF',
  field: 'uf',
}, {
  title: 'Cidade',
  field: 'city',
}, {
  title: 'Endereço',
  field: 'street',
}, {
  title: 'Nº',
  field: 'number',
}, {
  title: 'Complem.',
  field: 'complement',
}, {
  title: 'Bairro',
  field: 'neighborhood',
}];

export const merchantAddressesView = ({
  requestErrors,
  editable,
  addable,
  state,
  isLoading,
}) => html`
  <style>
    @import url('affiliation-merchant-addresses/src/index.css');
  </style>
  <sling-message
    aim="error"
    srcdata="${requestErrors.length > 0 ? ['Ocorreu um erro ao acessar os dados'] : []}"
    layout="outline"></sling-message>
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
      srcdata="${state.addresses}"
      srccolumns="${columns}">
    </sling-table>
  </div>
`;
