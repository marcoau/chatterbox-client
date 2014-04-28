$(document).ready(function(){
  $('#submitText').on('click', function(){
    var pos = window.location.search.indexOf('=');
    var username = window.location.search.slice(pos+1);
    var room = $('#room').val().trim();
    app._currentRoom = room;
    if(_.indexOf(app._rooms, room)===-1){
      var $link = $('<li><a href="#">' + room + '</a></li>');
      $('#roomSelect').append($link);
      app._rooms.push(room);
    }
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

  $('#roomSelect').on('click', 'li', function(){
    var room = $(this).find('a').text();
    app._currentRoom = room;
    app.fetch();
  });

  $('#chats').on('click', '.friend', function(){
    var friend = $(this).text().trim();
    console.log(friend);
    app._friends[friend] = !app._friends[friend];
  });



  app.fetch();
  setInterval(app.fetch, 3000);
});
