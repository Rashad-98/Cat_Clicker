let numHolder = document.getElementById('numHolder');
let cats = document.querySelectorAll('.cat');

cats.forEach((cat) => {
    let num = 0;
    cat.children[1].innerHTML = cat.children[2].alt;
    cat.addEventListener('click', ()=>{
        num += 1;
        cat.children[0].innerHTML = ''+num;
    })
})