$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = 
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
           
            </p>
          </div>
      </div>`
    } else {
      var html = 
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
        </div>`
    }
    return html
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST", 
      dataType:'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
      $('form')[0].reset();
    })
      .fail(function(){
        alert('error');
      });
      return false;
  });  
});

// $(function(){
//   function buildHTML(message){
//     image = ( message.imageurl.url ) ?  `<img class="lower-message__image" src=${message.image.url}>`: "";
//     let html =
//     `<div class="message" data-message-id=${message.id}>
//         <div class="upper-message">
//           <div class="upper-message__user-name">
//             ${message.user_name}
//           </div>
//           <div class="upper-message__date">
//             ${message.date}
//           </div>
//         </div>
//         <div class="lower-message">
//           <p class="lower-message__content">
//             ${message.content}
//           </p>
//           ${image}   
//         </div>
//       </div>`
//       return html;
//   }
// })

