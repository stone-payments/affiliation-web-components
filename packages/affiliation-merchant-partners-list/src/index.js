import { registerComponent } from 'sling-helpers';
import { SlingElement } from 'sling-framework';
import { AffiliationMerchantPartnersList } from './component/MerchantPartnersList.js';

registerComponent('affiliation-merchant-partners-list',
  AffiliationMerchantPartnersList(SlingElement));
