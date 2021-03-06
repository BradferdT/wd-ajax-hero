(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE
  $('form').submit(function(e){
    var search = $('input[name=search]').val();
    if(search != ''){
      $.getJSON('http://omdbapi.com/?s=' + search + '', function(data){
        for(var i = 0; i < data['Search'].length; i++){
          var keys = Object.keys(data['Search'][i]);
          var values = Object.values(data['Search'][i]);
          var newObj = {};
          for(var j = 0; j < keys.length; j++){
            if(keys[j].includes('imdb')){
              keys[j] = keys[j].replace(/imdb/ig,'');
            }
            newObj[keys[j].toLowerCase()] = values[j];
          }

          movies.push(newObj);
        }
      });
    }
    renderMovies();
    e.preventDefault();
  });
})();
