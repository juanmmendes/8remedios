document.addEventListener('DOMContentLoaded', function() {
    // Simulação de dados - Na prática viria de uma API
    const mockData = [
      { date: '20/11/2023', agua: '2.5L', alimentacao: '7/10', exercicio: '35min', sono: '6.5h' },
      { date: '19/11/2023', agua: '2.0L', alimentacao: '6.5/10', exercicio: '45min', sono: '7h' },
      { date: '18/11/2023', agua: '3.0L', alimentacao: '8/10', exercicio: '30min', sono: '6h' },
      // ... mais dados simulados
    ];
  
    // Elementos do DOM
    const timeRangeSelect = document.getElementById('time-range');
    const historyBody = document.querySelector('.history-table tbody');
  
    // Atualiza a tabela de histórico
    function updateHistoryTable() {
      const days = parseInt(timeRangeSelect.value);
      const filteredData = mockData.slice(0, days); // Simulação - pega os primeiros X itens
      
      let html = '';
      filteredData.forEach(item => {
        html += `
          <tr>
            <td>${item.date}</td>
            <td>${item.agua}</td>
            <td>${item.alimentacao}</td>
            <td>${item.exercicio}</td>
            <td>${item.sono}</td>
          </tr>
        `;
      });
      
      historyBody.innerHTML = html;
    }
  
    // Event listener para o filtro
    timeRangeSelect.addEventListener('change', updateHistoryTable);
  
    // Inicialização
    updateHistoryTable();
  });