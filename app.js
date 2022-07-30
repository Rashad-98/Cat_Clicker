let numHolder = document.getElementById('numHolder');
let cats = document.querySelectorAll('.cat');
let catNames = document.querySelectorAll('.catName');

cats.forEach((cat) => {
    let num = 0;
    cat.children[1].innerHTML = cat.children[2].alt;
    cat.addEventListener('click', ()=>{
        num += 1;
        cat.children[0].innerHTML = ''+num;
    })
})

catNames.forEach((cat) =>{
    cat.addEventListener('click', ()=>{
        if(document.querySelector('.show')){
            let showedItem = document.querySelector('.show');
            showedItem.classList.toggle('show');
        }
        cat.nextElementSibling.classList.add('show');
    })
})