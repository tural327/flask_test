function updateCharts() {
  $.getJSON("/data", function(data) {
    let timestamps = data.map(d => new Date(d[0]));
    let charts = [
      {id: 'temp_chart', data: data.map(d => d[1])},
      {id: 'hum_chart', data: data.map(d => d[2])},
      {id: 'powcun_chart', data: data.map(d => d[3])},
      {id: 'pressure_chart', data: data.map(d => d[4])},
      {id: 'material_flow_chart', data: data.map(d => d[5])},
      {id: 'cycle_time_chart', data: data.map(d => d[6])},
      {id: 'error_rate_chart', data: data.map(d => d[7])},
      {id: 'downtime_chart', data: data.map(d => d[8])},
      {id: 'maintenance_flag_chart', data: data.map(d => d[9])},
      {id: 'efficiency_score_chart', data: data.map(d => d[10])},
      {id: 'production_status_chart', data: data.map(d => d[11])},
    ];

    charts.forEach(c => {
      Plotly.newPlot(c.id, [{
        x: timestamps,
        y: c.data,
        type: 'scatter',
        mode: 'markers',   // ✅ only points
        marker: { color: 'red', size: 6 }
      }], {
        margin: { t: 20 },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        font: { color: 'white' }
      }, {displayModeBar: false}); // ✅ hide toolbar
    });
  });
}

function showChart(chartId) {
  let charts = document.querySelectorAll(".chart");

  if (chartId === "all") {
    charts.forEach(c => {
      c.style.display = "block";
      c.style.opacity = 0;
      setTimeout(() => (c.style.opacity = 1), 100);
    });
  } else {
    charts.forEach(c => {
      if (c.querySelector("div").id === chartId) {
        c.style.display = "block";
        c.style.opacity = 0;
        setTimeout(() => (c.style.opacity = 1), 100);
      } else {
        c.style.display = "none";
      }
    });
  }
}

// Initial render
updateCharts();

// Auto refresh every 5 seconds
setInterval(updateCharts, 5000);
