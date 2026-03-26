// Intersection Observer para Animaciones de Scroll Orgánicas
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
};

// Navegación Activa en el Bottom Bar al hacer Scroll
const handleNavigation = () => {
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Se resta algo de offset para cambiar suavemente
            if (scrollY >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });
};

// Lógica del Modal Elegante
const modal = document.getElementById('dish-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalDesc = document.getElementById('modal-desc');
const modalOrder = document.getElementById('modal-order');

const openModal = (card) => {
    // Extraer la información de la tarjeta que el usuario tocó
    const imgUrl = card.querySelector('img').src;
    const title = card.querySelector('.card-title').innerText;
    const price = card.querySelector('.card-price').innerText;
    const desc = card.querySelector('.card-desc').innerText;

    // Asignar los valores al modal
    modalImg.src = imgUrl;
    modalImg.alt = title;
    modalTitle.innerText = title;
    modalPrice.innerText = price;
    
    // Aquí es donde brillará la experiencia gastronómica.
    // Combinamos la descripción original, pero le damos un formato exquisito:
    modalDesc.innerHTML = `
        <strong>La Experiencia:</strong><br><br>
        ${desc}<br><br>
        <em>Ingredientes seleccionados cuidadosamente por nuestros chefs, respetando la auténtica tradición y garantizando un sabor inigualable en cada bocado.</em>
    `;
    
    // Lógica para enviar orden por WhatsApp
    const msg = encodeURIComponent(`Hola Ahogadas Julio's, me interesa ordenar: ${title} (${price})`);
    modalOrder.href = `https://wa.me/5211234567890?text=${msg}`;

    // Mostrar el modal y bloquar el scroll de fondo
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; 
};

// Función para cerrarlo (ejecutada por click en icono de cierre o fondo sombreado)
window.closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
};

// Inicialización cuando carga todo el HTML
document.addEventListener('DOMContentLoaded', () => {
    observeElements();
    handleNavigation();

    // Eventos de click en cada tarjeta de platillo
    document.querySelectorAll('.menu-card').forEach(card => {
        card.addEventListener('click', () => openModal(card));
    });

    // Cerrar el modal si se toca el fondo oscuro (la superposición)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});
