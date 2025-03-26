var balls = []

function setup() {
    createCanvas(windowWidth, windowHeight);

    for (let i = 0; i < 10; i++) {
        var b = new Ball(i)
        balls.push(b)
    }
}

function draw() {
    background(30)

    for (var i = 0; i < balls.length; i++) {
        balls[i].collide()
        balls[i].edges()
        balls[i].move()
        balls[i].show()
    }   
}

function mousePressed() {
    var newBall = new Ball(balls.length); 
    balls.push(newBall); 
}

class Ball {
    constructor(index) {
        this.index = index;
        this.radius = 50;
        this.pos = createVector(random(this.radius, width - this.radius), random(this.radius, height - this.radius));
        this.vel = p5.Vector.random2D().mult(2);
        this.color = color(255); 
        this.lastCollisionTime = 0; 
    }

    collide() {
        for (var i = 0; i < balls.length; i++) {
            if (this.index !== i) {
                var d = dist(this.pos.x, this.pos.y, balls[i].pos.x, balls[i].pos.y);

               
                if (d < this.radius + balls[i].radius) {
                    let currentTime = millis(); 

                   
                    if (currentTime - this.lastCollisionTime > 200) { 
                        this.color = color(random(255), random(255), random(255));
                        this.lastCollisionTime = currentTime; 
                    }
                    return; 
                }
            }
        }
    }

    edges() {
        if (this.pos.x < this.radius || this.pos.x > width - this.radius) {
            this.vel.x *= -1;
        }
        if (this.pos.y < this.radius || this.pos.y > height - this.radius) {
            this.vel.y *= -1;
        }
    }

    move() {
        this.pos.add(this.vel);
    }

    show() {
        noStroke();
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.radius * 2);
    }
}