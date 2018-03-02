const socket = io();

socket.on('connect', () => {
  console.log('Connected to socket.io server');
});

socket.on('message', (message) => {
  console.log('New message');
  console.log(message.text);
  $('.chat-area').append('<p>' + message.text + '</p>');
});

const $form = $('#chat-form');
const $message = $form.find('input[name=message]');

$form.on('submit', function(event){
  event.preventDefault();
  socket.emit('message', {
    text: $message.val()
  });
  $message.val('');
});
