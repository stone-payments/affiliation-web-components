import { html } from 'sling-framework';
import { isNotEmpty } from 'sling-helpers';
import 'sling-web-component-input';
import 'sling-web-component-select';
import 'sling-web-component-form';

const validation = [
  isNotEmpty('tradeName'),
];

export const getRenderLegalPartnerForm = (
  state,
  handleSubmitEditLegalPartnerForm,
  handleUpdateEditLegalPartnerForm,
) => {
  const fields = state.legalPartnerformData || {};

  // @TODO: DECIDIR COM BASE NAS REGRAS DE NEGOCIO O QUE SERA EDITAVEL

  return html`
    <sling-form
      onformsubmit="${handleSubmitEditLegalPartnerForm}"
      onformupdate="${handleUpdateEditLegalPartnerForm}"
      validation=${validation}>
      <sling-input
        type="text"
        name="tradeName"
        label="Nome Fantasia"
        value="${fields.tradeName}">
      </sling-input>
      <sling-button
        color="success"
        type="submit">
        Enviar
      </sling-button>
    </sling-form>
  `;
};
