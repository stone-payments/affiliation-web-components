import { registerComponent } from 'sling-helpers';
import { SlingElement } from 'sling-framework';
import { AffiliationMerchantContactsList } from './component/MerchantContactsList.js';

registerComponent('affiliation-merchant-contacts-list',
  AffiliationMerchantContactsList(SlingElement));
