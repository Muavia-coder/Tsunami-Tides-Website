const ctx2 = document.getElementById('doughnut').getContext('2d');

new Chart(ctx2, {
  type: 'doughnut',
  data: {
    labels: ['2004', '2011', '1755'],
    datasets: [{
      label: 'Death Toll',
      data: [230000, 15894, 60000],
      borderWidth: 1,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false, // Ensures chart uses the full container space
    plugins: {
      legend: {
        position: 'bottom' // Positions legend below chart for a clean look
      }
    }
  }
});
