(function(g){function e(){a=allocate([115,115,58,99,114,121,112,116,0],"i8",ALLOC_NORMAL);c=allocate([115,0],"i8",ALLOC_NORMAL);d=allocate([99,114,121,112,116,40,119,111,114,100,44,32,115,97,108,116,41,32,45,62,32,115,116,114,105,110,103,10,119,111,114,100,32,119,105,108,108,32,117,115,117,97,108,108,121,32,98,101,32,97,32,117,115,101,114,39,115,32,112,97,115,115,119,111,114,100,46,32,115,97,108,116,32,105,115,32,97,32,50,45,99,104,97,114,
97,99,116,101,114,32,115,116,114,105,110,103,10,119,104,105,99,104,32,119,105,108,108,32,98,101,32,117,115,101,100,32,116,111,32,115,101,108,101,99,116,32,111,110,101,32,111,102,32,52,48,57,54,32,118,97,114,105,97,116,105,111,110,115,32,111,102,32,68,69,83,46,32,84,104,101,32,99,104,97,114,97,99,116,101,114,115,10,105,110,32,115,97,108,116,32,109,117,115,116,32,98,101,32,101,105,116,104,101,114,32,34,46,34,44,32,34,47,34,44,32,111,114,32,97,110,32,97,108,112,104,97,110,117,109,101,114,105,99,32,99,
104,97,114,97,99,116,101,114,46,32,82,101,116,117,114,110,115,10,116,104,101,32,104,97,115,104,101,100,32,112,97,115,115,119,111,114,100,32,97,115,32,97,32,115,116,114,105,110,103,44,32,119,104,105,99,104,32,119,105,108,108,32,98,101,32,99,111,109,112,111,115,101,100,32,111,102,32,99,104,97,114,97,99,116,101,114,115,32,102,114,111,109,10,116,104,101,32,115,97,109,101,32,97,108,112,104,97,98,101,116,32,97,115,32,116,104,101,32,115,97,108,116,46,0],"i8",ALLOC_NORMAL);f=allocate([99,114,121,112,116,
0],"i8",ALLOC_NORMAL);h=allocate([0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],["i8*",0,0,0,"%struct.PyObject* (%struct.PyObject*, %struct.PyObject*)*",0,0,0,"i32",0,0,0,"i8*",0,0,0,"i8*",0,0,0,"%struct.PyObject* (%struct.PyObject*, %struct.PyObject*)*",0,0,0,"i8","i8","i8","i8","i8","i8","i8","i8"],ALLOC_NORMAL);HEAP[h]=f;HEAP[h+4]=g+2;HEAP[h+12]=d}var b={arguments:[]};Runtime.QUANTUM_SIZE=4;var a,c,d,f,h;b._initcrypt=function(){_Py_InitModule4(f,h,0,0,1013)};FUNCTION_TABLE=FUNCTION_TABLE.concat([0,
0,function(b,e){var d=STACKTOP;STACKTOP+=8;_memset(d,0,8);var f;for(f=-1;;)switch(f){case -1:var g,h;g=d;var p=d+4;f=_PyArg_ParseTuple(e,a,allocate([g,0,0,0,p,0,0,0],["i8**",0,0,0,"i8**",0,0,0],ALLOC_STACK))==0?1:2;break;case 1:h=0;f=3;break;case 2:f=_crypt(HEAP[g],HEAP[p]);h=_Py_BuildValue(c,allocate([f,0,0,0],["i8*",0,0,0],ALLOC_STACK));f=3;break;case 3:return g=h,STACKTOP=d,g;default:assert(0,"bad label: "+f)}},0]);b.run=e;e();return b});