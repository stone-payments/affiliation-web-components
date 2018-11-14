import { registerComponent } from 'sling-helpers';
import { SlingElement } from 'sling-framework';
import { AffiliationMerchantPartners } from './component/MerchantPartners.js';

registerComponent('affiliation-merchant-partners',
  AffiliationMerchantPartners(SlingElement));
