// constructor for new message
 var Message = Backbone.Model.extend({
  url:'https://api.parse.com/1/classes/chatterbox',
  defaults: {
    text:'',
    username:'',
    roomname: ''
  }
 });

// contains and manipulates the messages
  var Messages = Backbone.Collection.extend({
    model: Message,
    url:'https://api.parse.com/1/classes/chatterbox',

    getMessages : function(){
      this.fetch({data : { order: '-createdAt'}});
    },

    parse: function(response,options){
      return response.results;
    }
  });

var FormView = Backbone.View.extend({
  initialize: function(){
    console.log('initialize');
  },
  events: {
    'click #sendbutton':'sendMessage'
  },
  sendMessage: function(){
    var text = this.$('#input').val();
    this.collection.create({
      username: window.location.search.substr(10),
      text: text
    });
    $('#text').val('');
  }
});



 var ViewMessage = Backbone.View.extend({
  initialize: function(){
    this.collection.on('change',this.render(),this);
  },
  template: _.template('<div class="chat" data-id="<%- objectId %>"> \
                          <div class="user"><%- username %></div> \
                          <div class="text"><%- text %></div> \
                        </div>'),
  render: function(){
    this.$el.html(template(this.model.attributes));
    return this.$el;
  }
 });


 var ViewMessages = Backbone.View.extend({
  initialize: function(){
    this.collection.on('sync',this.render(),this);
  },
  render: function(){
    this.collection.forEach(this.renderMessage,this);
  },
  renderMessage: function(){
    var messageView = new ViewMessage({model:message});
    this.$el.append(messageView.render());
  }
 });
  





