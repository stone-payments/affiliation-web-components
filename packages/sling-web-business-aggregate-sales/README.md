# Sling Aggregate Sales Business Component.

Shows customer sales grouped by product type (credit, debit, etc.).


## Usage

```html
<sling-sdk-connect></sling-sdk-connect>
<sling-aggregate-sales
  stonecode=""
  apitoken=""
  startdate=""
  finaldate=""
  showdaterange
  detailitembutton></sling-aggregate-sales>
```

### Attributes:
- **stonecode**: Customer StoneCode (also known as affiliation code), mandatory.
- **apitoken**: API Token, mandatory.
- **startdate**: Start date for aggregating sales.
- **finaldate**: End date for aggregating sales.
- **showdaterange**: OPTIONAL - if present, render date range (*startdate - finaldate*).
- **detailitembutton**: OPTIONAL - if present, render `>` (arrow button) to show expanded sales by the selected product type (see: <sling-sales-report-expanded> component).


## Project Wiki

https://stonepayments.atlassian.net/wiki/spaces/APICLIENTE
