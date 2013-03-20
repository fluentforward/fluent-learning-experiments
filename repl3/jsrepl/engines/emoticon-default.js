(function(){var l,n,m,o,p={}.hasOwnProperty,q=function(d,c){function a(){this.constructor=d}for(var b in c)p.call(c,b)&&(d[b]=c[b]);a.prototype=c.prototype;d.prototype=new a;d.__super__=c.prototype;return d};l=function(){function d(c,a){var b;this.value=c;this.type=a;if(this.type==="emoticon"&&(b=this.value.split(""),this.mouth=b.pop(),this.nose=b.pop(),this.face=b.join(""),this.face===""))this.face=this.nose,this.nose=null}d.name="Instruction";d.prototype.toString=function(){return this.value};return d}();
o=function(d){function c(a){this.message=a}q(c,d);c.name="RuntimeError";c.prototype.name="RuntimeError";return c}(Error);m=function(){function d(c){var a,b,d,e,g,j,f,h,i;d=/^([^\s]+[OC<>\[\]VD@PQ7L#${}\\\/()|3E*])(\s|$)/;g=/^-?\d+/;j=/^[ \t\v]+/;e=/^(\n)/;b=/^\*\*([^*]|\*[^*])*\*\*/;f=/^([^\s]+)\s*/;for(h=[];c;){if(a=c.match(j))a=a[0];else if(a=c.match(e))a=a[0];else if(a=c.match(b))a=a[0];else if(a=c.match(d))a=a[1],i=new l(a,"emoticon"),h.push(i);else if(a=c.match(g))a=a[0],i=new l(parseInt(a),
"data"),h.push(i);else if(a=c.match(f))a=a[1],i=new l(a,"data"),h.push(i);c=c.slice(a.length)}return h}d.name="Parser";return d}();n=function(){function d(c){var a;a=c.source;this.print=c.print;this.input=c.input;this.result=c.result;this.logger=c.logger;a.unshift("START");this.lists={X:[1],Z:a,A:[":"],G:[],S:[" "],E:[],":":[]}}d.name="Interpreter";d.prototype.debug=function(){var c,a,b,d;if(this.logger==null)return false;this.logger("step "+this.left("X"));a="";d=this.lists;for(c in d)b=d[c],a+=
"\n"+c+": "+b.toString();return this.logger(a)};d.prototype.closestDivideOrClose=function(c){var a;for(a=this.lists.Z;c<a.length;){if(a[c].mouth===")")return c;else if(a[c].mouth==="|")return this.lists.G[0]="IF",c;c++}return infinity};d.prototype.closestCloser=function(c){var a;for(a=this.lists.Z;c<a.length;){if(a[c].mouth===")")return c;c++}return infinity};d.prototype.left=function(c){return this.lists[c][0]};d.prototype.right=function(c){return this.lists[c][this.lists[c].length-1]};d.prototype.putRight=
function(c,a){return this.lists[c].push(a)};d.prototype.putLeft=function(c,a){return this.lists[c].unshift(a)};d.prototype.currentList=function(){return this.left("A")};d.prototype.clone=function(c){var a,b,d,e,c=this.lists[c];if(c.map!=null)return c.map(function(a){return a});e=[];for(b=0,d=c.length;b<d;b++)a=c[b],e.push(a);return e};d.prototype.run=function(){var c,a;c=true;for(a=0;c&&typeof c!=="function"&&a<3E4;)a++,this.debug(),c=this.step();typeof c==="function"?c():typeof this.result==="function"&&
this.result(this.lists);return this.lists};d.prototype.step=function(){var c;c=this.lists.Z[this.left("X")];if(!c)return false;c instanceof l||(c=(new m(c))[0]);if(c.type==="data")this.putRight(this.currentList(),c.value),this.lists.X[0]++;else if(c.type==="emoticon")return c=this.execute(c),this.lists.X[0]++,c;return true};d.prototype.execute=function(c){var a,b,d,e,g,j,f,h,i,k=this;h=c.mouth;g=c.nose;b=c.face;a=function(a,b){if(k.lists[b].length<a)throw new o("List '"+b+"' needs to have at least #"+
a+" items to execute "+c+" at "+k.left("X"));};b.length===1&&b[0]===":"?f=this.lists[":"]:b.length===2&&b[1]===":"&&b[0]in this.lists?(b=b[0],f=this.lists[b]):f=this.lists[b]?this.lists[b]:this.lists[b]=[];d=this.currentList();e=this.lists[d];switch(h){case "O":this.lists.A[0]=b;break;case "C":e.unshift(f.length);break;case "<":a(1,d);this.putLeft(b,e.shift());break;case ">":a(1,d);this.putRight(b,e.pop());break;case "[":a(1,d);this.putLeft(b,this.left(d));break;case "]":a(1,d);this.putRight(b,this.right(d));
break;case "V":a(2,":");e=this.lists[":"].shift();g=this.lists[":"].shift();for(b=this.clone(d);b.length;)j=b.shift(),a=e>0?1:0,e--,j=f.splice(g,a,j),g++,a&&this.putRight(":",j[0]);break;case "D":this.lists[b]=f=this.clone(d);break;case "@":a(1,d);for(a=g=this.left(d);g<=1?a<=1:a>=1;g<=1?++a:--a)this.putLeft(b,f.pop());break;case "P":a(1,b);this.print(f[0].toString());break;case "Q":a(1,b);this.print(f.shift().toString());break;case "7":a(1,b);a=[];i=f.shift().split("");for(e=0,j=i.length;e<j;e++)g=
i[e],a.push(g);this.lists[b]=f=a.concat(f);break;case "L":a(1,b);a=[];i=f.pop().split("");for(e=0,j=i.length;e<j;e++)g=i[e],a.push(g);this.lists[b]=f.concat(a);break;case "#":b=this.left(d);a=isNaN(b)?f.splice(0,f.length):f.splice(0,b);a=g==="~"?a.join(" "):a.join("");f.unshift(a);break;case "$":b=this.left(d);a=f.splice(-b,b);a=g==="~"?a.join(" "):a.join("");f.push(a);break;case "{":case "}":a(2,b);e=function(a){return h==="{"?f.unshift(a):f.push(a)};b=function(){return h==="{"?f.shift():f.pop()};
a=b();b=b();switch(g){case "+":e(a+b);break;case "-":e(a-b);break;case "x":e(a*b);break;case "/":e(a/b);break;case "\\":e(a%b)}break;case "\\":case "/":e=function(a){return h==="\\"?k.lists[":"].unshift(a.toString().toUpperCase()):k.lists[":"].push(a.toString().toUpperCase())};a=h==="\\"?this.left(d):this.right(d);b=h==="\\"?this.left(b):this.right(b);switch(g){case "=":e(a===b);break;case ">":e(a>b);break;case "<":e(a<b);break;case "~":e(a!==b)}break;case "(":this.lists.G.push(this.left("X"));break;
case ")":b=this.lists.G.pop();b=b==="IF"?this.left("X"):b-1;this.lists.X[0]=b;break;case "|":this.lists.X[0]=this.closestCloser(this.left("X"));break;case "3":case "E":b=this.left(":");b==="TRUE"&&(this.lists.X[0]=this.closestDivideOrClose(this.left("X")));(h==="E"&&b==="TRUE"||b==="FALSE")&&this.lists[":"].shift();break;case "*":return function(){return k.input(function(a){var c,b,e,a=a.split(/[ \t\v]+/);for(b=0,e=a.length;b<e;b++)c=a[b],k.putRight(d,c);return k.run()})}}return true};return d}();
window.Emoticon={Parser:m,Interpreter:n}}).call(this);
