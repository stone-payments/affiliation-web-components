import { html } from 'sling-framework';
import { isNotEmpty } from 'sling-helpers';
import 'sling-web-component-button';
import 'sling-web-component-form';
import 'sling-web-component-input';
import { getInfo } from '../state/MerchantInfoListState.js';

const validation = [
  isNotEmpty('fantasyName'),
];

export const getFormView = (
  state,
  handleFormSubmit,
  handleFormUpdate,
) => {
  const info = getInfo(state);
  return html`
  <sling-form
    validation="${validation}"
    onformsubmit="${handleFormSubmit}"
    onformupdate="${handleFormUpdate}">
    <sling-input
      label="Nome Fantasia"
      value="${info.fantasyName}"
      type="text"
      name="fantasyName">${info.fantasyName}</sling-input>
    <sling-button
      color="success"
      type="submit">
      Enviar
    </sling-button>
  </sling-form>
`;
};
