import { html } from 'sling-framework';
import { isNotEmpty, isValidBankId, isValidBankAgencyNumber, isValidBankAccountNumber } from 'sling-helpers';
import 'sling-web-component-input';
import 'sling-web-component-select';
import 'sling-web-component-form';
import { findAccountType } from '../state/MerchantBankAccountsState.js';

const validation = [
  isNotEmpty('bankId'),
  isValidBankId('bankId'),

  isNotEmpty('typeId'),

  isNotEmpty('agencyNumber'),
  isValidBankAgencyNumber('agencyNumber'),

  isNotEmpty('accountNumber'),
  isValidBankAccountNumber('accountNumber'),

  isNotEmpty('accountNumberVerificationCode'),
];

export const getRenderForm = (
  state,
  handleFormSubmit,
  handleFormUpdate,
) => {
  console.log('RENDER FORM STATE', state);
  const fields = state.formdata || {};
  const accType = findAccountType(state.availableBanks || [], fields.bankId);

  return html`
    <sling-form
      onformsubmit="${handleFormSubmit}"
      onformupdate="${handleFormUpdate}"
      validation=${validation}>
      <sling-select
        label="Banco"
        name="bankId"
        value="${fields.bankId}"
        srcoptions="${state.availableBanks}">
      </sling-select>
        <sling-select
        label="Tipo"
        name="typeId"
        value="${fields.typeId}"
        srcoptions="${accType}">
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
        name="centralizedPayment"
        value="${fields.centralizedPayment}">
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
