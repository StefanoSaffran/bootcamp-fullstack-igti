window.addEventListener('load', start);

let rangeRed = null;
let rangeGreen = null;
let rangeBlue = null;

let disabledRed = null;
let disabledGreen = null;
let disabledBlue = null;

let hexSpan = null;
let button = null;
let tooltip = null;

let container = null;
let content = null;

function start() {
  mapElements();
}

function mapElements() {
  rangeRed = document.querySelector('#red');
  rangeGreen = document.querySelector('#green');
  rangeBlue = document.querySelector('#blue');

  disabledRed = document.querySelector('#red-input');
  disabledGreen = document.querySelector('#green-input');
  disabledBlue = document.querySelector('#blue-input');

  hexSpan = document.querySelector('#hex');
  button = document.querySelector('button');
  tooltip = document.querySelector('#myTooltip');

  container = document.querySelector('.container');
  content = document.querySelector('.content');

  rangeRed.addEventListener('input', () => updateRangeValue('R'));
  rangeGreen.addEventListener('input', () => updateRangeValue('G'));
  rangeBlue.addEventListener('input', () => updateRangeValue('B'));
  button.addEventListener('click', copyTextToClipboard);
}

function updateRangeValue(inputColor) {
  inputColor === 'R'
   ? disabledRed.value = rangeRed.value
   : inputColor === 'G'
   ? disabledGreen.value = rangeGreen.value
   : disabledBlue.value = rangeBlue.value

   updateColors();
  }

  function updateColors() {
    container.style.boxShadow = `0 0 13px -1px rgb(${rangeRed.value}, ${rangeGreen.value}, ${rangeBlue.value})`;
    content.style.borderColor = `rgb(${rangeRed.value}, ${rangeGreen.value}, ${rangeBlue.value})`;
 
    const hexColor = convertColor(rangeRed.value, rangeGreen.value, rangeBlue.value);
    hexSpan.textContent = hexColor;
 
    rangeRed.style.setProperty('--color', `rgb(${rangeRed.value}, ${rangeGreen.value}, ${rangeBlue.value})`);
    rangeGreen.style.setProperty('--color', `rgb(${rangeRed.value}, ${rangeGreen.value}, ${rangeBlue.value})`);
    rangeBlue.style.setProperty('--color', `rgb(${rangeRed.value}, ${rangeGreen.value}, ${rangeBlue.value})`);
    hexSpan.style.setProperty('--color', `rgb(${rangeRed.value}, ${rangeGreen.value}, ${rangeBlue.value})`);
  }

  function copyTextToClipboard() {
    if (document.selection) {
      var range = document.body.createTextRange();
      range.moveToElementText(hexSpan);
      range.select().createTextRange();
      document.execCommand("copy");
    } else if (window.getSelection) {
      var range = document.createRange();
      range.selectNode(hexSpan);
      window.getSelection().addRange(range);
      document.execCommand("copy");
    }
    tooltip.innerHTML = "Copied: " + hexSpan.textContent;
  }

function convertColor(r,g,b) {  
  function sixToThree(str) {
    if (str[0] === str[1] && str[2] === str[3] && str[4] === str[5]) {
        return str[0] + str[2] + str[4];
    } else {
        return str;
    }
  } 

  var rgbToHex = function (rgb) { 
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
         hex = "0" + hex; 
    }
    return hex;
  };

  var red = rgbToHex(r);
  var green = rgbToHex(g);
  var blue = rgbToHex(b);
  
  return '#'+ sixToThree(red+green+blue);
};

function outFunc() {
  tooltip.innerHTML = "Copy to clipboard";
}
