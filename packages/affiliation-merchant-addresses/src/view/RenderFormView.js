import { html } from 'sling-framework';
import { isNotEmpty } from 'sling-helpers';
import 'sling-web-component-input';
import 'sling-web-component-select';
import 'sling-web-component-form';

import { addressesTypes } from '../state/MerchantAddressesState.js';

const validation = [
  isNotEmpty('typeId'),
  isNotEmpty('stateCode'),
  isNotEmpty('cityName'),
  isNotEmpty('neighborhood'),
  isNotEmpty('street'),
  isNotEmpty('number'),
  isNotEmpty('postalCode'),
];

export const getMerchantAddressesRenderForm = (
  state,
  handleFormSubmit,
  handleFormUpdate,
) => {
  const fields = state.formdata || {};
  return html`
    <sling-form
      onformsubmit="${handleFormSubmit}"
      onformupdate="${handleFormUpdate}"
      validation="${validation}">
      <sling-input
        type="hidden"
        name="key"
        value="${fields.key}"
      ></sling-input>
      <sling-select
        label="Tipo"
        placeholder="Selecione um tipo"
        name="typeId"
        value="${fields.typeId}"
        srcoptions="${addressesTypes}"
      ></sling-select>
      <sling-input
        type="cep"
        name="postalCode"
        label="CEP"
        maxLength="32"
        value="${fields.postalCode}"
      ></sling-input>
      <sling-select
        label="Estado"
        placeholder="Selecione um estado"
        name="stateCode"
        value="${fields.stateCode}"
        srcoptions="${state.states}"
      ></sling-select>
      <sling-input
        type="text"
        name="cityName"
        label="Cidade"
        maxLength="64"
        value="${fields.cityName}"
      ></sling-input>
      <sling-input
        type="text"
        name="neighborhood"
        label="Bairro"
        maxLength="64"
        value="${fields.neighborhood}"
      ></sling-input>
      <sling-input
        type="text"
        name="street"
        label="Rua"
        maxLength="128"
        value="${fields.street}"
      ></sling-input>
      <sling-input
        type="text"
        name="number"
        label="Número"
        maxLength="32"
        value="${fields.number}"
      ></sling-input>
      <sling-input
        type="text"
        name="complement"
        label="Complemento"
        maxLength="64"
        value="${fields.complement}"
      ></sling-input>
      <sling-button
        color="success"
        type="submit">
        Enviar
      </sling-button>
    </sling-form>
  `;
};
