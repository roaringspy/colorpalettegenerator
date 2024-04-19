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
        const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        const colorBox = createColorBox(color);
        colorPalette.appendChild(colorBox);
    }
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
