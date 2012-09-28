Behance = Behance || {};
Behance.SearchCollection = {};

/**
 * Behance Search collection.
 *
 * This collection will...
 * TODO - Write docs.
 */
Behance.SearchCollection = Behance.Collection.extend({
  
  model : Backbone.Model,
  
  // Search type: projects, wips, users, collections
  search_type : 'projects',
  
  /**
   * Available params
   */
  params : {
    // Regular search string.
    search: null,
    // Maps to the 'Most Appreciated' tab.
    sort: null,
    // Filter by Projects or People.
    content: null,
    // Time frame
    time: null,
    // Page
    page: null
  }, // params
  
  url : function () {
    return Behance.api_url + this.search_type + '?api_key=' + Behance.api_key + '&' + $.param(this.params);
  }, // url
  
  parse : function( response ) {
    return response.projects;
  }, // parse
  
  searchBy : function( options ) {
    
    if ( _.isString(options) ) {
      this.searchKeyword(options);
    } else if ( _.isObject(options) && !_.isArray(options) ) {
      console.log('noop');
    }
    
  }, // searchBy
  
  setSort : function( options ) {
    
    var sort_options = {
      'featured'      : 'featured_date',
      'appreciations' : 'appreciations',
      'views'         : 'views',
      'comments'      : 'comments',
      'recent'        : 'published_date',
      'followed'      : 'followed'
    };
    
    if ( typeof sort_options[options] === 'undefined' ) {
      console.error('Invalid sort option');
      return false;
    }
    
    this.params.sort = sort_options[ options ];
    
  }, // setSort
  
  sortBy : function( options ) {
    
    var sort_options = {
      'featured'      : 'featured_date',
      'appreciations' : 'appreciations',
      'views'         : 'views',
      'comments'      : 'comments',
      'recent'        : 'published_date',
      'followed'      : 'followed'
    };
    
    if ( typeof sort_options[options] === 'undefined' ) {
      console.error('Invalid sort option');
      return false;
    }
    
    this.params.sort = sort_options[ options ];
    this.fetch();
    
  }, // sortBy
  
  timeBy : function( options ) {
    
    var time_options = [
      'all',
      'today',
      'week',
      'month'
    ];
    
    if ( !$.inArray( options, time_options ) ) {
      console.error('Invalid time option');
      return false;
    }
    
    this.params.time = options;
    this.fetch();
    
  }, // timeBy
  
  searchKeyword : function( keyword ) {
    
    //this.nullAllExcept('search');
    this.params.search = keyword;
    this.fetch();
    
  }, // searchKeyword
  
  nullAllExcept : function (exception) {
    
    for (param in this.params) {
      if (!this.params.hasOwnProperty(param) && param == exception) { continue; }
      this.params[param] = null;
    }
    
    return this;
    
  } // nullAllExcept
});