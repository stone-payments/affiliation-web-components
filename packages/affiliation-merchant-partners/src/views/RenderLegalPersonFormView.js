import { html } from 'sling-framework';
import { isNotEmpty } from 'sling-helpers';
import 'sling-web-component-input';
import 'sling-web-component-select';
import 'sling-web-component-form';

const validation = [
  isNotEmpty('tradeName'),
];

export const getRenderLegalPersonForm = (
  state,
  handleSubmitEditLegalPersonForm,
  handleUpdateEditLegalPersonForm,
) => {
  const fields = state.legalPersonformData || {};

  // @TODO: DECIDIR COM BASE NAS REGRAS DE NEGOCIO O QUE SERA EDITAVEL

  return html`
    <sling-form
      onformsubmit="${handleSubmitEditLegalPersonForm}"
      onformupdate="${handleUpdateEditLegalPersonForm}"
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
