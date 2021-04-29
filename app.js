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

// var arrayToBeSorted = bubbleSortAnArray(populateArrayWithHeightValues(makeArray()));
var arrayToBeSorted = populateArrayWithHeightValues(makeArray());

var i = 0;
var j = 0;

loop();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(var v = 0; v < 100; v++) {
    var a = arrayToBeSorted[j];
    var b = arrayToBeSorted[j + 1];
  
    if(a > b) {
      // [a, b] = [b, a];
      arrayToBeSorted[j] = b;
      arrayToBeSorted[j + 1] = a;
    }
  
    if(i < arrayToBeSorted.length) {
      j++;
      if(j === arrayToBeSorted.length - i) {
        i++
        j = 0;
      }
    }
  }



  for(var k = 0; k < arrayToBeSorted.length; k++) {

    ctx.save();
    ctx.translate(k, canvas.height);
    ctx.beginPath()
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -arrayToBeSorted[k])
    ctx.strokeStyle = j === k ? 'red' : 'white';
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

  }

}

function loop() {
  window.requestAnimationFrame(loop);
  draw();
}

//FUNCTIONS

function makeArray() {
  var arr = new Array(canvas.width);
  return arr;
}

function populateArrayWithHeightValues(arrayToBePopulated = Array) {

  var arrayCopy = arrayToBePopulated.slice();

  for(var i = 0; i < arrayCopy.length; i++) {
    arrayCopy[i] = Math.ceil(Math.random() * canvas.height);
  }

  return arrayCopy;

}

function bubbleSortAnArray(arrayToSort) {

  var arrayCopy = arrayToSort.slice();
  
  for(var i = 0; i < arrayCopy.length; i++) {
    for(var j = 0; j < arrayCopy.length - i; j++) {
      var a = arrayCopy[j];
      var b = arrayCopy[j + 1];

      if(a > b) {
        // [a, b] = [b, a];
        arrayCopy[j] = b;
        arrayCopy[j + 1] = a;
      }
    }
  }

  return arrayCopy;

}