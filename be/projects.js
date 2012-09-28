Behance = Behance || {};

Behance.ProjectModel = Behance.Model.extend({
  /**
   * Set the API endpoint for users.
   */
  url : function () {
    return Behance.api_url + 'projects/' + this.id + '?api_key=' + Behance.api_key;
  },
  
  /**
   * The Behance API returns a 'projects' object. We want the contents of the object.
   * @param {Object} response The response from the server.
   */
  parse : function (response) {
    return response.project;
  },
  
  /**
   * Get this projects's comments.
   * Using this method requires the CommentsCollection base collection.
   * @returns {Object} The ProjectModel object.
   */
  getComments : function() {
    
    var comments = new Behance.CommentsCollection();
    comments.id = this.get('id');
    comments.fetch();
    this.set('comments', comments);
    
    return this;
    
  }, // getComments
  
  /**
   * Get a specific project page.
   * @param {String} name Collection name to fetch results for.
   * @param {Number|String} page Page number.
   */
  getPage : function (name, page) {
    var collection;
    
    // Error out early.
    if ( !this.has(name) && console ) {
      console.error('Behance.ProjectModel: Make sure you\'ve populated the ' + name + ' collection before using the paging methods. See: ' + Behance.docs_link + ' for more information.');
      return false;
    }
    
    collection = this.get( name );
    collection.getPage( page );
    
  },
  
  /**
   * Get the next page of projects.
   */
  getNextCommentsPage : function () {
    this.getPage('comments', 'next');
    return this;
  },
  
  /**
   * Get the previous page of projects.
   */
  getPreviousCommentsPage : function () {
    this.getPage('comments', 'prev');
    return this;
  }
  
});
