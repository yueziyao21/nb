(function(){var b=0;var a=/[^a-z0-9_]/ig;window.SwfStore=function(f){f=f||{};var h={swf_url:"storage.swf",namespace:"swfstore",path:null,debug:false,timeout:10,onready:null,onerror:null};var l;for(l in h){if(h.hasOwnProperty(l)){if(!f.hasOwnProperty(l)){f[l]=h[l]}}}f.namespace=f.namespace.replace(a,"_");if(window.SwfStore[f.namespace]){throw"There is already an instance of SwfStore using the '"+f.namespace+"' namespace. Use that instance or specify an alternate namespace in the config."}this.config=f;function e(){return"SwfStore_"+f.namespace+"_"+(b++)}function d(n){var m=document.createElement("div");document.body.appendChild(m);m.id=e();if(!n){m.style.position="absolute";m.style.top="-2000px";m.style.left="-2000px"}return m}if(f.debug){if(typeof console==="undefined"){var i=d(true);window.console={log:function(o){var n=d(true);n.innerHTML=o;i.appendChild(n)}}}this.log=function(m,n,o){n=(n==="swfStore")?"swf":n;if(typeof(console[m])!=="undefined"){console[m]("SwfStore - "+f.namespace+" ("+n+"): "+o)}else{console.log("SwfStore - "+f.namespace+": "+m+" ("+n+"): "+o)}}}else{this.log=function(){}}this.log("info","js","Initializing...");SwfStore[f.namespace]=this;var k=d(f.debug);var j=e();var g="logfn=SwfStore."+f.namespace+".log&amp;onload=SwfStore."+f.namespace+".onload&amp;onerror=SwfStore."+f.namespace+".onerror&amp;"+(f.path?"LSOPath="+f.path+"&amp;":"")+"LSOName="+f.namespace;k.innerHTML='<object height="100" width="500" codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="'+j+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">   <param value="'+f.swf_url+'" name="movie">   <param value="'+g+'" name="FlashVars">   <param value="always" name="allowScriptAccess">   <embed height="375" align="middle" width="500" pluginspage="https://www.macromedia.com/go/getflashplayer" flashvars="'+g+'" type="application/x-shockwave-flash" allowscriptaccess="always" quality="high" loop="false" play="true" name="'+j+'" bgcolor="#ffffff" src="'+f.swf_url+'"></object>';this.swf=document[j]||window[j];this._timeout=setTimeout(function(){SwfStore[f.namespace].log("error","js","Timeout reached, assuming "+f.swf_url+" failed to load and firing the onerror callback.");if(f.onerror){f.onerror()}},f.timeout*1000)};function c(d){if(typeof d==="function"){throw"SwfStore Error: Functions cannot be used as keys or values."}}SwfStore.prototype={version:"1.7",ready:false,set:function(d,e){this._checkReady();c(d);c(e);this.swf.set(d,e)},get:function(d){this._checkReady();c(d);return this.swf.get(d)},getAll:function(){this._checkReady();var d=this.swf.getAll();if(d.__flashBugFix){delete d.__flashBugFix}return d},clear:function(d){this._checkReady();c(d);this.swf.clear(d)},_checkReady:function(){if(!this.ready){throw"SwfStore is not yet finished initializing. Pass a config.onready callback or wait until this.ready is true before trying to use a SwfStore instance."}},onload:function(){var d=this;setTimeout(function(){clearTimeout(d._timeout);d.ready=true;d.set("__flashBugFix","1");if(d.config.onready){d.config.onready()}},0)},onerror:function(){clearTimeout(this._timeout);if(this.config.onerror){this.config.onerror()}}}}());(function(d,b){var g="YYID";var e="http://images.sohu.com/cs/jsfile/js/storage.swf";function c(i){var h="";var j=new RegExp("(^| )"+i+"=([^;]*)(;|\x24)");var k=j.exec(b.cookie);if(k){h=k[2]}return h}function f(i,j){var k=new Date();k.setTime(k.setFullYear(2050));var h=i+"="+j+"; path=/; expires="+k.toGMTString()+"; domain=.sogou.com";b.cookie=h}function a(){var h=new SwfStore({namespace:"sogou_cx",swf_url:e,onready:function(){var l=c(g);var i=h.get(g);var j=(l&&l.length==32);var k=(i&&i.length==32);if(j){h.set(g,l)}else{if(!j&&k){f(g,i)}}},onerror:function(){}})}a()})(window,document);