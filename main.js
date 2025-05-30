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