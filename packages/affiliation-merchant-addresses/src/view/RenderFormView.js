import { html } from 'sling-framework';
import { isNotEmpty } from 'sling-helpers';
import 'sling-web-component-input';
import 'sling-web-component-select';
import 'sling-web-component-form';

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
        srcoptions="${state.types}">
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
        value="${fields.stateId}"
        srcoptions="${state.states}">
      </sling-select>
      <sling-select
        label="Cidade"
        placeholder="Selecione uma cidade"
        name="cityId"
        value="${fields.cityId}"
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
        name="streetName"
        label="Rua"
        maxLength="128"
        value="${fields.streetName}">
      </sling-input>
      <sling-input
        type="text"
        name="entranceNumber"
        label="Número"
        maxLength="32"
        value="${fields.entranceNumber}">
      </sling-input>
      <sling-input
        type="text"
        name="complement"
        label="Número"
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
