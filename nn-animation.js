console.log('nn_animation.js is loading....');

// Wait for the DOM to be fully loaded
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing canvas...');

    /* Get the canvas and set its size */
    const canvas = document.getElementById('neural-network');
    const ctx = canvas.getContext('2d');    

    /* Make the color scheme matching your website - this is what is called an Object in javascrypt*/
    const colors = {
        particles: '#8b7355',      // Warm Brown
        connection: '#6b5d5440',  // Dark Warm Brown with transparency
        particlesGlow: '#8b735520' // Accent with low opacity for glow 
    };

    /* Mouse position */
    let mouse = {
        x: null,
        y: null,
        radius: 100 // Area of influence
    }


    /* Update mouse position */
    canvas.addEventListener('mousemove', (event) =>{
        const rect = canvas.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
    });

    /* Clear mouse position when it leaves */
    canvas.addEventListener('mouseleave', () =>{
        mouse.x = null;
        mouse.y = null;
    });


    /* Particle Array */
    let particles = [];

    /* Particle Class */
    class Particle {
        constructor(x,y){
            this.x = x;
            this.y = y;
            this.size = Math.random() * 3 + 2; // Random size between 2-5
            this.baseSize = this.size;
            this.speedX = (Math.random() - 0.5) * 0.5; // Random speed
            this.speedY = (Math.random() - 0.5) * 0.5;
        }

        // Function that updates the particle's position
        update(){
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce off walls
            if (this.x<0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y<0 || this.y > canvas.height) this.speedY *=-1;

            // Mouse interactions
            if(mouse.x != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    // Make particles slightly repel from mouse
                    const force = (mouse.radius - distance) / mouse.radius;
                    const angle = Math.atan2(dy,dx);
                    this.x -= Math.cos(angle) * force * 2;
                    this.y -= Math.sin(angle) * force * 2;


                    // Make particle grow when near mouse
                    this.size = this.baseSize + (force * 3);
                } else{
                    // return to original size
                    this.size = this.baseSize;
                }
            }
        }

        // Renders / draws the particle 
        draw(){
            ctx.fillStyle = colors.particles; // Set fill color
            ctx.beginPath(); // Begin drawing
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); // Draw a circle
            ctx.fill();
        }

    }

    /* Function to draw connections between particles if they are really close to each other */
    function drawConnections(){
        for(let i = 0; i < particles.length; i++){
            for(let j = i+1; j< particles.length; j++){
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Only draw connection if particles are close enough
                if(distance < 100) {
                    ctx.strokeStyle = colors.connection;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }


    /* Create initial particles */
    function createParticles(){
        particles = [];
        const numberOfParticles = Math.floor((canvas.width * canvas.height) / 10000);

        
        for (let i =0; i < numberOfParticles; i++){
            particles.push(new Particle(
                Math.random()* canvas.width,
                Math.random() * canvas.height,
            ))
        }
    }


    /* Update the animate function */
    function resizeCanvas(){
        canvas.width = window.innerWidth;
        canvas.height = 300; // or whatever heigh you want
        createParticles(); // Create Particles after resize
    }

    /* Create animation loop */
    function animate(){
        // Clear canvas
        ctx.fillStyle = 'rgba(253, 252, 250, 0.2)';
        ctx.fillRect(0,0,canvas.width, canvas.height);

        // Draw connections
        drawConnections();

        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate)
    }

    // Initialize everything
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();


})




