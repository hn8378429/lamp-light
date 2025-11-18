class BeautifulLamp {
    constructor() {
        this.lamp = document.getElementById('lamp');
        this.lampSwitch = document.getElementById('lampSwitch');
        this.toggleBtn = document.getElementById('toggleBtn');
        this.btnText = document.querySelector('.btn-text');
        this.roomLight = document.createElement('div');
        this.lampLight = document.createElement('div');
        this.lampShadow = document.createElement('div');
        
        this.isOn = false;
        this.init();
    }
    
    init() {
        // Create additional elements
        this.createLightEffects();
        
        // Event listeners
        this.toggleBtn.addEventListener('click', () => this.toggle());
        this.lampSwitch.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });
        this.lamp.addEventListener('click', () => this.toggle());
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.toggle();
            }
        });
        
        // Switch drag effect
        this.addSwitchDrag();
    }
    
    createLightEffects() {
        // Room light
        this.roomLight.className = 'room-light';
        document.body.appendChild(this.roomLight);
        
        // Lamp light beam
        this.lampLight.className = 'lamp-light';
        this.lamp.appendChild(this.lampLight);
        
        // Lamp shadow
        this.lampShadow.className = 'lamp-shadow';
        document.querySelector('.table').appendChild(this.lampShadow);
    }
    
    addSwitchDrag() {
        let isDragging = false;
        
        this.lampSwitch.addEventListener('mousedown', (e) => {
            isDragging = true;
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                this.toggle();
                isDragging = false;
            }
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
        
        // Touch support
        this.lampSwitch.addEventListener('touchstart', (e) => {
            this.toggle();
            e.preventDefault();
        });
    }
    
    toggle() {
        if (this.isOn) {
            this.turnOff();
        } else {
            this.turnOn();
        }
    }
    
    turnOn() {
        this.lamp.classList.add('on');
        this.roomLight.classList.add('on');
        this.btnText.textContent = 'Lamp OFF';
        this.isOn = true;
        this.playClickSound(true);
    }
    
    turnOff() {
        this.lamp.classList.remove('on');
        this.roomLight.classList.remove('on');
        this.btnText.textContent = 'Lamp ON';
        this.isOn = false;
        this.playClickSound(false);
    }
    
    playClickSound(isOn) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = isOn ? 600 : 400;
        oscillator.type = 'sine';
        gainNode.gain.value = 0.1;
        
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
}

// Initialize the lamp when page loads
document.addEventListener('DOMContentLoaded', () => {
    new BeautifulLamp();
});

// Add mouse move effect for realistic lighting
document.addEventListener('mousemove', (e) => {
    const lamp = document.getElementById('lamp');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    lamp.style.transform = `perspective(1000px) rotateY(${x * 10 - 5}deg) rotateX(${y * -5 + 2}deg)`;
});
