


// Set a same-site cookie for first-party contexts
document.cookie = 'id=LiveTV; SameSite=Lax';
// Set a cross-site cookie for third-party contexts
document.cookie = 'ch_dev=RKB; SameSite=None; Secure';
const controls = [
            'play-large', // The large play button in the center
            'restart', // Restart playback
            'rewind', // Rewind by the seek time (default 10 seconds)
            'play', // Play/pause playback
            'fast-forward', // Fast forward by the seek time (default 10 seconds)
            'progress', // The progress bar and scrubber for playback and buffering
            'current-time', // The current time of playback
            'duration', // The full duration of the media
            'mute', // Toggle mute
            'volume', // Volume control
            'captions', // Toggle captions
            'settings', // Settings menu
            'pip', // Picture-in-picture (currently Safari only)
            'airplay', // Airplay (currently Safari only)
            //'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
            'fullscreen' // Toggle fullscreen
        ];
		  var video = document.querySelector('#player');
		const player = new Plyr('#player', { video,controls });
		

const LS=function (type,name,value){
	//console.log(type,name,value);
	if (typeof(Storage) !== "undefined") {
	//value=(typeof value)=='Object' ? JSON.stringify(value) : value;
	var return_value='';
	switch(type)
	{
		case 'set':
		window.localStorage.setItem(name,value);
		break;
		case 'get':
		return_value=window.localStorage.getItem(name);
		
		break;
		case 'remove':
		window.localStorage.removeItem(name);
		break;
		case 'clear':
		window.localStorage.clear();
		break;
		default:
		alert('Invalid Calling ');
		break;
	}
	}
	else{
		alert('Storage Access Not allowed');
	}
	return_value=(typeof return_value)=='Object' ? JSON.parse(return_value) : return_value;
	return return_value;
}

function play_Video(videoSource) {
 

  if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(videoSource);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED,function() {
      video.play();
    });
  }
     
   // plyr.setup({ controls });
  //plyr.setup(video);
 

setTimeout(function(){ 
player.fullscreen.enter(); // Enter fullscreen
 }, 3000);

}

$( document ).ready(function() {
	var guideUrl="https://raw.githubusercontent.com/ravi-beniwal/media_Source/main/tvguide.json";
	getGuide('TVguide',guideUrl); 
	
var videoSource='https://m-c010-j2apps.s.llnwi.net/hls/8065.DevamTV.in.m3u8';

LoadTVChannels('TVguide');
//play_Video(videoSource);

});


function getGuide(name,url){
	
	$.getJSON(url,function(output1)
	{
		LS('set',name,JSON.stringify(output1));
		$.each(output1,function(a,b){
		
		$.getJSON(b['Source'],function(output2)
	{
//output2=clean(output2);
	output2=removeNulls(output2);
		LS('set',b['Name'],JSON.stringify(output2));
	});	
		})
	});
}

function LoadTVChannels(name)
{
	var b='',a='',c=[];
	a=JSON.parse(LS('get',name,''));
	
	channels_list=JSON.parse(LS('get','LiveTV',''));
	const channels=channels_list['channels'];
	$('.channels_container').html('<div id="channels" class="channel_list"></div>');
	var uniquelang = [],uniquecat=[];
	
	$.each(channels,function(a,ch){
	if (uniquelang.indexOf(ch['languages'][0]['name']) === -1) {
     
        uniquelang.push(ch['languages'][0]['name']);
    }
	if (uniquecat.indexOf(ch['category']) === -1) {
     
        uniquecat.push(ch['category']);
    }
		//console.log(ch);	
		//https://qqcdnpictest.mxplay.com/pic/0380.NewsX.in/en/1x1/208x208/test_pic1552315785886.jpg
		var ch_img_url='https://qqcdnpictest.mxplay.com/';
		c['image']=ch_img_url+ch['imageInfo'][0]['url'];
		c['title']=ch['title'];
		c['id']=ch['id'];
		c['category']=ch['category'];
		c['languages']=ch['languages'][0]['name'];
		stream_provider=ch['stream']['provider'];
		c['link']=ch['stream'][ch['stream']['provider']]['hls']['main'] ?? ch['stream'][ch['stream']['provider']]['hls']['high'] ?? ch['stream'][ch['stream']['provider']]['hls']['base'];
	//	console.log(c);
		$('#channels').append('<a class="channel" id="'+c['id']+'" data-lang="'+c['languages']+'" data-cat="'+c['category']+'" onClick="play_Video(\''+c['link']+'\');LoadInformation(\''+c['id']+'\',\''+c['title']+'\',\''+c['category']+'\',\''+c['languages']+'\');"><img class="channel_image" src="'+c['image']+'" alt="'+c['title']+'"></a>');
	});
	populate_cat_selection(uniquecat);
	populate_lang_selection(uniquelang);
	$('.channels_container').show();
}

function LoadInformation(id,title,category,languages)
{
	$('.channel_information').html('<h3>'+title+' <small><button class="btn btn-success">'+category+'</button><button class="btn btn-primary">'+languages+'</button></small></h3>');
}


function populate_cat_selection(arr)
{

$('select#category_selection').html('<option value="">Select Category</option>');
$.each(arr,function(id,lang)
{
	$('select#category_selection').append('<option value="'+lang+'">'+lang+'</option>');
});

}


function populate_lang_selection(arr)
{

$('select#language_selection').html('<option value="">Select Language</option>');
$.each(arr,function(id,lang)
{
	$('select#language_selection').append('<option value="'+lang+'">'+lang+'</option>');
});

}

$(document).on('change', 'select#language_selection', function (e) {
var lang = $('#language_selection').find(":selected").val() ;
	 var cat = $('#category_selection').find(":selected").val() ;  
   select_channels(lang,cat);

});
$(document).on('change', 'select#category_selection', function (e) {
var lang = $('#language_selection').find(":selected").val() ;
	 var cat = $('#category_selection').find(":selected").val() ;
    select_channels(lang,cat);
});



function select_channels(lang,cat)
{
	$('.channel').filter(function () {
    return $(this).attr('data-lang') != 'X' && $(this).attr('data-cat') != 'X';
  }).show();
	console.log(lang,cat);
		
	if(lang){
		if(cat)
		{
			$('.channel').filter(function () {
    return $(this).attr('data-lang') != lang || $(this).attr('data-cat') != cat;
  }).hide();
		}
		else{
			$('.channel').filter(function () {
    return $(this).attr('data-lang') != lang ;
  }).hide();
		}
	}
else if(cat){
		if(lang)
		{
			$('.channel').filter(function () {
    return $(this).attr('data-lang') != lang || $(this).attr('data-cat') != cat;
  }).hide();
		}
		else{
			$('.channel').filter(function () {
    return $(this).attr('data-cat') != cat ;
  }).hide();
		}
}
else{
	$('.channel').filter(function () {
    return $(this).attr('data-lang') != 'X' && $(this).attr('data-cat') != 'X';
  }).show();
}		
	
}






function removeNulls(obj) {
  var isArray = obj instanceof Array;
  for (var k in obj) {
    if (obj[k] === null) isArray ? obj.splice(k, 1) : delete obj[k];
    else if (typeof obj[k] == "object") removeNulls(obj[k]);
    if (isArray && obj.length == k) removeNulls(obj);
  }
  return obj;
}


function coalesce(arr) {
	
  if (arr.length == 0) return null;
  var v = arr[0];
  v = (typeof v == "function" ? v() : v);
  return v | coalesce(arr.slice(1));
}

function getnotnull(o) {
	var ret=[];
	j = JSON.stringify(o, (k, v) => Array.isArray(v) ? v.filter(e => e !== null) : v, 2 )
	j=JSON.parse(j);
	var ret=$.each(j,function(a,b){
		    if (b== "" || b=== null){
				 delete j[a];
		}
		else{
			ret['key_name']=a;
			ret['key_value']=b;			
		}			
	});
//console.log(JSON.stringify(ret));
		return ret; 

};

function getCleanObject(jsonObject) {
    var clone = JSON.parse(JSON.stringify(jsonObject))
    for(var prop in clone)
       if(clone[prop] == null)
           delete clone[prop];
    return clone;
}