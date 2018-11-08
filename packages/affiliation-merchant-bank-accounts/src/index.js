import { registerComponent } from 'sling-helpers';
import { SlingElement } from 'sling-framework';
import { AffiliationMerchantBankAccounts } from './component/MerchantBankAccounts.js';

registerComponent('affiliation-merchant-bank-accounts',
  AffiliationMerchantBankAccounts(SlingElement));
