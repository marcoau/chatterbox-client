$(document).ready(function(){
  app._currentRoom = 'lobby';
  $('#currentRoom').text(app._currentRoom);
  $('#submitText').on('click', function(){
    var pos = window.location.search.indexOf('=');
    var username = window.location.search.slice(pos+1);
    var room = app._currentRoom;
    var text = $('#text').val().trim();
    var message = {
      username: username,
      text: text,
      roomname: room
    };
    app.send(message);
    $('#room').val('');
    $('#text').val('');
  });

  $('#addRoom').on('click', function(){
    var room = $('#room').val().trim();
    if(_.indexOf(app._rooms, room)===-1){
      var $link = $('<li><a href="#">' + room + '</a></li>');
      $('#roomSelect').append($link);
      app._rooms.push(room);
    }
  });

  $('#roomSelect').on('click', 'li', function(){
    var room = $(this).find('a').text();
    app._currentRoom = room;
    app.fetch();
    $('#currentRoom').text(room);
  });

  $('#chats').on('click', '.friend', function(){
    var friend = $(this).text().trim();
    console.log(friend);
    app._friends[friend] = !app._friends[friend];
    if(app._friends[friend]){
      var $link = $('<li><a href="#">' + friend + '</a>(remove)</li>');
      $('#friendSelect').append($link);
    }

    $('#friendSelect').on('click', 'li', function(){
      var friend = $(this).find('a').text();
      delete app._friends[friend];
      $(this).remove();
    })
  });



  app.fetch();
  setInterval(app.fetch, 3000);
});
