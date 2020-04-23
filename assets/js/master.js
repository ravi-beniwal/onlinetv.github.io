   var channel_json_file='channels/channels.json';

$(document).ready(function() { 
   //reset_video();
   var category='';
   get_channel_list(category);
	});

	$(document).on('click', '.list-group-item', function(e){
e.preventDefault();	
$('.list-group-item').removeClass('active');
$(this).addClass('active');
var new_url = $(this).attr('new_url');
 var t_logo = $(this).attr('t_logo');
 var t_type = $(this).attr('t_type');
play_this(t_type,t_logo,new_url);
	});
	
	$(document).on('click', '.channel_card', function(e){
e.preventDefault();	
var new_url = $(this).attr('new_url');
 var t_logo = $(this).attr('t_logo');
 var t_type = $(this).attr('t_type');
 play_this(t_type,t_logo,new_url);
	});

$('#ch_category').on('change', function() {
	var search_category=$(this).find('option:selected').val();
	get_channel_list(search_category);
});
function get_channel_list(search_category)
{
  $.getJSON(channel_json_file, function(data) {
      $('#channel_cards').empty();
      $('#channel_list').empty();
            $('#channel_list').append('<li href="#" new_url="" class="list-group-item active">Select Channel</li>');      
   $.each(data, function(key, v){
	   if(search_category=='')
	   {
		   $('#channel_cards').append('<div class="col-md-3 col-xs-6"><div class="card channel_card" t_logo="'+v.channel_logo+'" t_type="'+v.channel_type+'" new_url="'+v.channel_url+'"><img class="card_img" src="'+v.channel_logo+'"><div class="c_container"><b>'+v.channel_title+'</b><p><label class="label label-danger">'+v.category+'</label>  <label class="label label-primary">'+v.channel_language+'</label></p></div></div></div>');
		    $('#channel_list').append('<li t_logo="'+v.channel_logo+'" t_type="'+v.channel_type+'" new_url="'+v.channel_url+'" class="list-group-item"><img class="small_img pull-left" src="'+v.channel_logo+'"/><span class="text-center">'+v.channel_title+'</span><span class="pull-right"><label class="label label-danger">'+v.category+'</label><label class="label label-primary">'+v.channel_language+'</label></span></li>');
	   }
	   else if(search_category.indexOf(v.category) > -1){
//if (v.category===category){
        $('#channel_cards').append('<div class="col-md-3 col-xs-6"><div class="card channel_card" t_logo="'+v.channel_logo+'" t_type="'+v.channel_type+'" new_url="'+v.channel_url+'"><img class="card_img" src="'+v.channel_logo+'"><div class="c_container"><b>'+v.channel_title+'</b><<p><label class="label label-danger">'+v.category+'</label>  <label class="label label-primary">'+v.channel_language+'</label></p></div></div></div>');
		      $('#channel_list').append('<li t_logo="'+v.channel_logo+'" t_type="'+v.channel_type+'" new_url="'+v.channel_url+'" class="list-group-item"><img class="small_img pull-left" src="'+v.channel_logo+'"/><span class="text-center">'+v.channel_title+'</span><span class="pull-right"><label class="label label-danger">'+v.category+'</label><label class="label label-primary">'+v.channel_language+'</label></span></li>');
    }
	  
   });   
  });
}
  function reset_video()
{
 var new_url = $('#channel_list').find('li.active').attr('new_url');
 var t_logo = $('#channel_list').find('li.active').attr('t_logo');
 var t_type = $('#channel_list').find('li.active').attr('t_type');
play_this(t_type,t_logo,new_url);

}  
	function play_this(t_type,t_logo,new_url){
    console.log(t_type);
	if(t_type=="youtube")
	{
			$('#main_div_player').html('<iframe src="https://www.youtube.com/embed/'+new_url+'" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="" mozallowfullscreen="" webkitallowfullscreen="" scrolling="no" ></iframe>');
	}
	else if(t_type=="frame")
	{
		$('#main_div_player').html('<iframe  src="'+new_url+'" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="" mozallowfullscreen="" webkitallowfullscreen="" scrolling="no" ></iframe>');
	}
else if(t_type=="application/x-mpegURL"){
	$('#main_div_player').html('<video id="playing_video" class="video-js " controls preload="auto" poster="assets/img/Featured-Image.jpg" src="" type="application/x-mpegURL"><p class="vjs-no-js"></video>');
    $('#playing_video').attr('poster',t_logo);

	var player = videojs('playing_video');

	player.pause();
	player.src(new_url);
	player.load();
player.play();
    }
}
	
	var video, speed, volume;

function init() {
  // initialize the player
  // first, get the media element and assign it to the video variable
  video = $('#play_src');

  // get the current playbackRate from the HTML5 media API
  // range is 0 to very fast, with 1 being normal playback
  speed = video.playbackRate;

  // volume range is 0 to 1
  // set it in the middle so we have room to move it with our buttons
  volume = 0.5;
  $('.volume_label').html(Math.round(volume*10));
  video.volume = volume;
}

function play() {
  video.play();
   $('.play_pause').attr('id','pause').html('<i class="fa fa-pause fa-fw"></i>');
  
}

function pause() {
  video.pause();
   $('.play_pause').attr('id','play').html('<i class="fa fa-play fa-fw"></i>');
}

function changeSpeed(direction) {
  // direction is either 'up' (faster) or 'down' (slower)
  if (direction == 'up') {
    if (speed < 10) {
      // increase playbackRate
      speed = speed + 0.1;
    }
  }
  else if (direction == 'down') {
    if (speed > 0) {
      // decrease playbackRate
      speed = speed - 0.1;
    }
  }
  // so far all we've done is change the value of our speed variable
  // not let's assign it to the player
  video.playbackRate = speed;
}


$(document).on('click', '.play_pause', function(e){
e.preventDefault();
var action=$(this).attr('id');

if (action == 'play') {
    video.play();
    $(this).attr('id','pause').html('<i class="fa fa-pause fa-fw"></i>');
  }
  else if (action == 'pause') {
    video.pause();
    $(this).attr('id','play').html('<i class="fa fa-play fa-fw"></i>');
  }
});


$(document).on('click', '.changeVolume', function(e){
e.preventDefault();
var direction=$(this).attr('id');

if (direction == 'up') {
    // if not fully cranked yet, increase volume
    if (volume < 0.9) {
      volume = volume + 0.1;
    }
  }
  else if (direction == 'down') {
    // if not muted, decrease volume
    if (volume > 0.1) {
      volume = volume - 0.1;
    }
  }
  // so far all we've done is change the value of our volume variable
  // not let's assign it to the player
  video.volume = volume;
  $('.volume_label').html(Math.round(volume*10));
});

$(document).on('click', '.mute-video', function(e){
e.preventDefault();

    if( $("video").prop('muted') ) {
          $("video").prop('muted', false);
        $(this).attr('id','mute').html('<i class="fa fa-volume-off fa-fw"></i>').removeClass('btn-danger').addClass('btn-primary');
    } else {
      $("video").prop('muted', true);
            $(this).attr('id','unmute').html('<i class="fa fa-volume-off fa-fw"></i>').removeClass('btn-primary').addClass('btn-danger');
    }
});

$(document).on('click', '.fullscreen', function(e){
e.preventDefault();
    if (video.requestFullscreen) {
        video.requestFullscreen();
    }
    else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
    else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    }
    else if (video.webkitRequestFullScreen) {
        video.webkitRequestFullScreen();
    }
    
});


// wait until the web page has finished loading, then run the init function
//window.onload = init;


