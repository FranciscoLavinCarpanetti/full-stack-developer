console.log("Hola Mundo");

function dibujarTrianguloDeCirculos() {
    // Crear el canvas
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    // Coordenadas y radio de los círculos
    const radio = 50;
    const centroX = canvas.width / 2;
    const centroY = canvas.height / 2;

    let angulo = 0; // Ángulo inicial para la rotación

    function animar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

        // Dibujar el círculo rojo (arriba)
        ctx.beginPath();
        ctx.arc(
            centroX + Math.cos(angulo) * 100,
            centroY + Math.sin(angulo) * 100,
            radio,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();

        // Dibujar el círculo azul (abajo izquierda)
        ctx.beginPath();
        ctx.arc(
            centroX + Math.cos(angulo + (2 * Math.PI) / 3) * 100,
            centroY + Math.sin(angulo + (2 * Math.PI) / 3) * 100,
            radio,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();

        // Dibujar el círculo amarillo (abajo derecha)
        ctx.beginPath();
        ctx.arc(
            centroX + Math.cos(angulo + (4 * Math.PI) / 3) * 100,
            centroY + Math.sin(angulo + (4 * Math.PI) / 3) * 100,
            radio,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.closePath();

        // Incrementar el ángulo para la animación
        angulo += 0.02;

        // Solicitar el siguiente cuadro de animación
        requestAnimationFrame(animar);
    }

    // Iniciar la animación
    animar();
}

// Llamar a la función para dibujar los círculos
dibujarTrianguloDeCirculos();

// filepath: /Users/franciscolavin/full stack developer/javascript/script.js
// ...existing code...

function crearCardCascadaPuntos() {
    // Crear el canvas para la card de cascada
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    // Parámetros del cuadrado
    const squareSize = 250;
    const squareX = (canvas.width - squareSize) / 2;
    const squareY = (canvas.height - squareSize) / 2;

    // Parámetros de los puntos
    const pointRadius = 6;
    const colors = ['#e53935', '#8e24aa', '#3949ab', '#00897b', '#fbc02d', '#fb8c00', '#6d4c41'];
    const points = [];
    const maxPoints = Math.floor((squareSize / (pointRadius * 2)) ** 2);

    function resetPoints() {
        points.length = 0;
    }

    function addPoint() {
        // Generar una posición aleatoria dentro del cuadrado
        const cols = Math.floor(squareSize / (pointRadius * 2));
        const rows = Math.floor(squareSize / (pointRadius * 2));
        let placed = false;
        let attempts = 0;
        while (!placed && attempts < 100) {
            const col = Math.floor(Math.random() * cols);
            const row = Math.floor(Math.random() * rows);
            const x = squareX + pointRadius + col * pointRadius * 2;
            const y = squareY + pointRadius + row * pointRadius * 2;
            // Verifica que no haya un punto ya en esa posición
            if (!points.some(p => Math.abs(p.x - x) < pointRadius * 1.5 && Math.abs(p.y - y) < pointRadius * 1.5)) {
                points.push({
                    x,
                    y: squareY - pointRadius, // Empieza arriba del cuadrado
                    targetY: y,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    speed: 2 + Math.random() * 2
                });
                placed = true;
            }
            attempts++;
        }
    }

    function animar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dibuja el cuadrado con efecto card
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.18)';
        ctx.shadowBlur = 16;
        ctx.shadowOffsetY = 8;
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#bdbdbd';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.rect(squareX, squareY, squareSize, squareSize);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Agrega puntos hasta el máximo
        if (points.length < maxPoints) {
            addPoint();
        }

        // Anima los puntos cayendo
        let allArrived = true;
        for (const p of points) {
            if (p.y < p.targetY) {
                p.y += p.speed;
                if (p.y > p.targetY) p.y = p.targetY;
                allArrived = false;
            }
            ctx.beginPath();
            ctx.arc(p.x, p.y, pointRadius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = 0.85;
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.closePath();
        }

        // Si todos los puntos llegaron, espera un momento y reinicia
        if (allArrived && points.length === maxPoints) {
            setTimeout(() => {
                resetPoints();
            }, 800);
        }

        requestAnimationFrame(animar);
    }

    animar();
}

// Llama a la función para crear la card de cascada de puntos
crearCardCascadaPuntos();// ...existing code...

// Busca el contenedor de las cards
const cardsContainer = document.querySelector('.cards-container');

// Cuando crees un canvas, usa:
cardsContainer.appendChild(canvas);