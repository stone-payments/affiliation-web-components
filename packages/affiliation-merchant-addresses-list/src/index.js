import { registerComponent } from 'sling-helpers';
import { SlingElement } from 'sling-framework';
import { AffiliationMerchantAddressesList } from './component/MerchantAddressesList.js';

registerComponent('sling-merchant-addresses-list',
  AffiliationMerchantAddressesList(SlingElement));
