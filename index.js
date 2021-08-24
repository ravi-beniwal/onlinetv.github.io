
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

const play_Video=function (videoSource) {
  var video = document.querySelector('#player');
  if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(videoSource);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED,function() {
      video.play();
    });
  }
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
            'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
            'fullscreen' // Toggle fullscreen
        ];
		
   const player = plyr.setup(video, { controls });
  //plyr.setup(video);
}

$( document ).ready(function() {
	var guideUrl="https://raw.githubusercontent.com/ravi-beniwal/media_Source/main/tvguide.json";
	getGuide('TVguide',guideUrl); 
	
var videoSource='https://m-c010-j2apps.s.llnwi.net/hls/8065.DevamTV.in.m3u8';

LoadChannels('TVguide');
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

		LS('set',b['Name'],JSON.stringify(output2));
	});	
		})
	});
}

function LoadChannels(name)
{
	var b='',a='',c=[];
	a=JSON.parse(LS('get',name,''));
	
	channels_list=JSON.parse(LS('get',a[0]['Name'],''));
	var channels=channels_list['channels'];
	$('.channels_container').html('<div id="channels" class="channel_list"></div>');
	$.each(channels,function(a,ch){
		ch=removeNulls(ch);
		//console.log(ch);	
		//https://qqcdnpictest.mxplay.com/pic/0380.NewsX.in/en/1x1/208x208/test_pic1552315785886.jpg
		var ch_img_url='https://qqcdnpictest.mxplay.com/';
		c['image']=ch_img_url+ch['imageInfo'][0]['url'];
		c['title']=ch['title'];
		c['id']=ch['id'];
		c['category']=ch['category'];
		c['languages']=ch['languages'];
		stream_provider=ch['stream']['provider'];
		c['link']=ch['stream'][ch['stream']['provider']]['hls']['main'] ?? ch['stream'][ch['stream']['provider']]['hls']['high'] ?? ch['stream'][ch['stream']['provider']]['hls']['base'];
	//	console.log(c);
		$('#channels').append('<div class="channel" id="'+c['id']+'"  onClick="play_Video(\''+c['link']+'\');LoadInformation(\''+c['id']+'\',\''+c['title']+'\',\''+c['category']+'\',\''+c['languages']+'\');"><img class="channel_image" src="'+c['image']+'" alt="'+c['title']+'"></div>');
	});
	
}

function LoadInformation(id,title,category,languages)
{
	$('.channel_information').html('<h3>'+title+' <small><button>'+category+'</button></small></h3>');
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