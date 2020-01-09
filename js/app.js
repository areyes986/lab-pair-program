'use strict';

//// make an constrcutor that takes in object.

const animalArray = [];
const keywordArray = [];

function AnimalHorns (animObj) {
  this.image_url = animObj.image_url;
  this.title = animObj.title;
  this.description = animObj.description;
  this.keyword = animObj.keyword;
  this.horns = animObj.horns;
  // this.select();

  animalArray.push(this);
  keywordArray.push(this.keyword)
}


///make a prototype to append
AnimalHorns.prototype.render = function() {
  const photoTemplate = $('#photo-template').html();
  const $newSection = $('<section></section>');
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
$.ajax('./data/page-1.json', {method: 'GET', dataType: 'JSON'})
  .then(data => {
    data.forEach( function(animal){
      let aHorn = new AnimalHorns (animal);
      aHorn.render();
    })
    hello();
  });


////// create select element - contains option element from JSON file


// AnimalHorns.prototype.select =
function hello() {
  let currentKeyword = [];
  const selectOptions = $('#select').html();
  keywordArray.forEach( arr => {
    if (currentKeyword.includes(arr) === false){
      const $newOption = $('<option></option>');
      $newOption.html(selectOptions);
      currentKeyword.push(arr)
      $newOption.find('option').text(arr)
      $('select').append($newOption)
    }
  })
}


$('select').on('change', showPickture)
function showPickture () {
  $('h2').hide();
  $('p').hide();
  $('img').hide();
  let select = $(this).val();
  console.log(select)
  $(`.${select}`).show();
  // if (select === 'Filter by Keyword') {
    
  // }
}

// function clickff() {
//   console.log('proof of life')
// }

// $('#select').on('click', 'option', clickff)






///// create eventhandler when user clicks, shows selected keyword and hides others



