function getAndAppend( page ) {
  
  SearchResults.params.page     = page;
  SearchResults.params.per_page = 25;
  
  SearchResults.fetch({ success : function(data) {
    
    if ( remove_all ) {
      $('.wrap').remove();
      remove_all = false;
    }

    $.each( data.models, function( i, model ) {
      
      if ( on_row > num_rows ) {
        done = true;
        return false;
      }
      
      if ( typeof model.attributes.covers[404] != 'undefined' ) {
        
        total_images++;
        
        var $div  = $('<div/>').addClass('wrap').append( $('<img/>').attr('src', model.attributes.covers[404] ) ),
            owners = [];
        
        $.each( model.attributes.owners, function( id, user ) { 
          
          owners.push( user.first_name + ' ' + user.last_name );
          
        });
        
        $div.append( $('<div class="user-info"><div class="project-title">' + model.attributes.name + '</div><span class="user-name">by ' + owners.join(',') + '</span></div>' ) );
        
        $('body').append( $div );
        
        if ( on_image == per_row ) {
          on_row++;
          on_image = 1;
        }
        else {
          on_image++;
        }
        
      } // if model.attributes.covers[404]

    });
    
    if ( Math.ceil( total_images / per_row ) * new_height < $(window).height() && !done ) {
      getAndAppend( ++page );
    }

  }});
  
} // getAndAppend

function setQuery() {
  
  var url_args = window.location.hash.substring( 1, window.location.hash.length ),
      url_args = url_args.split('&'),
      sort_options = {
        'featured'      : 'featured_date',
        'appreciations' : 'appreciations',
        'views'         : 'views',
        'comments'      : 'comments',
        'recent'        : 'published_date',
        'followed'      : 'followed'
      };
  
  SearchResults.params.q    = 'cat';
  SearchResults.params.sort = 'appreciations';
  
  for ( var param in url_args ) {
    
    var temp = url_args[param].split('=');
    
    if ( temp[0] === 'sort' ) {
      if ( typeof sort_options[ temp[1] ] !== 'undefined' ) {
        temp[1] = sort_options[ temp[1] ];
      }
      else {
        continue;
      }
    } // if sorting
    
    if ( temp[0] === 'api_key' ) {
      Behance.api_key = temp[1];
      continue;
    }
    
    SearchResults.params[ temp[0] ] = temp[1];
    
  }
  
} // setQuery

var SearchResults  = new Behance.SearchCollection(),
    total_images   = 0,
    on_image       = 1,
    on_row         = 1,
    done           = false,
    remove_all     = false,
    
    initial_width  = 404,
    initial_height = 316,
    $window        = $(window),
    window_width   = $window.width(),
    window_height  = $window.height(),
    per_row        = Math.ceil( window_width / initial_width ),
    new_width      = Math.floor( window_width/per_row ),
    new_height     = initial_height * ( new_width / initial_width ),
    num_rows       = Math.floor( window_height / new_height ),
    
    leftover_height = window_height - ( new_height * num_rows ),
    top_margins  = Math.floor( leftover_height / ( num_rows+1 ) ),
    
    css            = '.wrap, img { width: ' + new_width + 'px; height: ' + new_height + 'px; } .wrap { margin-top:' + top_margins + 'px; } .user-info { max-width: ' + ( new_width-15 ) + 'px; }',
    head           = document.getElementsByTagName('head')[0],
    style          = document.createElement('style');

setQuery();
getAndAppend(1);

$window.on('hashchange', function() {
  
  setQuery();
  
  page = 1;
  total_images = 0;
  on_image = 1;
  on_row = 1;
  done = false;
  remove_all = true;
  
  getAndAppend(page);
  
});


style.type = 'text/css';
if ( style.styleSheet ) {
    style.styleSheet.cssText = css;
}
else {
    style.appendChild(document.createTextNode(css));
}
head.appendChild(style);