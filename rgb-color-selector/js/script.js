window.addEventListener('load', start);

// global variables
let rangeRed = document.querySelector('#red');
let rangeGreen = document.querySelector('#green');
let rangeBlue = document.querySelector('#blue');
let disabledRed = document.querySelector('#red-value');
let disabledGreen = document.querySelector('#green-value');
let disabledBlue = document.querySelector('#blue-value');
let hexSpan = document.querySelector('#hex');
let button = document.querySelector('button');
let tooltip = document.querySelector('#myTooltip');

let container = document.querySelector('.container');
let content = document.querySelector('.content');

function start() {
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
