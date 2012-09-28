Behance = Behance || {};

Behance.CollectionModel = Behance.Model.extend({
  /**
   * Set the API endpoint for users.
   */
  url : function () {
    return Behance.api_url + 'collections/' + this.id + '?api_key=' + Behance.api_key;
  },
  
  /**
   * The Behance API returns a 'collection' object. We want the contents of the object.
   * @param {Object} response The response from the server.
   */
  parse : function (response) {
    return response.collection;
  },
  
  /**
   * Get this collection's projects.
   * Using this method requires the ProjectsCollection base collection.
   * @returns {Object} The CollectionModel object.
   */
  getProjects : function() {
    
    var projects = Behance.ProjectsCollection.extend({
      url : Behance.api_url + 'collections/' + this.id + '/projects?api_key=' + Behance.api_key + '&' + $.param(this.params)
    });
    projects.id = this.id;
    projects.fetch();
    this.set('projects', projects);
    
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
      console.error('Behance.CollectionModel: Make sure you\'ve populated the ' + name + ' collection before using the paging methods. See: ' + Behance.docs_link + ' for more information.');
      return false;
    }
    
    collection = this.get(name);
    collection.getPage(page);
  },
  
  /**
   * Get the next page of projects.
   */
  getNextProjectsPage : function () {
    this.getPage('projects', 'next');
    return this;
  },
  
  /**
   * Get the previous page of projects.
   */
  getPreviousProjectsPage : function () {
    this.getPage('projects', 'prev');
    return this;
  }
  
});