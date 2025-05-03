
// Função para inicializar todos os gráficos
document.addEventListener('DOMContentLoaded', function() {
  initializeInsightChart();
  initializeProgressChart();
  initializeWaterTrendChart();
  initializeCorrelationChart();
  
  // Adicionar event listeners
  setupEventListeners();
});

function setupEventListeners() {
  // Período seletor
  document.getElementById('period-select').addEventListener('change', function() {
    updateAllCharts();
  });
  
  // Alternância de visualização
  const viewButtons = document.querySelectorAll('.view-toggle button');
  viewButtons.forEach(button => {
    button.addEventListener('click', function() {
      viewButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      updateAllCharts();
    });
  });
  
  // Filtros de categoria
  const categoryFilters = document.querySelectorAll('.chart-filters input');
  categoryFilters.forEach(filter => {
    filter.addEventListener('change', function() {
      updateAllCharts();
    });
  });
  
  // Cartões de resumo
  const summaryCards = document.querySelectorAll('.summary-card');
  summaryCards.forEach(card => {
    card.addEventListener('click', function() {
      const category = this.dataset.category;
      // Destacar o cartão selecionado
      summaryCards.forEach(c => c.style.border = 'none');
      this.style.border = '2px solid var(--primary)';
      
      // Atualizar gráficos para mostrar apenas a categoria selecionada
      updateChartsForCategory(category);
    });
  });
}

function updateAllCharts() {
  // Esta função seria chamada quando filtros mudarem
  // Na implementação real, aqui você buscaria dados do backend
  console.log('Atualizando todos os gráficos com novos filtros');
  
  // Simulando atualização dos gráficos
  initializeInsightChart();
  initializeProgressChart();
  initializeWaterTrendChart();
  initializeCorrelationChart();
}

function updateChartsForCategory(category) {
  // Esta função focaria todos os gráficos em uma categoria específica
  console.log('Focando na categoria:', category);
  
  // Na implementação real, aqui você buscaria dados filtrados do backend
  // Para a demonstração, vamos apenas registrar que a chamada foi feita
}

function initializeInsightChart() {
  const ctx = document.getElementById('insightChart').getContext('2d');
  
  // Dados para o gráfico de insight
  const labels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  const exerciseDays = [false, true, false, true, false, true, false];
  
  // Criar conjuntos de dados com cores diferentes para dias de exercício
  const waterData = [1800, 2500, 1900, 2400, 2000, 2600, 1700];
  const recommendedData = Array(7).fill(2500);
  
  // Destacar visualmente os dias de exercício
  const backgroundColor = exerciseDays.map(isExerciseDay => 
    isExerciseDay ? 'rgba(76, 175, 80, 0.7)' : 'rgba(3, 169, 244, 0.5)'
  );
  
  const borderColor = exerciseDays.map(isExerciseDay => 
    isExerciseDay ? 'rgba(76, 175, 80, 1)' : 'rgba(3, 169, 244, 1)'
  );
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Consumo de Água (ml)',
          data: waterData,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 1
        },
        {
          label: 'Recomendado',
          data: recommendedData,
          type: 'line',
          fill: false,
          borderColor: '#f44336',
          borderDash: [5, 5],
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Volume (ml)'
          }
        }
      },
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const isExerciseDay = exerciseDays[context.dataIndex];
              
              if (context.dataset.label === 'Consumo de Água (ml)') {
                const deficit = recommendedData[context.dataIndex] - context.raw;
                
                if (isExerciseDay && deficit > 0) {
                  return `${context.raw}ml (${deficit}ml abaixo do recomendado)`;
                }
                return `${context.raw}ml`;
              }
              return `${context.raw}ml`;
            },
            title: function(tooltipItems) {
              const index = tooltipItems[0].dataIndex;
              const isExerciseDay = exerciseDays[index];
              return `${labels[index]} ${isExerciseDay ? '(Dia de exercício)' : ''}`;
            }
          }
        }
      }
    }
  });
}

function initializeProgressChart() {
  const ctx = document.getElementById('progressChart').getContext('2d');
  
  // Dados para o gráfico de progresso ao longo do tempo
  const labels = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];
  
  // Cores para cada categoria
  const categoryColors = {
    agua: 'rgba(3, 169, 244, 0.7)',
    alimentacao: 'rgba(76, 175, 80, 0.7)',
    ar: 'rgba(156, 39, 176, 0.7)',
    sol: 'rgba(255, 193, 7, 0.7)',
    exercicio: 'rgba(233, 30, 99, 0.7)',
    temperanca: 'rgba(63, 81, 181, 0.7)',
    descanso: 'rgba(96, 125, 139, 0.7)',
    emocional: 'rgba(255, 87, 34, 0.7)'
  };
  
  // Criar conjuntos de dados para cada categoria
  const datasets = [
    {
      label: 'Água',
      data: [60, 65, 70, 75],
      borderColor: categoryColors.agua,
      backgroundColor: 'transparent',
      tension: 0.4
    },
    {
      label: 'Alimentação',
      data: [50, 55, 60, 65],
      borderColor: categoryColors.alimentacao,
      backgroundColor: 'transparent',
      tension: 0.4
    },
    {
      label: 'Ar Puro',
      data: [65, 70, 75, 75],
      borderColor: categoryColors.ar,
      backgroundColor: 'transparent',
      tension: 0.4
    },
    {
      label: 'Luz Solar',
      data: [55, 50, 45, 42],
      borderColor: categoryColors.sol,
      backgroundColor: 'transparent',
      tension: 0.4
    },
    {
      label: 'Exercício',
      data: [60, 58, 56, 55],
      borderColor: categoryColors.exercicio,
      backgroundColor: 'transparent',
      tension: 0.4
    },
    {
      label: 'Temperança',
      data: [65, 70, 75, 80],
      borderColor: categoryColors.temperanca,
      backgroundColor: 'transparent',
      tension: 0.4
    },
    {
      label: 'Descanso',
      data: [40, 50, 55, 60],
      borderColor: categoryColors.descanso,
      backgroundColor: 'transparent',
      tension: 0.4
    },
    {
      label: 'Emocional',
      data: [55, 60, 65, 68],
      borderColor: categoryColors.emocional,
      backgroundColor: 'transparent',
      tension: 0.4
    }
  ];
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Progresso (%)'
          }
        }
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 12
          }
        }
      },
      interaction: {
        mode: 'index',
        intersect: false
      }
    }
  });
}

function initializeWaterTrendChart() {
  const ctx = document.getElementById('waterTrend').getContext('2d');
  
  // Dados para a tendência de água
  const labels = [];
  const data = [];
  const targetData = [];
  
  // Gerar dados para os últimos 30 dias
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    labels.push(date.getDate() + '/' + (date.getMonth() + 1));
    
    // Simular dados de consumo com variação realista
    let consumption = Math.floor(Math.random() * 500) + 1600;
    
    // Adicionar padrões realistas (fins de semana com menor consumo, etc)
    const day = date.getDay();
    if (day === 0 || day === 6) {
      // Fins de semana tendem a ter menor consumo
      consumption = Math.max(1400, consumption - 400);
    }
    
    // Dias específicos com atividade física (maior consumo)
    if (i % 7 === 3 || i % 7 === 6) {
      consumption += 500;
    }
    
    data.push(consumption);
    targetData.push(2500); // Meta diária
  }
  
  // Criar o gráfico
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Consumo de Água (ml)',
          data: data,
          borderColor: 'rgba(3, 169, 244, 1)',
          backgroundColor: 'rgba(3, 169, 244, 0.1)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Meta Diária',
          data: targetData,
          borderColor: 'rgba(76, 175, 80, 0.7)',
          borderDash: [5, 5],
          fill: false,
          tension: 0,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Volume (ml)'
          }
        }
      },
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            afterLabel: function(context) {
              if (context.datasetIndex === 0) {
                const target = targetData[context.dataIndex];
                const value = context.raw;
                const percent = Math.round((value / target) * 100);
                return `${percent}% da meta diária`;
              }
            }
          }
        }
      }
    }
  });
}

function initializeCorrelationChart() {
  const ctx = document.getElementById('correlationChart').getContext('2d');
  
  // Dados fictícios mostrando correlação entre exercício e qualidade do sono
  const data = [
    { x: 10, y: 50, label: 'Seg' },  // 10 min exercício, 50% qualidade sono
    { x: 0, y: 40, label: 'Ter' },   // 0 min exercício, 40% qualidade sono
    { x: 30, y: 75, label: 'Qua' },  // 30 min exercício, 75% qualidade sono
    { x: 15, y: 65, label: 'Qui' },  // 15 min exercício, 65% qualidade sono
    { x: 0, y: 45, label: 'Sex' },   // 0 min exercício, 45% qualidade sono
    { x: 45, y: 85, label: 'Sáb' },  // 45 min exercício, 85% qualidade sono
    { x: 20, y: 70, label: 'Dom' }   // 20 min exercício, 70% qualidade sono
  ];
  
  // Calcular linha de tendência
  const xValues = data.map(point => point.x);
  const yValues = data.map(point => point.y);
  
  // Função para calcular linha de tendência linear
  function linearRegression(x, y) {
    const n = x.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;
    
    for (let i = 0; i < n; i++) {
      sumX += x[i];
      sumY += y[i];
      sumXY += x[i] * y[i];
      sumXX += x[i] * x[i];
    }
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    return { slope, intercept };
  }
  
  const regression = linearRegression(xValues, yValues);
  
  // Criar pontos para a linha de tendência
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const trendLineData = [
    { x: minX, y: regression.slope * minX + regression.intercept },
    { x: maxX, y: regression.slope * maxX + regression.intercept }
  ];
  
  new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Exercício vs. Qualidade do Sono',
          data: data,
          backgroundColor: 'rgba(63, 81, 181, 0.7)',
          pointRadius: 8,
          pointHoverRadius: 10
        },
        {
          label: 'Tendência',
          data: trendLineData,
          type: 'line',
          borderColor: 'rgba(233, 30, 99, 0.7)',
          borderWidth: 2,
          pointRadius: 0,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Tempo de Exercício (minutos)'
          }
        },
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Qualidade do Sono (%)'
          }
        }
      },
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const point = data[context.dataIndex];
              if (point) {
                return `${point.label}: ${point.x} min exercício, ${point.y}% qualidade do sono`;
              }
              return '';
            }
          }
        }
      }
    }
  });
}
