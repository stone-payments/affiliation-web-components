import { html } from 'sling-framework';
import 'sling-web-component-list';

const keys = [
  'Descrição',
  'UF',
  'Cidade',
  'Endereço',
  'Número',
  'Complemento',
  'Bairro',
];

export const MerchantAddressesListView = ({
  state,
}) => {
  console.log(state);
  return html`
    <sling-list
      cascadelist
      srcdata="${state.addresses}"
      srckeys="${keys}">
    </sling-list>
`;
};
