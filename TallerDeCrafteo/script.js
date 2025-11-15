// Materiales
const materiales = {
  wood: { nombre: "Madera", acepta: "banco", producto: "flechas" },
  iron: { nombre: "Hierro", acepta: "forja", producto: "lingotes" },
  powder: { nombre: "Pólvora", acepta: "alquimia", producto: "bombas" }
};

// Contadores de productos
const contadores = {
  lingotes: document.getElementById("ingotCounter"),
  flechas: document.getElementById("arrowCounter"),
  bombas: document.getElementById("bombCounter")
};

// Estaciones
const estaciones = {
  forja: document.getElementById("forja"),
  banco: document.getElementById("banco"),
  alquimia: document.getElementById("alquimia")
};

// Mejora propuesta: sonidos para cada tipo de estación
const sonidos = {
  wood: new Audio("Carpenter.mp3"),
  iron: new Audio("Forge.mp3"),
  powder: new Audio("Alchemy.mp3")
};

// Variable para almacenar el ID del material actual
let idActual = null;

// Dragstart
document.querySelectorAll(".material").forEach(material => {
  material.addEventListener("dragstart", (e) => {
    idActual = e.target.id;
    e.dataTransfer.setData("text/plain", idActual);
  });
});

// Eventos de las estaciones
Object.values(estaciones).forEach(estacion => {

  estacion.addEventListener("dragenter", () => {
    const mat = materiales[idActual];

    if (estacion.id === mat.acepta) {
      estacion.classList.add("active");
    } else {
      estacion.classList.add("error");
    }
  });

  // Dragover: permite soltar sólo si el material es válido
  estacion.addEventListener("dragover", e => {
    const mat = materiales[idActual];
    if (mat && estacion.id === mat.acepta) {
      e.preventDefault();
    }
  });

  // Drop: transforma un material en el producto correspondiente
  estacion.addEventListener("drop", e => {
    e.preventDefault();
    const mat = materiales[idActual];

    if (mat && estacion.id === mat.acepta) {
      // Aquí se consume el material y desaparece del DOM
      document.getElementById(idActual).remove();

      // Aumenta el contador del producto
      const contador = contadores[mat.producto];
      contador.textContent = parseInt(contador.textContent) + 1;

      // Mejora propuesta: se reproduce un sonido distinto para cada material
      sonidos[idActual].play();
    }
  });

  // Reset visual cuando sale del área
  estacion.addEventListener("dragleave", () => {
    estacion.classList.remove("active");
    estacion.classList.remove("error");
  });
});
