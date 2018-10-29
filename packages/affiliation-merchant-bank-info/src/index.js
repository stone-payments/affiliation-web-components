import { registerComponent } from 'sling-helpers';
import { SlingElement } from 'sling-framework';
import { AffiliationMerchantBankInfo } from './component/MerchantBankInfo.js';

registerComponent('affiliation-merchant-bank-info',
  AffiliationMerchantBankInfo(SlingElement));
