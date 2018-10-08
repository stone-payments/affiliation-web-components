# Sling Sales Chart Business Component

Shows sales in a chart.

## Usage

```html
<sling-sdk-connect></sling-sdk-connect>
<sling-sales-chart
  stonecode=""
  apitoken=""
  startdate=""
  finaldate=""
  charttype=""
  showtitle
  showlegend></sling-sales-chart>
```

### Attributes

- **stonecode**: Customer StoneCode (also known as affiliation code), mandatory.
- **apitoken**: API Token, mandatory.
- **startdate**: Start date for aggregating sales.
- **finaldate**: End date for aggregating sales.
- **charttype**: *Optional*: Which chart type to use: {'line', 'bar'}. Defaults to 'line'.
- **charttitle**: *Optional*: title of chart, defaults to 'Vendas por modalidade'.
- **showtitle**: *Optional*: **Boolean**, if present renders the **charttitle**.
- **showlegend**: *Optional*: **Boolean**, if present, renders the chart legend.
- **showchangebutton**: *Optional*: **Boolean**, if present, renders the button to change the chart type (line, bar).
- **changebuttontext**: *Optional*: The change button text (if present). Defaults to 'Alterar gráfico'.

## Project Wiki

https://stonepayments.atlassian.net/wiki/spaces/APICLIENTE