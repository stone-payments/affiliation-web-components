import { html } from 'sling-framework';
import { isNotEmpty, isValidEmail, isValidPhone } from 'sling-helpers';
import 'sling-web-component-input';
import 'sling-web-component-select';
import 'sling-web-component-form';
import { contactsTypeId } from '../state/MerchantContactsState.js';

export const getFormView = (state, handleFormSubmit, handleFormUpdate) => {
  const fields = state.formData || {};
  console.log(state);

  const validationEmails = fields.emails
    ? fields.emails.map(email => isValidEmail(`email-${email.key}`))
    : [];

  const validationPhones = fields.phones
    ? fields.phones.map(phone => isNotEmpty(`phoneNumber-${phone.key}`))
    : [];

  const validation = [
    isNotEmpty('friendlyName'),
  ];

  validationEmails.map(item => validation.push(item));
  validationPhones.map(item => validation.push(item));


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
      ${fields.emails.map(email => html`
        <sling-input
          id="email"
          type="email"
          name="email-${email.key}"
          label="Email"
          value="${email.email}">
        </sling-input>
        `)}
      ${fields.phones.map(phone => html`
        <sling-input
          id="countryCode"
          type="text"
          name="countryCode-${phone.key}"
          label="País"
          value="${phone.countryCode}">
        </sling-input>
        <sling-input
          id="areaCode"
          type="text"
          name="areaCode-${phone.key}"
          label="DDD"
          value="${phone.areaCode}">
        </sling-input>
        <sling-input
          id="phoneNumber"
          type="text"
          name="phoneNumber-${phone.key}"
          label="Telefone"
          value="${phone.phoneNumber}">
        </sling-input>
      `)}
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
