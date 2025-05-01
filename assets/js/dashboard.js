document.addEventListener('DOMContentLoaded', function() {
    let currentDate = new Date(); // Data atual como padrão
    
    // Atualiza a data exibida
    function updateDateDisplay() {
        const options = { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        };
        document.getElementById('current-date').textContent = 
            currentDate.toLocaleDateString('pt-BR', options);
        
        // Desabilita o botão de próximo dia se for data futura
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        document.getElementById('next-day').disabled = 
            currentDate.getTime() >= today.getTime();
    }
  
    // Navegação para dia anterior
    document.getElementById('prev-day').addEventListener('click', function() {
        currentDate.setDate(currentDate.getDate() - 1);
        updateDateDisplay();
        loadDailyData(currentDate); // Carrega os dados do dia selecionado
    });
  
    // Navegação para próximo dia
    document.getElementById('next-day').addEventListener('click', function() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Só permite avançar se não for data futura
        if (currentDate.getTime() < today.getTime()) {
            currentDate.setDate(currentDate.getDate() + 1);
            updateDateDisplay();
            loadDailyData(currentDate); // Carrega os dados do dia selecionado
        }
    });
  
    // Função simulada para carregar dados do dia
    function loadDailyData(date) {
        console.log('Carregando dados para:', date.toLocaleDateString());
        // Aqui você faria uma requisição para sua API
        // Exemplo:
        // fetch(`/api/daily-data?date=${date.toISOString().split('T')[0]}`)
        //   .then(response => response.json())
        //   .then(data => populateForm(data));
    }
  
    // Função simulada para preencher o formulário
    function populateForm(data) {
        console.log('Preenchendo formulário com:', data);
        // Aqui você preencheria os radio buttons com os dados recebidos
    }
  
    // Inicialização
    updateDateDisplay();
    loadDailyData(currentDate); // Carrega os dados do dia atual
});