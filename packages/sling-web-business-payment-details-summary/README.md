# Sling Payment Details Summary Business Component.

Shows payment details grouped by wallet types (a combination of a brand and a product type, i.e. Visa Debit or Mastercard Credit).


## Used by

* **sling-payment-details**


## Usage

```html
<sling-sdk-connect></sling-sdk-connect>
<sling-payment-details-summary
  stonecode=""
  apitoken=""
  startdate=""
  finaldate="">
</sling-payment-details-summary>
```

### Attributes:
- **stonecode**: Customer StoneCode (also known as affiliation code), mandatory.
- **apitoken**: API Token, mandatory.
- **startdate**: Start date for aggregating sales.
- **finaldate**: End date for aggregating sales.


## Project Wiki

https://stonepayments.atlassian.net/wiki/spaces/APICLIENTE
