// Get canvas and its 2D drawing context to accomodate everything
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// Drawing state and mouse positions are tracked by these variables
let drawing = false;  // Flag to indicate if drawing is in progress, will make drwaring false at start
let startX, startY;   // Variables to store starting positions of the shape in coordinates x and y

// Obtain the selected shape and color
let selectedShape = document.querySelector('input[name="shape"]:checked').value;  // Default selected shape is line
let selectedColor = document.getElementById('color').value;  // Default color will be selected

// Event listener will update the selected shape when user changes the radio button
document.querySelectorAll('input[name="shape"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        selectedShape = e.target.value;
    });
});

// Event listener will update the selected color when user chooses a new color
document.getElementById('color').addEventListener('input', (e) => {
    selectedColor = e.target.value;
});

// Mouse event listeners for drawing the shapes

// mousedown event - marks the start of drawing
canvas.addEventListener('mousedown', (e) => {
    drawing = true;  // Set drawing flag to true
    startX = e.offsetX;  // Capture starting X position
    startY = e.offsetY;  // Capture starting Y position
});

// mouseup event - marks the end of drawing
canvas.addEventListener('mouseup', () => {
    drawing = false;  // Set drawing flag to false
    ctx.beginPath();  // Reset path so the next shape doesn't connect to the last one
});

// mousemove event - handles drawing when the user drags the mouse
canvas.addEventListener('mousemove', (e) => {
    if (drawing) {
        const endX = e.offsetX;  // Get current X position of the mouse
        const endY = e.offsetY;  // Get current Y position of the mouse
        drawShape(startX, startY, endX, endY);  // Draw shape based on the movement of the mouse
    }
});
