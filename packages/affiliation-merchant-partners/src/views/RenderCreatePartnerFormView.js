import { html } from 'sling-framework';
import { isNotEmpty } from 'sling-helpers';
import 'sling-web-component-input';
import 'sling-web-component-select';
import 'sling-web-component-form';
import {
  documentTypeIds,
  additionalDocumentTypeIds,
  countryCodes,
} from '../state/MerchantPartnersState.js';


const validation = [
  isNotEmpty('name'),
  isNotEmpty('documentTypeId'),
  isNotEmpty('taxId'),
  isNotEmpty('birthDate'),
  isNotEmpty('birthPlace'),
  isNotEmpty('birthCountryid'),
  isNotEmpty('additionalDocumentId'),
  isNotEmpty('additionalDocumentIdentifier'),
  isNotEmpty('additionalDocumentIssueDate'),
  isNotEmpty('additionalDocumentIssuedBy'),
  isNotEmpty('motherName'),
];

export const getRenderCreatePartnerForm = (
  state,
  handleSubmitCreatePartner,
  handleStopCreatePartner,
) => html`
  <sling-form
    onformsubmit="${handleSubmitCreatePartner}"
    validation=${validation}>
    <sling-input
      type="text"
      name="name"
      label="Nome">
    </sling-input>
    <sling-select
      label="Documento"
      name="documentTypeId"
      srcoptions="${documentTypeIds}">
    </sling-select>
    <sling-input
      type="text"
      name="taxId"
      label="N° do documento">
    </sling-input>
    <sling-input
      type="date"
      name="birthDate"
      label="Data de nascimento">
    </sling-input>
    <sling-input
      type="text"
      name="birthPlace"
      label="Local de Nascimento">
    </sling-input>
    <sling-select
      type="text"
      name="birthCountryid"
      label="País de Nascimento"
      srcoptions="${countryCodes}">
    </sling-select>
    <sling-select
      label="Documento Adicional"
      name="additionalDocumentId""
      srcoptions="${additionalDocumentTypeIds}">
    </sling-select>
    <sling-input
      type="text"
      name="additionalDocumentIdentifier"
      label="N° do documento">
    </sling-input>
    <sling-input
      type="date"
      name="additionalDocumentIssueDate"
      label="Data de expedição">
    </sling-input>
    <sling-input
      type="text"
      name="additionalDocumentIssuedBy"
      label="Orgão expeditor">
    </sling-input>
    <sling-input
      type="text"
      name="fatherName"
      label="Nome do pai">
    </sling-input>
    <sling-input
      type="text"
      name="motherName"
      label="Nome da mãe">
    </sling-input>
    <sling-input
      type="text"
      name="spouseName"
      label="Nome do cônjuge">
    </sling-input>
    <sling-select
      label="Documento"
      name="spouseTaxIdType"
      srcoptions="${documentTypeIds}">
    </sling-select>
    <sling-input
      type="text"
      name="spouseTaxId"
      label="N° do documento do cônjuge">
    </sling-input>
    <sling-button
      name="cancelCreate"
      onclick="${handleStopCreatePartner}"
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

