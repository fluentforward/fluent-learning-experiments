BF=function(){var h=function(d,a,c){this.type=d;this.value=a;this.number=c;this.toString=function(){return a}},f=RangeError?new RangeError("Data pointer out of range."):Error("Data pointer out of range."),e=function(d){var a=[],c=0,b,g,e,f={">":"increment_pointer","<":"decrement_pointer","+":"increment_data","-":"decrement_data",".":"output",",":"input","[":"jump_forward_if_zero","]":"jump_backward_if_nonzero"};e=[];for(d=d.split("");d.length;)if(b=d.shift(),f[b]){g=new h(f[b],b,c);if(b==="[")e.push(g);
else if(b==="]"){b=e.pop();if(!b)throw Error("Mismatched Brackets.");b.match=g.number;g.match=b.number}a.push(g);c++}this.tokenized=a},i=function(){var d=function(a,c,b){this.user_input=a;this.user_output=c;this.result=typeof b==="function"?b:function(){};this.reset()};d.prototype={reset:function(){this.i_ptr=this.d_ptr=0;this.data=[]},evaluate:function(a){this.code=(a instanceof e?a:new e(a)).tokenized;this.i_ptr=0;this.run()},run:function(){for(var a=true;typeof a!=="function";)(this.instruction=
this.code[this.i_ptr])?(a=this[this.instruction.type](),this.i_ptr++):a=this.result;a(this.data,this.d_ptr)},increment_pointer:function(){if(this.d_ptr===29999)throw f;this.d_ptr++},decrement_pointer:function(){if(this.d_ptr===0)throw f;this.d_ptr--},zerofy:function(){this.data[this.d_ptr]===void 0&&(this.data[this.d_ptr]=0)},increment_data:function(){this.zerofy();this.data[this.d_ptr]++},decrement_data:function(){this.zerofy();this.data[this.d_ptr]--},output:function(){this.user_output(String.fromCharCode(this.data[this.d_ptr]))},
input:function(){var a=this;return function(){a.user_input(function(c){c=c.toString();a.data[a.d_ptr]=c.charCodeAt(0)||10;a.run()})}},jump_forward_if_zero:function(){if(!this.data[this.d_ptr])this.i_ptr=this.instruction.match},jump_backward_if_nonzero:function(){if(this.data[this.d_ptr])this.i_ptr=this.instruction.match}};return d}();return{Parser:e,Interpreter:i}}();