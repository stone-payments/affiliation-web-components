# Sling Payment Details Item Business Component.

Shows payment details for a specific wallet type (a combination of a brand and a product type, i.e. Visa Debit or Mastercard Credit).


## Used by

* **sling-payment-details**


## Usage

```html
<sling-sdk-connect></sling-sdk-connect>
<sling-payment-details-item
  stonecode=""
  apitoken=""
  startdate=""
  finaldate=""
  wallettypeid="">
</sling-payment-details-item>
```

### Attributes:
- **stonecode**: Customer StoneCode (also known as affiliation code), mandatory.
- **apitoken**: API Token, mandatory.
- **startdate**: Start date for aggregating sales.
- **finaldate**: End date for aggregating sales.
- **wallettypeid**: Id of the wallet type, mandatory.


## Project Wiki

https://stonepayments.atlassian.net/wiki/spaces/APICLIENTE
