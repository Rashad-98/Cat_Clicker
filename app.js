let model = [
    cat1 = {
        name: 'koko kitty',
        clickCount: 0,
        fileName: 'cat.jpg'
    },
    cat2 = {
        name: 'lolo kitty',
        clickCount: 0,
        fileName: 'cat2.jpg'
    },
    cat3 = {
        name: 'soso kitty',
        clickCount: 0,
        fileName: 'cat3.jpg'
    },
    cat4 = {
        name: 'zozo kitty',
        clickCount: 0,
        fileName: 'cat4.jpg'
    },
    cat5 = {
        name: 'roro kitty',
        clickCount: 0,
        fileName: 'cat5.jpg'
    }
]

let view1 = {
    addEventListeners: () => {
        const cats = document.querySelectorAll('.cat');
        const image = document.querySelector('#image');

        image.addEventListener('click', octopus.incrementCount);

        for (let i=0; i<cats.length; i++) {
              cats[i].addEventListener('click', octopus.preview)
        }
    },
    render: () => {
        for ( let i=0; i<octopus.getDataCount(); i++){
            const button = document.createElement('button');
            button.setAttribute('class', 'cat');
            button.setAttribute('id', i);
            const name = model[i].name;
            const textNode = document.createTextNode(name);
            button.appendChild(textNode);
            const buttonContainer = document.getElementById('buttonContainer');
            buttonContainer.appendChild(button);
        }
        view1.addEventListeners();
    }
}

let view2 = {
    getImage: () => {
        return document.querySelector('#preview');
    },
    render: (cat) => {
        document.querySelector('#image').setAttribute('src', './images/'+cat.fileName);
        document.querySelector('#catName').innerHTML = cat.name;
        document.querySelector('#count').innerHTML = cat.clickCount;
    }
}

let octopus = {
    render: (cat) => {
        view1.render();
        view2.render(cat);
    },
    getDataCount: () => {
        return model.length;
    },
    getCatNames: () => {
        return model.map((cat) => {
            return cat.name;
        })
    },
    preview: (event) => {
        const catName = event.path[0].innerHTML;
        model.forEach((cat) => {
            if (cat.name === catName) {
                view2.render(cat);
            }
        });
    },
    incrementCount: (event) => {
        let cat = model.find(element=>element.fileName===event.path[0].src.split('images/')[1]);
        cat.clickCount += 1;
        view2.render(cat);
        // cat.clickCount += 1;
    }
}

octopus.render(model[0]);