import { html } from 'sling-framework';
import 'sling-web-component-list';

const keys = [
  'Nome',
  'Tipo de documento',
  'Nº documento',
];

export const getMerchantPartnersListView = ({
  state,
}) => html`
  <sling-list cascadelist srcdata="${state.partners}"
  srckeys="${keys}">
  </sling-list>
`;
