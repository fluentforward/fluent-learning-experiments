(function(){var h;h=5;self.JSREPLEngine=function(){function b(a,d,e,g,f,b){var c=this;this.sandbox=f;this.inputting=this.finished=this.printed=false;this.lines=0;this.sandbox._init();this.sandbox._error=function(a){c.finished=true;return g(a)};this.sandbox._print=function(a){c.printed=true;return d(a)};this.sandbox._prompt=function(){if(--c.lines===0&&!c.inputting&&!c.finished)return c.sandbox._finish()};this.sandbox._input=function(d){if(!c.finished)return c.inputting=true,a(function(a){var b,e,
g;for(e=0,g=a.length;e<g;e++)b=a[e],c.sandbox.inbuf.push(b.charCodeAt(0));c.sandbox.inbuf.push(13);c.inputting=false;return d()})};this.sandbox._finish=function(){var a;if(!c.finished)return c.sandbox.inbuf=[],a=c.sandbox._stacktop(h+1),a.length?(a.length>h&&(a[0]="..."),e(a.join(" "))):(c.printed&&d("\n"),e("")),c.finished=true};b()}b.name="JSREPLEngine";b.prototype.Eval=function(a){this.inputting=this.finished=this.printed=false;this.lines=a.split("\n").length;try{return this.sandbox._run(a)}catch(b){this.sandbox._error(b)}};
b.prototype.EvalSync=function(){};b.prototype.GetNextLineIndent=function(a){var b;b=function(a){var b,f,d,c;b=0;c=a.split(/\s+/);for(f=0,d=c.length;f<d;f++)switch(a=c[f],a){case ":":++b;break;case ";":--b}return b};return b(a)<=0?false:(a=b(a.split("\n").slice(-1)[0]),a>0?1:a<0?a:0)};return b}()}).call(this);