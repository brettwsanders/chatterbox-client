

var friends = {


};
var message = {};


var messages = {

};

var removeTags = function(message){
  if(message!==null){

  message = message.replace(/</g, "");
  message = message.replace(/>/g, "");
  message = message.replace('<strong>');
  message = message.replace('</strong>');
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






var runover = function(that){
  var text = $(that).text();
  var name = text.slice(0, text.indexOf(':'));
  friends[name]=true;
  //that.innerHTML = "<strong>" + text + "<strong>";

  // console.log(whole);
  // var friendname = whole.slice(0,whole.indexOf(":"));
  // if(!friends[friendname]){
  //   friends[friendname]=true;

  // var el = document.getElementsByClassName('friend');


  // for(var i = 0; i<el.length; i++){
  
  //  console.log($(this).text());
  //   var whole = $(this).text();
    
  //   var name = whole.slice(0,whole.indexOf(":"));
  //   if(name===friendname){
  //     name = '<strong  >'+ name +'</strong>';

  //   }
  //   }

    
  // }

};




  


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
  message.username = window.location.search.substr(10);
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




function getMessages(string){

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
          var newMessage = $('<p></p>');
          newMessage.on('click', function() {runover(this)});
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
          text = removeTags(text);
          
          if(!messages.hasOwnProperty(text)){
            var d = new Date().getMinutes();
            newMessage.html(name  +": "+ text+' '+ d);
            console.log(d);
            if (string === 'append') {
              $('#chats').append(newMessage);
            } else {
              $('#chats').prepend(newMessage);
              }              
             messages[text]=true;
            }
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
 

getMessages('append');
setInterval(function() {
getMessages('prepend');


}, 3000);







    


