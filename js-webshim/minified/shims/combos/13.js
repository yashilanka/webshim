!function(a,b){"use strict";var c,d,e=b.$,f=a.audio&&a.video,g=!1,h=b.bugs,i="mediaelement-jaris",j=function(){b.ready(i,function(){b.mediaelement.createSWF||(b.mediaelement.loadSwf=!0,b.reTest([i],f))})},k=b.cfg,l=k.mediaelement;if(!l)return b.error("mediaelement wasn't implemented but loaded"),void 0;if(f){var m=document.createElement("video");if(a.videoBuffered="buffered"in m,a.mediaDefaultMuted="defaultMuted"in m,g="loop"in m,b.capturingEvents(["play","playing","waiting","paused","ended","durationchange","loadedmetadata","canplay","volumechange"]),a.videoBuffered||(b.addPolyfill("mediaelement-native-fix",{d:["dom-support"]}),b.loader.loadList(["mediaelement-native-fix"])),!l.preferFlash){var n={1:1},o=function(a){var c,f,g;!l.preferFlash&&(e(a.target).is("audio, video")||(g=a.target.parentNode)&&e("source",g).last()[0]==a.target)&&(c=e(a.target).closest("audio, video"))&&(f=c.prop("error"))&&!n[f.code]&&e(function(){d&&!l.preferFlash?(j(),b.ready("WINDOWLOAD "+i,function(){setTimeout(function(){l.preferFlash||!b.mediaelement.createSWF||c.is(".nonnative-api-active")||(l.preferFlash=!0,document.removeEventListener("error",o,!0),e("audio, video").each(function(){b.mediaelement.selectSource(this)}),b.error("switching mediaelements option to 'preferFlash', due to an error with native player: "+a.target.src+" Mediaerror: "+c.prop("error")+"first error: "+f))},9)})):document.removeEventListener("error",o,!0)})};document.addEventListener("error",o,!0),e("audio, video").each(function(){var a=e.prop(this,"error");return a&&!n[a]?(o({target:this}),!1):void 0})}}a.track&&!h.track&&!function(){if(h.track||(h.track="number"!=typeof e("<track />")[0].readyState),!h.track){window.VTTCue&&!window.TextTrackCue?window.TextTrackCue=window.VTTCue:window.VTTCue||(window.VTTCue=window.TextTrackCue);try{new VTTCue(2,3,"")}catch(a){h.track=!0}}}(),c=a.track&&!h.track,b.register("mediaelement-core",function(b,e,h,k,l,m){d=swfmini.hasFlashPlayerVersion("10.0.3"),b("html").addClass(d?"swf":"no-swf");var n=e.mediaelement;n.parseRtmp=function(a){var b,c,d,f=a.src.split("://"),g=f[1].split("/");for(a.server=f[0]+"://"+g[0]+"/",a.streamId=[],b=1,c=g.length;c>b;b++)d||-1===g[b].indexOf(":")||(g[b]=g[b].split(":")[1],d=!0),d?a.streamId.push(g[b]):a.server+=g[b]+"/";a.streamId.length||e.error("Could not parse rtmp url"),a.streamId=a.streamId.join("/")};var o=function(a,c){a=b(a);var d,e={src:a.attr("src")||"",elem:a,srcProp:a.prop("src")};return e.src?(d=a.attr("data-server"),null!=d&&(e.server=d),d=a.attr("type")||a.attr("data-type"),d?(e.type=d,e.container=b.trim(d.split(";")[0])):(c||(c=a[0].nodeName.toLowerCase(),"source"==c&&(c=(a.closest("video, audio")[0]||{nodeName:"video"}).nodeName.toLowerCase())),e.server?(e.type=c+"/rtmp",e.container=c+"/rtmp"):(d=n.getTypeForSrc(e.src,c,e),d&&(e.type=d,e.container=d))),e.container||b(a).attr("data-wsrecheckmimetype",""),d=a.attr("media"),d&&(e.media=d),("audio/rtmp"==e.type||"video/rtmp"==e.type)&&(e.server?e.streamId=e.src:n.parseRtmp(e)),e):e},p=!d&&"postMessage"in h&&f,q=function(){q.loaded||(q.loaded=!0,m.noAutoTrack||e.ready("WINDOWLOAD",function(){s(),e.loader.loadList(["track-ui"])}))},r=function(){var a;return function(){!a&&p&&(a=!0,e.loader.loadScript("https://www.youtube.com/player_api"),b(function(){e._polyfill(["mediaelement-yt"])}))}}(),s=function(){d?j():r()};e.addPolyfill("mediaelement-yt",{test:!p,d:["dom-support"]}),n.mimeTypes={audio:{"audio/ogg":["ogg","oga","ogm"],'audio/ogg;codecs="opus"':"opus","audio/mpeg":["mp2","mp3","mpga","mpega"],"audio/mp4":["mp4","mpg4","m4r","m4a","m4p","m4b","aac"],"audio/wav":["wav"],"audio/3gpp":["3gp","3gpp"],"audio/webm":["webm"],"audio/fla":["flv","f4a","fla"],"application/x-mpegURL":["m3u8","m3u"]},video:{"video/ogg":["ogg","ogv","ogm"],"video/mpeg":["mpg","mpeg","mpe"],"video/mp4":["mp4","mpg4","m4v"],"video/quicktime":["mov","qt"],"video/x-msvideo":["avi"],"video/x-ms-asf":["asf","asx"],"video/flv":["flv","f4v"],"video/3gpp":["3gp","3gpp"],"video/webm":["webm"],"application/x-mpegURL":["m3u8","m3u"],"video/MP2T":["ts"]}},n.mimeTypes.source=b.extend({},n.mimeTypes.audio,n.mimeTypes.video),n.getTypeForSrc=function(a,c){if(-1!=a.indexOf("youtube.com/watch?")||-1!=a.indexOf("youtube.com/v/"))return"video/youtube";if(0===a.indexOf("rtmp"))return c+"/rtmp";a=a.split("?")[0].split("#")[0].split("."),a=a[a.length-1];var d;return b.each(n.mimeTypes[c],function(b,c){return-1!==c.indexOf(a)?(d=b,!1):void 0}),d},n.srces=function(a,c){if(a=b(a),!c){c=[];var d=a[0].nodeName.toLowerCase(),e=o(a,d);return e.src?c.push(e):b("source",a).each(function(){e=o(this,d),e.src&&c.push(e)}),c}a.removeAttr("src").removeAttr("type").find("source").remove(),b.isArray(c)||(c=[c]),c.forEach(function(c){"string"==typeof c&&(c={src:c}),a.append(b(k.createElement("source")).attr(c))})},b.fn.loadMediaSrc=function(a,c){return this.each(function(){c!==l&&(b(this).removeAttr("poster"),c&&b.attr(this,"poster",c)),n.srces(this,a),b(this).mediaLoad()})},n.swfMimeTypes=["video/3gpp","video/x-msvideo","video/quicktime","video/x-m4v","video/mp4","video/m4p","video/x-flv","video/flv","audio/mpeg","audio/aac","audio/mp4","audio/x-m4a","audio/m4a","audio/mp3","audio/x-fla","audio/fla","youtube/flv","video/jarisplayer","jarisplayer/jarisplayer","video/youtube","video/rtmp","audio/rtmp"],n.canThirdPlaySrces=function(a,c){var e="";return(d||p)&&(a=b(a),c=c||n.srces(a),b.each(c,function(a,b){return b.container&&b.src&&(d&&-1!=n.swfMimeTypes.indexOf(b.container)||p&&"video/youtube"==b.container)?(e=b,!1):void 0})),e};var t={};n.canNativePlaySrces=function(a,c){var d="";if(f){a=b(a);var e=(a[0].nodeName||"").toLowerCase(),g=(t[e]||{prop:{_supvalue:!1}}).prop._supvalue||a[0].canPlayType;if(!g)return d;c=c||n.srces(a),b.each(c,function(b,c){return c.type&&g.call(a[0],c.type)?(d=c,!1):void 0})}return d};var u=/^\s*application\/octet\-stream\s*$/i,v=function(){var a=u.test(b.attr(this,"type")||"");return a&&b(this).removeAttr("type"),a};n.setError=function(a,c){if(b("source",a).filter(v).length){e.error('"application/octet-stream" is a useless mimetype for audio/video. Please change this attribute.');try{b(a).mediaLoad()}catch(d){}}else c||(c="can't play sources"),b(a).pause().data("mediaerror",c),e.error("mediaelementError: "+c),setTimeout(function(){b(a).data("mediaerror")&&b(a).addClass("media-error").trigger("mediaerror")},1)};var w=function(){var a,c=d?i:"mediaelement-yt";return function(d,f,g){e.ready(c,function(){n.createSWF&&b(d).parent()[0]?n.createSWF(d,f,g):a||(a=!0,s(),w(d,f,g))}),a||!p||n.createSWF||r()}}(),x=function(a,b,c,d,e){var f;c||c!==!1&&b&&"third"==b.isActive?(f=n.canThirdPlaySrces(a,d),f?w(a,f,b):e?n.setError(a,!1):x(a,b,!1,d,!0)):(f=n.canNativePlaySrces(a,d),f?b&&"third"==b.isActive&&n.setActive(a,"html5",b):e?(n.setError(a,!1),b&&"third"==b.isActive&&n.setActive(a,"html5",b)):x(a,b,!0,d,!0))},y=/^(?:embed|object|datalist)$/i,z=function(a,c){var d=e.data(a,"mediaelementBase")||e.data(a,"mediaelementBase",{}),f=n.srces(a),g=a.parentNode;clearTimeout(d.loadTimer),b(a).removeClass("media-error"),b.data(a,"mediaerror",!1),f.length&&g&&1==g.nodeType&&!y.test(g.nodeName||"")&&(c=c||e.data(a,"mediaelement"),n.sortMedia&&f.sort(n.sortMedia),x(a,c,m.preferFlash||l,f))};n.selectSource=z,b(k).on("ended",function(a){var c=e.data(a.target,"mediaelement");(!g||c&&"html5"!=c.isActive||b.prop(a.target,"loop"))&&setTimeout(function(){!b.prop(a.target,"paused")&&b.prop(a.target,"loop")&&b(a.target).prop("currentTime",0).play()},1)});var A=!1,B=function(){var c=function(){if(e.implement(this,"mediaelement")&&(z(this),a.mediaDefaultMuted||null==b.attr(this,"muted")||b.prop(this,"muted",!0),f&&(!g||"ActiveXObject"in h))){var c,d,i=this,j=function(){var a=b.prop(i,"buffered");if(a){for(var c="",d=0,e=a.length;e>d;d++)c+=a.end(d);return c}},k=function(){var a=j();a!=d&&(d=a,e.info("needed to trigger progress manually"),b(i).triggerHandler("progress"))};b(this).on({"play loadstart progress":function(a){"progress"==a.type&&(d=j()),clearTimeout(c),c=setTimeout(k,400)},"emptied stalled mediaerror abort suspend":function(a){"emptied"==a.type&&(d=!1),clearTimeout(c)}}),"ActiveXObject"in h&&b.prop(this,"paused")&&!b.prop(this,"readyState")&&b(this).is('audio[preload="none"][controls]:not([autoplay],.nonnative-api-active)')&&b(this).prop("preload","metadata").mediaLoad()}};e.ready("dom-support",function(){A=!0,g||e.defineNodeNamesBooleanProperty(["audio","video"],"loop"),["audio","video"].forEach(function(a){var c;c=e.defineNodeNameProperty(a,"load",{prop:{value:function(){var a=e.data(this,"mediaelement");z(this,a),!f||a&&"html5"!=a.isActive||!c.prop._supvalue||c.prop._supvalue.apply(this,arguments),b(this).triggerHandler("wsmediareload")}}}),t[a]=e.defineNodeNameProperty(a,"canPlayType",{prop:{value:function(c){var e="";return f&&t[a].prop._supvalue&&(e=t[a].prop._supvalue.call(this,c),"no"==e&&(e="")),!e&&d&&(c=b.trim((c||"").split(";")[0]),-1!=n.swfMimeTypes.indexOf(c)&&(e="maybe")),e}}})}),e.onNodeNamesPropertyModify(["audio","video"],["src","poster"],{set:function(){var a=this,b=e.data(a,"mediaelementBase")||e.data(a,"mediaelementBase",{});clearTimeout(b.loadTimer),b.loadTimer=setTimeout(function(){z(a),a=null},9)}}),e.addReady(function(a,d){var e=b("video, audio",a).add(d.filter("video, audio")).each(c);!q.loaded&&b("track",e).length&&q(),e=null})}),f&&!A&&e.addReady(function(a,c){A||b("video, audio",a).add(c.filter("video, audio")).each(function(){return n.canNativePlaySrces(this)?void 0:(s(),A=!0,!1)})})};c&&e.defineProperty(TextTrack.prototype,"shimActiveCues",{get:function(){return this._shimActiveCues||this.activeCues}}),f?(e.isReady("mediaelement-core",!0),B(),e.ready("WINDOWLOAD mediaelement",s)):e.ready(i,B),e.ready("track",q)})}(Modernizr,webshims),webshims.register("track",function(a,b,c,d){"use strict";function e(a,c,d){3!=arguments.length&&b.error("wrong arguments.length for VTTCue.constructor"),this.startTime=a,this.endTime=c,this.text=d,j(this)}var f=b.mediaelement,g=((new Date).getTime(),a.fn.addBack?"addBack":"andSelf",{subtitles:1,captions:1,descriptions:1}),h=a("<track />"),i=Modernizr.ES5&&Modernizr.objectAccessor,j=function(a){var c={};return a.addEventListener=function(a,d){c[a]&&b.error("always use $.on to the shimed event: "+a+" already bound fn was: "+c[a]+" your fn was: "+d),c[a]=d},a.removeEventListener=function(a,d){c[a]&&c[a]!=d&&b.error("always use $.on/$.off to the shimed event: "+a+" already bound fn was: "+c[a]+" your fn was: "+d),c[a]&&delete c[a]},a},k={getCueById:function(a){for(var b=null,c=0,d=this.length;d>c;c++)if(this[c].id===a){b=this[c];break}return b}},l={0:"disabled",1:"hidden",2:"showing"},m={shimActiveCues:null,_shimActiveCues:null,activeCues:null,cues:null,kind:"subtitles",label:"",language:"",id:"",mode:"disabled",oncuechange:null,toString:function(){return"[object TextTrack]"},addCue:function(a){if(this.cues){var c=this.cues[this.cues.length-1];c&&c.startTime>a.startTime&&b.error("cue startTime higher than previous cue's startTime")}else this.cues=f.createCueList();a.track&&a.track.removeCue&&a.track.removeCue(a),a.track=this,this.cues.push(a)},removeCue:function(a){var c=this.cues||[],d=0,e=c.length;if(a.track!=this)return b.error("cue not part of track"),void 0;for(;e>d;d++)if(c[d]===a){c.splice(d,1),a.track=null;break}return a.track?(b.error("cue not part of track"),void 0):void 0}},n=["kind","label","srclang"],o={srclang:"language"},p=Function.prototype.call.bind(Object.prototype.hasOwnProperty),q=function(c,d){var e,f,g=[],h=[],i=[];if(c||(c=b.data(this,"mediaelementBase")||b.data(this,"mediaelementBase",{})),d||(c.blockTrackListUpdate=!0,d=a.prop(this,"textTracks"),c.blockTrackListUpdate=!1),clearTimeout(c.updateTrackListTimer),a("track",this).each(function(){var b=a.prop(this,"track");i.push(b),-1==d.indexOf(b)&&h.push(b)}),c.scriptedTextTracks)for(e=0,f=c.scriptedTextTracks.length;f>e;e++)i.push(c.scriptedTextTracks[e]),-1==d.indexOf(c.scriptedTextTracks[e])&&h.push(c.scriptedTextTracks[e]);for(e=0,f=d.length;f>e;e++)-1==i.indexOf(d[e])&&g.push(d[e]);if(g.length||h.length){for(d.splice(0),e=0,f=i.length;f>e;e++)d.push(i[e]);for(e=0,f=g.length;f>e;e++)a([d]).triggerHandler(a.Event({type:"removetrack",track:g[e]}));for(e=0,f=h.length;f>e;e++)a([d]).triggerHandler(a.Event({type:"addtrack",track:h[e]}));(c.scriptedTextTracks||g.length)&&a(this).triggerHandler("updatetrackdisplay")}},r=function(c,d){d||(d=b.data(c,"trackData")),d&&!d.isTriggering&&(d.isTriggering=!0,setTimeout(function(){a(c).closest("audio, video").triggerHandler("updatetrackdisplay"),d.isTriggering=!1},1))},s=function(){var c={subtitles:{subtitles:1,captions:1},descriptions:{descriptions:1},chapters:{chapters:1}};return c.captions=c.subtitles,function(d){var e,f,g=a.prop(d,"default");return g&&"metadata"!=(e=a.prop(d,"kind"))&&(f=a(d).parent().find("track[default]").filter(function(){return!!c[e][a.prop(this,"kind")]})[0],f!=d&&(g=!1,b.error("more than one default track of a specific kind detected. Fall back to default = false"))),g}}(),t=a("<div />")[0];e.prototype={onenter:null,onexit:null,pauseOnExit:!1,getCueAsHTML:function(){var a,b="",c="",e=d.createDocumentFragment();return p(this,"getCueAsHTML")||(a=this.getCueAsHTML=function(){var a,d;if(b!=this.text)for(b=this.text,c=f.parseCueTextToHTML(b),t.innerHTML=c,a=0,d=t.childNodes.length;d>a;a++)e.appendChild(t.childNodes[a].cloneNode(!0));return e.cloneNode(!0)}),a?a.apply(this,arguments):e.cloneNode(!0)},track:null,id:""},c.VTTCue=e,c.TextTrackCue=function(){b.error("Use VTTCue constructor instead of abstract TextTrackCue constructor."),e.apply(this,arguments)},c.TextTrackCue.prototype=e.prototype,f.createCueList=function(){return a.extend([],k)},f.parseCueTextToHTML=function(){var a=/(<\/?[^>]+>)/gi,b=/^(?:c|v|ruby|rt|b|i|u)/,c=/\<\s*\//,d=function(a,b,d,e){var f;return c.test(e)?f="</"+a+">":(d.splice(0,1),f="<"+a+" "+b+'="'+d.join(" ").replace(/\"/g,"&#34;")+'">'),f},e=function(a){var c=a.replace(/[<\/>]+/gi,"").split(/[\s\.]+/);return c[0]&&(c[0]=c[0].toLowerCase(),b.test(c[0])?"c"==c[0]?a=d("span","class",c,a):"v"==c[0]&&(a=d("q","title",c,a)):a=""),a};return function(b){return b.replace(a,e)}}(),f.loadTextTrack=function(c,d,e,h){var i="play playing updatetrackdisplay",j=e.track,k=function(){var g,h,l,m=a.data(d,"wsFFTrackSrc")||a.attr(d,"src")&&a.prop(d,"src");if("disabled"!=j.mode&&m&&(a(c).off(i,k),!e.readyState)){g=function(){e.readyState=3,j.cues=null,j.activeCues=j.shimActiveCues=j._shimActiveCues=null,a(d).triggerHandler("error")},e.readyState=1;try{j.cues=f.createCueList(),j.activeCues=j.shimActiveCues=j._shimActiveCues=f.createCueList(),l=function(){h=a.ajax({dataType:"text",url:m,success:function(i){"text/vtt"!=h.getResponseHeader("content-type")&&b.error("set the mime-type of your WebVTT files to text/vtt. see: http://dev.w3.org/html5/webvtt/#text/vtt"),f.parseCaptions(i,j,function(b){b&&"length"in b?(e.readyState=2,a(d).triggerHandler("load"),a(c).triggerHandler("updatetrackdisplay")):g()})},error:g})},a.ajax?l():(b.ready("$ajax",l),b.loader.loadList(["$ajax"]))}catch(n){g(),b.error(n)}}};e.readyState=0,j.shimActiveCues=null,j._shimActiveCues=null,j.activeCues=null,j.cues=null,a(c).off(i,k),a(c).on(i,k),h&&(j.mode=g[j.kind]?"showing":"hidden",k())},f.createTextTrack=function(c,d){var e,g;return d.nodeName&&(g=b.data(d,"trackData"),g&&(r(d,g),e=g.track)),e||(e=j(b.objectCreate(m)),i||n.forEach(function(b){var c=a.prop(d,b);c&&(e[o[b]||b]=c)}),d.nodeName?(i&&n.forEach(function(c){b.defineProperty(e,o[c]||c,{get:function(){return a.prop(d,c)}})}),e.id=a(d).prop("id"),g=b.data(d,"trackData",{track:e}),f.loadTextTrack(c,d,g,s(d))):(i&&n.forEach(function(a){b.defineProperty(e,o[a]||a,{value:d[a],writeable:!1})}),e.cues=f.createCueList(),e.activeCues=e._shimActiveCues=e.shimActiveCues=f.createCueList(),e.mode="hidden",e.readyState=2),"subtitles"!=e.kind||e.language||b.error("you must provide a language for track in subtitles state"),e.__wsmode=e.mode),e},f.parseCaptionChunk=function(){var a=/^(\d{2})?:?(\d{2}):(\d{2})\.(\d+)\s+\-\-\>\s+(\d{2})?:?(\d{2}):(\d{2})\.(\d+)\s*(.*)/,c=/^(DEFAULTS|DEFAULT)\s+\-\-\>\s+(.*)/g,d=/^(STYLE|STYLES)\s+\-\-\>\s*\n([\s\S]*)/g,f=/^(COMMENT|COMMENTS)\s+\-\-\>\s+(.*)/g;return function(g){var h,i,j,k,l,m,n,o,p,q;if(c.exec(g))return null;if(o=d.exec(g))return null;if(o=f.exec(g))return null;for(h=g.split(/\n/g);!h[0].replace(/\s+/gi,"").length&&h.length>0;)h.shift();for(h[0].match(/^\s*[a-z0-9-\_]+\s*$/gi)&&(n=String(h.shift().replace(/\s*/gi,""))),m=0;m<h.length;m++){var r=h[m];(p=a.exec(r))&&(l=p.slice(1),i=parseInt(60*(l[0]||0)*60,10)+parseInt(60*(l[1]||0),10)+parseInt(l[2]||0,10)+parseFloat("0."+(l[3]||0)),j=parseInt(60*(l[4]||0)*60,10)+parseInt(60*(l[5]||0),10)+parseInt(l[6]||0,10)+parseFloat("0."+(l[7]||0))),h=h.slice(0,m).concat(h.slice(m+1));break}return i||j?(k=h.join("\n"),q=new e(i,j,k),n&&(q.id=n),q):(b.warn("couldn't extract time information: "+[i,j,h.join("\n"),n].join(" ; ")),null)}}(),f.parseCaptions=function(a,c,d){var e,g,h,i,j;f.createCueList(),a?(h=/^WEBVTT(\s*FILE)?/gi,g=function(k,l){for(;l>k;k++){if(e=a[k],h.test(e))j=!0;else if(e.replace(/\s*/gi,"").length){if(!j){b.error("please use WebVTT format. This is the standard"),d(null);break}e=f.parseCaptionChunk(e,k),e&&c.addCue(e)}if(i<(new Date).getTime()-30){k++,setTimeout(function(){i=(new Date).getTime(),g(k,l)},90);break}}k>=l&&(j||b.error("please use WebVTT format. This is the standard"),d(c.cues))},a=a.replace(/\r\n/g,"\n"),setTimeout(function(){a=a.replace(/\r/g,"\n"),setTimeout(function(){i=(new Date).getTime(),a=a.split(/\n\n+/g),g(0,a.length)},9)},9)):b.error("Required parameter captionData not supplied.")},f.createTrackList=function(c,d){return d=d||b.data(c,"mediaelementBase")||b.data(c,"mediaelementBase",{}),d.textTracks||(d.textTracks=[],b.defineProperties(d.textTracks,{onaddtrack:{value:null},onremovetrack:{value:null},onchange:{value:null},getTrackById:{value:function(a){for(var b=null,c=0;c<d.textTracks.length;c++)if(a==d.textTracks[c].id){b=d.textTracks[c];break}return b}}}),j(d.textTracks),a(c).on("updatetrackdisplay",function(){for(var b,c=0;c<d.textTracks.length;c++)b=d.textTracks[c],b.__wsmode!=b.mode&&(b.__wsmode=b.mode,a([d.textTracks]).triggerHandler("change"))})),d.textTracks},Modernizr.track||(b.defineNodeNamesBooleanProperty(["track"],"default"),b.reflectProperties(["track"],["srclang","label"]),b.defineNodeNameProperties("track",{src:{reflect:!0,propType:"src"}})),b.defineNodeNameProperties("track",{kind:{attr:Modernizr.track?{set:function(a){var c=b.data(this,"trackData");this.setAttribute("data-kind",a),c&&(c.attrKind=a)},get:function(){var a=b.data(this,"trackData");return a&&"attrKind"in a?a.attrKind:this.getAttribute("kind")}}:{},reflect:!0,propType:"enumarated",defaultValue:"subtitles",limitedTo:["subtitles","captions","descriptions","chapters","metadata"]}}),a.each(n,function(c,d){var e=o[d]||d;b.onNodeNamesPropertyModify("track",d,function(){var c=b.data(this,"trackData");c&&("kind"==d&&r(this,c),i||(c.track[e]=a.prop(this,d)))})}),b.onNodeNamesPropertyModify("track","src",function(c){if(c){var d,e=b.data(this,"trackData");e&&(d=a(this).closest("video, audio"),d[0]&&f.loadTextTrack(d,this,e))}}),b.defineNodeNamesProperties(["track"],{ERROR:{value:3},LOADED:{value:2},LOADING:{value:1},NONE:{value:0},readyState:{get:function(){return(b.data(this,"trackData")||{readyState:0}).readyState},writeable:!1},track:{get:function(){return f.createTextTrack(a(this).closest("audio, video")[0],this)},writeable:!1}},"prop"),b.defineNodeNamesProperties(["audio","video"],{textTracks:{get:function(){var a=this,c=b.data(a,"mediaelementBase")||b.data(a,"mediaelementBase",{}),d=f.createTrackList(a,c);return c.blockTrackListUpdate||q.call(a,c,d),d},writeable:!1},addTextTrack:{value:function(a,c,d){var e=f.createTextTrack(this,{kind:h.prop("kind",a||"").prop("kind"),label:c||"",srclang:d||""}),g=b.data(this,"mediaelementBase")||b.data(this,"mediaelementBase",{});return g.scriptedTextTracks||(g.scriptedTextTracks=[]),g.scriptedTextTracks.push(e),q.call(this),e}}},"prop");var u=function(c){if(a(c.target).is("audio, video")){var d=b.data(c.target,"mediaelementBase");d&&(clearTimeout(d.updateTrackListTimer),d.updateTrackListTimer=setTimeout(function(){q.call(c.target,d)},0))}},v=function(a,b){return b.readyState||a.readyState},w=function(a){a.originalEvent&&a.stopImmediatePropagation()},x=function(){if(b.implement(this,"track")){var c,d,e=this.track;e&&(b.bugs.track||!e.mode&&!v(this,e)||(a.prop(this,"track").mode=l[e.mode]||e.mode),c=a.prop(this,"kind"),d=this.parentNode,a(this).data("wsFFTrackSrc",a.attr(this,"src")&&a.prop(this,"src")),this.removeAttribute("src"),a(this).detach(),e.mode="string"==typeof e.mode?"disabled":0,this.kind="metadata",a(this).attr({kind:c}).appendTo(d)),a(this).on("load error",w)}};b.addReady(function(c,d){var e=d.filter("video, audio, track").closest("audio, video");a("video, audio",c).add(e).each(function(){q.call(this)}).on("emptied updatetracklist wsmediareload",u).each(function(){if(Modernizr.track){var c=a.prop(this,"textTracks"),d=this.textTracks;c.length!=d.length&&b.error("textTracks couldn't be copied"),a("track",this).each(x)}}),e.each(function(){var a=this,c=b.data(a,"mediaelementBase");c&&(clearTimeout(c.updateTrackListTimer),c.updateTrackListTimer=setTimeout(function(){q.call(a,c)},9))})}),Modernizr.texttrackapi&&a("video, audio").trigger("trackapichange")});