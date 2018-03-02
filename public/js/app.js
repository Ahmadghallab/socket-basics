const socket = io();

socket.on('connect', () => {
  console.log('Connected to socket.io server');
});

socket.on('message', (message) => {
  let momentTimestamp = moment.utc(message.timestamp);
  console.log('New message');
  console.log(message.text);
  $('.chat-area').append(

    `<div class="media mb-3">
      <img class="mr-3" src="http://via.placeholder.com/64x64" alt="Generic placeholder image">
      <div class="media-body">
        <h5 class="mt-0">Your name <small>${momentTimestamp.local().format('h:mm a')}</small></h5>
        ${message.text}
      </div>
    </div>`


    // '<p>' + momentTimestamp.local().format('h:mm a') + ' ' + message.text + '</p>'
  );
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
