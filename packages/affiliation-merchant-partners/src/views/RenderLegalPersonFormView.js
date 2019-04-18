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
  handleSubmitEditeLegalPersonForm,
  handleUpdateEditeLegalPersonForm,
) => {
  const fields = state.legalPersonformData || {};

  // PRECISA DECIDIR COM BASE NAS REGRAS DE NEGOCIO O QUE SERA EDITAVEL

  return html`
    <sling-form
      onformsubmit="${handleSubmitEditeLegalPersonForm}"
      onformupdate="${handleUpdateEditeLegalPersonForm}"
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
