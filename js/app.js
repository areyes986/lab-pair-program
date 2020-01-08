'use strict';

//// make an constrcutor that takes in object. 

const animalArray = [];

function AnimalHorns (animObj) {
  this.image_url = animObj.image_url;
  this.title = animObj.title;
  this.description = animObj.description;
  this.keyword = animObj.keyword;
  this.horns = animObj.horns;

  animalArray.push(this);
}


///make a prototype to append
AnimalHorns.prototype.render = function() {
  const photoTemplate = $('#photo-template').html();
  const $newSection = $('<section></section>');
  $newSection.html(photoTemplate);
  $newSection.find('h2').text(this.title);
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('img').attr('alt', this.title);
  $newSection.find('p').text(this.description);
  $newSection.find('p').text(this.horns);


  $('main').append($newSection)

}


//// get info using .ajax
$.ajax('./data/page-1.json', {method: "GET", dataType: "JSON"})
  .then(data => data.forEach( function(animal){
    let aHorn = new AnimalHorns (animal);
    aHorn.render();
  }));


///// loop through the objects


//// render it to the page 
