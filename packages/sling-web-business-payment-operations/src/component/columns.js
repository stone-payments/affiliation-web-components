import { formatDate } from 'sling-helpers';

export const columns = [{
  title: 'Categoria',
  field: 'category',
}, {
  title: 'Data/Hora da Venda',
  field: 'operation_date',
  type: 'dateTime',
}, {
  title: 'Tipo',
  field: 'product',
}, {
  title: 'Nº da Parcela',
  field: 'installment_number',
  align: 'center',
}, {
  title: 'Origem',
  field: 'brand_id',
  type: 'brand_icon',
}, {
  title: 'Stone ID',
  field: 'transaction_key',
}, {
  title: 'Valor Bruto',
  field: 'gross_amount',
  type: 'currency',
}, {
  title: 'Valor Líquido',
  field: 'net_amount',
  type: 'currency',
}, {
  title: 'Último Status',
  type: item => `
    <div>
      <span className="bullet__status bullet__status_${item.settlement_status_id}">${item.status}</span>
      <span class="emd-table__content emd-table__content_secondary bullet__status_secondary">${formatDate(item.reference_date)}</span>
    </div>`
  ,
}];
