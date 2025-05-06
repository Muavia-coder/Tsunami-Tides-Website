const ctx = document.getElementById('myChart').getContext('2d');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['INDIAN OCEAN 2004', 'JAPAN OCEAN 2011', 'LISBON OCEAN 1755', ],
    datasets: [{
        label: 'Death Toll',
        data: [230000, 15894, 60000],
      borderWidth: 1,
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
    }]
  },
  options: {
    responsive: true,
    text: 'Worst Tsunamis in History',
    maintainAspectRatio: false, // Ensures the chart uses container dimensions
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
