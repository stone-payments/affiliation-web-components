import { html } from 'sling-framework';
import 'sling-web-component-list';

const keys = [
  'Nome',
  'E-mail',
  'RG',
  'CPF',
];

export const getMerchantPartnersListView = ({
  state,
}) => html`
  <sling-list cascadelist srcdata="${state.partners}"
  srckeys="${keys}">
  </sling-list>
`;
