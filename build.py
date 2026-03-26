import re

def main():
    try:
        html_path = 'c:/Users/PC/.gemini/antigravity/playground/sidereal-ring/index.html'
        with open(html_path, 'r', encoding='utf-8') as f:
            html = f.read()
            
        # 1. Replace <style> block
        style_replacement = '<script src="https://unpkg.com/@phosphor-icons/web"></script>\n    <link rel="stylesheet" href="styles.css">'
        html = re.sub(r'<style>.*?</style>', style_replacement, html, flags=re.DOTALL)
        
        # 2. Replace top nav with bottom nav
        nav_new = """
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
"""
        html = re.sub(r'<nav class="nav-sticky">.*?</nav>', nav_new, html, flags=re.DOTALL)
        
        # 3. Rename animation classes
        html = html.replace('fade-in', 'reveal')
        
        # 4. Insert Modal before body closing
        modal_html = """
    <!-- Modal Gastronómico Premium -->
    <div id="dish-modal" class="modal-overlay">
        <div class="modal-content">
            <button class="modal-close" onclick="closeModal()"><i class="ph ph-x"></i></button>
            <img src="" alt="" class="modal-image" id="modal-img">
            <div class="modal-body">
                <h2 class="modal-title playfair" id="modal-title">Título</h2>
                <div class="modal-price" id="modal-price">$0.00</div>
                <div class="modal-description" id="modal-desc">Descripción...</div>
                <a href="#" target="_blank" class="order-btn" id="modal-order">Agregar a la Orden</a>
            </div>
        </div>
    </div>
    
    <script src="main.js"></script>
</body>"""
        html = html.replace('</body>', modal_html)
        
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(html)
        print("HTML successfully migrated!")
        
    except Exception as e:
        print(f"Error details: {e}")

if __name__ == '__main__':
    main()
