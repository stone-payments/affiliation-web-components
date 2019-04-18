import { html } from 'sling-framework';
import { getRenderNaturalPersonForm } from './RenderNaturalPersonFormView.js';

export const getWrappedNaturalFormView = (
  state,
  handleStopEditeNaturalPerson, // stop
  handleSubmitEditeNaturalPersonForm, // submit form
  handleUpdateEditeNaturalPersonForm, // update form
  handleDeleteNaturalPerson, // delet partner
) => html`
  <div class="business-component__form_natural">
    <div class="business-component__inner_natural">
      <svg
        onclick="${handleStopEditeNaturalPerson}"
        class="business-component__close"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    ${getRenderNaturalPersonForm(
    state,
    handleSubmitEditeNaturalPersonForm,
    handleUpdateEditeNaturalPersonForm,
    handleStopEditeNaturalPerson,
    handleDeleteNaturalPerson,
  )}
    </div>
  </div>
  `;
