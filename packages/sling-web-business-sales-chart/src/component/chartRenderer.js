import moment from 'moment/moment';
import { getDateRangeArray, groupByDeep, formatCurrency } from 'sling-helpers';
import Chart from 'chart.js/dist/Chart';

const defaultChartType = 'line';
const allowedChartTypes = [
  'line',
  'bar',
];

const filterTypes = chartType =>
  (allowedChartTypes.includes(chartType) ? chartType : defaultChartType);

const getZeroedSalesReport = (
  startDateStr,
  finalDateStr,
  productTypeIds,
) => {
  const presentationDates = getDateRangeArray(startDateStr,
    finalDateStr,
    'YYYY-MM-DD');
  const zeroedSalesReport = [];

  presentationDates.forEach((presentationDate) => {
    productTypeIds.forEach((productTypeId) => {
      zeroedSalesReport.push({
        productTypeId,
        presentationDate,
        amount: 0,
      });
    });
  });
  return zeroedSalesReport;
};

const getDataForProductType = (productTypeId, salesReport = []) => {
  const byProductTypeId = report => report.productTypeId === productTypeId;
  const groupByDate = groupByDeep(
    salesReport.filter(byProductTypeId),
    report => report.presentationDate,
  );
  const mappedData = Object.values(groupByDate).map(saleDay => ({
    x: moment(saleDay[0].presentationDate).utc().toDate(),
    y: saleDay.reduce((prev, curr) => prev + curr.amount, 0),
  }));
  // for some reason the ordering is lost after mappedData undeterministically
  const ordered = mappedData.sort((a, b) => a.x.getTime() - b.x.getTime());

  return ordered;
};

let myChart;

const renderChart = (chartCanvas,
  salesReport = [], productTypeIds, instance) => {
  if (myChart) {
    myChart.destroy();
  }

  const filledSalesReport = salesReport.concat(
    getZeroedSalesReport(instance.startdate,
      instance.finaldate, productTypeIds),
  );
  const ctx = chartCanvas.getContext('2d');
  const options = {
    type: filterTypes(instance.charttype),
    data: {
      datasets: [
        {
          label: 'Débito',
          borderColor: 'rgba(160, 198, 95, 1)',
          borderWidth: 3,
          backgroundColor: 'rgba(160, 198, 95, 0.05)',
          pointBackgroundColor: 'rgba(160, 198, 95, 1.0)',
          pointHoverBackgroundColor: 'rgba(160, 198, 95, 1.0)',
          data: getDataForProductType(1, filledSalesReport),
          lineTension: 0,
        },
        {
          label: 'Crédito',
          borderColor: 'rgba(131, 59, 221, 1)',
          borderWidth: 3,
          backgroundColor: 'rgba(131, 59, 221, 0.05)',
          pointBackgroundColor: 'rgba(131, 59, 221, 1.0)',
          pointHoverBackgroundColor: 'rgba(131, 59, 221, 1.0)',
          data: getDataForProductType(2, filledSalesReport),
          lineTension: 0,
        },
        {
          label: 'Boleto',
          borderColor: 'rgba(150, 160, 175, 0.2)',
          borderWidth: 3,
          backgroundColor: 'rgba(150, 160, 175, 0.05)',
          pointBackgroundColor: 'rgba(150, 160, 175, 1.0)',
          pointHoverBackgroundColor: 'rgba(150, 160, 175, 1.0)',
          data: getDataForProductType(10, filledSalesReport),
          lineTension: 0,
        },
      ],
      labels: getDateRangeArray(instance.startdate,
        instance.finaldate,
        'DD/MM'),
    },
    options: {
      // Following official example at: https://codepen.io/chartjs/pen/YVWZbz
      // Yet, it is not dynamically responsive on Google Chrome.
      // responsive: true,
      // maintainAspectRatio: false,
      title: {
        display: instance.showtitle,
        text: instance.charttitle,
        fontSize: 18,
        fontColor: '#282d32',
      },
      legend: {
        display: instance.showlegend,
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false,
          },
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            callback: value => formatCurrency(value),
          },
          gridLines: {
            drawBorder: false,
          },
        }],
      },
      tooltips: {
        displayColors: false,
        callbacks: {
          label: tooltipItem =>
            formatCurrency(tooltipItem.yLabel),
        },
      },
    },
  };
  myChart = new Chart(ctx, options);
};

export {
  renderChart,
  filterTypes,
  getZeroedSalesReport,
  getDataForProductType,
};
