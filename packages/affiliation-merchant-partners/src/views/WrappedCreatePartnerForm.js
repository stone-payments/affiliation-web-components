import { html } from 'sling-framework';
import { getRenderCreatePartnerForm } from './RenderCreatePartnerFormView.js';

export const getWrappedCreatePartnerFormView = (
  state,
  handleStopCreatePartner, // stop
  handleSubmitCreatePartner, // submit form
) => html`
  <div class="business-component__form_create">
    <div class="business-component__inner_create">
      <svg
        onclick="${handleStopCreatePartner}"
        class="business-component__close"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    ${getRenderCreatePartnerForm(state, handleSubmitCreatePartner)}
    </div>
  </div>
  `;
