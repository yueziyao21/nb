declare(function(){return{name:"AlignEngine",namespace:"Cpro.Template",paint:function(k){var p=k.slotData;var c=k.layoutObj;var g=c.layoutIndex;var j=k.data;var l={image:"image",res:"image",curl:"link"};var b=p.idPrefix||"";if(k.containerVerticalAlign==="center"){var a=document.getElementById(b+"container");if(a){var f=a.offsetWidth;var q=a.offsetHeight;for(var h=0,n=j.length;h<n;h++){var o=document.getElementById(b+"item"+h);if(o){o.style.height=""}}}}for(var h=0,n=j.length;h<n;h++){var o=document.getElementById(b+"item"+h);if(o){var e=o.offsetWidth;var m=o.offsetHeight;if(k.itemTextAlign==="center"){}if(k.itemVerticalAlign==="middle"){o.style.height="";itemNewHeight=o.offsetHeight;var d=m-itemNewHeight;if(d>0){o.style.paddingTop=d/2}c.item}}}}}});declare(function(){return{name:"AntiCheat",namespace:"Cpro.Template",antiCheatArray:[],mouseInClientX:-1,mouseInClientY:-1,mouseInTime:-1,mouseInTimeSpan:-1,mousePressTime:-1,mouseClickClientX:-1,mouseClickClientY:-1,mouseClickCheckNum:-1,mouseOverTimes:-1,bind:function(b,a,c){if(window.addEventListener){b.addEventListener(a,c,false)}else{b.attachEvent("on"+a,c)}},formatEventObj:function(a){a=a||window.event;a.target=a.target||a.srcElement;return a},mouseInHandler:function(a){if(this.mouseInClientX===-1){this.mouseInClientX=a.clientX}if(this.mouseInClientY===-1){this.mouseInClientY=a.clientY}},mouseInTimeHandler:function(a){if(this.mouseInTime===-1){this.mouseInTime=(new Date()).getTime()}this.mouseInTimeSpan=(new Date()).getTime()-this.mouseInTime},mousePressTimeHandler:function(a){if(a.type==="mousedown"){this.mousePressTime=(new Date()).getTime()}else{this.mousePressTime=(new Date()).getTime()-this.mousePressTime}},mouseClickHandler:function(h){h=this.formatEventObj(h);var d=h.target;if(d.tagName.toLowerCase()!=="a"){d=d.parentNode}this.mouseClickClientX=h.clientX;this.mouseClickClientY=h.clientY;this.mouseInTimeHandler();this.mouseClickCheckNum=0;var a=/\.php\?(url=)?([0-9a-zA-Z_-]*)\./.exec(d.href);var l=a[2];var b=/.*(\d+)/.exec(d.id);var c=b[1];var j=this.antiCheatArray[c];for(var g=0;g<(((this.mouseOverTimes*j)%99)+9);g++){var k=(this.mousePressTime*g)%l.length;this.mouseClickCheckNum+=l.charCodeAt(k)}var f=d.innerHTML;if(d.href.indexOf("&ck")==-1){d.href+="&ck="+this.mouseClickCheckNum+"."+this.mouseOverTimes+"."+this.mousePressTime+"."+this.mouseClickClientX+"."+this.mouseClickClientY+"."+this.mouseInClientX+"."+this.mouseInClientY+"."+this.mouseInTimeSpan}if((f.match(/(www\.)|(.*@.*)/i)!=null)&&document.all){f.match(/\<.*\>/i)==null?d.innerHTML=f:d.innerTEXT=f}},mouseOverHandler:function(a){if(this.mouseOverTimes===-1){this.mouseOverTimes=0}this.mouseOverTimes++},check:function(b,d){this.antiCheatArray=d||window.antiCheatArray;var a=document.getElementById(b);var e=a.getElementsByTagName("a");this.bind(a,"mouseover",this.mouseInHandler.proxy(this));this.bind(a,"mouseover",this.mouseInTimeHandler.proxy(this));for(var c=0;c<e.length;c++){if(e[c].className&&(e[c].className.toLowerCase()==="gylogo"||e[c].className.toLowerCase()==="bdlogo")){continue}this.bind(e[c],"mousedown",this.mousePressTimeHandler.proxy(this));this.bind(e[c],"mouseup",this.mousePressTimeHandler.proxy(this));this.bind(e[c],"click",this.mouseClickHandler.proxy(this));this.bind(e[c],"mouseover",this.mouseOverHandler.proxy(this))}}}});declare(function(){return{name:"BaseLayoutEngine",namespace:"Cpro.Template",GetCssName:function(b,c){var a=b;if(c.idPrefix){a=c.idPrefix+a}return a},layoutContainer:function(e,a,d){var b={style:{},content:[],dataType:"layout",domName:"div",cssName:this.GetCssName("container",d)};var c=b.style;c["outer-width"]=e;c["outer-height"]=a;c["padding-left"]=parseInt(d.containerPaddingLeft);c["padding-right"]=parseInt(d.containerPaddingRight);c["padding-top"]=parseInt(d.containerPaddingTop);c["padding-bottom"]=parseInt(d.containerPaddingBottom);c["border-width"]=d.containerBorderWidth;c["border-style"]="solid";c["border-color"]="#"+d.containerBorderColor.replace("#","");c.width=e-c["padding-left"]-c["padding-right"]-2*c["border-width"];c.height=a-c["padding-top"]-c["padding-bottom"]-2*c["border-width"];c["background-color"]="#"+d.containerBackgroundColor.replace("#","");if(parseInt(d.containerOpacity)==1){c["background-color"]="transparent"}c.position="relative";c.overflow="hidden";b.props={id:d.idPrefix?(d.idPrefix+"container"):"container"};return b},layoutItem:function(d,a,c){var e={style:{},content:[],dataType:"layout",domName:"div",cssName:this.GetCssName("item",c)};var b=e.style;b["outer-width"]=d;b["outer-height"]=a;b["padding-left"]=parseInt(c.itemPaddingLeft);b["padding-right"]=parseInt(c.itemPaddingRight);b["padding-top"]=parseInt(c.itemPaddingTop);b["padding-bottom"]=parseInt(c.itemPaddingBottom);b.width=Math.floor(b["outer-width"]-b["padding-left"]-b["padding-right"]);b.height=Math.floor(b["outer-height"]-b["padding-top"]-b["padding-bottom"]);b["float"]="left";b.overflow="hidden";b["text-align"]=c.itemTextAlign||"left";if(typeof isGongyi!=="undefined"&&isGongyi&&(c.stuffType==="text"||c.stuffType==="tuwen")){b.width=b.width>250?250:b.width;b.height=b.height>90?90:b.height;b["padding-left"]=b["padding-left"]+((d-b.width)/2);b["padding-top"]=b["padding-top"]+((a-b.height)/2)}return e},layoutTitle:function(d,a,c,f){var e={style:{},content:[],dataType:"text",domName:"div",cssName:this.GetCssName("title",c),dataKey:"title"};var b=e.style;b["outer-width"]=d;b["outer-height"]=a;b["padding-left"]=parseInt(c.titlePaddingLeft);b["padding-right"]=parseInt(c.titlePaddingRight);b["padding-top"]=parseInt(c.titlePaddingTop);b["padding-bottom"]=parseInt(c.titlePaddingBottom);b["line-height"]=this.calculateTitleLineHeight(c);b.width=b["outer-width"]-b["padding-left"]-b["padding-right"];b.height=b["outer-height"]-b["padding-top"]-b["padding-bottom"];b.overflow="hidden";b["font-size"]=c.titleFontSize;b["font-family"]=c.titleFontFamily;b["text-align"]=c.titleTextAlign;b.color="#"+c.titleFontColor.replace("#","");b["text-decoration"]=c.titleShowUnderline?"underline":"none";e.rowCount=c.titleRowCount>0?c.titleRowCount:this.calculateTitleRowCount(a,c);e.showEllipsis=c.titleIsShowEllipsis;if(f){b["float"]=f}return e},layoutUrl:function(e,a,d,f){var b={style:{},content:[],dataType:"text",domName:"div",cssName:this.GetCssName("url",d),dataKey:"surl"};var c=b.style;c["outer-width"]=e;c["outer-height"]=a;c["padding-left"]=parseInt(d.urlPaddingLeft);c["padding-right"]=parseInt(d.urlPaddingRight);c["padding-top"]=parseInt(d.urlPaddingTop);c["padding-bottom"]=parseInt(d.urlPaddingBottom);c["line-height"]=this.calculateUrlLineHeight(d);c.width=c["outer-width"]-c["padding-left"]-c["padding-right"];c.height=c["outer-height"]-c["padding-top"]-c["padding-bottom"];c.overflow="hidden";c["font-size"]=d.urlFontSize;c["font-family"]=d.urlFontFamily;c.color="#"+d.urlFontColor.replace("#","");c["float"]="left";c["text-decoration"]=d.urlShowUnderline?"underline":"none";b.rowCount=d.urlRowCount>0?d.urlRowCount:1;b.showEllipsis=d.urlIsShowEllipsis;if(f){c["float"]=f}return b},layoutDesc:function(d,a,c,f){var e={style:{},content:[],dataType:"text",domName:"div",cssName:this.GetCssName("desc",c),dataKey:"desc"};var b=e.style;b["outer-width"]=d;b["outer-height"]=a;b["padding-left"]=parseInt(c.descPaddingLeft);b["padding-right"]=parseInt(c.descPaddingRight);b["padding-top"]=parseInt(c.descPaddingTop);b["padding-bottom"]=parseInt(c.descPaddingBottom);b["line-height"]=this.calculateDescLineHeight(c);b.width=b["outer-width"]-b["padding-left"]-b["padding-right"];b.height=b["outer-height"]-b["padding-top"]-b["padding-bottom"];b.overflow="hidden";b["font-size"]=c.descFontSize;b["font-family"]=c.descFontFamily;b.color="#"+c.descFontColor.replace("#","");b["float"]="left";b["text-decoration"]=c.descShowUnderline?"underline":"none";e.rowCount=c.descRowCount>0?c.descRowCount:this.calculateDescRowCount(a,c);e.showEllipsis=c.descIsShowEllipsis;if(f){b["float"]=f}return e},layoutLogo:function(d,a,c){var e={style:{},content:[],dataType:"image",domName:"div",cssName:this.GetCssName("logo",c),dataKey:"res"};var b=e.style;b["outer-width"]=d;b["outer-height"]=a;b["padding-left"]=parseInt(c.logoPaddingLeft);b["padding-right"]=parseInt(c.logoPaddingRight);b["padding-top"]=parseInt(c.logoPaddingTop);b["padding-bottom"]=parseInt(c.logoPaddingBottom);b.width=b["outer-width"]-b["padding-left"]-b["padding-right"];b.height=b["outer-height"]-b["padding-top"]-b["padding-bottom"];b["float"]="left";b.overflow="hidden";return e},layoutImage:function(d,a,c){var e={style:{},content:[],dataType:"image",domName:"div",cssName:this.GetCssName("image",c),dataKey:"res"};var b=e.style;b["outer-width"]=d;b["outer-height"]=a;b["padding-left"]=parseInt(c.imagePaddingLeft)||0;b["padding-right"]=parseInt(c.imagePaddingRight)||0;b["padding-top"]=parseInt(c.imagePaddingTop)||0;b["padding-bottom"]=parseInt(c.imagePaddingBottom)||0;b.width=b["outer-width"]-b["padding-left"]-b["padding-right"];b.height=b["outer-height"]-b["padding-top"]-b["padding-bottom"];b["float"]="left";b.overflow="hidden";return e},layoutFlash:function(e,a,d){var b={style:{},content:[],dataType:"flash",domName:"div",cssName:this.GetCssName("flash",d),dataKey:"res"};var c=b.style;c["outer-width"]=e;c["outer-height"]=a;c["padding-left"]=parseInt(d.flashPaddingLeft)||0;c["padding-right"]=parseInt(d.flashPaddingRight)||0;c["padding-top"]=parseInt(d.flashPaddingTop)||0;c["padding-bottom"]=parseInt(d.flashPaddingBottom)||0;c.width=c["outer-width"]-c["padding-left"]-c["padding-right"];c.height=c["outer-height"]-c["padding-top"]-c["padding-bottom"];c["float"]="left";c.overflow="hidden";return b},layoutColumnSpace:function(d,a,c){var e={style:{},content:[],dataType:"layout",domName:"div",cssName:this.GetCssName("itemColumnSpace",c)};var b=e.style;b.width=d;b.height=a;b["float"]="left";b.overflow="hidden";return e},layoutRowSpace:function(e,a,d){var b={style:{},content:[],dataType:"layout",domName:"div",cssName:this.GetCssName("itemRowSpace",d)};var c=b.style;c.width=e;c.height=a;c.clear="both";c.overflow="hidden";return b},layoutSpace:function(a,e,d){var f=this.layoutColumnSpace(d.itemColumnSpace,e.style.height,d);var b=this.layoutRowSpace(a.style.width,d.itemRowSpace,d);var g,c;for(g=0;g<d.adRowCount;g++){for(c=0;c<d.adColumnCount;c++){a.content.push(e);if(c!=d.adColumnCount-1){a.content.push(f)}}if(g!=d.adRowCount-1){a.content.push(b)}}return a},calculateLogo:function(d,b,c){var a={height:0,width:0};a.height=b>64?64:b;a.width=a.height+c.logoPaddingLeft+c.logoPaddingRight;return a},calculateImage:function(d,b,c){var a={height:0,width:0};a.height=b;a.width=d;return a},calculateFlash:function(d,b,c){var a={height:0,width:0};a.height=b;a.width=d;return a},calculateTitle:function(f,c,e){var a={height:0,width:0};a.width=f;var g=this.calculateTitleLineHeight(e);var d=1;if((c>60&&f<=120)||(c>110&&f<=180)){d=2}var b=e.titleRowCount>0?e.titleRowCount:d;a.height=g*b+e.titlePaddingTop+e.titlePaddingBottom;return a},calculateUrl:function(f,d,e){var a={height:0,width:0};a.width=f;var b=this.calculateUrlLineHeight(e);var c=e.urlRowCount>0?e.urlRowCount:1;a.height=b*c+e.urlPaddingTop+e.urlPaddingBottom;return a},calculateTitleRowCount:function(d,b){var a;var c=this.calculateTitleLineHeight(b);a=Math.floor((d-b.titlePaddingTop-b.titlePaddingBottom)/c);a=a>=2?2:a;return a},calculateDescRowCount:function(d,b){var a;var c=this.calculateDescLineHeight(b);a=Math.floor((d-b.descPaddingTop-b.descPaddingBottom)/c);a=a>4?4:a;return a},calculateTitleLineHeight:function(b){var a=b.titleLineHeight>0?b.titleLineHeight:b.titleFontSize+2;return a},calculateDescLineHeight:function(b){var a=b.descLineHeight>0?b.descLineHeight:b.descFontSize+2;return a},calculateUrlLineHeight:function(b){var a=b.urlLineHeight>0?b.urlLineHeight:b.urlFontSize+2;return a}}});declare(function(){return{name:"DataEngine",namespace:"Cpro.Template",flashTemplate:'<object classid="clsid:D27CDB6E-AE6D-11CF-96B8-444553540000" id="{flashid}" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" border="0" width="{width}" height="{height}"><param name="movie" value="{url}"><param name="quality" value="high"><param name="wmode" value="transparent"><param name="menu" value="false"><embed src="{url}" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" name="{flashid}" width="{width}" height="{height}" quality="High" wmode="transparent"></embed></object>',createFlashHtml:function(b){b.id=b.id?b.id:"";var a=this.flashTemplate.replace(/\{url\}/gi,b.url).replace(/\{width\}/gi,b.width).replace(/\{height\}/gi,b.height).replace(/\{flashid\}/gi,b.id);return a},subStringByBytes:function(b,a,c){if(!b){return""}b=String(b);if(a<0||b.replace(/[^\x00-\xff]/g,"ci").length<=a){return b}b=b.substr(0,a).replace(/([^\x00-\xff])/g,"\x241 ").substr(0,a);b=b.replace(/[^\x00-\xff]$/,"");b=b.replace(/([^\x00-\xff]) /g,"\x241");return b},getByteLength:function(a){if(!a){return""}a=String(a);a=a.replace(/([^\x00-\xff])/g,"\x241 ");return a.length},truncateEngine:function(t){var x=t.dom;var h=t.showRowCount;var l=t.showLineHeight;var d=t.showWidth;var c=t.showFontSize;var u=t.showContent;var B=false;if(t.showEllipsis){B=true}x.style.whiteSpace="nowrap";var q=x.offsetWidth;var e=[];var a=[];var r=[];var p=h*d;var b=0;if(l<=0||h<=0){return 0}var k,z,s;for(var w=0;w<3;w++,b++){q=x.offsetWidth;e[w]=q;a[w]=this.getByteLength(x.innerText||x.textContent);k=p-q;if(k>0&&u.length==x.innerHTML.length){break}z;s;if(Math.abs(k)<5){break}if(w===0){z=Math.ceil(c/2)}else{z=Math.abs(e[w]-e[w-1])/r[w-1];if(z===0){break}}r[w]=Math.ceil(Math.abs(k)/z);s=k>0?0:1;if(!s){x.innerHTML=this.subStringByBytes(u,a[w]+r[w])}else{x.innerHTML=this.subStringByBytes(u,a[w]-r[w])}}q=x.offsetWidth;var A;var m=10;var f=0;while(f<m&&q>p){q=x.offsetWidth;var C=x.innerText||x.textContent;k=p-q;A=k>0?0:1;if(!A){x.innerHTML=u.substr(0,C.length+1)}else{x.innerHTML=u.substr(0,C.length-1)}b++;f++;q=x.offsetWidth;var C=x.innerText||x.textContent;k=p-q;if(!A){if(k<=0){x.innerHTML=u.substr(0,C.length-1);b++;break}}else{if(k>=0){break}}}f=0;x.style.whiteSpace="normal";x.style.wordBreak="break-all";x.style.wordWrap="break-word";var n=x.offsetHeight;var g=h*l;var C=x.innerText||x.textContent;var m=10;var f=0;while(f<m&&n>g+4){x.innerHTML=u.substr(0,C.length-1);n=x.offsetHeight;C=x.innerText||x.textContent;b++;f++}f=0;if(B){if(C.length<u.length){var C=x.innerText||x.textContent;var v=this.getByteLength(C);x.innerHTML=this.subStringByBytes(u,v-2)+'<span style="font-family:arial;">...</span>'}}var j=l;var y=x.offsetHeight;while(j+4<y){j+=l}x.parentNode.style.height=j+"px";return b},paint:function(l){var h=l.slotData;var w=l.layoutObj;var u=w.layoutIndex;var y=l.data;var k={image:"image",res:"image",curl:"link"};var d=h.idPrefix||"";if(h.displayType==="inlay"&&h.stuffType==="linkunit"&&h.urlReplace&&h.urlReplace!=="default"){for(var r=0,f=y.length;r<f;r++){y[r].curl=y[r].curl.replace("http://cpro.baidu.com/cpro/ui/uijs.php?",decodeURIComponent(h.urlReplace))}}for(var r=0,f=y.length;r<f;r++){var v=y[r];var g=r;var z=v.type;for(var A in v){var s=v.curl;var t=document.getElementById(d+A+g);if(!t){continue}t.href=s;var q=k[A]||"text";if(z&&z==="flash"&&A==="res"){q="flash"}if(q==="image"){t.childNodes[0].src=v[A];continue}else{if(q==="link"){continue}else{if(q==="flash"){var e=document.getElementById(t.id+"Flash");e.innerHTML=this.createFlashHtml({url:v[A],width:e.style.width,height:e.style.height});continue}}}var j=u[A]&&u[A].rowCount||1;var c=u[A].style["line-height"];var n=u[A].style.width;var b=u[A].style["font-size"];var p=(v[A]||"").replace(/\s+/g," ");var x=u[A].showEllipsis;t.title=p;t.innerHTML=this.subStringByBytes(p,j*n*2/b,true);if(z==="text"||z==="tuwen"){var m={dom:t,showRowCount:j,showLineHeight:c,showWidth:n,showFontSize:b,showContent:p,showEllipsis:x,key:A};var a=this.truncateEngine(m)}if(m&&m.key==="surl"){m.dom.parentNode.style.display="block"}}}}}});declare(function(){return{name:"DefaultValueManager",namespace:"Cpro.Template",getDefaultValue:function(f){var c=this.fastClone(this.globalDefaultValue);var b=[];b.push(f.stuffType);b.push(f.displayType);b.push(f.displayType+"_"+f.stuffType);b.push(f.displayType+"_"+f.stuffType+"_"+f.adRowCount+"_"+f.adColumnCount);b.push(f.displayType+"_"+f.stuffType+"_"+f.templateWidth+"_"+f.templateHeight);b.push(f.displayType+"_"+f.stuffType+"_"+f.templateWidth+"_"+f.templateHeight+"_"+f.adRowCount+"_"+f.adColumnCount);var h=null;var d=null;var a=null;for(var e=0,g=b.length;e<g;e++){h=b[e];d=this[h];if(h&&d){for(a in d){if(a&&(d[a]!==null)&&(typeof d[a]!=="undefined")){c[a]=d[a]}}}}return c},fastClone:function(b){var a=function(){};a.prototype=b;return new a()},flash:{containerPaddingLeft:0,containerPaddingRight:0,containerPaddingTop:0,containerPaddingBottom:0,adRowCount:1,adColumnCount:1},image:{containerPaddingLeft:0,containerPaddingRight:0,containerPaddingTop:0,containerPaddingBottom:0,adRowCount:1,adColumnCount:1},inlay_text:{containerPaddingRight:8,containerBorderWidth:1,containerBorderColor:"ffffff",titlePaddingBottom:4,urlPaddingTop:2},inlay_text_1_1:{titleFontSize:20,descFontSize:14,titleTextAlign:"center",urlIsShow:1},inlay_tuwen:{containerPaddingRight:8},inlay_linkunit1:{titleFontSize:12,titleLineHeight:15,containerPaddingLeft:0,containerPaddingRight:0,containerPaddingTop:0,containerPaddingBottom:0,itemColumnSpace:6,itemRowSpace:4},inlay_linkunit1_120_90:{containerPaddingLeft:2,containerPaddingRight:2,containerPaddingTop:1,containerPaddingBottom:1,adRowCount:5,adColumnCount:1},inlay_linkunit1_160_90:{containerPaddingLeft:2,containerPaddingRight:2,containerPaddingTop:1,containerPaddingBottom:1,adRowCount:5,adColumnCount:1},inlay_linkunit1_180_90:{containerPaddingLeft:2,containerPaddingRight:2,containerPaddingTop:1,containerPaddingBottom:1,adRowCount:5,adColumnCount:1},inlay_linkunit1_200_90:{containerPaddingLeft:2,containerPaddingRight:2,containerPaddingTop:1,containerPaddingBottom:1,adRowCount:5,adColumnCount:1},inlay_linkunit1_468_15:{containerPaddingRight:15,adRowCount:1,adColumnCount:5},inlay_linkunit1_728_15:{containerPaddingRight:15,adRowCount:1,adColumnCount:6},inlay_text_960_90_1_4:{descFontSize:14,descLineHeight:16,titlePaddingBottom:3,urlPaddingTop:2},inlay_text_468_60:{descFontSize:12,descLineHeight:14,titlePaddingBottom:3,urlPaddingTop:2,containerPaddingRight:8,adRowCount:1,adColumnCount:2},inlay_tuwen_468_60:{descFontSize:12,descLineHeight:14,titlePaddingBottom:3,urlPaddingTop:2,adRowCount:1,adColumnCount:2},"float":{adRowCount:1,adColumnCount:1},float_linkunit1_120_270:{idPrefix:"lu_",containerShowLogo:0,titleTextAlign:"left",titleFontColor:"666666",titleFontSize:12,titleLineHeight:14,titleShowUnderline:0,containerPaddingLeft:8,containerPaddingRight:8,containerPaddingTop:4,containerPaddingBottom:4,containerBorderWidth:1,containerBorderColor:"cccccc",itemColumnSpace:6,itemRowSpace:4,adRowCount:2,adColumnCount:1},globalDefaultValue:{userChargingId:"",templateWidth:728,templateHeight:90,adDataType:"text_tuwen",adRowCount:1,adColumnCount:4,flushType:1,flushColor:"e10900",isShowUnrelated:1,containerOpacity:0,isShowPublicAd:1,backupColor:"ffffff",backupUrl:"",titleFontColor:"0F0CBF",titleFontFamily:"arial,sans-serif",titleFontSize:14,titleLength:-1,titleIsShowEllipsis:0,titleIsShow:1,titleRowCount:-1,titleTextAlign:"left",titlePaddingLeft:0,titlePaddingRight:0,titlePaddingTop:0,titlePaddingBottom:5,titleShowUnderline:1,descFontColor:"444444",descFontFamily:"arial,sans-serif",descFontSize:14,descLength:-1,descIsShowEllipsis:1,descIsShow:1,descRowCount:-1,descPaddingLeft:0,descPaddingRight:0,descPaddingTop:0,descPaddingBottom:0,descShowUnderline:0,urlFontColor:"008000",urlFontFamily:"arial,sans-serif",urlFontSize:11,urlLength:-1,urlIsShowEllipsis:0,urlIsShow:-1,urlPaddingLeft:0,urlPaddingRight:0,urlPaddingTop:3,urlPaddingBottom:0,urlShowUnderline:0,logoIsShow:1,logoPaddingLeft:0,logoPaddingRight:4,logoPaddingTop:0,logoPaddingBottom:0,containerBorderColor:"ffffff",containerBorderWidth:0,containerBackgroundColor:"ffffff",containerPaddingLeft:4,containerPaddingRight:4,containerPaddingTop:4,containerPaddingBottom:4,itemPaddingLeft:0,itemPaddingRight:0,itemPaddingTop:0,itemPaddingBottom:0,itemTextAlign:"left",descLineHeight:-1,itemColumnSpace:20,itemRowSpace:10,urlRowCount:0,titleLineHeight:-1,urlLineHeight:-1,containerShowLogo:1,urlReplace:"default",containerWidth:0,containerHeight:0,containerTextAlign:"left"}}});declare(function(){return{name:"FlashLayoutEngine",namespace:"Cpro.Template",layout:function(j){var c=true;var g={};var m=using("Cpro.Template.BaseLayoutEngine");var n=j.templateWidth;var p=j.templateHeight;var d=m.layoutContainer(n,p,j);if(j.adRowCount==1&&j.adColumnCount==1){d.style["text-align"]="center"}var l=Math.floor((d.style.width-j.itemColumnSpace*(j.adColumnCount-1))/j.adColumnCount);var f=Math.floor((d.style.height-j.itemRowSpace*(j.adRowCount-1))/j.adRowCount);var o=m.layoutItem(l,f,j);var b=m.calculateFlash(o.style.width,o.style.height,j);var h=b.width;var i=b.height;var k=m.layoutFlash(h,i,j);g[k.dataKey]=k;o.content.push(k);var a=m.layoutColumnSpace(j.itemColumnSpace,f,j);var e=m.layoutRowSpace(l,j.itemRowSpace,j);d=m.layoutSpace(d,o,j);d.layoutIndex=g;return d}}});declare(function(){return{name:"ImageLayoutEngine",namespace:"Cpro.Template",layout:function(i){var b=true;var h={};var m=using("Cpro.Template.BaseLayoutEngine");var n=i.templateWidth;var p=i.templateHeight;var c=m.layoutContainer(n,p,i);if(i.adRowCount==1&&i.adColumnCount==1){c.style["text-align"]="center"}var k=Math.floor((c.style.width-i.itemColumnSpace*(i.adColumnCount-1))/i.adColumnCount);var g=Math.floor((c.style.height-i.itemRowSpace*(i.adRowCount-1))/i.adRowCount);var o=m.layoutItem(k,g,i);var d=m.calculateImage(o.style.width,o.style.height,i);var j=d.height;var l=d.width;var f=m.layoutImage(l,j,i);h[f.dataKey]=f;o.content.push(f);var a=m.layoutColumnSpace(i.itemColumnSpace,g,i);var e=m.layoutRowSpace(k,i.itemRowSpace,i);c=m.layoutSpace(c,o,i);c.layoutIndex=h;return c}}});declare(function(){return{name:"LayoutEngineManager",namespace:"Cpro.Template",getLayoutEngine:function(b){var a;this.Template=using("Cpro.Template");switch(b.stuffType.toLowerCase()){case"text":a=this.Template.TextLayoutEngine;break;case"image":a=this.Template.ImageLayoutEngine;break;case"tuwen":a=this.Template.TuwenLayoutEngine;break;case"flash":a=this.Template.FlashLayoutEngine;break;case"linkunit1":a=this.Template.LinkUnit1LayoutEngine;break;case"linkunit":a=this.Template.LinkUnitLayoutEngine;break;default:a=this.Template.TextLayoutEngine;break}return a}}});declare(function(){return LinkUnit1LayoutEngine={name:"LinkUnit1LayoutEngine",namespace:"Cpro.Template",layout:function(h){var b=true;var g={};var k=using("Cpro.Template.BaseLayoutEngine");var m=h.templateWidth;var p=h.templateHeight;var c=k.layoutContainer(m,p,h);if(h.adRowCount==1&&h.adColumnCount==1){c.style["text-align"]="center"}var j=Math.floor((c.style.width-h.itemColumnSpace*(h.adColumnCount-1))/h.adColumnCount);var f=Math.floor((c.style.height-h.itemRowSpace*(h.adRowCount-1))/h.adRowCount);var o=k.layoutItem(j,f,h);var d=k.calculateTitle(o.style.width,o.style.height,h);var n=d.width;var i=d.height;var l=k.layoutTitle(n,i,h);g[l.dataKey]=l;o.content.push(l);var a=k.layoutColumnSpace(h.itemColumnSpace,f,h);var e=k.layoutRowSpace(j,h.itemRowSpace,h);c=k.layoutSpace(c,o,h);c.layoutIndex=g;return c}}});declare(function(){return{name:"LinkUnitLayoutEngine",namespace:"Cpro.Template",layout:function(e){var a=false;var d={};var h=using("Cpro.Template.BaseLayoutEngine");e.containerPaddingLeft=0;e.containerPaddingRight=0;e.containerPaddingTop=0;e.containerPaddingBottom=0;var j=e.templateWidth;var m=e.templateHeight;var b=h.layoutContainer(j,m,e);if(e.adRowCount==1){b.style["text-align"]="center"}e.itemPaddingLeft=6;e.itemPaddingRight=6;e.itemPaddingTop=1;e.itemPaddingBottom=1;var g=7*e.titleFontSize+e.itemPaddingLeft+e.itemPaddingRight;var c=e.titleFontSize+4+e.itemPaddingTop+e.itemPaddingBottom;var l=h.layoutItem(g,c,e);e.titlePaddingLeft=0;e.titlePaddingRight=0;e.titlePaddingTop=0;e.titlePaddingBottom=0;var k=7*e.titleFontSize;var f=e.titleFontSize+4;e.titleLineHeight=e.titleFontSize+4;e.titleFontFamily=decodeURIComponent(e.titleFontFamily);if(e.titleFontFamily!==decodeURIComponent("%E5%AE%8B%E4%BD%93")){e.titleFontFamily+=","+decodeURIComponent("%E5%AE%8B%E4%BD%93")}if(e.adRowCount==1){e.titleTextAlign="center"}var i=h.layoutTitle(k,f,e);d[i.dataKey]=i;l.content.push(i);if(e.adColumnCount>1){e.itemColumnSpace=Math.floor((e.templateWidth-2*e.containerBorderWidth-g*e.adColumnCount)/(e.adColumnCount-1))}else{e.itemColumnSpace=e.templateWidth-2*e.containerBorderWidth-g*e.adColumnCount}if(e.adRowCount>1){e.itemRowSpace=Math.floor((e.templateHeight-2*e.containerBorderWidth-c*e.adRowCount)/(e.adRowCount-1))}else{e.itemRowSpace=e.templateHeight-2*e.containerBorderWidth-c*e.adRowCount}b=h.layoutSpace(b,l,e);b.layoutIndex=d;return b}}});declare(function(){return{name:"TemplateEngine",namespace:"Cpro.Template",init:function(){},paint:function(e){var c=e.ads;var d=e.userConfig;var h=e.templateConfig;var b=e.displayType;var g=Base.fastClone(config);var f=this.Template.TemplateVariableManager.getVariables(this.mainConfig);currentLayoutEngine=this.Template.LayoutEngineManager.getLayoutEngine(this.mainFullNameConfig);this.MediaLayoutObj=currentLayoutEngine.layout(this.mainFullNameConfig);this.Template.PaintEngine.paint({layoutObj:this.MediaLayoutObj,userFullNameConfig:this.mainFullNameConfig});if(c[0]&&c[0].type&&c[0].type==="image"){run(this.ShowContentLoaded.proxy(this),"image")}else{this.ShowContentLoaded()}this.Template.DataEngine.paint({layoutObj:this.MediaLayoutObj,data:c,slotData:this.mainFullNameConfig});if(!window.isGongyi){var a=using("Cpro.Template.AntiCheat");a.check("container")}}}});declare(function(){return{name:"PaintEngine",namespace:"Cpro.Template",idPrefix:"",pxStyle:{width:1,height:1,"line-height":1,"padding-left":1,"padding-right":1,"padding-top":1,"padding-bottom":1,"border-width":1,"font-size":1,"margin-left":1,"margin-right":1,"margin-top":1,"margin-bottom":1},excludeStyle:{"outer-height":1,"outer-width":1},linkStyle:{"font-size":1,height:1,"line-height":1,"text-decoration":1,"text-align":1,"font-family":1,color:1,"word-wrap":1,"word-break":1},globalGetStyleObj:{},cssString:"",idRecorder:{},getStyle:function(b,e){var a="";if(this.globalGetStyleObj[b]){return""}else{this.globalGetStyleObj[b]=1}var d=e.style;if(d){for(var c in d){if(this.excludeStyle[c]){continue}a+=c+":"+d[c]+(this.pxStyle[c]?"px;":";")}}a="."+b+" {"+a+"} \n";return a},getLinkStyle:function(b,e){var a="";if(this.globalGetStyleObj[b]){return""}else{this.globalGetStyleObj[b]=1}var d=e.style;if(d){for(var c in d){if(this.excludeStyle[c]||!this.linkStyle[c]){continue}a+=c+":"+d[c]+(this.pxStyle[c]?"px;":";")}}if(e.dataType==="flash"){a+="display:block; position:absolute; top:0px; left:0px; z-index:9; cursor:hand; opacity:0; filter:alpha(opacity=0); background-color:#FFFFFF; width:"+d.width+"px;"}a="."+b+" {"+a+"} \n";return a},addCssByStyle:function(d){var e=document;var b=e.createElement("style");b.setAttribute("type","text/css");if(b.styleSheet){b.styleSheet.cssText=d}else{var a=e.createTextNode(d);b.appendChild(a)}var c=e.getElementsByTagName("head");if(c.length){c[0].appendChild(b)}else{e.documentElement.appendChild(b)}},drawDom:function(a){var g=a.cssName||a.dataKey;this.cssString+=this.getStyle(g,a);var d=document.createElement(a.domName);d.className=g;for(var l in a.props){d[l]=a.props[l]}if(a.dataType!="layout"){this.idRecorder[a.dataKey+this.idPrefix]=this.idRecorder[a.dataKey+this.idPrefix]||0;var b=this.idPrefix+a.dataKey+this.idRecorder[a.dataKey+this.idPrefix];var k=document.createElement("a");k.id=b;k.target="_blank";var e=g+" a";this.cssString+=this.getLinkStyle(e,a);this.idRecorder[a.dataKey+this.idPrefix]++;switch(a.dataType){case"text":break;case"image":var m=document.createElement("img");m.style.width=(a.style.width)+"px";m.style.height=(a.style.height)+"px";k.style.display="block";k.appendChild(m);break;case"flash":var o=document.createElement("div");o.style.width=(a.style.width)+"px";o.style.height=(a.style.height)+"px";o.id=b+"Flash";d.appendChild(o);break;default:break}d.appendChild(k)}if(a.content&&a.content.length){for(var f=0,h=a.content.length;f<h;f++){for(var c=0,n=a.content[f].count||1;c<n;c++){d.appendChild(this.drawDom(a.content[f]))}}}return d},drawLogo:function(c){c=c||{};var d=c.logoId||"logo";var b=document.getElementById(d);if(!b){b=document.createElement("a")}var a=false;if(typeof c.isGongyi==="undefined"&&typeof window.isGongyi!=="undefined"){a=window.isGongyi}else{a=c.isGongyi?true:false}b.innerHTML="&nbsp;";b.className=c.className||"bd-logo";b.target="_blank";if(a){b.href="http://gongyi.baidu.com/";b.title="\u767e\u5ea6\u516c\u76ca"}else{b.href="http://wangmeng.baidu.com/";b.title="\u767e\u5ea6\u7f51\u76df\u63a8\u5e7f"}var e=function(){b.style.zoom="1"};setTimeout(e,100);return b},paint:function(e){var a=[];var f=e.layoutObj;var c=e.userFullNameConfig;var b=e.styleCssString||"";this.idPrefix=c.idPrefix||"";a=this.drawDom(f);this.cssString+=b;this.addCssByStyle(this.cssString);if(window.ad){window.ad.parentNode.removeChild(window.ad);window.ad=null}window.loader=document.getElementById(this.idPrefix+"loader");window.ad=a;window.loader.parentNode.insertBefore(a,window.loader);if(c.containerShowLogo){var d={};if(c.stuffType==="linkunit"||c.stuffType==="linkunit1"){d.className="bd-logo2"}a.appendChild(this.drawLogo(d))}window.loader=window.ad=a=null}}});declare(function(){return{name:"StyleTemplate",namespace:"Cpro.Template",cache:{},LEFT_DELIMITER:"<%",RIGHT_DELIMITER:"%>",templateCss:function(a,c){var d=using("Cpro.Utility.CssBuilder");var b=this.template(a,c);d.addCss(b)},templateHtml:function(j,c){var h=using("Cpro.Utility.CssBuilder");var f=this.template(j,c);var g=document.getElementById(j);var b=document.createElement("div");b.innerHTML=f;var a=[];for(var d=0,e=b.childNodes.length;d<e;d++){if(b.childNodes[d]&&b.childNodes[d].nodeType===1){a.push(b.childNodes[d])}}for(var d=0,e=a.length;d<e;d++){g.parentNode.insertBefore(a[d],g)}},template:function(f,d){var e;if(!window.document){e=this.compile(f)}var c=document.getElementById(f);if(c){if(this.cache[f]){e=this.cache[f]}var b=/^(textarea|input)$/i.test(c.nodeName)?c.value:c.innerHTML;e=this.compile(b)}else{e=this.compile(f)}var a=this.isObject(d)?e(d):e;e=null;return a},compile:function(b){var a="var _template_fun_array=[];\nvar fn=(function(data){\nvar _template_varName='';\nfor(name in data){\n_template_varName+=('var '+name+'=data[\"'+name+'\"];');\n};\neval(_template_varName);\n_template_fun_array.push('"+this.analysisStr(b)+"');\n_template_varName=null;\n})(_template_object);\nfn = null;\nreturn _template_fun_array.join('');\n";return new Function("_template_object",a)},isObject:function(a){return"function"===typeof a||!!(a&&"object"===typeof a)},analysisStr:function(c){var a=using("Cpro.Utility.Encoder");var d=this.LEFT_DELIMITER;var b=this.RIGHT_DELIMITER;d=a.encodeReg(d);b=a.encodeReg(b);c=String(c);c=c.replace(new RegExp("("+d+"[^"+b+"]*)//.*\n","g"),"$1");c=c.replace(new RegExp("<!--.*?-->","g"),"");c=c.replace(new RegExp(d+"\\*.*?\\*"+b,"g"),"");c=c.replace(new RegExp("[\\r\\t\\n]","g"),"");c=c.replace(new RegExp(d+"(?:(?!"+b+")[\\s\\S])*"+b+"|((?:(?!"+d+")[\\s\\S])+)","g"),function(f,e){var g="";if(e){g=e.replace(/\\/g,"&#92;").replace(/'/g,"&#39;");while(/<[^<]*?&#39;[^<]*?>/g.test(g)){g=g.replace(/(<[^<]*?)&#39;([^<]*?>)/g,"$1\r$2")}}else{g=f}return g});c=c.replace(new RegExp("("+d+"[\\s]*?var[\\s]*?.*?[\\s]*?[^;])[\\s]*?"+b,"g"),"$1;"+b);c=c.replace(new RegExp("("+d+":?[hvu]?[\\s]*?=[\\s]*?[^;|"+b+"]*?);[\\s]*?"+b,"g"),"$1"+b);c=c.split(d).join("\t");if(this.ESCAPE){c=c.replace(new RegExp("\\t=(.*?)"+b,"g"),"',typeof($1) === 'undefined'?'':baidu.template._encodeHTML($1),'")}else{c=c.replace(new RegExp("\\t=(.*?)"+b,"g"),"',typeof($1) === 'undefined'?'':$1,'")}c=c.replace(new RegExp("\\t:h=(.*?)"+b,"g"),"',typeof($1) === 'undefined'?'':baidu.template._encodeHTML($1),'");c=c.replace(new RegExp("\\t(?::=|-)(.*?)"+b,"g"),"',typeof($1)==='undefined'?'':$1,'");c=c.replace(new RegExp("\\t:u=(.*?)"+b,"g"),"',typeof($1)==='undefined'?'':encodeURIComponent($1),'");c=c.replace(new RegExp("\\t:v=(.*?)"+b,"g"),"',typeof($1)==='undefined'?'':baidu.template._encodeEventHTML($1),'");c=c.split("\t").join("');");c=c.split(b).join("_template_fun_array.push('");c=c.split("\r").join("\\'");return c}}});declare(function(){return{name:"TemplateVariableManager",namespace:"Cpro.Template",getFullName:function(a){return this.nameMapping[a]},getVariables:function(d){var b={};var e=using("Cpro.Template.DefaultValueManager");var c;var f;for(c in d){f=this.getFullName(c);if(f){b[f]=d[c]}}c=null;b.displayType=d.displayType;b.stuffType=d.stuffType;var a=e.getDefaultValue(b);for(c in b){if(c&&(typeof b[c]!=="undefined")){if(typeof b[c]==="string"){b[c]=b[c].replace("#","")}a[c]=b[c]}}return a},nameMapping:{n:"userChargingId",rsi0:"templateWidth",rsi1:"templateHeight",at:"adDataType",hn:"adRowCount",wn:"adColumnCount",rsi5:"flushType",rss6:"flushColor",rad:"isShowUnrelated",cad:"isShowPublicAd",rss7:"backupColor",aurl:"backupUrl",rss2:"titleFontColor",titFF:"titleFontFamily",titFS:"titleFontSize",titL:"titleLength",titSE:"titleIsShowEllipsis",titIS:"titleIsShow",titRC:"titleRowCount",titPL:"titlePaddingLeft",titPR:"titlePaddingRight",titPT:"titlePaddingTop",titPB:"titlePaddingBottom",titTA:"titleTextAlign",titSU:"titleShowUnderline",desFC:"descFontColor",desFF:"descFontFamily",desFS:"descFontSize",desL:"descLength",desSE:"descIsShowEllipsis",desIS:"descIsShow",desRC:"descRowCount",desPL:"descPaddingLeft",desPR:"descPaddingRight",desPT:"descPaddingTop",desPB:"descPaddingBottom",desSU:"descShowUnderline",rss4:"urlFontColor",urlFF:"urlFontFamily",urlFS:"urlFontSize",urlL:"urlLength",urlSE:"urlIsShowEllipsis",urlIS:"urlIsShow",urlPL:"urlPaddingLeft",urlPR:"urlPaddingRight",urlPT:"urlPaddingTop",urlPB:"urlPaddingBottom",urlSU:"urlShowUnderline",logIS:"logoIsShow",logPL:"logoPaddingLeft",logPR:"logoPaddingRight",logPT:"logoPaddingTop",logPB:"logoPaddingBottom",rss0:"containerBorderColor",conBW:"containerBorderWidth",rss1:"containerBackgroundColor",conpl:"containerPaddingLeft",conpr:"containerPaddingRight",conpt:"containerPaddingTop",conpb:"containerPaddingBottom",conOP:"containerOpacity",conSL:"containerShowLogo",itepl:"itemPaddingLeft",itepr:"itemPaddingRight",itept:"itemPaddingTop",itepb:"itemPaddingBottom",desLH:"descLineHeight",iteCS:"itemColumnSpace",iteRS:"itemRowSpace",urlRC:"urlRowCount",urlRE:"urlReplace",conW:"containerWidth",conH:"containerHeight"}}});declare(function(){return TextLayoutEngine={name:"TextLayoutEngine",namespace:"Cpro.Template",layout:function(j){var l=true;var t={};var v=using("Cpro.Template.BaseLayoutEngine");var h=j.templateWidth;var m=j.templateHeight;var i=v.layoutContainer(h,m,j);var c=Math.floor((i.style.width-j.itemColumnSpace*(j.adColumnCount-1))/j.adColumnCount);var p=Math.floor((i.style.height-j.itemRowSpace*(j.adRowCount-1))/j.adRowCount);var u=v.layoutItem(c,p,j);var o=v.calculateTitle(u.style.width,u.style.height,j);var n=o.width;var f=o.height;var x=v.layoutTitle(n,f,j);t[x.dataKey]=x;var k=v.calculateUrl(u.style.width,u.style.height,j);var r=k.width;var e=k.height;var d=v.layoutUrl(r,e,j);t[d.dataKey]=d;var b=u.style.width;var a=u.style.height-f-e;if(j.urlIsShow===0||j.urlIsShow===-1&&v.calculateDescRowCount(a,j)<2){l=false;a=u.style.height-f}var s=v.layoutDesc(b,a,j);t[s.dataKey]=s;if(j.titleIsShow){u.content.push(x)}if(j.descIsShow){u.content.push(s)}if(j.urlIsShow>0||(j.urlIsShow===-1&&l)){u.content.push(d)}var g=v.layoutColumnSpace(j.itemColumnSpace,p,j);var w=v.layoutRowSpace(c,j.itemRowSpace,j);i=v.layoutSpace(i,u,j);i.layoutIndex=t;if(j.adRowCount==1&&j.adColumnCount==1){i.style["text-align"]="center";u.style["text-align"]="center";x.style["text-align"]="center";var q=f+e+s.style["line-height"]*s.rowCount+j.descPaddingTop+j.descPaddingBottom;u.style["padding-top"]=u.style["padding-bottom"]=parseInt((m-q)/2)}return i}}});declare(function(){return{name:"TuwenLayoutEngine",namespace:"Cpro.Template",layout:function(m){var o=true;var y={};var A=using("Cpro.Template.BaseLayoutEngine");var k=m.templateWidth;var p=m.templateHeight;var l=A.layoutContainer(k,p,m);var d=Math.floor((l.style.width-m.itemColumnSpace*(m.adColumnCount-1))/m.adColumnCount);var t=Math.floor((l.style.height-m.itemRowSpace*(m.adRowCount-1))/m.adRowCount);if(m.adRowCount==1&&m.adColumnCount==1){d=d>500?500:d}var z=A.layoutItem(d,t,m);if(z.style.height<=60){var q=A.calculateLogo(z.style.width,z.style.height,m);var g=q.height;var v=q.width;var c=A.layoutLogo(v,g,m);y[c.dataKey]=c;var s=A.calculateTitle(z.style.width-v,z.style.height,m);var r=s.width;var h=s.height;var C=A.layoutTitle(r,h,m,"left");y[C.dataKey]=C;var b=r;var a=z.style.height-h;var x=A.layoutDesc(b,a,m,"left");y[x.dataKey]=x;z.content.push(c);z.content.push(C);z.content.push(x);z.style["inner-height"]=g;y.item=z}else{var s=A.calculateTitle(z.style.width,z.style.height,m);var r=s.width;var h=s.height;var C=A.layoutTitle(r,h,m);y[C.dataKey]=C;var w=z.style.height-C.style["outer-height"];var n=A.calculateUrl(z.style.width,z.style.height,m);var u=n.width;var f=n.height;if(w-f>=64){var e=A.layoutUrl(u,f,m);y[e.dataKey]=e;var q=A.calculateLogo(z.style.width,z.style.height-h-f,m);var g=q.height;var v=q.width;var c=A.layoutLogo(v,g,m);y[c.dataKey]=c;var b=z.style.width-v;var a=g;var x=A.layoutDesc(b,a,m,"left");y[x.dataKey]=x;z.style["inner-height"]=h+g+f;y.item=z}else{var q=A.calculateLogo(z.style.width,z.style.height-h,m);var g=q.height;var v=q.width;var c=A.layoutLogo(v,g,m);y[c.dataKey]=c;var n=A.calculateUrl(z.style.width-v,z.style.height,m);var u=n.width;var f=n.height;var e=A.layoutUrl(u,f,m,"left");y[e.dataKey]=e;var b=z.style.width-v;var a=g-f;o=true;if(A.calculateDescRowCount(a,m)<2){a=g;o=false}var x=A.layoutDesc(b,a,m,"left");y[x.dataKey]=x;z.style["inner-height"]=h+g;y.item=z}z.content.push(C);z.content.push(c);z.content.push(x);if(o){z.content.push(e)}}var i=A.layoutColumnSpace(m.itemColumnSpace,t,m);var B=A.layoutRowSpace(d,m.itemRowSpace,m);l=A.layoutSpace(l,z,m);l.layoutIndex=y;if(m.adRowCount==1&&m.adColumnCount==1){z.style["margin-left"]=parseInt((k-d)/2)}if(!m.itemVerticalAlign||m.itemVerticalAlign===-1){var j=z.style["outer-height"]-z.style["inner-height"];if(j>50){z.style.height=z.style["inner-height"];z.style["padding-top"]=z.style["padding-bottom"]=parseInt(j/2)}}return l}}});declare(function(){return{name:"CssBuilder",namespace:"Cpro.Utility",addCss:function(d){var e=document;var b=e.createElement("style");b.setAttribute("type","text/css");if(b.styleSheet){b.styleSheet.cssText=d}else{var a=e.createTextNode(d);b.appendChild(a)}var c=e.getElementsByTagName("head");if(c.length){c[0].appendChild(b)}else{e.documentElement.appendChild(b)}}}});declare(function(){return{name:"Encoder",namespace:"Cpro.Utility",encodeHTML:function(a){return String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\\/g,"&#92;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")},encodeReg:function(a){return String(a).replace(/([.*+?^=!:${}()|[\]/\\])/g,"\\$1")},encodeEventHTML:function(a){return String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/\\\\/g,"\\").replace(/\\\//g,"/").replace(/\\n/g,"\n").replace(/\\r/g,"\r")}}});