const { createCanvas } = require('canvas');
const fs = require('fs');

function drawIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#1a1a28');
    gradient.addColorStop(1, '#0a0a0f');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    
    // Cercle décoratif
    ctx.beginPath();
    ctx.arc(size * 0.5, size * 0.55, size * 0.32, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 214, 127, 0.3)';
    ctx.lineWidth = size * 0.02;
    ctx.stroke();
    
    // Éclair
    const scale = size / 100;
    ctx.save();
    ctx.translate(size * 0.5, size * 0.5);
    
    ctx.beginPath();
    ctx.moveTo(-8 * scale, -25 * scale);
    ctx.lineTo(8 * scale, -25 * scale);
    ctx.lineTo(2 * scale, -3 * scale);
    ctx.lineTo(12 * scale, -3 * scale);
    ctx.lineTo(-8 * scale, 28 * scale);
    ctx.lineTo(-2 * scale, 3 * scale);
    ctx.lineTo(-12 * scale, 3 * scale);
    ctx.closePath();
    
    const boltGradient = ctx.createLinearGradient(0, -25 * scale, 0, 28 * scale);
    boltGradient.addColorStop(0, '#00d67f');
    boltGradient.addColorStop(1, '#00b36b');
    ctx.fillStyle = boltGradient;
    ctx.fill();
    
    ctx.restore();
    
    return canvas;
}

// Générer les icônes
[192, 512].forEach(size => {
    const canvas = drawIcon(size);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`icon-${size}.png`, buffer);
    console.log(`✅ icon-${size}.png créée`);
});

