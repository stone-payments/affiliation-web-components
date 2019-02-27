import { html } from 'sling-framework';
import { isNotEmpty } from 'sling-helpers';
import 'sling-web-component-input';
import 'sling-web-component-select';
import 'sling-web-component-form';
import { types, FindCityByName } from '../state/MerchantAddressesState.js';

const validation = [
  isNotEmpty('typeId'),
  isNotEmpty('stateId'),
  isNotEmpty('cityId'),
  isNotEmpty('neighborhood'),
  isNotEmpty('streetName'),
  isNotEmpty('entranceNumber'),
  isNotEmpty('postalCode'),
];

export const getRenderForm = (
  state,
  handleFormSubmit,
  handleFormUpdate,
) => {
  const fields = state.formdata || {};
  console.log('state form', state);
  console.log('fields', fields);
  return html`
    <sling-form
      onformsubmit="${handleFormSubmit}"
      onformupdate="${handleFormUpdate}"
      validation=${validation}>
      <sling-input
        type="hidden"
        name="key"
        value="${fields.key}">
      </sling-input>
      <sling-select
        label="Tipo"
        placeholder="Selecione um tipo"
        name="typeId"
        value="${fields.typeId}"
        srcoptions="${types}">
      </sling-select>
      <sling-input
        type="cep"
        name="postalCode"
        label="CEP"
        maxLength="32"
        value="${fields.postalCode}">
      </sling-input>
      <sling-select
        label="Estado"
        placeholder="Selecione um estado"
        name="stateId"
        value="${fields.stateCode}"
        srcoptions="${state.states}">
      </sling-select>
      <sling-select
        label="Cidade"
        placeholder="Selecione uma cidade"
        name="cityId"
        value="${FindCityByName(fields.cityName, state.cities)}"
        srcoptions="${state.cities}">
      </sling-select>
      <sling-input
        type="text"
        name="neighborhood"
        label="Bairro"
        maxLength="64"
        value="${fields.neighborhood}">
      </sling-input>
      <sling-input
        type="text"
        name="street"
        label="Rua"
        maxLength="128"
        value="${fields.street}">
      </sling-input>
      <sling-input
        type="text"
        name="number"
        label="Número"
        maxLength="32"
        value="${fields.number}">
      </sling-input>
      <sling-input
        type="text"
        name="complement"
        label="Complemento"
        maxLength="64"
        value="${fields.complement}">
      </sling-input>
      <sling-button
        color="success"
        type="submit">
        Enviar
      </sling-button>
    </sling-form>
  `;
};
