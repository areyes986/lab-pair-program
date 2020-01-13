'use strict';


let animalArray = [];
let buttonAnimalArray = [];
let keywordArray = [];

//// make an constrcutor that takes in object.

function AnimalHorns(animObj) {
  this.image_url = animObj.image_url;
  this.title = animObj.title;
  this.description = animObj.description;
  this.keyword = animObj.keyword;
  this.horns = animObj.horns;
  // this.select();

  animalArray.push(this);
  // keywordArray.push(this.keyword)
}

///// rendering information to the page using handlebars
AnimalHorns.prototype.render = function () {
  const source = $('#allHorns').html();
  let template = Handlebars.compile(source);
  // $('#photo-template').append(template)
  return template(this)
}


//// get info using .ajax and calling the dropdown and keywords functions
function readJSON(num) {
  $.ajax(`./data/page-${num}.json`, { method: 'GET', dataType: 'JSON' })
    .then(data => {
      data.forEach(function (animal) {
        let aHorn = new AnimalHorns(animal);
        let animalHorna = aHorn.render();
        $('#photo-container').append(animalHorna);
      })
      generateKeywords();
      generateDropDown();
    });
}


////////// generate keywords func
function generateKeywords() {
  animalArray.forEach(animal => {
    if (!keywordArray.includes(animal.keyword)) {
      keywordArray.push(animal.keyword)
    }
  })
}

////////// generate dropdown func
function generateDropDown() {
  const selectEl = $('#select');
  selectEl.empty();
  keywordArray.forEach(keyword => {
    const $optionEl = $(`<option value=${keyword}>${keyword}</option>`)
    selectEl.append($optionEl);
  })
}


//////// event handler for the drop down
$('select').on('change', showPickture)
function showPickture() {
  $('section').hide();
  let select = $(this).val();
  console.log(select)
  $(`.${select}`).show();
}

///////// event handler for the different pages
$('ul').on('click', 'li', nextPage)
function nextPage() {
  $('#photo-container').empty()
  let select = $(this).val();
  if (select === 1) {
    readJSON(1);
  } else if (select === 2) {
    readJSON(2);
    sortButtons('horns')
  }
}



//////// event handler for sorting through title





function buttonRender() {
  $('button').click(function (e) {
    e.preventDefault();
    let select = $(this).val();
    if (select === 'sortByHorns') {
      sortButtons('horns');
    } else {
      sortButtons('title')
    }
  })
}

const sortButtons = (str) => {
  $('#photo-container').empty()
  if (str === 'horns') {
    animalArray.sort((a, b) => {
      return a.horns - b.horns;
    })
    animalArray.forEach(animal => {
      let aHorn = new AnimalHorns(animal);
      let animalHorna = aHorn.render();
      $('#photo-container').append(animalHorna);
    })
    animalArray = []
  } else {
    animalArray.sort((a, b) => {
      return a.title < b.title ? -1 : 1;
    })
    animalArray.forEach(animal => {
      let aHorn = new AnimalHorns(animal);
      let animalHorna = aHorn.render();
      $('#photo-container').append(animalHorna);
    })
    animalArray = []
  }
}


//////// event handler for sorting by # of horns
readJSON(1);
buttonRender()
sortButtons('horns')
