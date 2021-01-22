const canvas = document.getElementById("jsCanvas");
// 마우스를 클릭했을 때 false가 true로 바뀜
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const erase = document.getElementById("jsErase");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 초기화
// canvasRenderingContext2D.fillRect();
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

// CanvasRenderingContext2D.strokeStyle 색상과 스타일을 shape안에서 사용할 수 있음
// strokeStyle : 우리가 그릴 선들이 모두 이 색을 갖는다.
// lineWidth: 그 선의 넓이
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

// CanvasRenderingContext2D.fillStyle

let painting = false;
let filling = false;

function startPainting(){
    painting = true;
}
function stopPainting(){
    painting = false;
}
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    // console.log(event);
    // offset = canvas 내의 좌표
    // convas x와 y축의 좌표를 가짐
    // painting이 아니면
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        //마우스를 클릭해서 움직이는 내내 발생
        // 이전 위치에서 지금 위치까지 선을 만드는 것
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
function onMouseUp(event){
    stopPainting();
}

function handleCanvasClick(event){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}
// handleRightClilk
function handleCM(event){
    event.preventDefault();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    // 마우스가 캔버스를 떠나면 painting = false;
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM)
}

function handleColorClick(event){
    // console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle= color;
}
// object 객체를 Array로 만들어 줌
console.log(Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)));

function handleRangeChange(event){
    // console.log(event.target.value);
    const size = event.target.value;
    console.log(size);
    ctx.lineWidth = size;
}
if(range){
    range.addEventListener("input", handleRangeChange);
}

function handleModeClick(event){
    if(filling === true){
        filling = false;
        mode.innerText = "FILL";
    } else {
        filling = true;
        mode.innerText = "PAINT";
    }
}
if(mode){
    mode.addEventListener("click", handleModeClick);
}

// HTMLCanvasElement.toDataURL() 메소드 
// 이미지 표현을 포함한 dataURL 로 반환
function handleSaveBtn(event){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "EXPORT[👨‍🎨]";
    link.click();
    // console.log(link);
}
if(saveBtn){
    saveBtn.addEventListener("click", handleSaveBtn);
}
function handleEraseClick(event){
    ctx.save();
    ctx.clearRect(0,0,CANVAS_SIZE, CANVAS_SIZE);
}
if(erase){
    erase.addEventListener("click", handleEraseClick);
}