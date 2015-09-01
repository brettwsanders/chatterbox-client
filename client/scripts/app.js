

var roomNames = {

};

var message = {

};



$('#sendbutton').click(function() {
  //message.name = username;
  //message.room = roomname;

  //message.username = window.location.search.slice(window.location.search.indexOf("=") + 1);

  message.text = $('#input').val();
  //message.roomname = "newroom";

  message.roomname = 'myroom';


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
// },3500)




function getMessages(){

   $.ajax({// This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      for(var i = 0; i<data.results.length; i++){
        var name = data.results[i].username || 'anonymous';
        var newMessage = $('<div></div>');
        newMessage.addClass('chat');
        newMessage.text(name+" : "+ data.results[i].text);
        $('#chats').append(newMessage);
        
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



