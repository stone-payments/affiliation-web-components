# Sling Sales Amount Business Component.

Shows sales amount grouped by product type (credit, debit, etc.).


## Usage

```html
<sling-sdk-connect></sling-sdk-connect>
<sling-sales-amount
  stonecode=""
  apitoken=""
  startdate=""
  finaldate=""
  label=""
  producttypeid=""></sling-sales-amount>
```

### Attributes:
- **stonecode**: Customer StoneCode (also known as affiliation code), mandatory.
- **apitoken**: API Token, mandatory.
- **startdate**: Start date for aggregating sales.
- **finaldate**: End date for aggregating sales.
- **label**: Used as the card title.
- **producttypeid**: OPTIONAL - if provided, result is filtered by product type id.


## Project Wiki

https://stonepayments.atlassian.net/wiki/spaces/APICLIENTE
