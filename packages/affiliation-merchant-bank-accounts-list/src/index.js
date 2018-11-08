import { registerComponent } from 'sling-helpers';
import { SlingElement } from 'sling-framework';
import { AffiliarionMerchantBankAccountsList } from './component/MerchantBankAccountsList.js';

registerComponent('affiliation-merchant-bank-accounts-list',
  AffiliarionMerchantBankAccountsList(SlingElement));
