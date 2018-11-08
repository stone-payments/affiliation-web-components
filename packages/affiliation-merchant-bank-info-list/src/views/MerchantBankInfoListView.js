import { html } from 'sling-framework';
import 'sling-web-component-list';

const keys = [
  'Banco',
  'Tipo',
  'Agência',
  'Dígito',
  'Conta',
  'Dígito',
];

export const merchantInfoListView = ({ state }) => html`
  <sling-list cascadelist srcdata="${state.banks}"
    srckeys="${keys}">
  </sling-list>
`;
