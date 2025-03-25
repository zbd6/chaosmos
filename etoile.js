document.addEventListener("DOMContentLoaded", function () {
    const mainDiv = document.querySelector(".main"); 
    if (!mainDiv) return; // Vérifie si la div existe

    // Création du canvas dynamiquement et ajout à .main
    const canvas = document.createElement("canvas");
    canvas.id = "starsCanvas";
    mainDiv.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    let stars = [];
    let numStars = 100; // Nombre d'étoiles

    function resizeCanvas() {
        canvas.width = mainDiv.clientWidth;
        canvas.height = mainDiv.clientHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function createStars() {
        stars = [];
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 5 + 2, // Taille des étoiles
                speedX: (Math.random() - 0.5) * 0.2,
                speedY: (Math.random() - 0.5) * 0.2,
                rotation: Math.random() * 360 // Rotation aléatoire
            });
        }
    }
    createStars();

    function drawStar(x, y, size, rotation) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation * Math.PI / 180); // Appliquer la rotation
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            ctx.lineTo(
                Math.cos((18 + i * 72) * (Math.PI / 180)) * size,
                Math.sin((18 + i * 72) * (Math.PI / 180)) * size
            );
            ctx.lineTo(
                Math.cos((54 + i * 72) * (Math.PI / 180)) * (size / 2),
                Math.sin((54 + i * 72) * (Math.PI / 180)) * (size / 2)
            );
        }
        ctx.closePath();
        ctx.fillStyle = "#F8F8F"; // Couleur des étoiles
        ctx.fill();
        ctx.restore();
    }

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            drawStar(star.x, star.y, star.size, star.rotation);
        });
    }

    function animateStars() {
        stars.forEach(star => {
            star.x += star.speedX;
            star.y += star.speedY;

            if (star.x < 0) star.x = canvas.width;
            if (star.x > canvas.width) star.x = 0;
            if (star.y < 0) star.y = canvas.height;
            if (star.y > canvas.height) star.y = 0;
        });
        drawStars();
        requestAnimationFrame(animateStars);
    }
    animateStars();

    // Effet au survol de la div .main
    mainDiv.addEventListener("mousemove", (event) => {
        let rect = mainDiv.getBoundingClientRect();
        let mouseX = event.clientX - rect.left;
        let mouseY = event.clientY - rect.top;

        stars.forEach((star, index) => {
            if (index < 10) {
                star.x += (mouseX - canvas.width / 2) * 0.0005;
                star.y += (mouseY - canvas.height / 2) * 0.0005;
            }
        });
    });
});
