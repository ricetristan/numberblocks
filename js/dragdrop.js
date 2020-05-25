let drake = dragula([...document.querySelectorAll('td')], {
  copy: true,
  accepts: function (el, target) {
    return target.id === 'totalZone';
  }
});
drake.on('drop', function(el, target, source, sibling){
  let amount = Number(el.id.replace('nb', ''));
  let total = increaseTotal(amount);
  if(total <= 20){
    el.id = 'nb' + total;
    el.src = 'images/nb' + total + '.png';
  }else{
    el = makeBlocks(total);
  }
  let totalElem = document.getElementById('total');
  target.innerHTML = '';
  target.appendChild(totalElem);
  target.appendChild(el);
  //explode(target.pageX, target.pageY); // e.pageX, e.pageY)
});

function increaseTotal(amount){
    let totalElem = document.getElementById('total')
    let total = Number(totalElem.innerText);
    total += amount;
    totalElem.innerText = total;
    return total;
}

function makeBlocks(amount){
  let color = getColor(amount);
  let holder = document.createElement('div');
  holder.id = 'nb' + amount;
  holder.className = 'holder';
  for(let i=0; i<amount; i++){
    let block = document.createElement('div');
    block.className = 'block ' + (color === 'rainbow' ? getColor(i) : color);
    holder.appendChild(block);
  }
  let face = document.createElement('img');
  face.src = 'images/nbface.png';
  holder.appendChild(face);
  return holder;
}

function getColor(amount){
  if(amount > 1000) amount = Math.floor(amount / 1000);
  else if(amount > 100) amount = Math.floor(amount / 100);
  else if(amount > 10) amount = Math.floor(amount / 10);
  let color = 'red';
  if (amount % 10 === 0) color = 'white';
  else if(amount % 9 === 0) color = 'gray';
  else if(amount % 8 === 0) color = 'pink';
  else if(amount % 7 === 0) color = 'rainbow';
  else if(amount % 6 === 0) color = 'purple';
  else if(amount % 5 === 0) color = 'blue';
  else if(amount % 4 === 0) color = 'green';
  else if(amount % 3 === 0) color = 'yellow';
  else if(amount % 2 === 0) color = 'orange';
  return color;
}
