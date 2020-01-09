'use strict';

//// make an constrcutor that takes in object.

const animalArray = [];
let keywordArray = [];
let click = 0;

function AnimalHorns (animObj) {
  this.image_url = animObj.image_url;
  this.title = animObj.title;
  this.description = animObj.description;
  this.keyword = animObj.keyword;
  this.horns = animObj.horns;
  // this.select();

  animalArray.push(this);
  // keywordArray.push(this.keyword)
}


///make a prototype to append
AnimalHorns.prototype.render = function() {
  const photoTemplate = $('#photo-template').html();
  const $newSection = $(`<section class="${click}"></section>`);
  $newSection.html(photoTemplate);
  $newSection.find('h2').text(this.title);
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('img').attr('alt', this.title);
  $newSection.find('p').text(this.horns);
  $newSection.find('#horn').text(this.description);
  $newSection.find('img').attr('class', this.keyword);

  $('main').append($newSection)
}


//// get info using .ajax
function readJSON(num){
  $.ajax(`./data/page-${num}.json`, {method: 'GET', dataType: 'JSON'})
    .then(data => {
      data.forEach( function(animal){
        let aHorn = new AnimalHorns (animal);
        aHorn.render();
      })
      generateKeywords();
      generateDropDown();
    });
}


////// create select element - contains option element from JSON file

function generateKeywords(){
  animalArray.forEach(animal => {
    if(!keywordArray.includes(animal.keyword)){
      keywordArray.push(animal.keyword)
    }
  })
}

function generateDropDown(){
  const selectEl = $('#select');
  selectEl.empty();
  keywordArray.forEach(keyword => {
    const $optionEl = $(`<option value=${keyword}>${keyword}</option>`)
    selectEl.append($optionEl);
  })
}

$('select').on('change', showPickture)
function showPickture () {
  $('h2').hide();
  $('p').hide();
  $('img').hide();
  let select = $(this).val();
  $(`.${select}`).show();
}

///////// add li event handler to render different json files

$('ul').on('click','li', nextPage)
function nextPage() {
  $(`.${click}`).hide();
  console.log(keywordArray);
  let select = $(this).val();
  console.log(select)
  if (select === 1){
    readJSON(1);
  } else if (select === 2) {
    readJSON(2);
  }
}

readJSON(1);






///// create eventhandler when user clicks, shows selected keyword and hides others



