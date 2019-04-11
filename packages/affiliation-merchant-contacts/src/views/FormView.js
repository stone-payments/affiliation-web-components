import { html } from 'sling-framework';
import { isNotEmpty, isValidEmail, isValidPhone } from 'sling-helpers';
import 'sling-web-component-input';
import 'sling-web-component-select';
import 'sling-web-component-form';
import { contactsTypeId } from '../state/MerchantContactsState.js';

const validation = [
  isNotEmpty('friendlyName'),

  isNotEmpty('email'),
  isValidEmail('email'),

  isNotEmpty('phoneNumber'),
];

export const getFormView = (state, handleFormSubmit, handleFormUpdate) => {
  const fields = state.formData || {};
  fields.contactEmails = state.emails || [];
  console.log(state)
  return html`
    <sling-form
      onformsubmit="${handleFormSubmit}"
      onformupdate="${handleFormUpdate}"
      validation=${validation}>
      <sling-input
        type="text"
        name="friendlyName"
        label="Nome"
        value="${fields.friendlyName}">
      </sling-input>
      </sling-select>
        <sling-select
        label="Tipo"
        name="typeId"
        value="${fields.typeId}"
        srcoptions="${contactsTypeId}">
      </sling-select>
      ${fields.emails.map((email, index) => html`
        <sling-input
          type="email"
          name="email${email.key}"
          label="Email"
          value="${email.email}">
        </sling-input>
        `)}     
      <sling-input
        type="email"
        name="email"
        label="Email"
        value="${fields.email}">
      </sling-input>
      <sling-input
        type="text"
        name="countryCode"
        label="País"
        value="${fields.countryCode}">
      </sling-input>
      <sling-input
        type="text"
        name="areaCode"
        label="DDD"
        value="${fields.areaCode}">
      </sling-input>
      <sling-input
        type="text"
        name="phoneNumber"
        label="Telefone"
        value="${fields.phoneNumber}">
      </sling-input>
      <sling-input
        type="hidden"
        name="key"
        value="${fields.key}">
      </sling-input>
      <sling-button
        color="success"
        type="submit">
        Enviar
      </sling-button>
    </sling-form>
  `;
};
