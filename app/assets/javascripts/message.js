$(function(){ 
  function buildHTML(message){
    image = ( message.image.url ) ? `<img class= "lower-message__image" src=${message.image.url} >` : "";
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


  let reloadMessages = function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      let last_message_id = $('.message:last').data("message-id"); 

      $.ajax({
        url: "api/messages",
        type: "get",
        dataType: 'json',
        data: { id: last_message_id }
      })

      .done(function(data){
        let insertHTML = '';
        data.forEach(function(message){
          if (last_message_id < message.id){
          insertHTML = buildHTML(message);         
          $('.messages').append(insertHTML)
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          }
        });
      })
      .fail(function(data){
        alert('自動更新に失敗しました');
      })
    } 
  };
setInterval(reloadMessages, 7000);
});