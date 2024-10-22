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

// Function to draw shapes based on the selected shape and postions of the mouse
function drawShape(startX, startY, endX, endY) {
    // Clear the canvas before drawing a new shape to avoid overlaps if present
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set the stroke color to the selected color from the color picker
    ctx.strokeStyle = selectedColor;

    // Switch statement to handle drawing the different shapes
    switch (selectedShape) {
        case 'line':
            drawLine(startX, startY, endX, endY);  // Call function to draw a line
            break;
        case 'rectangle':
            drawRectangle(startX, startY, endX, endY);  // Call function to draw a rectangle
            break;
        case 'circle':
            drawCircle(startX, startY, endX, endY);  // Call function to draw a circle
            break;
    }
}

// Function to draw a line from (startX, startY) to (endX, endY)
function drawLine(startX, startY, endX, endY) {
    ctx.beginPath();  // Start a new path for the line
    ctx.moveTo(startX, startY);  // Move to the starting point
    ctx.lineTo(endX, endY);  // Draw a line to the end point
    ctx.stroke();  // Render the line
}

// Function to draw a rectangle
function drawRectangle(startX, startY, endX, endY) {
    ctx.beginPath();  // Start a new path for the rectangle
    ctx.rect(startX, startY, endX - startX, endY - startY);  // Create a rectangle from start to end points
    ctx.stroke();  // Render the rectangle
}

// Function to draw a circle
function drawCircle(startX, startY, endX, endY) {
    const radius = Math.sqrt(Math.pow((endX - startX), 2) + Math.pow((endY - startY), 2));  // Calculate radius
    ctx.beginPath();  // Start a new path for the circle
    ctx.arc(startX, startY, radius, 0, Math.PI * 2);  // Create a circle with the calculated radius
    ctx.stroke();  // Render the circle
}
