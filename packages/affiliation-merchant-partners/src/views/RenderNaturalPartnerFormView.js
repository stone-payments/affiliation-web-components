import { html } from 'sling-framework';
import { isNotEmpty } from 'sling-helpers';
import 'sling-web-component-input';
import 'sling-web-component-select';
import 'sling-web-component-form';
import {
  documentTypes,
  additionalDocumentTypes,
  displayDefaultBirthCountry,
} from '../state/MerchantPartnersState.js';

const validation = [
  isNotEmpty('name'),
  isNotEmpty('documentTypeId'),
  isNotEmpty('taxId'),
  isNotEmpty('birthDate'),
  isNotEmpty('birthPlace'),
  isNotEmpty('birthCountryId'),
  isNotEmpty('additionalDocumentId'),
  isNotEmpty('additionalDocumentIdentifier'),
  isNotEmpty('additionalDocumentIssueDate'),
  isNotEmpty('additionalDocumentIssuedBy'),
  isNotEmpty('motherName'),
];

export const getRenderNaturalPartnerForm = (
  state,
  handleSubmitEditNaturalPartnerForm,
  handleUpdateEditNaturalPartnerForm,
  handleStopEditNaturalPartner,
  handleDeleteNaturalPartner,
) => {
  const fields = state.naturalPartnerformData || {};
  return html`
    <sling-form
      onformsubmit="${handleSubmitEditNaturalPartnerForm}"
      onformupdate="${handleUpdateEditNaturalPartnerForm}"
      validation=${validation}>
      <sling-input
        type="text"
        name="name"
        label="Nome"
        value="${fields.name}">
      </sling-input>
      <sling-select
        label="Documento"
        name="documentTypeId"
        value="${fields.documentTypeId}"
        srcoptions="${documentTypes}">
      </sling-select>
      <sling-input
        type="text"
        name="taxId"
        label="N° do documento"
        value="${fields.taxId}">
      </sling-input>
      <sling-input
        type="date"
        name="birthDate"
        label="Data de nascimento"
        value="${fields.birthDate}">
      </sling-input>
      <sling-select
        type="text"
        name="birthCountryId"
        label="País de Nascimento"
        srcoptions="${displayDefaultBirthCountry}"
        value="${fields.birthCountryId}">
      </sling-select>
      <sling-input
        type="text"
        name="birthPlace"
        label="Local de Nascimento"
        value="${fields.birthPlace}">
      </sling-input>
      <sling-select
        label="Documento Adicional"
        name="additionalDocumentId"
        value="${fields.additionalDocumentId}"
        srcoptions="${additionalDocumentTypes}">
      </sling-select>
      <sling-input
        type="text"
        name="additionalDocumentIdentifier"
        label="N° do documento"
        value="${fields.additionalDocumentIdentifier}">
      </sling-input>
      <sling-input
        type="date"
        name="additionalDocumentIssueDate"
        label="Data de expedição"
        value="${fields.additionalDocumentIssueDate}">
      </sling-input>
      <sling-input
        type="text"
        name="additionalDocumentIssuedBy"
        label="Órgão expedidor"
        value="${fields.additionalDocumentIssuedBy}">
      </sling-input>
      <sling-input
        type="text"
        name="fatherName"
        label="Nome do pai"
        value="${fields.fatherName}">
      </sling-input>
      <sling-input
        type="text"
        name="motherName"
        label="Nome da mãe"
        value="${fields.motherName}">
      </sling-input>
      <sling-input
        type="text"
        name="spouseName"
        label="Nome do cônjuge"
        value="${fields.spouseName}">
      </sling-input>
      <sling-select
        label="Documento"
        name="spouseTaxIdType"
        srcoptions="${documentTypes}"
        value="${fields.spouseTaxIdType}">
      </sling-select>
      <sling-input
        type="text"
        name="spouseTaxId"
        label="N° do documento do cônjuge"
        value="${fields.spouseTaxId}">
      </sling-input>
      <sling-input
        type="hidden"
        name="key"
        value="${fields.key}">
      </sling-input>
      <sling-button
        name="delete"
        onclick="${() => handleDeleteNaturalPartner(fields.key)}"
        color="danger">
        Remover sócio
      </sling-button>
      <sling-button
        name="cancel"
        onclick="${handleStopEditNaturalPartner}"
        color="secondary">
        Cancelar
      </sling-button>
      <sling-button
        name="save"
        color="success"
        type="submit">
        Enviar
      </sling-button>
    </sling-form>

  `;
};
