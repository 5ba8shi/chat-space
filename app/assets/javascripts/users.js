$(function() {
  function addUser(user) {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }
  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
      .done(function(users) {
        $("#user-search-result").empty();

        if (users.length !== 0) {
          users.forEach(function(user) {
            addUser(user);
          });
        } else if (input.length == 0) {
          return false;
        } else {
          addNoUser();
        }
      })
      .fail(function() {
        alert("通信エラーです。ユーザーが表示できません。");
      });
  });
});

$(function(){
  function buildHTML(message){
    image = ( message.image.url ) ? `<img class="lower-message__image" src=${message.image.url} >` : "";
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
  $('#new_message').on('submit',function(e){
    e.preventdefault();
    let formData = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataTyep: 'json',
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

  var reloadMessages = function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id");

      $.ajax({
        url: "api/messages",
        type: "get",
        dataType: 'json',
        data: { id: last_message_id }
      })
      
      .done(function(data){
        var insertHTML = '';
        data.forEach(function(message){
          if (last_message_id < message.id){
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML)
          $('.messages').animate({scrollTop: $('messages')[0].})
          }
        })
      })
    }
  }