// CONFIGURAÇÃO DA DATA - EDITE APENAS ESTA PARTE!
const config = {
    // ⬇️⬇️⬇️ EDITE AQUI ⬇️⬇️⬇️
    dia: 19,    // Dia do aniversário
    mes: 11,    // Mês (11 = Novembro, 12 = Dezembro, etc)
    ano: 2025   // Ano (opcional - se não preencher, usa o ano atual ou próximo)
    // ⬆️⬆️⬆️ EDITE ACIMA ⬆️⬆️⬆️
};

// Data do aniversário de namoro - AGORA CONFIGURÁVEL
function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Usa o ano da configuração ou calcula automaticamente
    let anniversaryYear = config.ano || currentYear;
    
    // Verifica se já passou o aniversário deste ano
    let anniversaryDate = new Date(anniversaryYear, config.mes - 1, config.dia);
    
    // Se não especificou ano ou já passou a data, usa próximo ano
    if (!config.ano || now > anniversaryDate) {
        anniversaryDate = new Date(currentYear, config.mes - 1, config.dia);
        if (now > anniversaryDate) {
            anniversaryDate = new Date(currentYear + 1, config.mes - 1, config.dia);
        }
    }
    
    const timeRemaining = anniversaryDate - now;
    
    // Cálculos de tempo
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    // Atualiza a contagem na página
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    // Mensagem especial quando faltar pouco tempo
    if (days === 0 && hours < 24) {
        document.querySelector('.message').innerHTML = 
            "✨ <strong>HOJE É O DIA!</strong> ✨<br>Nosso aniversário é hoje! Te amo mais que tudo!";
    }
}

// Carrega e exibe as 4 fotos automaticamente
function loadPhotos() {
    const photosGrid = document.getElementById('photosGrid');
    
    const totalPhotos = 4; // Apenas 4 fotos
    
    for (let i = 1; i <= totalPhotos; i++) {
        const photoName = `f${i}.jpg`;
        
        // Cria o card da foto (sem informações extras)
        const photoCard = document.createElement('div');
        photoCard.className = 'photo-card';
        photoCard.innerHTML = `
            <div class="photo-container">
                <img src="${photoName}" alt="Nossa foto ${i}" class="photo-real" id="photo${i}">
                <div class="photo-placeholder" id="placeholder${i}">
                    📸
                </div>
            </div>
        `;
        
        photosGrid.appendChild(photoCard);
        
        // Verifica se a foto existe
        checkPhoto(photoName, i);
    }
    
    function checkPhoto(photoName, index) {
        const photo = document.getElementById(`photo${index}`);
        const placeholder = document.getElementById(`placeholder${index}`);
        
        photo.onload = function() {
            // Foto carregou com sucesso - esconde o placeholder
            placeholder.style.display = 'none';
            photo.style.display = 'block';
        };
        
        photo.onerror = function() {
            // Foto não encontrada - mostra o placeholder
            placeholder.style.display = 'flex';
            photo.style.display = 'none';
        };
        
        // Força a verificação
        photo.src = photoName + '?' + new Date().getTime();
    }
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa a contagem regressiva
    updateCountdown();
    
    // Atualiza a contagem a cada segundo
    setInterval(updateCountdown, 1000);
    
    // Carrega as 4 fotos
    loadPhotos();
});