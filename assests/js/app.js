class Game {
    constructor() {
      this.counterDisplay = document.querySelector('h3');
      this.counter = 0;
      this.containerMsg = document.querySelector('.container--msg');
      this.msgError = document.createElement('p');
      this.msgError.textContent = 'Tu as perdu';
      this.msgError.classList.add('none');
      this.containerMsg.appendChild(this.msgError);
      this.intervalId = null;
    }
  
    bubbleMaker() {
      const bubble = document.createElement('span');
      bubble.classList.add('bubble');
      document.body.appendChild(bubble);
  
      const size = Math.round(Math.random() * 200 + 100) + 'px';
  
      bubble.style.height = size;
      bubble.style.width = size;
  
      bubble.style.top = Math.random() * 100 + 50 + '%';
      bubble.style.left = Math.random() * 100 + '%';
      const plusMinus = Math.random() > 0.5 ? 1 : -1;
      bubble.style.setProperty('--left', Math.random() * 100 * plusMinus + '%');
  
      bubble.addEventListener('click', (e) => {
        if (e.target !== bubble) {
          this.counter = 0;
        } else {
          this.counter++;
        }
        this.counterDisplay.textContent = this.counter;
        bubble.remove();
        this.msgError.classList.add('none');
  
        if (this.counter === 20) {
          clearInterval(this.intervalId);
          this.intervalId = setInterval(this.bubbleMaker.bind(this), 500);
        }
      });
  
      setTimeout(() => {
        bubble.remove();
      }, 6000);
    }
  
    start() {
      this.intervalId = setInterval(this.bubbleMaker.bind(this), 1000);
  
      document.body.addEventListener('click', (e) => {
        if (!e.target.classList.contains('bubble') && !e.target.classList.contains('btn--restart'))   {
          this.counter = 0;
          this.counterDisplay.textContent = this.counter;
          this.msgError.classList.remove('none');
          clearInterval(this.intervalId);
          this.intervalId = setInterval(this.bubbleMaker.bind(this), 1000);
        }
      });
    }
  
    restart() {
      clearInterval(this.intervalId);
      this.counter = 0;
      this.counterDisplay.textContent = this.counter;
      this.start();
    }
  }
  
  const btnRestart = document.querySelector('.btn--restart')
  
  btnRestart.addEventListener('click', () => game.restart());

  const game = new Game();
  game.start();