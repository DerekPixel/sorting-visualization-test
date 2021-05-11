var mainDiv = document.getElementById('main');

var canvas = document.createElement('canvas');
canvas.id = 'mycanvas';
canvas.height = 9 * 50;
canvas.width = 16 * 50;
canvas.oncontextmenu = (e) => {
  e.preventDefault();
};
var ctx = canvas.getContext('2d');

mainDiv.append(canvas);

//VARIABLES

var i = 0;
var j = 0;
var l = 0;

var setI = false;
var setJ = false;
var setL = false;

var selection = 0;

var scaler = 1;

var globalSpeed = 1;

var arrayToBeSorted = populateArrayWithHeightValues(makeArray());

// quickSort(arrayToBeSorted, 0, arrayToBeSorted.length-1);

var switchSorting = 2;

var current = 0;

var setCurrent = false;

loop();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  switch (switchSorting) {
    case 0:
      arrayToBeSorted = bubbleSortAnArray(arrayToBeSorted, globalSpeed);
      break;
    case 1:
      arrayToBeSorted = selectionSortAnArray(arrayToBeSorted, globalSpeed);
      break;
    case 2:
      arrayToBeSorted = insertionSortAnArray(arrayToBeSorted, globalSpeed);
      break;
  
    default:
      break;
  }

  // for(var k = 0; k < arrayToBeSorted.length; k++) {

  //   ctx.save();
  //   ctx.translate(k * scaler, canvas.height);
  //   ctx.beginPath()
  //   ctx.moveTo(0, 0);
  //   ctx.lineTo(0, -arrayToBeSorted[k]);
  //   ctx.lineWidth = scaler;
  //   ctx.strokeStyle = j === k ? 'red' : 'white';
  //   ctx.stroke();
  //   ctx.closePath();
  //   ctx.restore();
  // }
}

function loop() {
  window.requestAnimationFrame(loop);
  draw();
}

//FUNCTIONS

function makeArray() {
  var arr = new Array(canvas.width / scaler);
  return arr;
}

function populateArrayWithHeightValues(arrayToBePopulated = Array) {

  var arrayCopy = arrayToBePopulated.slice();

  for(var i = 0; i < arrayCopy.length; i++) {
    arrayCopy[i] = Math.ceil(Math.random() * canvas.height);
  }

  return arrayCopy;

}

function bubbleSortAnArray(arrayToSort, speed) {

  var arrayCopy = arrayToSort.slice();

  for(var n = 0; n < speed; n++) {
    var a = arrayCopy[j];
    var b = arrayCopy[j + 1];
  
    if(a > b) {
      arrayCopy[j] = b;
      arrayCopy[j + 1] = a;
    }
  
    if(i < arrayCopy.length) {
      j++;
      if(j === arrayCopy.length - i) {
        i++
        j = 0;
      }
    }
  }

  for(var k = 0; k < arrayCopy.length; k++) {

    ctx.save();
    ctx.translate(k * scaler, canvas.height);
    ctx.beginPath()
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -arrayCopy[k]);
    ctx.lineWidth = scaler;
    ctx.strokeStyle = j === k ? 'red' : 'white';
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  return arrayCopy;
}

function selectionSortAnArray(arrayToSort, speed) {
  var arrayCopy = arrayToSort.slice();

  for(var n = 0; n < speed; n++) {
    if(i < arrayCopy.length) {

      //selection needs to be set to zero before each sort maybe lol
    
      if(arrayCopy[j] < arrayCopy[selection]) {
        selection = j;
      }

      if(j === arrayCopy.length) {
    
        var a = arrayCopy[i];
        var b = arrayCopy[selection];
      
        arrayCopy[i] = b;
        arrayCopy[selection] = a;
        
        i++;
        j = i;
        selection = i;

      } else {
        j++;
      }
    }
  }

  for(var k = 0; k < arrayCopy.length; k++) {

    ctx.save();
    ctx.translate(k * scaler, canvas.height);
    ctx.beginPath()
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -arrayCopy[k]);
    ctx.lineWidth = scaler;
    ctx.strokeStyle = selection === k ? 'red' : j === k ? 'blue' : i === k ? 'green' : 'white';
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  return arrayCopy;
}

function insertionSortAnArray(arrayToSort, speed) {
  var arrayCopy = arrayToSort.slice();

  for(var n = 0; n < speed; n++) {

    if(setJ === false) {
      current = arrayCopy[i];
      j = i-1; 
      setJ = true;
    }

    if((j > -1) && (current < arrayCopy[j])) {
      arrayCopy[j+1] = arrayCopy[j];
      j--;
    } else {
      arrayCopy[j+1] = current;
      i++
      setJ = false;
      setCurrent = false;
    }
  }

  for(var k = 0; k < arrayCopy.length; k++) {
    ctx.save();
    ctx.translate(k * scaler, canvas.height);
    ctx.beginPath()
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -arrayCopy[k]);
    ctx.lineWidth = scaler;
    ctx.strokeStyle = j === k ? 'red' : i+1 === k ? 'green' : 'white';
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  return arrayCopy;
}

async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let index = await partition(arr, start, end);

  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end)
  ]);
}

async function partition(arr, start, end) {

  let pivotValue = arr[end];
  let pivotIndex = start;

  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
      pivotIndex++;
    }
  }
  await swap(arr, pivotIndex, end);

  return pivotIndex;
}

async function swap(arr, a, b) {
  await sleep(50);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}