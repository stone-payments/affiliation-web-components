# Sling Sales Report Business Component.

Shows customer sales grouped or expanded by product type (credit, debit, etc.).
Uses two other business components:
- <sling-aggregate-sales>
- <sling-sales-report-expanded>


## Usage

```html
<sling-sdk-connect></sling-sdk-connect>
<sling-sales-report
  stonecode=""
  apitoken=""
  startdate=""
  finaldate=""
  open></sling-sales-report>
```

### Attributes:

- **stonecode**: Customer StoneCode (also known as affiliation code), mandatory.
- **apitoken**: API Token.
- **startdate**: Start date for aggregating sales.
- **finaldate**: End date for aggregating sales.
- **open**: OPTIONAL - If present the component will render its open state (<sling-sales-report-expanded>).
- **producttypeid**: OPTIONAL - Necessary if **open** is given. Product type id to be detailed.


## Project Wiki

https://stonepayments.atlassian.net/wiki/spaces/APICLIENTE
