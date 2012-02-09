// Define a Contact model
var Contact = Backbone.Model.extend();

// Define a Contact view
var ContactView = Backbone.View.extend({
  tagName: 'div',
  initialize: function() {
    // set the template for this view.
    this.template = templates['contact_template'];
  },
  render: function() {
    // render the template with the model passed in during view creation.
    $(this.el).append(this.template({contact: this.model}));
    return this;
  }
});

// Function to load templates from html
var templates = {};
function load_templates() {
  // templates are underscore templates defined in script elements with type 'text/html'.
  scripts = document.getElementsByTagName('script');
  _.each(scripts, function(script) {
    if (script && script.innerHTML && script.id && (script.type === "text/html" )) {
      // compile the template with underscore and store it.
      templates[script.id] = _.template(script.innerHTML);
    }
  })
}

// Sample data (that would normally come from the server)
// If the result of a server operation has errors, the data will have an errors hash 
// that contains attribute names and corresponding error messages.
var data = { 
  id: 1,
  first_name: 'John',
  last_name: 'Smith',
  email: 'jsmith@example.com',
  about: 'a description for this user account',
  street_1: '123 California Way',
  street_2: 'Apt 456',
  city: 'San Francisco',
  state: 'California',
  zip: '94111',
  is_admin: true,
  // errors hash that contains an error for the email field
  errors: { 'email': 'An account with this email address already exists' } 
}; 

$(document).ready(function() {
  
  // load the templates.
  load_templates();
 
  // Create contact views with json data
  var view = new ContactView({model: new Contact(data)});
  
  // render the contact
  $('#contact-form').append(view.render().el);

});

