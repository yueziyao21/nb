function jdAdNShow(a,b,c,d,e,f,g,h){var i=parseInt(1e3*Math.random()),j=document.createElement("iframe");document.open(),document.write("<a id='jdAdplace"+i+"' style='display:block'></a>"),document.getElementById("jdAdplace"+i).parentNode.appendChild(j,null);var k=j.contentWindow.document,l=document.getElementById("jdAdplace"+i),b=b||l.scrollWidth,c=c||b/d;j.width=b,j.height=c,j.style.margin=0,j.style.border=0,j.style.padding=0,j.frameBorder=0;var m=e||0;k.open(),k.write('<script>var width="'+b+'";var height="'+c+'";var id="'+a+'";var adflag="'+m+'";var mobileType="'+(null!=f?f:1)+'";var clkmn="'+g+'";var expose="'+h+'";</script>        <html style="overflow:hidden;"><body style="margin:0;overflow:hidden;" onload="　　var d = document;    var script = d.createElement(\'script\');    script.src = \'//static-alias-1.360buyimg.com/jzt/temp/lib/show.js\';    d.getElementsByTagName(\'head\')[0].appendChild(script)" ></body></html>'),k.close()}