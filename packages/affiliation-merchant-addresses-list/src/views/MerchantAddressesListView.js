import { html } from 'sling-framework';
import 'sling-web-component-list';

const keys = [
  'Tipo',
  'Endereço',
  'Número',
  'Complemento',
  'Bairro',
  'Cidade',
  'UF',
  'CEP',
];

export const getMerchantAddressesListView = ({
  state,
}) => html`
    <sling-list
      cascadelist
      srcdata="${state.addresses}"
      srckeys="${keys}">
    </sling-list>
`;
