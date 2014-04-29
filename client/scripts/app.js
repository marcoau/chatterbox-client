var app = app || {};

app.init = function(){};

app._messages = [];
app._currentRoom = 'lobby';
app._rooms = ['lobby'];
app._friends = {};

app.fetch = function(){

  var ajaxSettings = {
    url: 'https://api.parse.com/1/classes/chatterbox',
    contentType: 'application/json',
    data: {order: '-createdAt'},
    success: function (response) {
      console.log('chatterbox: Messages received');
      app._messages = response.results;
      app.clearMessages();
      app.displayMessages(app._messages);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  };

  $.ajax(ajaxSettings);

};

app.send = function(message){
  var ajaxSettings = {
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {

      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  };
  $.ajax(ajaxSettings);
};

app.displayMessages = function(messages){

  for(var i = 0; i < messages.length; i++){
    if(messages[i].roomname !== app._currentRoom){
      continue;
    }
    if(app._friends[messages[i].username] === true){

    }
    if(!messages[i].username){
      messages[i].username = 'anonymous';
    }
    if (!messages[i].text){
      messages[i].text = '';
    }
    app.addMessage(messages[i]);
  }

};

app.addMessage = function(message){
  if(app._friends[message.username] === true){
    var template = _.template('<div class="chat"><strong><a href="#" class="friend"><span class="username"><%- username %></span></a>: <%- text %></strong></li>');
  } else {
    var template = _.template('<div class="chat"><a href="#" class="friend"><span class="username"><%- username %></span></a>: <%- text %></li>');
  }
  $('#chats').append(template(message));
};

app.clearMessages = function(){
  $('#chats').empty();
};

app.addRoom = function(roomName){
  var $link = $('<a href="#">' + roomName + '</a>');
  $('#roomSelect').append($link);
};
