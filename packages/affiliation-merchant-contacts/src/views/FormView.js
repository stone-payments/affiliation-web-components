import { html } from 'sling-framework';
import { isNotEmpty, isValidEmail, isValidPhone } from 'sling-helpers';
import 'sling-web-component-input';
import 'sling-web-component-select';
import 'sling-web-component-form';

const validation = [
  isNotEmpty('name'),

  isNotEmpty('email'),
  isValidEmail('email'),

  isNotEmpty('phone'),
  isValidPhone('phone'),

  isNotEmpty('mobilePhone'),
  isValidPhone('mobilePhone'),

];

export const formView = (state, handleFormSubmit, handleFormUpdate) => {
  const fields = state.formdata || {};

  return html`
    <sling-form
      onformsubmit="${handleFormSubmit}"
      onformupdate="${handleFormUpdate}"
      validation=${validation}>
      <sling-input
        type="text"
        name="name"
        label="Nome"
        value="${fields.name}">
      </sling-input>
      <sling-input
        type="hidden"
        name="typeId"
        value="${fields.typeId}">
      </sling-input>
      <sling-input
        type="email"
        name="email"
        label="Email"
        value="${fields.email}">
      </sling-input>
      <sling-input
        type="phone"
        name="phone"
        label="Telefone"
        value="${fields.phone}">
      </sling-input>
      <sling-input
        type="phone"
        name="mobilePhone"
        label="Celular"
        value="${fields.mobilePhone}">
      </sling-input>
      <sling-input
        type="hidden"
        name="id"
        value="${fields.id}">
      </sling-input>
      <sling-button
        color="success"
        type="submit">
        Enviar
      </sling-button>
    </sling-form>
  `;
};
