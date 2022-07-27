let num = 0;
let numHolder = document.getElementById('numHolder');

let cat = document.getElementById('cat');
cat.addEventListener('click', ()=>{
   num += 1; 
   numHolder.innerHTML = ''+num;
})


