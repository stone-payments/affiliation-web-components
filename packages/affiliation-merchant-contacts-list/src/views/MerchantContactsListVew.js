import { html } from 'sling-framework';
import 'sling-web-component-list';

const keys = [
  'Nome',
  'Cargo',
  'E-mail',
  'Telefone',
  'Celular',
];

export const getMerchantContactsListView = ({ state }) => html`
  <sling-list cascadelist srcdata="${state.contacts}"
    srckeys="${keys}">
  </sling-list>
`;
