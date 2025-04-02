const canvas = document.getElementById("spiderCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

class Spider {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.legs = [];
        this.legLength = 50;
        this.legSpread = Math.PI / 4;

        for (let i = 0; i < 8; i++) {
            this.legs.push({ angle: i * (Math.PI / 4), offset: Math.random() * 10 });
        }
    }

    update() {
        this.x += (mouse.x - this.x) * 0.05;
        this.y += (mouse.y - this.y) * 0.05;
    }

    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dibujar cuerpo
        ctx.fillStyle = "#555";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#888";
        ctx.beginPath();
        ctx.arc(this.x, this.y - 15, 10, 0, Math.PI * 2);
        ctx.fill();

        // Dibujar patas
        ctx.strokeStyle = "#aaa";
        ctx.lineWidth = 3;

        for (let i = 0; i < this.legs.length; i++) {
            let angle = this.legs[i].angle + Math.sin(Date.now() * 0.002 + this.legs[i].offset) * 0.2;
            let startX = this.x + Math.cos(angle) * 20;
            let startY = this.y + Math.sin(angle) * 20;
            let endX = startX + Math.cos(angle) * this.legLength;
            let endY = startY + Math.sin(angle) * this.legLength;

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }
    }
}

const spider = new Spider(canvas.width / 2, canvas.height / 2);

function animate() {
    requestAnimationFrame(animate);
    spider.update();
    spider.draw();
}

animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
