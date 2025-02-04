import { useEffect } from 'react';
import './App.css';
import Cake from './components/Cake';

function App() {
  useEffect(() => {
    const bits = 80; // Number of particles
    const speed = 45; // Speed of animation (lower is faster)
    const bangs = 5; // Simultaneous fireworks
    const colours = ['#03f', '#f03', '#0e0', '#93f', '#0cf', '#f93', '#f0c']; 

    let swide = window.innerWidth;
    let shigh = window.innerHeight;
    let boddie = document.createElement('div');
    
    boddie.style.position = 'fixed';
    boddie.style.top = '0px';
    boddie.style.left = '0px';
    boddie.style.width = '100vw';
    boddie.style.height = '100vh';
    boddie.style.overflow = 'hidden';
    boddie.style.pointerEvents = 'none';
    document.body.appendChild(boddie);

    const createDiv = (char :any, size :any) => {
      const div = document.createElement('div');
      div.style.fontSize = `${size}px monospace`;
      div.style.position = 'absolute';
      div.style.backgroundColor = 'transparent';
      div.textContent = char;
      return div;
    };

    const launch = () => {
      for (let i = 0; i < bangs; i++) {
        let star = createDiv('|', 12);
        star.style.color = colours[Math.floor(Math.random() * colours.length)];
        star.style.left = `${swide / 2}px`;
        star.style.top = `${shigh - 10}px`;
        boddie.appendChild(star);

        let moveInterval = setInterval(() => {
          let topPos = parseInt(star.style.top) - 4;
          star.style.top = `${topPos}px`;

          if (topPos < shigh * 0.4) {
            clearInterval(moveInterval);
            explode(star);
          }
        }, speed);
      }
    };

    const explode = (star:any) => {
      for (let i = 0; i < bits; i++) {
        let particle = createDiv('*', 13);
        particle.style.color = colours[Math.floor(Math.random() * colours.length)];
        particle.style.left = star.style.left;
        particle.style.top = star.style.top;
        boddie.appendChild(particle);

        let dX = (Math.random() - 0.5) * 10;
        let dY = (Math.random() - 0.5) * 10;
        let decay = 16 + Math.floor(Math.random() * 16);

        let particleInterval = setInterval(() => {
          let leftPos = parseInt(particle.style.left) + dX;
          let topPos = parseInt(particle.style.top) + dY;
          particle.style.left = `${leftPos}px`;
          particle.style.top = `${topPos}px`;

          if (decay-- < 1) {
            clearInterval(particleInterval);
            particle.remove();
          }
        }, speed);
      }
      star.remove();
    };

    launch();
    let interval = setInterval(launch, 2000);

    window.addEventListener('resize', () => {
      swide = window.innerWidth;
      shigh = window.innerHeight;
    });

    return () => {
      clearInterval(interval);
      boddie.remove();
    };
  }, []);

  return (
    <div>
      <div className="pyro">
        <div className="before"></div>
        <div className="after"></div>
      </div>
      <div style={{ marginInline: 'auto' }} className="confetti-container">
        <h1>{`< Courtois >`}</h1>
        <div className="img-holder relative">
          <img src="/anish-sir.jfif" alt="Saroj" className="image-image" />
          <img src="/anish-sir-gif.gif" alt="Saroj" className="anish-sir" />
        </div>
        <h2>Happy Birthday Anish Sir!</h2>
        <span className="conffeti-holder">🎉</span>
      </div>
      <Cake />
    </div>
  );
}

export default App;
