(function(){self.JSREPLEngine=function(){function c(b,a,d,c,e,f){var g=this;this.input=b;this.output=a;this.result=d;this.error=c;this.sandbox=e;this.Unlambda=this.sandbox.Unlambda;this.result=function(a){return d(g.Unlambda.unparse(a))};f()}c.name="JSREPLEngine";c.prototype.Eval=function(b){var a;try{a=this.Unlambda.parse(b)}catch(d){this.error(d);return}return this.Unlambda.eval(a,this.result,this.input,this.output,this.error)};c.prototype.EvalSync=function(b){var a;a=null;this.Unlambda.eval(this.Unlambda.parse(b),
function(d){return a=d},function(a){return a()},this.output,function(a){throw a;});return a};c.prototype.GetNextLineIndent=function(b){if(/`$/.test(b))return 0;try{return this.Unlambda.parse(b),false}catch(a){return 0}};return c}()}).call(this);
