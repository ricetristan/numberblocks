let drake = dragula([document.getElementById('numberblocks'), ...document.getElementsByClassName('number')], {
    copy: true,
    accepts: function (el, target) {
        return target.className === 'number' && (target.innerHTML === '' || target.innerHTML.indexOf('gu-transit') > 0);
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
    let amount = Number(el.id.replace('nb', ''));
    
    let label = document.getElementById(target.id + 'label');
    label.innerText = amount;
    if(checkEquation(amount)){
        target.style.borderWidth = '8px'
        target.style.borderColor = 'green';
        label.style.color = 'green';
        confetti({
            angle: randomInRange(55, 125),
            spread: randomInRange(50, 70),
            particleCount: randomInRange(50, 100),
            origin: { y: target.pageY } //0.6 }
          });
    } else {
        target.style.borderWidth = '8px'
        target.style.borderColor = 'red';
        label.style.color = 'red';
    }
    setTimeout(generateEquation, 3000);
});

function randomInRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function checkEquation(amount) {
    if(amount + number === equals){
        let totalEl = document.getElementById('numcorrect');
        let curTotal = Number(totalEl.innerText);
        totalEl.innerText = (curTotal + 1);
        return true;
    }else{
        let totalEl = document.getElementById('numincorrect');
        let curTotal = Number(totalEl.innerText);
        totalEl.innerText = (curTotal + 1);
        return false;
    }
}

// Generate random equation
let number = 0, equals = 0;
function generateEquation(){
    // Clear out existing...
    let equalTarget = document.getElementById('number3');
    equalTarget.innerHTML = '';
    let place1Target = document.getElementById('number1');
    place1Target.innerHTML = '';
    place1Target.style.borderColor = '';
    let place1Label = document.getElementById('number1label');
    place1Label.style.color = '';
    place1Label.innerText = '?';
    let place2Target = document.getElementById('number2');
    place2Target.innerHTML = '';
    place2Target.style.borderColor = '';
    let place2Label = document.getElementById('number2label');
    place2Label.style.color = '';
    place2Label.innerText = '?';
    
    // Populate new equation
    equals = randomInRange(2, 18);
    let equalsEl = document.createElement('img');
    equalsEl.id = 'nb' + equals;
    equalsEl.src = 'images/nb' + equals + '.png';
    equalTarget.appendChild(equalsEl);
    document.getElementById('number3label').innerText = equals;

    do { number = randomInRange(1, equals - 1); }
    while(equals - number > 9);
    let numberEl = document.createElement('img');
    numberEl.id = 'nb' + number;
    numberEl.src = 'images/nb' + number + '.png';
    let place = randomInRange(1, 2);
    let placeTarget = document.getElementById('number' + place);
    placeTarget.innerHTML = '';
    placeTarget.appendChild(numberEl);
    document.getElementById('number' + place + 'label').innerText = number;
}

generateEquation();