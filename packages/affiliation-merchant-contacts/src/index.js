import { registerComponent } from 'sling-helpers';
import { SlingElement } from 'sling-framework';
import { AffiliationMerchantContacts } from './component/MerchantContacts.js';

registerComponent('affiliation-merchant-contacts',
  AffiliationMerchantContacts(SlingElement));
