# Sling Payment Details Business Component.

Shows payment details grouped by wallet types (a combination of a brand and a product type, i.e. Visa Debit or Mastercard Credit).

If passed a `wallettypeid` and the `open` attributes, the component will show detailed transactions of a specific wallet type.


## Dependencies

* **sling-payment-details-item**
* **sling-payment-details-summary**


## Usage

```html
<sling-sdk-connect></sling-sdk-connect>
<sling-payment-details
  stonecode=""
  apitoken=""
  startdate=""
  finaldate=""
  wallettypeid=""
  open>
</sling-payment-details>
```

### Attributes:
- **stonecode**: Customer StoneCode (also known as affiliation code), mandatory.
- **apitoken**: API Token, mandatory.
- **startdate**: Start date for aggregating sales.
- **finaldate**: End date for aggregating sales.
- **wallettypeid**: Id of the wallet type.
- **open**: State of the detail panel.


## Project Wiki

https://stonepayments.atlassian.net/wiki/spaces/APICLIENTE
