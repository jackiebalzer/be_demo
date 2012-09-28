Behance Network API / Backbone.js
================================

Basic implementation to access User, Project, Work in Progress and Collection data.

See [http://be.net/dev](http://be.net/dev) for more information and documentation.


Installation / Usage
--------------------

1. Please register for an application ID + key first: [http://be.net/dev/register](http://be.net/dev/register)
2. Usage.

    ``` js
    
    // Set your API key in be.js
    Behance.api_key = 'abcdef';
   
    // Users
    BehanceUser = new Behance.UserModel({user: 'sbelsky'});
    BehanceUser.fetch();
    BehanceUser.getProjects();
    BehanceUser.getCollections();
    BehanceUser.getWips();
    
    // Projects
    BehanceProject = new Behance.ProjectModel({id: 729292});
    BehanceProject.fetch();
    BehanceProject.getComments();
    
    // Wips
    BehanceWip = new Behance.WipModel({id: 73});
    BehanceWip.fetch();
    BehanceWip.getRevision(281);
    
    // Collections
    BehanceCollection = new Behance.CollectionModel({id: 9866});
    BehanceCollection.fetch();
    BehanceCollection.getProjects();
    
    // Search
    SearchResults = new Behance.SearchCollection();
    SearchResults.sortBy('appreciations');
    
    ```

Requirements
------------

1. [jQuery](http://jquery.com/)
2. [Underscore.js](http://documentcloud.github.com/underscore/)
3. [Backbone.js](http://backbonejs.org/)