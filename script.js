const textarea = document.querySelector("textarea");

var baseurl = "https://freetts.com/Home/PlayAudio";

$(document).ready(function() {
    $('textarea').keyup(function() {
        var characterCount = $(this).val().length,
            current = $('#current'),
            maximum = $('#maximum'),
            theCount = $('#the-count');
          
        current.text(characterCount);
       
        
        /*This isn't entirely necessary, just playin around*/
        if (characterCount < 70) {
          current.css('color', '#666');
        }
        if (characterCount > 70 && characterCount < 90) {
          current.css('color', '#6d5555');
        }
        if (characterCount > 90 && characterCount < 100) {
          current.css('color', '#793535');
        }
        if (characterCount > 100 && characterCount < 120) {
          current.css('color', '#841c1c');
        }
        if (characterCount > 120 && characterCount < 139) {
          current.css('color', '#8f0001');
        }
        
        if (characterCount >= 140) {
          maximum.css('color', '#8f0001');
          current.css('color', '#8f0001');
          theCount.css('font-weight','bold');
        } else {
          maximum.css('color','#666');
          theCount.css('font-weight','normal');
        }
        
            
      });    
});



function convert_to_mp3() {
  var charCount = $('#current').text();
  var name = $('#UserName').val();
  if (charCount != "0") {

      var Language = $('#Language').val()
      var Voice = $('#Voice').val()
      var TextMessage = $('#TextMessage').val().replace(/\n/g, ' ')
      var id = $("#Voice").find("option:selected").attr("id");
      var type = $("#Voice").find("option:selected").attr("type");
      if (charCount.length <= 4999) {
          if (type == 1 && charCount.length > 3000) {
              alert("The characters of your content are more than 3000");
              return;
          }
          $('#btnAudio').attr("disabled",true)
          $('#audio_').hide();
          $('#gifImage').show();
          
        $(".fa-3x").show();
          $.ajax({
              type: "GET",
              url: baseurl,
              async: true,
              data: {
                  Language: Language,
                  Voice: Voice,
                  TextMessage: TextMessage,
                  id: id,
                  type: type,
                  UserName: name,
              },
              success: function (data) {
                  if (data != null) {
                      if (data.msg == "True") {
                        $(".fa-3x").hide();
                          $('#audio_').show();
                          Id = data.id;
                          $('#btnAudio').attr("disabled", false);
                          $('#charactercounts').html(data.counts);

                          $("#AudioPlayer").html("<audio controls='controls'>" + " <source src='https://freetts.com/audio/" + Id + "' type='audio/mpeg' />" + "</audio>");
                        

                          $('#gifImage').hide();
                      } else {
                          if (data.code == "999") {
                              $('#gifImage').hide();
                              $('#btnAudio').attr("disabled", false);
                              $('#charactercounts').html(data.counts);
                              alert("Please select your tts voice style and then try again.");
                          }
                          else if (data.code == "888") {
                              $('#gifImage').hide();
                              $('#btnAudio').attr("disabled", false);
                              $('#charactercounts').html(data.counts);
                              alert("Reach the limitation today. Purchase and get more characters please.");
                          }
                      }
                  } else {
                      setTimeout(function () {
                          $('#gifImage').hide();
                          alert("Time out. Please try again");
                      }, 1000);
                  }
              }
          });
          $('#TextMessage').val(TextMessage);

      }
      else {
          alert("The characters of your content are more than 5000");
      }
  }
  else {
      alert("Please first enter the text! ");
  }
}

function wordLimit() {
    var type = $("#Voice").find("option:selected").attr("type");
    var limit = $('#current').text();
    if (type == 0) //Google TTS
        limit.innerText = "5000"
    else
        limit.innerText = "3000"

}