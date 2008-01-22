
if(!Object.prototype.toJSONString){Array.prototype.toJSONString=function(w){var a=[],i,l=this.length,v;for(i=0;i<l;i+=1){v=this[i];switch(typeof v){case'object':if(v&&typeof v.toJSONString==='function'){a.push(v.toJSONString(w));}else{a.push('null');}
break;case'string':case'number':case'boolean':a.push(v.toJSONString());break;default:a.push('null');}}
return'['+a.join(',')+']';};Boolean.prototype.toJSONString=function(){return String(this);};Date.prototype.toJSONString=function(){function f(n){return n<10?'0'+n:n;}
return'"'+this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z"';};Number.prototype.toJSONString=function(){return isFinite(this)?String(this):'null';};Object.prototype.toJSONString=function(w){var a=[],k,i,v;if(w){for(i=0;i<w.length;i+=1){k=w[i];if(typeof k==='string'){v=this[k];switch(typeof v){case'object':if(v){if(typeof v.toJSONString==='function'){a.push(k.toJSONString()+':'+
v.toJSONString(w));}}else{a.push(k.toJSONString()+':null');}
break;case'string':case'number':case'boolean':a.push(k.toJSONString()+':'+v.toJSONString());}}}}else{for(k in this){if(typeof k==='string'&&Object.prototype.hasOwnProperty.apply(this,[k])){v=this[k];switch(typeof v){case'object':if(v){if(typeof v.toJSONString==='function'){a.push(k.toJSONString()+':'+
v.toJSONString());}}else{a.push(k.toJSONString()+':null');}
break;case'string':case'number':case'boolean':a.push(k.toJSONString()+':'+v.toJSONString());}}}}
return'{'+a.join(',')+'}';};(function(s){var m={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};s.parseJSON=function(filter){var j;function walk(k,v){var i,n;if(v&&typeof v==='object'){for(i in v){if(Object.prototype.hasOwnProperty.apply(v,[i])){n=walk(i,v[i]);if(n!==undefined){v[i]=n;}}}}
return filter(k,v);}
if(/^[\],:{}\s]*$/.test(this.replace(/\\./g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(:?[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+this+')');return typeof filter==='function'?walk('',j):j;}
throw new SyntaxError('parseJSON');};s.toJSONString=function(){if(/["\\\x00-\x1f]/.test(this)){return'"'+this.replace(/[\x00-\x1f\\"]/g,function(a){var c=m[a];if(c){return c;}
c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+
(c%16).toString(16);})+'"';}
return'"'+this+'"';};})(String.prototype);}
function getCookie(name){var start=document.cookie.indexOf(name+"=");var len=start+name.length+1;if((!start)&&(name!=document.cookie.substring(0,name.length))){return null;}
if(start==-1)return null;var end=document.cookie.indexOf(';',len);if(end==-1)end=document.cookie.length;return unescape(document.cookie.substring(len,end));}
function setCookie(name,value,expires,path,domain,secure){var today=new Date();today.setTime(today.getTime());if(expires){expires=expires*1000*60*60*24;}
var expires_date=new Date(today.getTime()+(expires));document.cookie=name+'='+escape(value)+
((expires)?';expires='+expires_date.toGMTString():'')+
((path)?';path='+path:'')+
((domain)?';domain='+domain:'')+
((secure)?';secure':'');}
function deleteCookie(name,path,domain){if(getCookie(name))document.cookie=name+'='+
((path)?';path='+path:'')+
((domain)?';domain='+domain:'')+';expires=Thu, 01-Jan-1970 00:00:01 GMT';}
function $(){var elements={};for(var i=0;i<arguments.length;i++){var element=arguments[i];if(typeof element=='string')
element=document.getElementById(element);if(arguments.length==1)
return element;elements[arguments[i]]=element;}
return elements;}