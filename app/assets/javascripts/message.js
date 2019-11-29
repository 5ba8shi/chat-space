$(function(){
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    console.log('イベント発火');
  })  
  function buildHTML(message){
    if (message.image) {
      var html = 
    } else {
      var html = <div class="message">
      <div class="upper-message">
      <div class="upper-message__user-name">
      0@0
      </div>
      <div class="upper-message__date">
      2019/11/29 12:08
      </div>
      </div>
      <div class="lower-message">
      <p class="lower-message__content">
      にゃーーー
      </p>
      
      </div>
      </div>
    }
    return html
  }



  $.ajax({
    url: 
    type:
    dataType: json
    processData: false
    contentType: false
  })
})
