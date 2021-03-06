import { html } from 'sling-framework';
import { isNotEmpty, isValidBankId, isValidBankAccountNumber } from 'sling-helpers';
import 'sling-web-component-input';
import 'sling-web-component-select';
import 'sling-web-component-form';
import { accountType } from '../state/MerchantBankAccountsState.js';

const validation = [
  isNotEmpty('bankId'),
  isValidBankId('bankId'),

  isNotEmpty('accountTypeId'),

  isNotEmpty('branchCode'),

  isNotEmpty('accountNumber'),
  isValidBankAccountNumber('accountNumber'),

  isNotEmpty('accountNumberCheckDigit'),
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
      <sling-select
        label="Banco"
        name="bankId"
        value="${fields.bankId}"
        srcoptions="${state.banks}">
      </sling-select>
        <sling-select
        label="Tipo"
        name="accountTypeId"
        value="${fields.accountTypeId}"
        srcoptions="${accountType}">
      </sling-select>
      <sling-input
        type="digits"
        name="branchCode"
        label="Agencia"
        maxLength="5"
        value="${fields.branchCode}">
      </sling-input>
      <sling-input
        type="text"
        name="branchCodeCheckDigit"
        label="Dígito"
        maxLength="2"
        value="${fields.branchCodeCheckDigit}">
      </sling-input>
      <sling-input
        type="digits"
        name="accountNumber"
        label="Conta"
        maxLength="12"
        value="${fields.accountNumber}">
      </sling-input>
      <sling-input
        type="text"
        name="accountNumberCheckDigit"
        label="Dígito"
        maxLength="2"
        value="${fields.accountNumberCheckDigit}">
      </sling-input>
      <sling-input
        type="hidden"
        name="statusId"
        value="${fields.statusId}">
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
