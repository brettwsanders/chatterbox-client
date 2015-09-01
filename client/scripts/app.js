

var friends = {


};

var message = {

};

var removeTags = function(message){
  if(message!==null){

  message = message.replace(/</g, "");
  message = message.replace(/>/g, "");
}

  return message;
};



$('#create').click(function(){

  var x = document.getElementById("room");
  var option = document.createElement("option");
  option.text = $('#newRoom').val();
  x.add(option);
  $('#newRoom').val('');






});





 $(".friend").on('click', function(){
  var whole = $(this).text();
  var friendname = whole.slice(0,whole.indexOf(":"));
  friendname = removeTags(friendname);
  if (friends[friendname] === undefined) {
    friends[friendname] = true;
  }
});





$('#sendbutton').click(function() {
  //message.name = username;
  //message.room = roomname;

  //message.username = window.location.search.slice(window.location.search.indexOf("=") + 1);

  message.text = $('#input').val();
  //message.roomname = "newroom";

  message.roomname = $('select option:selected').text();


  $('#input').val('');
   
  // var newText = $('message').val();
  // var room = $('simonroom').innerHTML;
  // message.text = newText;
  // // message.username = username;
  // message.roomname = roomname;
  // console.log(message);
  message.username = prompt('your name my friend');
  console.log(message);
  $.ajax({// This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.log(data);
      console.error('chatterbox: Failed to send message');
    }
  });
});

// setTimeout(function(){
//   // var text = document.getElementById('message').value();
//   var text = $('#message').val();
//   console.log(text);
//   alert(text);
// },3500);




function getMessages(){

   $.ajax({// This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      for(var i = 0; i<data.results.length; i++){
        var selectedRoom = $('select option:selected').text();
        var room = data.results[i].roomname;
        if (room !== undefined) {
          room = removeTags(room);
        }
        //console.log('selectedRoom: ' + selectedRoom + "     room: " + room);
        if (selectedRoom === 'all' || selectedRoom === room) {
          var name = data.results[i].username || 'anonymous';
          var newMessage = $('<div></div>');
          newMessage.addClass('friend');
          newMessage.addClass('chat');
          name = removeTags(name);
          if(data.results[i].text!==null && data.results[i].text !== undefined ){
            var text = removeTags(data.results[i].text);
          }
          if(friends.hasOwnProperty(name)){
            name = '<strong>'+ name +'</strong>';
            text = '<strong>'+ text +'</strong>';
          }
          newMessage.html(name  +": "+ text);
          $('#chats').append(newMessage);
        }
      }
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
 };

 var cleanup = function(){
  $('#chats').html('');
 };
 

 setInterval(function() {
  cleanup();
  getMessages();

  }
  , 3000);







    


