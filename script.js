function generatePalette() {
    const numColorsInput = document.getElementById('numColors');
    const numColors = parseInt(numColorsInput.value);

    const colorPalette = document.getElementById('colorPalette');
    colorPalette.innerHTML = '';

    const baseHue = Math.floor(Math.random() * 360);
    const saturation = 70;
    const lightness = 60;

    for (let i = 0; i < numColors; i++) {
        const hue = (baseHue + i * 30) % 360;
        const color = hslToHex(hue, saturation, lightness);
        const colorBox = createColorBox(color);
        colorPalette.appendChild(colorBox);
    }
}

function hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        const hueToRgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hueToRgb(p, q, h + 1 / 3);
        g = hueToRgb(p, q, h);
        b = hueToRgb(p, q, h - 1 / 3);
    }

    const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function createColorBox(color) {
    const colorBox = document.createElement('div');
    colorBox.classList.add('colorBox');
    colorBox.style.backgroundColor = color;
    colorBox.title = color;

    colorBox.addEventListener('mouseover', () => showColorInfo(colorBox, color));
    colorBox.addEventListener('click', () => copyColorInfo(color));

    return colorBox;
}

function showColorInfo(colorBox, color) {
    colorBox.textContent = color;
}

function copyColorInfo(color) {
    navigator.clipboard.writeText(color)
        .then(() => {
            alert(`Color "${color}" copied to clipboard!`);
        })
        .catch(err => {
            console.error('Failed to copy:', err);
        });
}
