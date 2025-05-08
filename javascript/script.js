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