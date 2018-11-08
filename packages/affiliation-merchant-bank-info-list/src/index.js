import { registerComponent } from 'sling-helpers';
import { SlingElement } from 'sling-framework';
import { AffiliarionMerchantBankInfoList } from './component/MerchantBankInfoList.js';

registerComponent('affiliation-merchant-bank-info-list',
  AffiliarionMerchantBankInfoList(SlingElement));
