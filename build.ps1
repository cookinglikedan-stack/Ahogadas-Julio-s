$htmlPath = "c:\Users\PC\.gemini\antigravity\playground\sidereal-ring\index.html"
$html = Get-Content -Path $htmlPath -Raw -Encoding UTF8

$styleReplacement = '<script src="https://unpkg.com/@phosphor-icons/web"></script>' + "`n    <link rel='stylesheet' href='styles.css'>"
$html = $html -replace '(?s)<style>.*?</style>', $styleReplacement

$navNew = '
    <!-- Navegación Inferior Móvil (Bottom App Bar) -->
    <nav class="bottom-nav">
        <div class="bottom-nav-container">
            <a href="#ahogadas" class="nav-item active">
                <i class="ph ph-hamburger"></i>
                <span>Ahogadas</span>
            </a>
            <a href="#tacos" class="nav-item">
                <i class="ph ph-taco"></i>
                <span>Tacos</span>
            </a>
            <a href="#antojitos" class="nav-item">
                <i class="ph ph-pizza-slice"></i>
                <span>Antojitos</span>
            </a>
            <a href="#bebidas" class="nav-item">
                <i class="ph ph-brandy"></i>
                <span>Bebidas</span>
            </a>
        </div>
    </nav>
'
$html = $html -replace '(?s)<nav class="nav-sticky">.*?</nav>', $navNew
$html = $html -replace 'fade-in', 'reveal'

$modalHtml = '
    <!-- Modal Gastronómico Premium -->
    <div id="dish-modal" class="modal-overlay">
        <div class="modal-content">
            <button class="modal-close" onclick="closeModal()"><i class="ph ph-x"></i></button>
            <img src="" alt="dish" class="modal-image" id="modal-img">
            <div class="modal-body">
                <h2 class="modal-title playfair" id="modal-title">Título</h2>
                <div class="modal-price" id="modal-price">$0.00</div>
                <div class="modal-description" id="modal-desc">Descripción...</div>
                <a href="#" target="_blank" class="order-btn" id="modal-order">Agregar a la Orden</a>
            </div>
        </div>
    </div>
    
    <script src="main.js"></script>
</body>'
$html = $html -replace '</body>', $modalHtml

Set-Content -Path $htmlPath -Value $html -Encoding UTF8
Write-Host "Success via PowerShell"
