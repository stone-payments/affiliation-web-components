import { registerComponent } from 'sling-helpers';
import { SlingElement } from 'sling-framework';
import { AffiliationMerchantBankAccountsList } from './component/MerchantBankAccountsList.js';

registerComponent('affiliation-merchant-bank-accounts-list',
  AffiliationMerchantBankAccountsList(SlingElement));
