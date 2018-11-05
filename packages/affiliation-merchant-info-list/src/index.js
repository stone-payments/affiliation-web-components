import { registerComponent } from 'sling-helpers';
import { SlingElement } from 'sling-framework';
import { AffiliationMerchantInfoList } from './component/MerchantInfoList.js';

registerComponent('affiliation-merchant-info-list',
  AffiliationMerchantInfoList(SlingElement));
