Game.Stats = (function () {
  let configMap = {}
  let occupiedChart, capturedChart

  function _init () {
    _initCharts()
  }

  function _initCharts () {
    occupiedChart = new Chart(
      document.getElementById('occupiedChart').getContext('2d'),
      {
        type: 'line',
        data: {
          labels: [], // Dynamically set, so no need to set this.
          datasets: [
            {
              label: 'White',
              data: [],
              borderColor: 'gray',
              backgroundColor: 'white'
            },
            {
              label: 'Black',
              data: [],
              borderColor: 'black',
              backgroundColor: 'black'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      }
    )

    capturedChart = new Chart(
      document.getElementById('capturedChart').getContext('2d'),
      {
        type: 'bar', // Bar chart
        data: {
          labels: ['White', 'Black'], // Labels for the players
          datasets: [
            {
              label: 'Captured Opponent Pieces',
              data: [0, 0],
              backgroundColor: ['gray', 'black']
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true, // Set to false to control the aspect ratio
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      }
    )
  }

  function addOccupiedChartData (board) {
    if (!occupiedChart) {
      console.error("Something's wrong with occupiedChart!")
      return
    }

    let whites = 0
    let blacks = 0

    for (const row of board) {
      for (const value of row) {
        if (value == 1) {
          whites++
        } else if (value == 2) {
          blacks++
        }
      }
    }

    let whitePercentage = (whites / 64) * 100
    let blackPercentage = (blacks / 64) * 100

    // Adds date
    const currentDate = new Date()
    const label = currentDate.toLocaleTimeString() // You can use a timestamp as the label
    occupiedChart.data.labels.push(label)

    // Push data points
    occupiedChart.data.datasets[0].data.push(whitePercentage)
    occupiedChart.data.datasets[1].data.push(blackPercentage)

    // Update the chart
    occupiedChart.update()
  }

  function addCapturedChartData (oldBoard, newBoard) {
    if (!capturedChart) {
      console.error("Something's wrong with capturedChart!")
      return
    }

    const oldBoardParsed = JSON.parse(oldBoard)
    const newBoardParsed = JSON.parse(newBoard)

    let whiteCaptured = 0
    let blackCaptured = 0

    for (let i = 0; i < oldBoardParsed.length; i++) {
      for (let j = 0; j < oldBoardParsed[i].length; j++) {
        if (
          oldBoardParsed[i][j] !== 0 &&
          oldBoardParsed[i][j] !== newBoardParsed[i][j]
        ) {
          if (oldBoardParsed[i][j] === 1) {
            // White piece captured
            blackCaptured++
          } else if (oldBoardParsed[i][j] === 2) {
            // Black piece captured
            whiteCaptured++
          }
        }
      }
    }

    // Add data, not replace
    capturedChart.data.datasets[0].data[0] += whiteCaptured
    capturedChart.data.datasets[0].data[1] += blackCaptured

    // Update the chart
    capturedChart.update()
  }

  return {
    init: _init,
    addOccupiedChartData: addOccupiedChartData,
    addCapturedChartData: addCapturedChartData
  }
})()
