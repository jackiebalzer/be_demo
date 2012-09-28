Behance = Behance || {};

/**
 * Behance WIP revision model.
 */
Behance.WipRevisionModel = Behance.Model.extend({
  
  url : function () {
    
    return Behance.api_url + 'wips/' + this.get('wip_id') + '/' + this.id + '?api_key=' + Behance.api_key;
    
  }, // url
  
  /**
   * The Behance API returns a 'revision' object. We want the contents of the object.
   * @param {Object} response The response from the server.
   */
  parse : function (response) {
    return response.revision;
  } // parse
  
});