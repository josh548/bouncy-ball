const canvas: HTMLCanvasElement = document.querySelector("canvas") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;

const gravity: number = 0.5;
const bounceFactor: number = 0.8;
const frictionFactor: number = 0.995;

class Ball {
    public cx: number;
    public cy: number;
    public readonly radius: number;
    public vx: number;
    public vy: number;
    public readonly acceleration: number;

    public constructor(initialX: number, initialY: number, radius: number, initialVelocity: number,
                       angle: number, acceleration: number) {
        this.cx = initialX;
        this.cy = initialY;
        this.radius = radius;
        this.vx = initialVelocity * Math.cos(angle);
        this.vy = -initialVelocity * Math.sin(angle);
        this.acceleration = acceleration;
    }

    public draw(): void {
        context.beginPath();
        context.arc(Math.floor(this.cx), Math.floor(this.cy), this.radius, 0, Math.PI * 2);
        context.fill();
    }

    public update(): void {
        this.cx += this.vx;
        this.vy += this.acceleration;
        this.cy += this.vy;
        this.detectCollision();
    }

    private detectCollision(): void {
        if (this.cx - this.radius < 0 && this.vx < 0) {
            this.cx = this.radius;
            this.vx = -this.vx * bounceFactor;
        }
        if (this.cx + this.radius >= canvas.width && this.vx > 0) {
            this.cx = canvas.width - this.radius;
            this.vx = -this.vx * bounceFactor;
        }
        if (this.cy - this.radius < 0 && this.vy < 0) {
            this.cy = this.radius;
            this.vy = -this.vy * bounceFactor;
        }
        if (this.cy + this.radius >= canvas.height && this.vy > 0) {
            this.cy = canvas.height - this.radius;
            this.vy = -this.vy * bounceFactor;
            if (Math.abs(this.vy) < 1) {
                this.vx *= frictionFactor;
            }
        }
    }
}

const randomX: number = Math.floor(Math.random() * canvas.width);
const randomY: number = Math.floor(Math.random() * canvas.height);
const randomRadius: number =
    Math.floor((Math.random() * Math.min(canvas.width, canvas.height)) / 10);
const randomInitialVelocity: number = Math.floor(Math.random() * 100);
const randomAngle: number = Math.random() * Math.PI * 2;
const ball: Ball =
    new Ball(randomX, randomY, randomRadius, randomInitialVelocity, randomAngle, gravity);

function animate(): void {
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    ball.update();
    requestAnimationFrame(animate);
}

animate();
