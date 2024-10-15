let numParticles = 300;  // Número total de partículas
let particles = [];  // Arreglo para almacenar las partículas
let zOffset = 0;  // Desplazamiento en el eje Z para el ruido de Perlin

function setup() {
  createCanvas(800, 600);  // Crear un lienzo de 800x600 píxeles
  background(0);  // Fondo negro
  
  // Crear las partículas iniciales
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: random(width),    // Posición X aleatoria
      y: random(height),   // Posición Y aleatoria
      velX: 0,             // Velocidad en el eje X
      velY: 0,             // Velocidad en el eje Y
      size: random(2, 8),  // Tamaño aleatorio para cada partícula
      hue: random(100, 255) // Color inicial aleatorio
    });
  }
}

function draw() {
  background(0, 10);  // Fondo con transparencia para dejar rastros
  
  // Iterar sobre cada partícula
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];  // Acceder a la partícula actual
    
    // Calcular la distancia entre el mouse y la partícula actual
    let distMouse = dist(mouseX, mouseY, p.x, p.y);
    
    // Si la partícula está dentro de un radio específico del mouse
    if (distMouse < 150) {  
      // Calcular el ángulo de atracción
      let angle = atan2(mouseY - p.y, mouseX - p.x);
      let forceX = cos(angle) * 0.05;  // Componente X de la fuerza
      let forceY = sin(angle) * 0.05;  // Componente Y de la fuerza
      
      // Añadir la fuerza generada por la atracción a la velocidad de la partícula
      p.velX += forceX;  
      p.velY += forceY;  
    }

    // Limitar la velocidad máxima
    p.velX = constrain(p.velX, -2, 2);
    p.velY = constrain(p.velY, -2, 2);
    
    // Actualizar la posición de la partícula
    p.x += p.velX;
    p.y += p.velY;
    
    // Dibujar la partícula en su nueva posición
    noStroke();
    fill(p.hue, 200, 255, 200);  // Colores brillantes con algo de transparencia
    ellipse(p.x, p.y, p.size);  // Dibujar la partícula como un círculo
    
    // Hacer que las partículas aparezcan en el lado opuesto si salen de los bordes
    if (p.x > width) p.x = 0;
    if (p.x < 0) p.x = width;
    if (p.y > height) p.y = 0;
    if (p.y < 0) p.y = height;
  }
  
  // Aumentar el zOffset para que el ruido de Perlin cambie con el tiempo
  zOffset += 0.01; // Este valor puede ser utilizado en el ruido de Perlin
}