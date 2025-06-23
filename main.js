function toggleInfo(id) {
    const card = document.getElementById(id);
    const button = card.querySelector('.btn-toggle');
    card.classList.toggle('expanded');
    button.textContent = card.classList.contains('expanded') ? 'Menos info ↑' : 'Más info →';
    button.textContent = card.classList.contains('expanded') ? 'Ir al formulario' : 'Más info →';
}

function toggleMenu() {
    const nav = document.getElementById('navMenu');
    nav.classList.toggle('show');
}

function toggleInfo(id) {
    const card = document.getElementById(id);
    const button = card.querySelector('.btn-toggle');
    
    card.classList.toggle('expanded');
    
    if (card.classList.contains('expanded')) {
      button.textContent = 'Menos info ↑';
    } else {
      button.textContent = 'Más info →';
    }
}

/* Add repetitive code */
fetch("navbar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;
  }
);

fetch("formulario.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("formulario").innerHTML = data;
  }
);

document.addEventListener('DOMContentLoaded', () => {
  // Cargar el contenido del modal
  fetch("politica_privacidad.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("politica_privacidad").innerHTML = data;

      // Asegurar que las funciones se cargan DESPUÉS de insertar el HTML del modal
      window.openModal = function () {
        const modal = document.getElementById("politica_privacidad");
        if (modal) modal.style.display = "block";
      }

      window.closeModal = function () {
        const modal = document.getElementById("politica_privacidad");
        if (modal) modal.style.display = "none";
      }

      window.addEventListener("click", function (event) {
        const modal = document.getElementById("politica_privacidad");
        if (event.target === modal) {
          closeModal();
        }
      });
    }
  );  
  // Cargar artículo por defecto al abrir la página
  fetch('Articles-blog/articulo1.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('blog-article-container').innerHTML = data;
      if (window.MathJax) {
        MathJax.typesetPromise(); // Reprocesa las fórmulas después de insertar el HTML
      }
    })
    .catch(() => {
      const container = document.getElementById('blog-article-container');
      if (container) {
        container.innerHTML = '<p>Error al cargar el artículo.</p>';
      }
    });
});