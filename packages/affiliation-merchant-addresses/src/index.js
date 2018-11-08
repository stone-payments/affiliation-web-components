import { registerComponent } from 'sling-helpers';
import { SlingElement } from 'sling-framework';
import { AffiliationMerchantAddresses } from './component/MerchantAddresses.js';

registerComponent('affiliation-merchant-addresses',
  AffiliationMerchantAddresses(SlingElement));
