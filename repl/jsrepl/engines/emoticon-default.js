(function(){var l,n,m,o,q={}.hasOwnProperty,r=function(d,a){function b(){this.constructor=d}for(var c in a)q.call(a,c)&&(d[c]=a[c]);b.prototype=a.prototype;d.prototype=new b;d.__super__=a.prototype;return d};l=function(){function d(a,b){var c;this.value=a;this.type=b;if(this.type==="emoticon"&&(c=this.value.split(""),this.mouth=c.pop(),this.nose=c.pop(),this.face=c.join(""),this.face===""))this.face=this.nose,this.nose=null}d.prototype.toString=function(){return this.value};return d}();o=function(d){function a(a){this.message=
a}r(a,d);a.prototype.name="RuntimeError";return a}(Error);m=function(){return function(d){var a,b,c,p,e,g,i,f,h;c=/^([^\s]+[OC<>\[\]VD@PQ7L#${}\\\/()|3E*])(\s|$)/;e=/^-?\d+/;g=/^[ \t\v]+/;p=/^(\n)/;b=/^\*\*([^*]|\*[^*])*\*\*/;i=/^([^\s]+)\s*/;for(f=[];d;){if(a=d.match(g))a=a[0];else if(a=d.match(p))a=a[0];else if(a=d.match(b))a=a[0];else if(a=d.match(c))a=a[1],h=new l(a,"emoticon"),f.push(h);else if(a=d.match(e))a=a[0],h=new l(parseInt(a),"data"),f.push(h);else if(a=d.match(i))a=a[1],h=new l(a,"data"),
f.push(h);d=d.slice(a.length)}return f}}();n=function(){function d(a){var b;b=a.source;this.print=a.print;this.input=a.input;this.result=a.result;this.logger=a.logger;b.unshift("START");this.lists={X:[1],Z:b,A:[":"],G:[],S:[" "],E:[],":":[]}}d.prototype.debug=function(){var a,b,c,d;if(this.logger==null)return false;this.logger("step "+this.left("X"));b="";d=this.lists;for(a in d)c=d[a],b+="\n"+a+": "+c.toString();return this.logger(b)};d.prototype.closestDivideOrClose=function(a){var b;for(b=this.lists.Z;a<
b.length;){if(b[a].mouth===")")return a;else if(b[a].mouth==="|")return this.lists.G[0]="IF",a;a++}return infinity};d.prototype.closestCloser=function(a){var b;for(b=this.lists.Z;a<b.length;){if(b[a].mouth===")")return a;a++}return infinity};d.prototype.left=function(a){return this.lists[a][0]};d.prototype.right=function(a){return this.lists[a][this.lists[a].length-1]};d.prototype.putRight=function(a,b){return this.lists[a].push(b)};d.prototype.putLeft=function(a,b){return this.lists[a].unshift(b)};
d.prototype.currentList=function(){return this.left("A")};d.prototype.clone=function(a){var b,c,d,e,a=this.lists[a];if(a.map!=null)return a.map(function(a){return a});e=[];for(c=0,d=a.length;c<d;c++)b=a[c],e.push(b);return e};d.prototype.run=function(){var a,b;a=true;for(b=0;a&&typeof a!=="function"&&b<3E4;)b++,this.debug(),a=this.step();typeof a==="function"?a():typeof this.result==="function"&&this.result(this.lists);return this.lists};d.prototype.step=function(){var a;a=this.lists.Z[this.left("X")];
if(!a)return false;a instanceof l||(a=(new m(a))[0]);if(a.type==="data")this.putRight(this.currentList(),a.value),this.lists.X[0]++;else if(a.type==="emoticon")return a=this.execute(a),this.lists.X[0]++,a;return true};d.prototype.execute=function(a){var b,c,d,e,g,i,f,h,k,j=this;h=a.mouth;g=a.nose;c=a.face;b=function(b,c){if(j.lists[c].length<b)throw new o("List '"+c+"' needs to have at least #"+b+" items to execute "+a+" at "+j.left("X"));};c.length===1&&c[0]===":"?f=this.lists[":"]:c.length===2&&
c[1]===":"&&c[0]in this.lists?(c=c[0],f=this.lists[c]):f=this.lists[c]?this.lists[c]:this.lists[c]=[];d=this.currentList();e=this.lists[d];switch(h){case "O":this.lists.A[0]=c;break;case "C":e.unshift(f.length);break;case "<":b(1,d);this.putLeft(c,e.shift());break;case ">":b(1,d);this.putRight(c,e.pop());break;case "[":b(1,d);this.putLeft(c,this.left(d));break;case "]":b(1,d);this.putRight(c,this.right(d));break;case "V":b(2,":");e=this.lists[":"].shift();g=this.lists[":"].shift();for(c=this.clone(d);c.length;)i=
c.shift(),b=e>0?1:0,e--,i=f.splice(g,b,i),g++,b&&this.putRight(":",i[0]);break;case "D":this.lists[c]=f=this.clone(d);break;case "@":b(1,d);for(b=g=this.left(d);g<=1?b<=1:b>=1;g<=1?++b:--b)this.putLeft(c,f.pop());break;case "P":b(1,c);this.print(f[0].toString());break;case "Q":b(1,c);this.print(f.shift().toString());break;case "7":b(1,c);b=[];k=f.shift().split("");for(e=0,i=k.length;e<i;e++)g=k[e],b.push(g);this.lists[c]=f=b.concat(f);break;case "L":b(1,c);b=[];k=f.pop().split("");for(e=0,i=k.length;e<
i;e++)g=k[e],b.push(g);this.lists[c]=f.concat(b);break;case "#":c=this.left(d);b=isNaN(c)?f.splice(0,f.length):f.splice(0,c);b=g==="~"?b.join(" "):b.join("");f.unshift(b);break;case "$":c=this.left(d);b=f.splice(-c,c);b=g==="~"?b.join(" "):b.join("");f.push(b);break;case "{":case "}":b(2,c);e=function(a){return h==="{"?f.unshift(a):f.push(a)};c=function(){return h==="{"?f.shift():f.pop()};b=c();c=c();switch(g){case "+":e(b+c);break;case "-":e(b-c);break;case "x":e(b*c);break;case "/":e(b/c);break;
case "\\":e(b%c)}break;case "\\":case "/":e=function(a){return h==="\\"?j.lists[":"].unshift(a.toString().toUpperCase()):j.lists[":"].push(a.toString().toUpperCase())};b=h==="\\"?this.left(d):this.right(d);c=h==="\\"?this.left(c):this.right(c);switch(g){case "=":e(b===c);break;case ">":e(b>c);break;case "<":e(b<c);break;case "~":e(b!==c)}break;case "(":this.lists.G.push(this.left("X"));break;case ")":c=this.lists.G.pop();c=c==="IF"?this.left("X"):c-1;this.lists.X[0]=c;break;case "|":this.lists.X[0]=
this.closestCloser(this.left("X"));break;case "3":case "E":c=this.left(":");c==="TRUE"&&(this.lists.X[0]=this.closestDivideOrClose(this.left("X")));(h==="E"&&c==="TRUE"||c==="FALSE")&&this.lists[":"].shift();break;case "*":return function(){return j.input(function(a){var b,c,e,a=a.split(/[ \t\v]+/);for(c=0,e=a.length;c<e;c++)b=a[c],j.putRight(d,b);return j.run()})}}return true};return d}();window.Emoticon={Parser:m,Interpreter:n}}).call(this);
