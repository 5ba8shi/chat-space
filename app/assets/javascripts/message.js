$(function(){ 
  function buildHTML(message){
    image = ( message.image ) ? `<img class= "lower-message__image" src=${message.image} >` : "";
    let html = 
      `<div class="message" data-message-id=${message.id}>
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
        </div>
        ${image}
      </div> `
    return html;
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


    var reloadMessages = function(){
      var last_message_id = $('.messages').filter(":last").data('messageId')
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
      $.ajax({
        url: "api/messages",
        data: { last_id: last_message_id },
        type: "GET",
        dataType: 'json'
      })
      .done(function(data){
        var insertHTML = '';
        data.forEach(function(message){
        insertHTML = buildHTML(message);         
        $('.main__message').append(insertHTML)
        if (last_message_id < message.id){
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        }
      });
    })
    .fail(function(data){
      alert('自動更新に失敗しました');
    })
  } else{console.log(this);}
};
setInterval(reloadMessages, 7000);
});