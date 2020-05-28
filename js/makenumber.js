let drake = dragula([document.getElementById('numberblocks'), ...document.getElementsByClassName('number')], {
  copy: true,
  accepts: function (el, target) {
      return target.className === 'number'; // && (target.innerHTML === '' || target.innerHTML.indexOf('gu-transit') > 0);
  },
  invalid: function (el, handle) {
      return drake.dragging || (el && el.id.indexOf('nb')<0); // don't allow any drags from equation
  },
});
drake.on('drag', function(el, source){
  drake.dragging = true;
});
drake.on('drop', function(el, target, source, sibling){
  if(!target || target.className !== 'number') return;
  for(let i=target.childNodes.length-1; i>=0; i--){
    if(target.childNodes[i] != el){ target.childNodes[i].remove(); }
  }
  let amount = Number(el.id.replace('nb', ''));
  
  calculateNumber();
});

function calculateNumber(){
  let num1 = 0;
  try{ num1 = Number(document.getElementById('number1').childNodes[0].id.replace('nb', '')); } catch { }
  num1 = num1 * 1000;
  let num2 = 0;
  try{ num2 = Number(document.getElementById('number2').childNodes[0].id.replace('nb', '')); } catch { }
  num2 = num2 * 100;
  let num3 = 0;
  try{ num3 = Number(document.getElementById('number3').childNodes[0].id.replace('nb', '')); } catch { }
  num3 = num3 * 10;
  let num4 = 0;
  try{ num4 = Number(document.getElementById('number4').childNodes[0].id.replace('nb', '')); } catch { }

  let num = num1 + num2 + num3 + num4;
  document.getElementById('newnumber').innerText = num.toLocaleString();
}