
const colors = document.querySelectorAll('.color');

const marker = document.querySelector('.marker');
const board = document.querySelector('.board');
const eraser = document.getElementById('eraser');

var slider = document.getElementById("myRange");
const output = document.querySelector('.output');

output.textContent = slider.value;
var size = output.textContent; 

slider.addEventListener('input', e => {
    output.textContent = slider.value;
    size = output.textContent;

    board.innerHTML = '';

    board.style = 'grid-template-columns: repeat('+ size +', 1fr)';

    for(let i = 0; i != size * size; i++){
        const div = document.createElement('div');
        div.classList.add('boardDivs');
        board.appendChild(div);
    }

    colors.forEach(color => {
        color.addEventListener('click', setColor, false);
    });

    board.addEventListener('mouseover', boardColorWithMouseDown, false);
})

board.style = 'grid-template-columns: repeat('+ size +', 1fr)';

for(let i = 0; i != size * size; i++){
    const div = document.createElement('div');
    div.classList.add('boardDivs');
    board.appendChild(div);
}

colors.forEach(color => {
    color.addEventListener('click', setColor, false);
});

eraser.addEventListener('click', setEraser, false);

board.addEventListener('mouseover', boardColorWithMouseDown, false);

var colorCanvas = document.getElementById('color_canvas');
var ColorCtx = colorCanvas .getContext('2d');

const redR = document.getElementById('rRange');
const greenR = document.getElementById('gRange');
const blueR = document.getElementById('bRange');

var R = redR.value;
var G = greenR.value;
var B = blueR.value;
const A = 1;

redR.addEventListener('input', e => {
    R = redR.value;
    colorGradient(); 
})

greenR.addEventListener('input', e => {
    G = greenR.value;
    colorGradient() ;
})

blueR.addEventListener('input', e => {
    B = blueR.value;
    colorGradient(); 
})

colorGradient(); 

colorCanvas.addEventListener('click',function(event){
    let rect = event. target. getBoundingClientRect();
    let x = event. clientX - rect. left; //x position within the element.
    let y = event. clientY - rect. top; //y position within the element

    pixel = ColorCtx.getImageData(x,y,1,1).data;   // Read pixel Color
    let rgb = `rgba(${pixel[0]},${pixel[1]},${pixel[2]},${pixel[3]})`;
    
    document.getElementById('pick').style = 'background-color: ' + rgb;
    document.querySelector('.picked-color').style = 'background-color: ' + rgb;

    marker.style.top = event.pageY + 'px';
    marker.style.left = event.pageX + 'px';
}, false);


function colorGradient(){
    var color = `rgba(${R},${G},${B},${A})`;
    let gradientH = ColorCtx .createLinearGradient(0, 0, ColorCtx.canvas.width, 0);
    gradientH.addColorStop(0, '#fff');
    gradientH.addColorStop(1, color);
    ColorCtx .fillStyle = gradientH;
    ColorCtx .fillRect(0, 0, ColorCtx.canvas.width, ColorCtx.canvas.height);


    // Create a Vertical Gradient(white to black)
    let gradientV = ColorCtx .createLinearGradient(0, 0, 0, 300);
    gradientV.addColorStop(0, 'rgba(0,0,0,0)');
    gradientV.addColorStop(1, '#000');
    ColorCtx .fillStyle = gradientV;
    ColorCtx .fillRect(0, 0, ColorCtx.canvas.width, 
    ColorCtx .canvas.height); 
}

function setColor(){
    let pickedCol = window.getComputedStyle(this).backgroundColor;
    document.querySelector('.picked-color').style = 'background-color: ' + pickedCol;
}

function setEraser(){
    let pickedCol = 'rgb(255, 255, 255)';
    document.querySelector('.picked-color').style = 'background-color: ' + pickedCol;
}

function boardColorWithMouseDown(){
    
    let col = document.querySelector('.picked-color').style.backgroundColor;
    if(col == ''){
        col = 'rgb(0, 0, 0)';
    }
    
    let isDrawing = false;
    
    document.querySelectorAll('.boardDivs').forEach(element => {
        element.addEventListener('mousedown', e => {
            element.style = 'background-color: ' + col;
            isDrawing = true;
        }, false);
    })

    document.querySelectorAll('.boardDivs').forEach(element => {
        element.addEventListener('mousemove', e => {
            
            if(isDrawing){
                element.style = 'background-color: ' + col;
            }
        }, false)
    })

    document.querySelectorAll('.boardDivs').forEach(element => {
        element.addEventListener('mouseup', e => {
            
            isDrawing = false;
        }, false)
    })
}





/*--------this function has not been used  ----*/
function boardColor(){
    
    const col = document.querySelector('.picked-color').backgroundColor;
    
    document.querySelectorAll('.boardDivs').forEach(element => {
        element.addEventListener('mouseover', e => {
            element.style = 'background-color: ' + col;
        }, false)
    })
}
