// DOM Elements
const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('inputColor');
const alteredColor = document.getElementById('alteredColor');
const alteredColorText = document.getElementById('alteredColorText');
const slider = document.getElementById('slider');
const sliderText = document.getElementById('sliderText');
const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');
const toggleBtn = document.getElementById('toggleBtn');
const saturationSlider = document.getElementById('saturationSlider');
const saturationText = document.getElementById('saturationText');
const hueSlider = document.getElementById('hueSlider');
const hueText = document.getElementById('hueText');
const copyButton = document.getElementById('copyButton');
const applyButton = document.getElementById('applyButton');
const colorHistory = document.getElementById('colorHistory');

// Add new DOM elements
const colorPicker = document.getElementById('colorPicker');
const inputColorHex = document.getElementById('inputColorHex');
const inputColorRgb = document.getElementById('inputColorRgb');
const inputColorHsl = document.getElementById('inputColorHsl');
const alteredColorHex = document.getElementById('alteredColorHex');
const alteredColorRgb = document.getElementById('alteredColorRgb');
const alteredColorHsl = document.getElementById('alteredColorHsl');
const colorName = document.getElementById('colorName');
const modifiedColorName = document.getElementById('modifiedColorName');
const clearHistoryBtn = document.getElementById('clearHistory');
const complementaryBtn = document.getElementById('complementaryBtn');
const analogousBtn = document.getElementById('analogousBtn');
const triadicBtn = document.getElementById('triadicBtn');
const schemeColors = document.getElementById('schemeColors');
const exportCssBtn = document.getElementById('exportCss');
const exportScssBtn = document.getElementById('exportScss');
const exportJsonBtn = document.getElementById('exportJson');

// Constants
const MAX_HISTORY = 20;

// State
let currentColor = {
    hex: '#c6d5ac',
    rgb: { r: 198, g: 213, b: 172 },
    hsl: { h: 80, s: 33, l: 75 }
};

// Color History
let colorHistoryArray = JSON.parse(localStorage.getItem('colorHistory')) || [];

// Color Names Database (Basic)
const colorNames = {
    '#ff0000': 'Red',
    '#00ff00': 'Green',
    '#0000ff': 'Blue',
    '#ffff00': 'Yellow',
    '#ff00ff': 'Magenta',
    '#00ffff': 'Cyan',
    '#ffffff': 'White',
    '#000000': 'Black',
    // Add more color names as needed
};

// Event Listeners
toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('toggled');
    lightenText.classList.toggle('unselected');
    darkenText.classList.toggle('unselected');
    updateOutputColor();
});

// Add event listeners for preset colors
document.querySelectorAll('.preset-color').forEach(btn => {
    btn.addEventListener('click', () => {
        const color = btn.getAttribute('data-color');
        hexInput.value = color;
        colorPicker.value = color;
        updateInputColor(color);
        resetSliders(); // Reset sliders to default positions
        updateOutputColor();
    });
});

hexInput.addEventListener('keyup', (e) => {
    const hex = hexInput.value;
    
    // Add # if it's missing
    if (hex.length > 0 && !hex.startsWith('#')) {
        hexInput.value = '#' + hex;
    }
    
    // Auto-apply if Enter is pressed
    if (e.key === 'Enter' && isValidHex(hexInput.value)) {
        applyColor();
    }
    
    // Visual feedback on input validity
    if (isValidHex(hexInput.value)) {
        hexInput.style.borderColor = '#2ecc71';
    } else {
        hexInput.style.borderColor = hex.length > 0 ? '#e74c3c' : '#e0e0e0';
    }
});

applyButton.addEventListener('click', applyColor);

function applyColor() {
    console.log('Apply button clicked');
    const hex = hexInput.value;
    console.log('Input value:', hex);
    
    if(!isValidHex(hex)) {
        console.log('Invalid hex color');
        hexInput.style.borderColor = '#e74c3c';
        return;
    }
    
    console.log('Valid hex color');
    const strippedHex = hex.startsWith('#') ? hex : '#' + hex;
    console.log('Formatted hex:', strippedHex);
    
    updateInputColor(strippedHex);
    updateOutputColor();
    hexInput.style.borderColor = '#2ecc71';
}

// Reset sliders to default positions
function resetSliders() {
    // Set more moderate default values
    slider.value = 20; // Reduced from 50 to 20 for less extreme brightness change
    saturationSlider.value = 0; // Keep same saturation
    hueSlider.value = 0; // Keep same hue
    
    // Update slider labels
    sliderText.textContent = `Brightness: ${slider.value}%`;
    saturationText.textContent = `Saturation: ${saturationSlider.value}%`;
    hueText.textContent = `Hue: ${hueSlider.value}°`;
    
    // Make sure the toggle is set to lighten by default
    if (toggleBtn.classList.contains('toggled')) {
        toggleBtn.classList.remove('toggled');
        lightenText.classList.remove('unselected');
        darkenText.classList.add('unselected');
    }
}

// Update slider event listeners to use immediate feedback
slider.addEventListener('input', () => {
    const value = slider.value;
    sliderText.textContent = `Brightness: ${value}%`;
    updateOutputColor();
});

saturationSlider.addEventListener('input', () => {
    const value = saturationSlider.value;
    saturationText.textContent = `Saturation: ${value}%`;
    updateOutputColor();
});

hueSlider.addEventListener('input', () => {
    const value = hueSlider.value;
    hueText.textContent = `Hue: ${value}°`;
    updateOutputColor();
});

copyButton.addEventListener('click', () => {
    const colorToCopy = alteredColor.style.backgroundColor;
    const tempInput = document.createElement('input');
    tempInput.value = rgbToHex(colorToCopy);
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    
    copyButton.textContent = 'Copied!';
    setTimeout(() => {
        copyButton.textContent = 'Copy Color';
    }, 1500);
});

// Color Conversion Functions
function hexToRGB(hex) {
    // Remove the # if present
    hex = hex.replace('#', '');
    
    // Handle both short and long form hex codes
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return { r, g, b };
}

function convertRGBToHex(r, g, b) {
    const toHex = (n) => {
        const hex = n.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToHSL(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function hslToRGB(h, s, l) {
    // Normalize values
    h = ((h % 360) + 360) % 360; // Ensure h is between 0 and 360
    s = Math.min(100, Math.max(0, s)) / 100; // Convert to decimal and clamp between 0 and 1
    l = Math.min(100, Math.max(0, l)) / 100; // Convert to decimal and clamp between 0 and 1

    let r, g, b;

    if (s === 0) {
        // Achromatic (gray)
        r = g = b = l;
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        const hueToRGB = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        const h1 = h / 360; // Convert hue to decimal
        r = hueToRGB(p, q, h1 + 1/3);
        g = hueToRGB(p, q, h1);
        b = hueToRGB(p, q, h1 - 1/3);
    }

    // Convert to 0-255 range and round
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

// Color Manipulation Functions
function alterBrightness(rgb, percentage) {
    const factor = 1 + (percentage / 100);
    return {
        r: Math.min(255, Math.max(0, Math.round(rgb.r * factor))),
        g: Math.min(255, Math.max(0, Math.round(rgb.g * factor))),
        b: Math.min(255, Math.max(0, Math.round(rgb.b * factor)))
    };
}

function alterSaturation(hsl, percentage) {
    const newSaturation = Math.min(100, Math.max(0, hsl.s + percentage));
    return {
        h: hsl.h,
        s: newSaturation,
        l: hsl.l
    };
}

function alterHue(hsl, amount) {
    return {
        h: ((hsl.h + amount) % 360 + 360) % 360, // Ensure hue stays between 0-360
        s: hsl.s,
        l: hsl.l
    };
}

// Color Scheme Functions
function getComplementaryColor(hsl) {
    const complementaryHue = (hsl.h + 180) % 360;
    const rgb = hslToRGB(complementaryHue, hsl.s, hsl.l);
    return convertRGBToHex(rgb.r, rgb.g, rgb.b);
}

function getAnalogousColors(hsl) {
    const hues = [(hsl.h - 30 + 360) % 360, (hsl.h + 30) % 360];
    return hues.map(h => {
        const rgb = hslToRGB(h, hsl.s, hsl.l);
        return convertRGBToHex(rgb.r, rgb.g, rgb.b);
    });
}

function getTriadicColors(hsl) {
    const hues = [(hsl.h + 120) % 360, (hsl.h + 240) % 360];
    return hues.map(h => {
        const rgb = hslToRGB(h, hsl.s, hsl.l);
        return convertRGBToHex(rgb.r, rgb.g, rgb.b);
    });
}

function displayColorScheme(colors) {
    schemeColors.innerHTML = '';
    colors.forEach(color => {
        const colorBox = document.createElement('div');
        colorBox.className = 'history-color';
        colorBox.style.backgroundColor = color;
        colorBox.title = color;
        colorBox.addEventListener('click', () => {
            hexInput.value = color;
            colorPicker.value = color;
            updateInputColor(color);
            updateOutputColor();
        });
        schemeColors.appendChild(colorBox);
    });
}

// Export Functions
function generateCssExport() {
    return `:root {
    --color-base: ${currentColor.hex};
    --color-modified: ${alteredColor.style.backgroundColor};
    --color-rgb: ${currentColor.rgb.r}, ${currentColor.rgb.g}, ${currentColor.rgb.b};
    --color-hsl: ${currentColor.hsl.h}, ${currentColor.hsl.s}%, ${currentColor.hsl.l}%;
}`;
}

function generateScssExport() {
    return `$color-base: ${currentColor.hex};
$color-modified: ${alteredColor.style.backgroundColor};
$color-rgb: (
    r: ${currentColor.rgb.r},
    g: ${currentColor.rgb.g},
    b: ${currentColor.rgb.b}
);
$color-hsl: (
    h: ${currentColor.hsl.h},
    s: ${currentColor.hsl.s}%,
    l: ${currentColor.hsl.l}%
);`;
}

function generateJsonExport() {
    const colorData = {
        base: {
            hex: currentColor.hex,
            rgb: currentColor.rgb,
            hsl: currentColor.hsl
        },
        modified: {
            hex: rgbToHex(alteredColor.style.backgroundColor),
            rgb: convertHexToRGB(rgbToHex(alteredColor.style.backgroundColor))
        }
    };
    return JSON.stringify(colorData, null, 2);
}

// Utility Functions
function copyToClipboard(text, message) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    
    // Show feedback
    const originalText = event.target.textContent;
    event.target.textContent = message;
    setTimeout(() => {
        event.target.textContent = originalText;
    }, 1500);
}

function getClosestColorName(hex) {
    // Simple exact match for now
    return colorNames[hex.toLowerCase()] || hex;
}

// Update Functions
function updateInputColor(hex) {
    if (!isValidHex(hex)) return;
    
    const rgb = hexToRGB(hex);
    const hsl = rgbToHSL(rgb.r, rgb.g, rgb.b);
    
    currentColor = {
        hex: hex,
        rgb: rgb,
        hsl: hsl
    };
    
    // Update displays
    inputColor.style.backgroundColor = hex;
    colorPicker.value = hex;
    hexInput.value = hex;
    inputColorHex.textContent = hex;
    inputColorRgb.textContent = `RGB(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    inputColorHsl.textContent = `HSL(${hsl.h}°, ${hsl.s}%, ${hsl.l}%)`;
    colorName.textContent = colorNames[hex.toLowerCase()] || '';
}

function updateOutputColor() {
    if (!currentColor) return;
    
    // Get the current values from sliders
    const brightnessValue = parseInt(slider.value);
    const saturationValue = parseInt(saturationSlider.value);
    const hueValue = parseInt(hueSlider.value);
    
    console.log('Current Color:', currentColor);
    console.log('Slider Values:', { brightnessValue, saturationValue, hueValue });
    
    // Start with current color's HSL values
    let modifiedHsl = {...currentColor.hsl};
    console.log('Initial HSL:', modifiedHsl);
    
    // Apply hue change first
    modifiedHsl = alterHue(modifiedHsl, hueValue);
    
    // Apply saturation change
    modifiedHsl.s = Math.min(100, Math.max(0, modifiedHsl.s + saturationValue));
    
    // Apply brightness change based on toggle state
    const isToggled = toggleBtn.classList.contains('toggled');
    console.log('Toggle state:', isToggled);
    
    if (isToggled) {
        // Darken mode
        modifiedHsl.l = Math.max(0, modifiedHsl.l - brightnessValue);
    } else {
        // Lighten mode
        modifiedHsl.l = Math.min(100, modifiedHsl.l + brightnessValue);
    }
    
    console.log('Modified HSL after adjustments:', modifiedHsl);
    
    // Convert modified HSL to RGB
    let modifiedRgb = hslToRGB(modifiedHsl.h, modifiedHsl.s, modifiedHsl.l);
    console.log('Modified RGB:', modifiedRgb);
    
    // Convert to hex for display
    const finalHex = convertRGBToHex(modifiedRgb.r, modifiedRgb.g, modifiedRgb.b);
    console.log('Final HEX:', finalHex);
    
    // Update the altered color display
    alteredColor.style.backgroundColor = finalHex;
    alteredColorHex.textContent = finalHex;
    alteredColorRgb.textContent = `RGB(${modifiedRgb.r}, ${modifiedRgb.g}, ${modifiedRgb.b})`;
    alteredColorHsl.textContent = `HSL(${modifiedHsl.h}°, ${modifiedHsl.s}%, ${modifiedHsl.l}%)`;
    
    // Calculate and show contrast ratio
    const contrast = calculateContrastRatio(currentColor.rgb, modifiedRgb);
    alteredColorText.textContent = `Contrast Ratio: ${contrast.toFixed(2)}:1`;
}

// Helper function to calculate relative luminance
function calculateLuminance(r, g, b) {
    let [rs, gs, bs] = [r / 255, g / 255, b / 255].map(val => {
        return val <= 0.03928
            ? val / 12.92
            : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio between two colors
function calculateContrastRatio(color1, color2) {
    const l1 = calculateLuminance(color1.r, color1.g, color1.b);
    const l2 = calculateLuminance(color2.r, color2.g, color2.b);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
}

// Color History Functions
const addToHistory = (hex) => {
    if (!colorHistoryArray.includes(hex)) {
        colorHistoryArray.unshift(hex);
        if (colorHistoryArray.length > MAX_HISTORY) {
            colorHistoryArray.pop();
        }
        localStorage.setItem('colorHistory', JSON.stringify(colorHistoryArray));
        updateColorHistory();
    }
}

const updateColorHistory = () => {
    colorHistory.innerHTML = '';
    colorHistoryArray.forEach(hex => {
        const colorBox = document.createElement('div');
        colorBox.className = 'history-color';
        colorBox.style.backgroundColor = hex;
        colorBox.title = hex;
        colorBox.addEventListener('click', () => {
            hexInput.value = hex;
            updateInputColor(hex);
            updateOutputColor();
        });
        colorHistory.appendChild(colorBox);
    });
}

// Event Listeners for new features
colorPicker.addEventListener('input', (e) => {
    const color = e.target.value;
    hexInput.value = color;
    updateInputColor(color);
    updateOutputColor();
});

clearHistoryBtn.addEventListener('click', () => {
    colorHistoryArray = [];
    localStorage.removeItem('colorHistory');
    updateColorHistory();
});

// Color Scheme Generators
complementaryBtn.addEventListener('click', () => {
    const complementary = getComplementaryColor(currentColor.hsl);
    displayColorScheme([currentColor.hex, complementary]);
});

analogousBtn.addEventListener('click', () => {
    const analogous = getAnalogousColors(currentColor.hsl);
    displayColorScheme([currentColor.hex, ...analogous]);
});

triadicBtn.addEventListener('click', () => {
    const triadic = getTriadicColors(currentColor.hsl);
    displayColorScheme([currentColor.hex, ...triadic]);
});

// Export Buttons
exportCssBtn.addEventListener('click', () => {
    const css = generateCssExport();
    copyToClipboard(css, 'CSS copied to clipboard!');
});

exportScssBtn.addEventListener('click', () => {
    const scss = generateScssExport();
    copyToClipboard(scss, 'SCSS copied to clipboard!');
});

exportJsonBtn.addEventListener('click', () => {
    const json = generateJsonExport();
    copyToClipboard(json, 'JSON copied to clipboard!');
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set initial color
    const initialColor = currentColor.hex;
    hexInput.value = initialColor;
    colorPicker.value = initialColor;
    
    // Initialize displays
    updateInputColor(initialColor);
    resetSliders(); // This will set default modifications
    updateOutputColor();
    updateColorHistory();
});

// Validation Functions
function isValidHex(hex) {
    if (!hex) return false;
    
    // Remove # if present
    const strippedHex = hex.replace('#', '');
    
    // Check if it's a 3 or 6 character hex code
    return /^([0-9A-Fa-f]{3}){1,2}$/.test(strippedHex);
}




