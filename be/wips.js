Behance = Behance || {};

Behance.WipModel = Behance.Model.extend({
  
  /**
   * Set the API endpoint for users.
   */
  url : function () {
    return Behance.api_url + 'wips/' + this.id + '?api_key=' + Behance.api_key;
  },
  
  /**
   * The Behance API returns a 'wip' object. We want the contents of the object.
   * @param {Object} response The response from the server.
   */
  parse : function (response) {
        
    response.wip.revisions = new Behance.Collection( response.wip.revisions, { model : Behance.WipRevisionModel } );
    
    return response.wip;
  },
  
  /**
   * Get a revision of this WIP.
   * Using this method requires the WipsRevisionsCollection base collection.
   * @returns {Object} The WipModel object.
   */
  getRevision : function (revision_id) {
    
    this.get('revisions').get( revision_id ).set({ wip_id : this.id }).fetch();
    
    return this;
    
  } // getRevision
  
});