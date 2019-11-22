$(function(){ 
  last_message_id = '#new_message'
  console.log(last_message_id);

  function buildHTML(message){
    let html = 
      `<div class=message>
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}　
          </div>
          <div class="upper-message__date">
            ${message.date}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
          ${image}
        </div>
      </div> `
  }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 let formData = new FormData(this);
 let url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    let html = buildHTML(data);
    $('.messages').append(html);
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
    $('form')[0].reset();
  })
   .fail(function(){
     alert('error');
   });
   return false;
 });
});