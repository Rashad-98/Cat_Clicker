let model = {
    adminStatus: false,
    currentCat: {
        name: 'koko kitty',
        clickCount: 0,
        fileName: 'cat.jpg'
    },
    cats: [
        {
            name: 'koko kitty',
            clickCount: 0,
            fileName: 'cat.jpg'
        },
        {
            name: 'lolo kitty',
            clickCount: 0,
            fileName: 'cat2.jpg'
        },
        {
            name: 'soso kitty',
            clickCount: 0,
            fileName: 'cat3.jpg'
        },
        {
            name: 'zozo kitty',
            clickCount: 0,
            fileName: 'cat4.jpg'
        },
        {
            name: 'roro kitty',
            clickCount: 0,
            fileName: 'cat5.jpg'
        }
    ]
}

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
        document.getElementById('buttonContainer').innerHTML = '';
        for ( let i=0; i<octopus.getDataCount(); i++){
            const button = document.createElement('button');
            button.setAttribute('class', 'cat');
            button.setAttribute('id', i);
            const name = model.cats[i].name;
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

let adminView = {
    init:() => {
        adminView.toggleAdminEvent();
        adminView.submitFormEvent();
        adminView.cancelAdminEvent();
    },
    toggleAdminEvent: () => {
        const adminButton = document.querySelector('#adminButton');
        adminButton.addEventListener('click', () => {
            octopus.toggleAdminStatus();
            const form = document.querySelector('form');
            form.style.display = octopus.getAdminStatus() ? 'block' : 'none';
        })
    },
    cancelAdminEvent: () => {
        const cancelButton = document.getElementById('cancelButton');
        cancelButton.addEventListener('click', () => {
            octopus.toggleAdminStatus();
            const form = document.querySelector('form');
            form.style.display = 'none';
            form.reset();
        })
    },
    submitFormEvent: () => {
        const form = document.querySelector('form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.style.display = 'none';
            const cat = {
                name: form.elements['name'].value,
                clickCount: form.elements['clickCount'].value,
                fileName: form.elements['imgUrl'].value
            }
            octopus.updateCurrentCat(cat);
        })
    }
}

let octopus = {
    render: (cat) => {
        view1.render();
        view2.render(cat);
        adminView.init();
    },
    getDataCount: () => {
        return model.cats.length;
    },
    getCatNames: () => {
        return model.cats.map((cat) => {
            return cat.name;
        })
    },
    preview: (event) => {
        const catName = event.path[0].innerHTML;
        model.cats.forEach((cat) => {
            if (cat.name === catName) {
                view2.render(cat);
                model.currentCat = cat;
            }
        });
    },
    incrementCount: (event) => {
        let cat = model.cats.find(element=>element.fileName===event.path[0].src.split('images/')[1]);
        cat.clickCount += 1;
        view2.render(cat);
    },
    getAdminStatus: () => {
        return model.adminStatus;
    },
    toggleAdminStatus: () => {
        model.adminStatus = model.adminStatus ? false : true;
    },
    updateCurrentCat: (newCat) => {
        model.cats.forEach((cat) => {
            if (cat.name === model.currentCat.name) {
                cat.name = newCat.name;
                cat.fileName = newCat.fileName;
                cat.clickCount = parseInt(newCat.clickCount);
            }
        })
        model.currentCat = newCat;
        view2.render(newCat);
        view1.render();
    }
}

octopus.render(model.cats[0]);