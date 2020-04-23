   var channel_json_file='channels/channels.json';


/* VIDEOJS */
// declare object for video
var vgsPlayer, poster;
/*
vgsPlayer = videojs('vid1', {
  techOrder: ['youtube'],
  autoplay: false,
  sources: [{
    type: "video/youtube",
    src: "https://www.youtube.com/watch?v=xjS6SftYQaQ"
  }]
});
*/

vgsPlayer = videojs('playing_video');
$(vgsPlayer).on('error', function(event) {
$('.error').html(event.message);
});


/* 
vgsPlayer = videojs('vid1', {
  techOrder: ["html5", "flash", "youtube"],
  autoplay: false,
  youtube: {
    "iv_load_policy": 3
  },
  sources: [{
    type: "video/mp4",
    src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
  }]
}); */

vgsPlayer.poster('assets/img/Featured-Image.jpg');
//vgsPlayer.poster("http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4")

//videojs("vid1").ready(function() {
//  vgsPlayer = this;
//});

/********* LOAD URL *********/
$(document).on('click', '.list-group-item', function(e){
e.preventDefault();	
$('.list-group-item').removeClass('active');
$(this).addClass('active');
var new_url = $(this).attr('new_url');
 var t_logo = $(this).attr('t_logo');
 var t_type = $(this).attr('t_type');
 vgsPlayer.pause();
  vsgLoadVideo(new_url);
//play_this(t_type,t_logo,new_url);
	});
	
	$(document).on('click', '.channel_card', function(e){
e.preventDefault();	
var new_url = $(this).attr('new_url');
 var t_logo = $(this).attr('t_logo');
 var t_type = $(this).attr('t_type');
 //play_this(t_type,t_logo,new_url);
  vgsPlayer.pause();
     vsgLoadVideo(new_url);
	});
	
$('#vidlink li a').on('click', function(e) {
  e.preventDefault();
  var vidlink = $(this).attr('href');
  $('#vsg-vurl').val(vidlink);  
  $('input[type=submit]').click(); 
  //vsgLoadVideo(vidlink);
});

jQuery(function($) {

  // vsgLoadVideo("https://www.youtube.com/watch?v=r1H98REH0c0");
  // Video on page load

  //jQuery(document).ready(function($) {

  $("#vsg-loadvideo").submit(function(e) {
    e.preventDefault();

    var vidURL = $("#vsg-vurl").val();

    vsgLoadVideo(vidURL);

  });

}); // jQuery(function($) END


function vsgLoadVideo(vidURL, poster) {

  var type = getType(vidURL);

  console.log(type);

  if (getId(vidURL))
    poster = "http://img.youtube.com/vi/" + getId(vidURL) + "/hqdefault.jpg";

  vgsPlayer.src({
    "src": vidURL,
    "type": type
  });
  if (poster)
    vgsPlayer.poster(poster);
  else
  	vgsPlayer.poster("assets/img/Featured-Image.jpg");

  // play seem to trigger to fast before Youtube is ready
  
  //vgsPlayer.pause();
//	vgsPlayer.load();
  vgsPlayer.play();
/*   setTimeout(function() {
    vgsPlayer.play();
  }, 500); */
  
  return false;

}


function ytVidId(url) {
  //var p = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?=.*v=((\w|-){11}))(?:\S+)?$/;
  //var p = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var p = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;

  if (url.match(p) || getId(url).length == 11)
    return false;
}

/**/
function getId(url) {
  //var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
  var match = url.match(regExp);

  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return false;
  }
}

var rtmp_suffix = /^rtmp:\/\//;
var hls_suffix = /\.m3u8/;
var mp4_suffix = /\.(mp4|m4p|m4v|mov)/i;
var hds_suffix = /\.f4m/;
var dash_suffix = /\.mpd/;
var flv_suffix = /\.flv/;
var webm_suffix = /\.webm/;
/* AUDIO */
//var mp3_suffix = /\.mp3/;
var mpeg_suffix = /\.(mp3|m4a)/i;
var ogg_suffix = /\.ogg/;

//var youtube_suffix = /\.youtube.com/;
//var yt_suffix = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?=.*v=((\w|-){11}))(?:\S+)?$/;
var yt_suffix = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
var dm_suffix = /\.?dailymotion.com/;
var vm_suffix = /\.?vimeo.com/;
/* ADVANCED REGEX */
//      var regVimeo = /^.*(vimeo.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
//      var regDailymotion = /^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/;
//      var regMetacafe = /^.*(metacafe.com)(\/watch\/)(d+)(.*)/i;
//      var youtube_suffix = /(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

function getType(url) {

  /* AUDIO */
  if (mpeg_suffix.test(url))
    return 'audio/mpeg';
  if (ogg_suffix.test(url))
    return 'audio/ogg';
  if (dash_suffix.test(url))
    return 'application/dash+xml';
  if (rtmp_suffix.test(url))
    return 'rtmp/mp4';
  if (hls_suffix.test(url))
    return 'application/x-mpegurl';
  if (mp4_suffix.test(url))
    return 'video/mp4';
  if (hds_suffix.test(url))
    return 'application/adobe-f4m';
  if (flv_suffix.test(url))
    return 'video/flv';
  if (webm_suffix.test(url))
    return 'video/webm';
  if (yt_suffix.test(url)) {
    //alert(url.match(yt_suffix)[2]);
    //player.poster(ytmaxres(url.match(yt_suffix)[2]));
    //alert(ytmaxres(url.match(yt_suffix)[2]));
    return 'video/youtube';
  }
  if (dm_suffix.test(url))
    return 'video/dailymotion';
  if (vm_suffix.test(url))
    return 'video/vimeo';

  console.log('could not guess link type: "' + url + '" assuming mp4');
  return 'video/mp4';
};

function getExt(ext) {

  //if (ext == "youtube") ext = "mp4";
  if (ext == "mp4" || ext == "m4v") ext = "m4v";
  if (ext == "ogg" || ext == "ogv") ext = "oga";
  if (ext == "webm") ext = "webmv";

  return ext;
}







$(document).ready(function() { 
   //reset_video();
   $('.vjs-modal-dialog-content').html('Select a Channel to play');
   var category='';
   get_channel_list(category);
	});

/*
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
	*/

$('#ch_category').on('change', function() {
	var search_category=$(this).find('option:selected').val();
	get_channel_list(search_category);
});
function get_channel_list(search_category)
{
  $.getJSON(channel_json_file, function(data) {
      $('#channel_cards').empty();
      $('#channel_list').empty();
            $('#channel_list').append('<li href="#" new_url="https://www.youtube.com/watch?v=aXI_hdCddNQ" class="list-group-item active">Select Channel</li>');      
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
	$('#main_div_player').html('<video id="playing_video" class="video-js " controls preload="auto" poster="assets/img/Featured-Image.jpg" data-setup="{}"><source src="" type="application/x-mpegURL"></source></video>');
    $('#playing_video').attr('poster',t_logo);

	var player = videojs('playing_video');

	player.pause();
	player.src(new_url);
	player.load();
player.play();
    }
}
	
	/*
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

*/
