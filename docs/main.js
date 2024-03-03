
//${CONFIG_BEGIN}
CFG_BINARY_FILES="*.bin|*.dat";
CFG_BRL_DATABUFFER_IMPLEMENTED="1";
CFG_BRL_GAMETARGET_IMPLEMENTED="1";
CFG_BRL_THREAD_IMPLEMENTED="1";
CFG_CD="";
CFG_COLOR_USE_NORMALISED_COMPONENTS="1";
CFG_CONFIG="debug";
CFG_GLFW_COPY_LIBS="openal32";
CFG_GLFW_COPY_LIBS_32="openal32";
CFG_GLFW_GCC_LIB_OPTS="-lopenal32";
CFG_HOST="winnt";
CFG_HTML5_APP_FILENAME="CerberusGame.html";
CFG_HTML5_APP_ICON="";
CFG_HTML5_APP_TITLE="CerberusGame";
CFG_HTML5_CANVAS_ALPHA="0";
CFG_HTML5_CANVAS_ANTIALIAS="1";
CFG_HTML5_CANVAS_HEIGHT="480";
CFG_HTML5_CANVAS_RESIZE_MODE="1";
CFG_HTML5_CANVAS_WIDTH="640";
CFG_HTML5_CONSOLE_SHOW="1";
CFG_HTML5_WEBAUDIO_ENABLED="1";
CFG_IMAGE_FILES="*.png|*.jpg";
CFG_LANG="js";
CFG_MODPATH="";
CFG_MOJO_AUTO_SUSPEND_ENABLED="1";
CFG_MOJO_DRIVER_IMPLEMENTED="1";
CFG_MOJO_IMAGE_FILTERING_ENABLED="1";
CFG_MUSIC_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_OPENGL_DEPTH_BUFFER_ENABLED="1";
CFG_OPENGL_GLES20_ENABLED="1";
CFG_SAFEMODE="0";
CFG_SOUND_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_TARGET="html5";
CFG_TEXT_FILES="*.glsl|*.txt|*.xml|*.json";
//${CONFIG_END}

//${METADATA_BEGIN}
var META_DATA="[font.png];type=image/png;width=960;height=16;\n[mojo_font.png];type=image/png;width=864;height=13;\n[mojo2_font.png];type=image/png;width=960;height=16;\n";
//${METADATA_END}

//${TRANSCODE_BEGIN}

// Javascript Cerberus runtime.
//
// Placed into the public domain 24/02/2011.
// No warranty implied; use at your own risk.

//***** JavaScript Runtime *****

var D2R=0.017453292519943295;
var R2D=57.29577951308232;

var err_info="";
var err_stack=[];

var dbg_index=0;

function push_err(){
	err_stack.push( err_info );
}

function pop_err(){
	err_info=err_stack.pop();
}

function stackTrace(){
	if( !err_info.length ) return "";
	var str=err_info+"\n";
	for( var i=err_stack.length-1;i>0;--i ){
		str+=err_stack[i]+"\n";
	}
	return str;
}

function print( str ){
	var cons=document.getElementById( "GameConsole" );
	if( cons ){
		cons.value+=str+"\n";
		cons.scrollTop=cons.scrollHeight-cons.clientHeight;
	}else if( window.console!=undefined ){
		window.console.log( str );
	}
	return 0;
}

function alertError( err ){
	if( typeof(err)=="string" && err=="" ) return;
	alert( "Cerberus Runtime Error : "+err.toString()+"\n\n"+stackTrace() );
}

function error( err ){
	throw err;
}

//function debugLog( str ){
//	if( window.console!=undefined ) window.console.log( str );
//}

function debugLog( str ){
	var cons=document.getElementById( "GameConsole" );
	if( cons ){
		cons.value+=str+"\n";
		cons.scrollTop=cons.scrollHeight-cons.clientHeight;
	}else if( window.console!=undefined ){
		window.console.log( str );
	}
	return 0;
}

function debugStop(){
	debugger;	//	error( "STOP" );
}

function dbg_object( obj ){
	if( obj ) return obj;
	error( "Null object access" );
}

function dbg_charCodeAt( str,index ){
	if( index<0 || index>=str.length ) error( "Character index out of range" );
	return str.charCodeAt( index );
}

function dbg_array( arr,index ){
	if( index<0 || index>=arr.length ) error( "Array index out of range" );
	dbg_index=index;
	return arr;
}

function new_bool_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=false;
	return arr;
}

function new_number_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=0;
	return arr;
}

function new_string_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]='';
	return arr;
}

function new_array_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=[];
	return arr;
}

function new_object_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=null;
	return arr;
}

function resize_bool_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=false;
	return arr;
}

function resize_number_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=0;
	return arr;
}

function resize_string_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]="";
	return arr;
}

function resize_array_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=[];
	return arr;
}

function resize_object_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=null;
	return arr;
}

function string_compare( lhs,rhs ){
	var n=Math.min( lhs.length,rhs.length ),i,t;
	for( i=0;i<n;++i ){
		t=lhs.charCodeAt(i)-rhs.charCodeAt(i);
		if( t ) return t;
	}
	return lhs.length-rhs.length;
}

function string_replace( str,find,rep ){	//no unregex replace all?!?
	var i=0;
	for(;;){
		i=str.indexOf( find,i );
		if( i==-1 ) return str;
		str=str.substring( 0,i )+rep+str.substring( i+find.length );
		i+=rep.length;
	}
}

function string_trim( str ){
	var i=0,i2=str.length;
	while( i<i2 && str.charCodeAt(i)<=32 ) i+=1;
	while( i2>i && str.charCodeAt(i2-1)<=32 ) i2-=1;
	return str.slice( i,i2 );
}

function string_startswith( str,substr ){
	return substr.length<=str.length && str.slice(0,substr.length)==substr;
}

function string_endswith( str,substr ){
	return substr.length<=str.length && str.slice(str.length-substr.length,str.length)==substr;
}

function string_tochars( str ){
	var arr=new Array( str.length );
	for( var i=0;i<str.length;++i ) arr[i]=str.charCodeAt(i);
	return arr;
}

function string_fromchars( chars ){
	var str="",i;
	for( i=0;i<chars.length;++i ){
		str+=String.fromCharCode( chars[i] );
	}
	return str;
}

function object_downcast( obj,clas ){
	if( obj instanceof clas ) return obj;
	return null;
}

function object_implements( obj,iface ){
	if( obj && obj.implments && obj.implments[iface] ) return obj;
	return null;
}

function extend_class( clas ){
	var tmp=function(){};
	tmp.prototype=clas.prototype;
	return new tmp;
}

function ThrowableObject(){
}

ThrowableObject.prototype.toString=function(){ 
	return "Uncaught Cerberus Exception"; 
}


function BBGameEvent(){}
BBGameEvent.KeyDown=1;
BBGameEvent.KeyUp=2;
BBGameEvent.KeyChar=3;
BBGameEvent.MouseDown=4;
BBGameEvent.MouseUp=5;
BBGameEvent.MouseMove=6;
BBGameEvent.TouchDown=7;
BBGameEvent.TouchUp=8;
BBGameEvent.TouchMove=9;
BBGameEvent.MotionAccel=10;

function BBGameDelegate(){}
BBGameDelegate.prototype.StartGame=function(){}
BBGameDelegate.prototype.SuspendGame=function(){}
BBGameDelegate.prototype.ResumeGame=function(){}
BBGameDelegate.prototype.UpdateGame=function(){}
BBGameDelegate.prototype.RenderGame=function(){}
BBGameDelegate.prototype.KeyEvent=function( ev,data ){}
BBGameDelegate.prototype.MouseEvent=function( ev,data,x,y,z ){}
BBGameDelegate.prototype.TouchEvent=function( ev,data,x,y ){}
BBGameDelegate.prototype.MotionEvent=function( ev,data,x,y,z ){}
BBGameDelegate.prototype.DiscardGraphics=function(){}

function BBDisplayMode( width,height ){
	this.width=width;
	this.height=height;
}

function BBGame(){
	BBGame._game=this;
	this._delegate=null;
	this._keyboardEnabled=false;
	this._updateRate=0;
	this._started=false;
	this._suspended=false;
	this._debugExs=(CFG_CONFIG=="debug");
	this._startms=Date.now();
}

BBGame.Game=function(){
	return BBGame._game;
}

BBGame.prototype.SetDelegate=function( delegate ){
	this._delegate=delegate;
}

BBGame.prototype.Delegate=function(){
	return this._delegate;
}

BBGame.prototype.SetUpdateRate=function( updateRate ){
	this._updateRate=updateRate;
}

BBGame.prototype.SetKeyboardEnabled=function( keyboardEnabled ){
	this._keyboardEnabled=keyboardEnabled;
}

BBGame.prototype.Started=function(){
	return this._started;
}

BBGame.prototype.Suspended=function(){
	return this._suspended;
}

BBGame.prototype.Millisecs=function(){
	return Date.now()-this._startms;
}

BBGame.prototype.GetDate=function( date ){
	var n=date.length;
	if( n>0 ){
		var t=new Date();
		date[0]=t.getFullYear();
		if( n>1 ){
			date[1]=t.getMonth()+1;
			if( n>2 ){
				date[2]=t.getDate();
				if( n>3 ){
					date[3]=t.getHours();
					if( n>4 ){
						date[4]=t.getMinutes();
						if( n>5 ){
							date[5]=t.getSeconds();
							if( n>6 ){
								date[6]=t.getMilliseconds();
							}
						}
					}
				}
			}
		}
	}
}

BBGame.prototype.SaveState=function( state ){
	localStorage.setItem( "cerberusstate@"+document.URL,state );	//key can't start with dot in Chrome!
	return 1;
}

BBGame.prototype.LoadState=function(){
	var state=localStorage.getItem( "cerberusstate@"+document.URL );
	if( state ) return state;
	return "";
}

BBGame.prototype.LoadString=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );
	
//	if( navigator.userAgent.indexOf( "Chrome/48." )>0 ){
//		xhr.setRequestHeader( "If-Modified-Since","Sat, 1 Jan 2000 00:00:00 GMT" );
//	}
	
	xhr.send( null );
	
	if( xhr.status==200 || xhr.status==0 ) return xhr.responseText;
	
	return "";
}

BBGame.prototype.CountJoysticks=function( update ){
	return 0;
}

BBGame.prototype.PollJoystick=function( port,joyx,joyy,joyz,buttons ){
	return false;
}

BBGame.prototype.OpenUrl=function( url ){
	window.location=url;
}

BBGame.prototype.SetMouseVisible=function( visible ){
	if( visible ){
		this._canvas.style.cursor='default';	
	}else{
		this._canvas.style.cursor="url('data:image/cur;base64,AAACAAEAICAAAAAAAACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA55ZXBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOeWVxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADnllcGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9////////////////////+////////f/////////8%3D'), auto";
	}
}

BBGame.prototype.GetDeviceWidth=function(){
	return 0;
}

BBGame.prototype.GetDeviceHeight=function(){
	return 0;
}

BBGame.prototype.GetDeviceWindowWidth=function(){
	return this.GetDeviceWidth();
}

BBGame.prototype.GetDeviceWindowHeight=function(){
	return this.GetDeviceHeight();
}

BBGame.prototype.SetDeviceWindow=function( width,height,flags ){
}

BBGame.prototype.GetDisplayModes=function(){
	return new Array();
}

BBGame.prototype.GetDesktopMode=function(){
	return null;
}

BBGame.prototype.SetSwapInterval=function( interval ){
}

BBGame.prototype.PathToFilePath=function( path ){
	return "";
}

//***** js Game *****

BBGame.prototype.PathToUrl=function( path ){
	return path;
}

BBGame.prototype.LoadData=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );

	if( xhr.overrideMimeType ) xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
	
//	if( navigator.userAgent.indexOf( "Chrome/48." )>0 ){
//		xhr.setRequestHeader( "If-Modified-Since","Sat, 1 Jan 2000 00:00:00 GMT" );
//	}

	xhr.send( null );
	if( xhr.status!=200 && xhr.status!=0 ) return null;

	var r=xhr.responseText;
	var buf=new ArrayBuffer( r.length );
	var bytes=new Int8Array( buf );
	for( var i=0;i<r.length;++i ){
		bytes[i]=r.charCodeAt( i );
	}
	return buf;
}

//***** INTERNAL ******

BBGame.prototype.Die=function( ex ){

	this._delegate=new BBGameDelegate();
	
	if( !ex.toString() ){
		return;
	}
	
	if( this._debugExs ){
		print( "Cerberus Runtime Error : "+ex.toString() );
		print( stackTrace() );
	}
	
	throw ex;
}

BBGame.prototype.StartGame=function(){

	if( this._started ) return;
	this._started=true;
	
	if( this._debugExs ){
		try{
			this._delegate.StartGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.StartGame();
	}
}

BBGame.prototype.SuspendGame=function(){

	if( !this._started || this._suspended ) return;
	this._suspended=true;
	
	if( this._debugExs ){
		try{
			this._delegate.SuspendGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.SuspendGame();
	}
}

BBGame.prototype.ResumeGame=function(){

	if( !this._started || !this._suspended ) return;
	this._suspended=false;
	
	if( this._debugExs ){
		try{
			this._delegate.ResumeGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.ResumeGame();
	}
}

BBGame.prototype.UpdateGame=function(){

	if( !this._started || this._suspended ) return;

	if( this._debugExs ){
		try{
			this._delegate.UpdateGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.UpdateGame();
	}
}

BBGame.prototype.RenderGame=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.RenderGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.RenderGame();
	}
}

BBGame.prototype.KeyEvent=function( ev,data ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.KeyEvent( ev,data );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.KeyEvent( ev,data );
	}
}

BBGame.prototype.MouseEvent=function( ev,data,x,y,z ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MouseEvent( ev,data,x,y,z );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MouseEvent( ev,data,x,y,z );
	}
}

BBGame.prototype.TouchEvent=function( ev,data,x,y ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.TouchEvent( ev,data,x,y );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.TouchEvent( ev,data,x,y );
	}
}

BBGame.prototype.MotionEvent=function( ev,data,x,y,z ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MotionEvent( ev,data,x,y,z );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MotionEvent( ev,data,x,y,z );
	}
}

BBGame.prototype.DiscardGraphics=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.DiscardGraphics();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.DiscardGraphics();
	}
}


var webglGraphicsSeq=1;

function BBHtml5Game( canvas ){

	BBGame.call( this );
	BBHtml5Game._game=this;
	this._canvas=canvas;
	this._loading=0;
	this._timerSeq=0;
	this._gl=null;
	
	if( CFG_OPENGL_GLES20_ENABLED=="1" ){

		//can't get these to fire!
		canvas.addEventListener( "webglcontextlost",function( event ){
			event.preventDefault();
//			print( "WebGL context lost!" );
		},false );

		canvas.addEventListener( "webglcontextrestored",function( event ){
			++webglGraphicsSeq;
//			print( "WebGL context restored!" );
		},false );

		var attrs={ antialias: ( CFG_HTML5_CANVAS_ANTIALIAS=="1" ), alpha:( CFG_HTML5_CANVAS_ALPHA=="1" ) };
	
		this._gl=this._canvas.getContext( "webgl",attrs );

		if( !this._gl ) this._gl=this._canvas.getContext( "experimental-webgl",attrs );
		
		if( !this._gl ) this.Die( "Can't create WebGL" );
		
		gl=this._gl;
	}
	
	// --- start gamepad api by skn3 ---------
	this._gamepads = null;
	this._gamepadLookup = [-1,-1,-1,-1];//support 4 gamepads
	this._gamepadCount = -1;//Grant Edit HTML5 gamepad count
	var that = this;
	window.addEventListener("gamepadconnected", function(e) {
		that.connectGamepad(e.gamepad);
	});
	
	window.addEventListener("gamepaddisconnected", function(e) {
		that.disconnectGamepad(e.gamepad);
	});
	
	//need to process already connected gamepads (before page was loaded)
	var gamepads = this.getGamepads();
	if (gamepads && gamepads.length > 0) {
		for(var index=0;index < gamepads.length;index++) {
			this.connectGamepad(gamepads[index]);
		}
	}
	// --- end gamepad api by skn3 ---------
}

BBHtml5Game.prototype=extend_class( BBGame );

BBHtml5Game.Html5Game=function(){
	return BBHtml5Game._game;
}

// --- start gamepad api by skn3 ---------

//Grant Edit HTML5 gamepad count ---- start
BBHtml5Game.prototype.CountJoysticks = function( update ) {
	if (update || this._gamepadCount == -1) {
		for (var i = this._gamepadLookup.length-1; i >= 0; i --) {
			if (this._gamepadLookup[i] != -1) {
				this._gamepadCount = i+1;
				return this._gamepadCount;
			}
		}
		return 0;
	}
	return this._gamepadCount;
}
//Grant Edit HTML5 gamepad count ---- end

BBHtml5Game.prototype.getGamepads = function() {
	return navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
}

BBHtml5Game.prototype.connectGamepad = function(gamepad) {
	if (!gamepad) {
		return false;
	}
	
	//check if this is a standard gamepad
//	if (gamepad.mapping == "standard") {
		//yup so lets add it to an array of valid gamepads
		//find empty controller slot
		var slot = -1;
		for(var index = 0;index < this._gamepadLookup.length;index++) {
			if (this._gamepadLookup[index] == -1) {
				slot = index;
				break;
			}
		}
		
		//can we add this?
		if (slot != -1) {
			this._gamepadLookup[slot] = gamepad.index;
			
			//console.log("gamepad at html5 index "+gamepad.index+" mapped to Cerberus gamepad unit "+slot);
		}
//	} else {
//		console.log('Cerberus has ignored gamepad at raw port #'+gamepad.index+' with unrecognised mapping scheme \''+gamepad.mapping+'\'.');
//	}
}

BBHtml5Game.prototype.disconnectGamepad = function(gamepad) {
	if (!gamepad) {
		return false;
	}

	var m_disconnectedIndex = -1;//Grant Edit HTML5 gamepad count

	//scan all gamepads for matching index
	for(var index = 0;index < this._gamepadLookup.length;index++) {
		if (this._gamepadLookup[index] == gamepad.index) {
			//remove this gamepad
			m_disconnectedIndex = index;//Grant Edit HTML5 gamepad count
			this._gamepadLookup[index] = -1
			break;
		}
	}
	//Grant Edit HTML5 gamepad count ---- start
	if (m_disconnectedIndex >= 0 && m_disconnectedIndex < this._gamepadLookup.length-1) {
		for (var i = m_disconnectedIndex+1; i < this._gamepadLookup.length; i ++) {
			this._gamepadLookup[i-1] = this._gamepadLookup[i];
		}
		this._gamepadLookup[this._gamepadLookup.length-1] = -1;
	}
	//Grant Edit HTML5 gamepad count ---- end
}

BBHtml5Game.prototype.PollJoystick=function(port, joyx, joyy, joyz, buttons){
	//is this the first gamepad being polled
	if (port == 0) {
		//yes it is so we use the web api to get all gamepad info
		//we can then use this in subsequent calls to PollJoystick
		this._gamepads = this.getGamepads();
	}
	
	//dont bother processing if nothing to process
	if (!this._gamepads) {
	  return false;
	}
	
	//so use the Cerberus port to find the correct raw data
	var index = this._gamepadLookup[port];
	if (index == -1) {
		return false;
	}

	var gamepad = this._gamepads[index];
	if (!gamepad) {
		return false;
	}
	//so now process gamepad axis/buttons according to the standard mappings
	//https://w3c.github.io/gamepad/#remapping
	
	//left stick axis
	joyx[0] = gamepad.axes[0];
	joyy[0] = -gamepad.axes[1];
	
	//right stick axis
	joyx[1] = gamepad.axes[2];
	joyy[1] = -gamepad.axes[3];
	
	//left trigger
	joyz[0] = gamepad.buttons[6] ? gamepad.buttons[6].value : 0.0;
	
	//right trigger
	joyz[1] = gamepad.buttons[7] ? gamepad.buttons[7].value : 0.0;
	
	//clear button states
	for(var index = 0;index <32;index++) {
		buttons[index] = false;
	}
	
	//map html5 "standard" mapping to Cerberuss joy codes
	/*
	Const JOY_A=0
	Const JOY_B=1
	Const JOY_X=2
	Const JOY_Y=3
	Const JOY_LB=4
	Const JOY_RB=5
	Const JOY_BACK=6
	Const JOY_START=7
	Const JOY_LEFT=8
	Const JOY_UP=9
	Const JOY_RIGHT=10
	Const JOY_DOWN=11
	Const JOY_LSB=12
	Const JOY_RSB=13
	Const JOY_MENU=14
	*/
	buttons[0] = gamepad.buttons[0] && gamepad.buttons[0].pressed;
	buttons[1] = gamepad.buttons[1] && gamepad.buttons[1].pressed;
	buttons[2] = gamepad.buttons[2] && gamepad.buttons[2].pressed;
	buttons[3] = gamepad.buttons[3] && gamepad.buttons[3].pressed;
	buttons[4] = gamepad.buttons[4] && gamepad.buttons[4].pressed;
	buttons[5] = gamepad.buttons[5] && gamepad.buttons[5].pressed;
	buttons[6] = gamepad.buttons[8] && gamepad.buttons[8].pressed;
	buttons[7] = gamepad.buttons[9] && gamepad.buttons[9].pressed;
	buttons[8] = gamepad.buttons[14] && gamepad.buttons[14].pressed;
	buttons[9] = gamepad.buttons[12] && gamepad.buttons[12].pressed;
	buttons[10] = gamepad.buttons[15] && gamepad.buttons[15].pressed;
	buttons[11] = gamepad.buttons[13] && gamepad.buttons[13].pressed;
	buttons[12] = gamepad.buttons[10] && gamepad.buttons[10].pressed;
	buttons[13] = gamepad.buttons[11] && gamepad.buttons[11].pressed;
	buttons[14] = gamepad.buttons[16] && gamepad.buttons[16].pressed;
	
	//success
	return true
}
// --- end gamepad api by skn3 ---------


BBHtml5Game.prototype.ValidateUpdateTimer=function(){

	++this._timerSeq;
	if( this._suspended ) return;
	
	var game=this;
	var seq=game._timerSeq;
	
	var maxUpdates=4;
	var updateRate=this._updateRate;
	
	if( !updateRate ){

		var reqAnimFrame=(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame);
	
		if( reqAnimFrame ){
			function animate(){
				if( seq!=game._timerSeq ) return;
	
				game.UpdateGame();
				if( seq!=game._timerSeq ) return;
	
				reqAnimFrame( animate );
				game.RenderGame();
			}
			reqAnimFrame( animate );
			return;
		}
		
		maxUpdates=1;
		updateRate=60;
	}
	
	var updatePeriod=1000.0/updateRate;
	var nextUpdate=0;

	function timeElapsed(){
		if( seq!=game._timerSeq ) return;
		
		if( !nextUpdate ) nextUpdate=Date.now();
		
		for( var i=0;i<maxUpdates;++i ){
		
			game.UpdateGame();
			if( seq!=game._timerSeq ) return;
			
			nextUpdate+=updatePeriod;
			var delay=nextUpdate-Date.now();
			
			if( delay>0 ){
				setTimeout( timeElapsed,delay );
				game.RenderGame();
				return;
			}
		}
		nextUpdate=0;
		setTimeout( timeElapsed,0 );
		game.RenderGame();
	}

	setTimeout( timeElapsed,0 );
}

//***** BBGame methods *****

BBHtml5Game.prototype.SetUpdateRate=function( updateRate ){

	BBGame.prototype.SetUpdateRate.call( this,updateRate );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.GetMetaData=function( path,key ){
	if( path.indexOf( "cerberus://data/" )!=0 ) return "";
	path=path.slice(16);

	var i=META_DATA.indexOf( "["+path+"]" );
	if( i==-1 ) return "";
	i+=path.length+2;

	var e=META_DATA.indexOf( "\n",i );
	if( e==-1 ) e=META_DATA.length;

	i=META_DATA.indexOf( ";"+key+"=",i )
	if( i==-1 || i>=e ) return "";
	i+=key.length+2;

	e=META_DATA.indexOf( ";",i );
	if( e==-1 ) return "";

	return META_DATA.slice( i,e );
}

BBHtml5Game.prototype.PathToUrl=function( path ){
	if( path.indexOf( "cerberus:" )!=0 ){
		return path;
	}else if( path.indexOf( "cerberus://data/" )==0 ) {
		return "data/"+path.slice( 16 );
	}
	return "";
}

BBHtml5Game.prototype.GetLoading=function(){
	return this._loading;
}

BBHtml5Game.prototype.IncLoading=function(){
	++this._loading;
	return this._loading;
}

BBHtml5Game.prototype.DecLoading=function(){
	--this._loading;
	return this._loading;
}

BBHtml5Game.prototype.GetCanvas=function(){
	return this._canvas;
}

BBHtml5Game.prototype.GetWebGL=function(){
	return this._gl;
}

BBHtml5Game.prototype.GetDeviceWidth=function(){
	return this._canvas.width;
}

BBHtml5Game.prototype.GetDeviceHeight=function(){
	return this._canvas.height;
}

//***** INTERNAL *****

BBHtml5Game.prototype.UpdateGame=function(){

	if( !this._loading ) BBGame.prototype.UpdateGame.call( this );
}

BBHtml5Game.prototype.SuspendGame=function(){

	BBGame.prototype.SuspendGame.call( this );
	
	BBGame.prototype.RenderGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.ResumeGame=function(){

	BBGame.prototype.ResumeGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.Run=function(){

	var game=this;
	var canvas=game._canvas;
	
	var xscale=1;
	var yscale=1;
	
	var touchIds=new Array( 32 );
	for( i=0;i<32;++i ) touchIds[i]=-1;
	
	function eatEvent( e ){
		if( e.stopPropagation ){
			e.stopPropagation();
			e.preventDefault();
		}else{
			e.cancelBubble=true;
			e.returnValue=false;
		}
	}
	
	function keyToChar( key ){
		switch( key ){
		case 8:case 9:case 13:case 27:case 32:return key;
		case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 45:return key|0x10000;
		case 46:return 127;
		}
		return 0;
	}
	// New mouseX and mouseY versions by user SLOTMAN
    function mouseX( e ){
        var x = 0;
        if (canvas) {
            var   rect =  canvas.getBoundingClientRect(),
                    root = document.documentElement;

            // relative mouse position
            x = e.clientX - rect.left - root.scrollLeft;
        }
        return x*xscale;
    }
  
    function mouseY( e ){
      var y = 0;
      if (canvas) {
            var   rect =  canvas.getBoundingClientRect(),
                    root = document.documentElement;
            // relative mouse position
            y = e.clientY - rect.top - root.scrollTop;
        }
        return y*yscale;
    }


	function touchX( touch ){
		var x=touch.pageX;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x*xscale;
	}			
	
	function touchY( touch ){
		var y=touch.pageY;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y*yscale;
	}
	
	window.onkeydown=function( e ){
		game.KeyEvent( BBGameEvent.KeyDown,e.keyCode );
		var chr=keyToChar( e.keyCode );
		if( chr ) game.KeyEvent( BBGameEvent.KeyChar,chr );
		if( e.keyCode<48 || (e.keyCode>111 && e.keyCode<122) ) eatEvent( e );
	}

	window.onkeyup=function( e ){
		game.KeyEvent( BBGameEvent.KeyUp,e.keyCode );
	}

	window.onkeypress=function( e ){
		if( e.charCode ){
			game.KeyEvent( BBGameEvent.KeyChar,e.charCode );
		}else if( e.which ){
			game.KeyEvent( BBGameEvent.KeyChar,e.which );
		}
	}

	canvas.onmousedown=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseDown,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseDown,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseDown,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmouseup=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmousemove=function( e ){
		game.MouseEvent( BBGameEvent.MouseMove,-1,mouseX(e),mouseY(e),0 );
		eatEvent( e );
	}

	canvas.onwheel=function( e ){
		var amount = 0;
		if(e.deltaY < 0){
			amount = 1;
		}else if(e.deltaY > 0){
			amount = -1;
		}
		game.MouseEvent( BBGameEvent.MouseMove, -1, mouseX(e), mouseY(e), amount);
		eatEvent( e );
	}

	canvas.onmouseout=function( e ){
		game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );
		eatEvent( e );
	}
	
	canvas.onclick=function( e ){
		if( game.Suspended() ){
			canvas.focus();
		}
		eatEvent( e );
		return;
	}
	
	canvas.oncontextmenu=function( e ){
		return false;
	}
	
	canvas.ontouchstart=function( e ){
		if( game.Suspended() ){
			canvas.focus();
		}
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=-1 ) continue;
				touchIds[j]=touch.identifier;
				game.TouchEvent( BBGameEvent.TouchDown,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchmove=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				game.TouchEvent( BBGameEvent.TouchMove,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchend=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				touchIds[j]=-1;
				game.TouchEvent( BBGameEvent.TouchUp,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	window.ondevicemotion=function( e ){
		var tx=e.accelerationIncludingGravity.x/9.81;
		var ty=e.accelerationIncludingGravity.y/9.81;
		var tz=e.accelerationIncludingGravity.z/9.81;
		var x,y;
		switch( window.orientation ){
		case   0:x=+tx;y=-ty;break;
		case 180:x=-tx;y=+ty;break;
		case  90:x=-ty;y=-tx;break;
		case -90:x=+ty;y=+tx;break;
		}
		game.MotionEvent( BBGameEvent.MotionAccel,0,x,y,tz );
		eatEvent( e );
	}

	canvas.onfocus=function( e ){
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.ResumeGame();
		}else{
			game.ValidateUpdateTimer();
		}
	}
	
	canvas.onblur=function( e ){
		for( var i=0;i<256;++i ) game.KeyEvent( BBGameEvent.KeyUp,i );
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.SuspendGame();
		}
	}

	canvas.updateSize=function(){
		xscale=canvas.width/canvas.clientWidth;
		yscale=canvas.height/canvas.clientHeight;
		game.RenderGame();
	}
	
	canvas.updateSize();
	
	canvas.focus();
	
	game.StartGame();
	
	game.RenderGame();
}


function BBCerberusGame( canvas ){
	BBHtml5Game.call( this,canvas );
}

BBCerberusGame.prototype=extend_class( BBHtml5Game );

BBCerberusGame.Main=function( canvas ){

	var game=new BBCerberusGame( canvas );

	try{

		bbInit();
		bbMain();

	}catch( ex ){
	
		game.Die( ex );
		return;
	}

	if( !game.Delegate() ) return;
	
	game.Run();
}


// HTML5 mojo runtime.
//
// Copyright 2011 Mark Sibly, all rights reserved.
// No warranty implied; use at your own risk.

// ***** gxtkGraphics class *****

function gxtkGraphics(){
	this.game=BBHtml5Game.Html5Game();
	this.canvas=this.game.GetCanvas()
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	this.gl=null;
	this.gc=this.canvas.getContext( '2d' );
	this.tmpCanvas=null;
	this.r=255;
	this.b=255;
	this.g=255;
	this.white=true;
	this.color="rgb(255,255,255)"
	this.alpha=1;
	this.blend="source-over";
	this.ix=1;this.iy=0;
	this.jx=0;this.jy=1;
	this.tx=0;this.ty=0;
	this.tformed=false;
	this.scissorX=0;
	this.scissorY=0;
	this.scissorWidth=0;
	this.scissorHeight=0;
	this.clipped=false;
}

gxtkGraphics.prototype.BeginRender=function(){
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	if( !this.gc ) return 0;
	
	if(CFG_MOJO_IMAGE_FILTERING_ENABLED!="1" ) {
		this.gc.mozImageSmoothingEnabled = false;
		this.gc.webkitImageSmoothingEnabled = false;
		this.gc.msImageSmoothingEnabled = false;
		this.gc.imageSmoothingEnabled = false;
		this.gc.oImageSmoothingEnabled= false;	
	}
	
	this.gc.save();
	if( this.game.GetLoading() ) return 2;
	return 1;
}

gxtkGraphics.prototype.EndRender=function(){
	if( this.gc ) this.gc.restore();
}

gxtkGraphics.prototype.Width=function(){
	return this.width;
}

gxtkGraphics.prototype.Height=function(){
	return this.height;
}

gxtkGraphics.prototype.LoadSurface=function( path ){
	var game=this.game;

	var ty=game.GetMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;
	
	game.IncLoading();

	var image=new Image();
	image.onload=function(){ game.DecLoading(); }
	image.onerror=function(){ game.DecLoading(); }
	image.meta_width=parseInt( game.GetMetaData( path,"width" ) );
	image.meta_height=parseInt( game.GetMetaData( path,"height" ) );
	image.src=game.PathToUrl( path );

	return new gxtkSurface( image,this );
}

gxtkGraphics.prototype.CreateSurface=function( width,height ){
	var canvas=document.createElement( 'canvas' );
	
	canvas.width=width;
	canvas.height=height;
	canvas.meta_width=width;
	canvas.meta_height=height;
	canvas.complete=true;
	
	var surface=new gxtkSurface( canvas,this );
	
	surface.gc=canvas.getContext( '2d' );
	
	return surface;
}

gxtkGraphics.prototype.SetAlpha=function( alpha ){
	this.alpha=alpha;
	this.gc.globalAlpha=alpha;
}

gxtkGraphics.prototype.SetColor=function( r,g,b ){
	this.r=r;
	this.g=g;
	this.b=b;
	this.white=(r==255 && g==255 && b==255);
	this.color="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;
}

gxtkGraphics.prototype.SetBlend=function( blend ){
	switch( blend ){
	case 1:
		this.blend="lighter";
		break;
	default:
		this.blend="source-over";
	}
	this.gc.globalCompositeOperation=this.blend;
}

gxtkGraphics.prototype.SetScissor=function( x,y,w,h ){
	this.scissorX=x;
	this.scissorY=y;
	this.scissorWidth=w;
	this.scissorHeight=h;
	this.clipped=(x!=0 || y!=0 || w!=this.canvas.width || h!=this.canvas.height);
	this.gc.restore();
	this.gc.save();
	if( this.clipped ){
		this.gc.beginPath();
		this.gc.rect( x,y,w,h );
		this.gc.clip();
		this.gc.closePath();
	}
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;	
	this.gc.globalAlpha=this.alpha;	
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.SetMatrix=function( ix,iy,jx,jy,tx,ty ){
	this.ix=ix;this.iy=iy;
	this.jx=jx;this.jy=jy;
	this.tx=tx;this.ty=ty;
	this.gc.setTransform( ix,iy,jx,jy,tx,ty );
	this.tformed=(ix!=1 || iy!=0 || jx!=0 || jy!=1 || tx!=0 || ty!=0);
}

gxtkGraphics.prototype.Cls=function( r,g,b ){
	if( this.tformed ) this.gc.setTransform( 1,0,0,1,0,0 );
	this.gc.fillStyle="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.globalAlpha=1;
	this.gc.globalCompositeOperation="source-over";
	this.gc.fillRect( 0,0,this.canvas.width,this.canvas.height );
	this.gc.fillStyle=this.color;
	this.gc.globalAlpha=this.alpha;
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.DrawPoint=function( x,y ){
	if( this.tformed ){
		var px=x;
		x=px * this.ix + y * this.jx + this.tx;
		y=px * this.iy + y * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
		this.gc.fillRect( x,y,1,1 );
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
		this.gc.fillRect( x,y,1,1 );
	}
}

gxtkGraphics.prototype.DrawRect=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
	this.gc.fillRect( x,y,w,h );
}

gxtkGraphics.prototype.DrawLine=function( x1,y1,x2,y2 ){
	if( this.tformed ){
		var x1_t=x1 * this.ix + y1 * this.jx + this.tx;
		var y1_t=x1 * this.iy + y1 * this.jy + this.ty;
		var x2_t=x2 * this.ix + y2 * this.jx + this.tx;
		var y2_t=x2 * this.iy + y2 * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1_t,y1_t );
	  	this.gc.lineTo( x2_t,y2_t );
	  	this.gc.stroke();
	  	this.gc.closePath();
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1,y1 );
	  	this.gc.lineTo( x2,y2 );
	  	this.gc.stroke();
	  	this.gc.closePath();
	}
}

gxtkGraphics.prototype.DrawOval=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
  	var w2=w/2,h2=h/2;
	this.gc.save();
	this.gc.translate( x+w2,y+h2 );
	this.gc.scale( w2,h2 );
  	this.gc.beginPath();
	this.gc.arc( 0,0,1,0,Math.PI*2,false );
	this.gc.fill();
  	this.gc.closePath();
	this.gc.restore();
}

gxtkGraphics.prototype.DrawPoly=function( verts ){
	if( verts.length<2 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=2;i<verts.length;i+=2 ){
		this.gc.lineTo( verts[i],verts[i+1] );
	}
	this.gc.fill();
	this.gc.closePath();
}

gxtkGraphics.prototype.DrawPoly2=function( verts,surface,srx,srcy ){
	if( verts.length<4 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=4;i<verts.length;i+=4 ){
		this.gc.lineTo( verts[i],verts[i+1] );
	}
	this.gc.fill();
	this.gc.closePath();
}

gxtkGraphics.prototype.DrawSurface=function( surface,x,y ){
	if( !surface.image.complete ) return;
	
	if( this.white ){
		this.gc.drawImage( surface.image,x,y );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,0,0,surface.swidth,surface.sheight );
}

gxtkGraphics.prototype.DrawSurface2=function( surface,x,y,srcx,srcy,srcw,srch ){
	if( !surface.image.complete ) return;

	if( srcw<0 ){ srcx+=srcw;srcw=-srcw; }
	if( srch<0 ){ srcy+=srch;srch=-srch; }
	if( srcw<=0 || srch<=0 ) return;

	if( this.white ){
		this.gc.drawImage( surface.image,srcx,srcy,srcw,srch,x,y,srcw,srch );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,srcx,srcy,srcw,srch  );
}

gxtkGraphics.prototype.DrawImageTinted=function( image,dx,dy,sx,sy,sw,sh ){

	if( !this.tmpCanvas ){
		this.tmpCanvas=document.createElement( "canvas" );
	}

	if( sw>this.tmpCanvas.width || sh>this.tmpCanvas.height ){
		this.tmpCanvas.width=Math.max( sw,this.tmpCanvas.width );
		this.tmpCanvas.height=Math.max( sh,this.tmpCanvas.height );
	}
	
	var tmpGC=this.tmpCanvas.getContext( "2d" );
	tmpGC.globalCompositeOperation="copy";
	
	tmpGC.drawImage( image,sx,sy,sw,sh,0,0,sw,sh );
	
	var imgData=tmpGC.getImageData( 0,0,sw,sh );
	
	var p=imgData.data,sz=sw*sh*4,i;
	
	for( i=0;i<sz;i+=4 ){
		p[i]=p[i]*this.r/255;
		p[i+1]=p[i+1]*this.g/255;
		p[i+2]=p[i+2]*this.b/255;
	}
	
	tmpGC.putImageData( imgData,0,0 );
	
	this.gc.drawImage( this.tmpCanvas,0,0,sw,sh,dx,dy,sw,sh );
}

gxtkGraphics.prototype.ReadPixels=function( pixels,x,y,width,height,offset,pitch ){

	var imgData=this.gc.getImageData( x,y,width,height );
	
	var p=imgData.data,i=0,j=offset,px,py;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			pixels[j++]=(p[i+3]<<24)|(p[i]<<16)|(p[i+1]<<8)|p[i+2];
			i+=4;
		}
		j+=pitch-width;
	}
}

gxtkGraphics.prototype.WritePixels2=function( surface,pixels,x,y,width,height,offset,pitch ){

	if( !surface.gc ){
		if( !surface.image.complete ) return;
		var canvas=document.createElement( "canvas" );
		canvas.width=surface.swidth;
		canvas.height=surface.sheight;
		surface.gc=canvas.getContext( "2d" );
		surface.gc.globalCompositeOperation="copy";
		surface.gc.drawImage( surface.image,0,0 );
		surface.image=canvas;
	}

	var imgData=surface.gc.createImageData( width,height );

	var p=imgData.data,i=0,j=offset,px,py,argb;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			argb=pixels[j++];
			p[i]=(argb>>16) & 0xff;
			p[i+1]=(argb>>8) & 0xff;
			p[i+2]=argb & 0xff;
			p[i+3]=(argb>>24) & 0xff;
			i+=4;
		}
		j+=pitch-width;
	}
	
	surface.gc.putImageData( imgData,x,y );
}

// ***** gxtkSurface class *****

function gxtkSurface( image,graphics ){
	this.image=image;
	this.graphics=graphics;
	this.swidth=image.meta_width;
	this.sheight=image.meta_height;
}

// ***** GXTK API *****

gxtkSurface.prototype.Discard=function(){
	if( this.image ){
		this.image=null;
	}
}

gxtkSurface.prototype.Width=function(){
	return this.swidth;
}

gxtkSurface.prototype.Height=function(){
	return this.sheight;
}

gxtkSurface.prototype.Loaded=function(){
	return this.image.complete;
}

gxtkSurface.prototype.OnUnsafeLoadComplete=function(){
}

if( CFG_HTML5_WEBAUDIO_ENABLED=="1" && (window.AudioContext || window.webkitAudioContext) ){

//print( "Using WebAudio!" );

// ***** WebAudio *****

var wa=null;

// ***** WebAudio gxtkSample *****

var gxtkSample=function(){
	this.waBuffer=null;
	this.state=0;
}

gxtkSample.prototype.Load=function( path ){
	if( this.state ) return false;

	var req=new XMLHttpRequest();
	
	req.open( "get",BBGame.Game().PathToUrl( path ),true );
	req.responseType="arraybuffer";
	
	var abuf=this;
	
	req.onload=function(){
		wa.decodeAudioData( req.response,function( buffer ){
			//success!
			abuf.waBuffer=buffer;
			abuf.state=1;
		},function(){
			abuf.state=-1;
		} );
	}
	
	req.onerror=function(){
		abuf.state=-1;
	}
	
	req.send();
	
	this.state=2;
			
	return true;
}

gxtkSample.prototype.Discard=function(){
}

// ***** WebAudio gxtkChannel *****

var gxtkChannel=function(){
	this.buffer=null;
	this.flags=0;
	this.volume=1;
	this.pan=0;
	this.rate=1;
	this.waSource=null;
	this.waPan=wa.create
	this.waGain=wa.createGain();
	this.waGain.connect( wa.destination );
	this.waPanner=wa.createPanner();
	this.waPanner.rolloffFactor=0;
	this.waPanner.panningModel="equalpower";
	this.waPanner.connect( this.waGain );
	this.startTime=0;
	this.offset=0;
	this.state=0;
}

// ***** WebAudio gxtkAudio *****

var gxtkAudio=function(){

	if( !wa ){
		window.AudioContext=window.AudioContext || window.webkitAudioContext;
		wa=new AudioContext();
	}
	
	this.okay=true;
	this.music=null;
	this.musicState=0;
	this.musicVolume=1;
	this.channels=new Array();
	for( var i=0;i<32;++i ){
		this.channels[i]=new gxtkChannel();
	}
}

gxtkAudio.prototype.Suspend=function(){
	if( this.MusicState()==1 ) this.music.pause();
	for( var i=0;i<32;++i ){
		var chan=this.channels[i];
		if( chan.state!=1 ) continue;
		this.PauseChannel( i );
		chan.state=5;
	}
}

gxtkAudio.prototype.Resume=function(){
	if( this.MusicState()==1 ) this.music.play();
	for( var i=0;i<32;++i ){
		var chan=this.channels[i];
		if( chan.state!=5 ) continue;
		chan.state=2;
		this.ResumeChannel( i );
	}
}

gxtkAudio.prototype.LoadSample=function( path ){

	var sample=new gxtkSample();
	if( !sample.Load( BBHtml5Game.Html5Game().PathToUrl( path ) ) ) return null;
	
	return sample;
}

gxtkAudio.prototype.PlaySample=function( buffer,channel,flags ){

	if( buffer.state!=1 ) return;

	var chan=this.channels[channel];
	
	if( chan.state ){
		chan.waSource.onended=null
		try {
			chan.waSource.stop( 0 );
			chan.state = 0			
		} catch (err) {			
		}
	}
	
	chan.buffer=buffer;
	chan.flags=flags;

	chan.waSource=wa.createBufferSource();
	chan.waSource.buffer=buffer.waBuffer;
	chan.waSource.playbackRate.value=chan.rate;
	chan.waSource.loop=(flags&1)!=0;
	chan.waSource.connect( chan.waPanner );
	
	chan.waSource.onended=function( e ){
		chan.waSource=null;
		chan.state=0;
	}

	chan.offset=0;	
	chan.startTime=wa.currentTime;
	chan.waSource.start( 0 );

	chan.state=1;
}

gxtkAudio.prototype.StopChannel=function( channel ){

	var chan=this.channels[channel];
	if( !chan.state ) return;
	
	if( chan.state==1 ){
		chan.waSource.onended=null;
		try {
			chan.waSource.stop( 0 );
		} catch (err) {			
		}
		chan.waSource=null;
	}

	chan.state=0;
}

gxtkAudio.prototype.PauseChannel=function( channel ){

	var chan=this.channels[channel];
	if( chan.state!=1 ) return;
	
	chan.offset=(chan.offset+(wa.currentTime-chan.startTime)*chan.rate)%chan.buffer.waBuffer.duration;
	
	chan.waSource.onended=null;
	try {
		chan.waSource.stop( 0 );
	} catch (err) {			
	}
	chan.waSource=null;
	
	chan.state=2;
}

gxtkAudio.prototype.ResumeChannel=function( channel ){

	var chan=this.channels[channel];
	if( chan.state!=2 ) return;
	
	chan.waSource=wa.createBufferSource();
	chan.waSource.buffer=chan.buffer.waBuffer;
	chan.waSource.playbackRate.value=chan.rate;
	chan.waSource.loop=(chan.flags&1)!=0;
	chan.waSource.connect( chan.waPanner );
	
	chan.waSource.onended=function( e ){
		chan.waSource=null;
		chan.state=0;
	}
	
	chan.startTime=wa.currentTime;
	chan.waSource.start( 0,chan.offset );

	chan.state=1;
}

gxtkAudio.prototype.ChannelState=function( channel ){
	return this.channels[channel].state & 3;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];

	chan.volume=volume;
	
	chan.waGain.gain.value=volume;
}

gxtkAudio.prototype.SetPan=function( channel,pan ){
	var chan=this.channels[channel];

	chan.pan=pan;
	
	var sin=Math.sin( pan*3.14159265359/2 );
	var cos=Math.cos( pan*3.14159265359/2 );
	
	chan.waPanner.setPosition( sin,0,-cos );
}

gxtkAudio.prototype.SetRate=function( channel,rate ){

	var chan=this.channels[channel];

	if( chan.state==1 ){
		//update offset for pause/resume
		var time=wa.currentTime;
		chan.offset=(chan.offset+(time-chan.startTime)*chan.rate)%chan.buffer.waBuffer.duration;
		chan.startTime=time;
	}

	chan.rate=rate;
	
	if( chan.waSource ) chan.waSource.playbackRate.value=rate;
}

gxtkAudio.prototype.PlayMusic=function( path,flags ){
	if( this.musicState ) this.music.pause();
	this.music=new Audio( BBGame.Game().PathToUrl( path ) );
	this.music.loop=(flags&1)!=0;
	this.music.play();
	this.musicState=1;
}

gxtkAudio.prototype.StopMusic=function(){
	if( !this.musicState ) return;
	this.music.pause();
	this.music=null;
	this.musicState=0;
}

gxtkAudio.prototype.PauseMusic=function(){
	if( this.musicState!=1 ) return;
	this.music.pause();
	this.musicState=2;
}

gxtkAudio.prototype.ResumeMusic=function(){
	if( this.musicState!=2 ) return;
	this.music.play();
	this.musicState=1;
}

gxtkAudio.prototype.MusicState=function(){
	if( this.musicState==1 && this.music.ended && !this.music.loop ){
		this.music=null;
		this.musicState=0;
	}
	return this.musicState;
}

gxtkAudio.prototype.SetMusicVolume=function( volume ){
	this.musicVolume=volume;
	if( this.musicState ) this.music.volume=volume;
}

}else{

//print( "Using OldAudio!" );

// ***** gxtkChannel class *****

var gxtkChannel=function(){
	this.sample=null;
	this.audio=null;
	this.volume=1;
	this.pan=0;
	this.rate=1;
	this.flags=0;
	this.state=0;
}

// ***** gxtkAudio class *****

var gxtkAudio=function(){
	this.game=BBHtml5Game.Html5Game();
	this.okay=typeof(Audio)!="undefined";
	this.music=null;
	this.channels=new Array(33);
	for( var i=0;i<33;++i ){
		this.channels[i]=new gxtkChannel();
		if( !this.okay ) this.channels[i].state=-1;
	}
}

gxtkAudio.prototype.Suspend=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==1 ){
			if( chan.audio.ended && !chan.audio.loop ){
				chan.state=0;
			}else{
				chan.audio.pause();
				chan.state=3;
			}
		}
	}
}

gxtkAudio.prototype.Resume=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==3 ){
			chan.audio.play();
			chan.state=1;
		}
	}
}

gxtkAudio.prototype.LoadSample=function( path ){
	if( !this.okay ) return null;

	var audio=new Audio( this.game.PathToUrl( path ) );
	if( !audio ) return null;
	
	return new gxtkSample( audio );
}

gxtkAudio.prototype.PlaySample=function( sample,channel,flags ){
	if( !this.okay ) return;
	
	var chan=this.channels[channel];

	if( chan.state>0 ){
		chan.audio.pause();
		chan.state=0;
	}
	
	for( var i=0;i<33;++i ){
		var chan2=this.channels[i];
		if( chan2.state==1 && chan2.audio.ended && !chan2.audio.loop ) chan.state=0;
		if( chan2.state==0 && chan2.sample ){
			chan2.sample.FreeAudio( chan2.audio );
			chan2.sample=null;
			chan2.audio=null;
		}
	}

	var audio=sample.AllocAudio();
	if( !audio ) return;

	audio.loop=(flags&1)!=0;
	audio.volume=chan.volume;
	audio.play();

	chan.sample=sample;
	chan.audio=audio;
	chan.flags=flags;
	chan.state=1;
}

gxtkAudio.prototype.StopChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state>0 ){
		chan.audio.pause();
		chan.state=0;
	}
}

gxtkAudio.prototype.PauseChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==1 ){
		if( chan.audio.ended && !chan.audio.loop ){
			chan.state=0;
		}else{
			chan.audio.pause();
			chan.state=2;
		}
	}
}

gxtkAudio.prototype.ResumeChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==2 ){
		chan.audio.play();
		chan.state=1;
	}
}

gxtkAudio.prototype.ChannelState=function( channel ){
	var chan=this.channels[channel];
	if( chan.state==1 && chan.audio.ended && !chan.audio.loop ) chan.state=0;
	if( chan.state==3 ) return 1;
	return chan.state;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];
	if( chan.state>0 ) chan.audio.volume=volume;
	chan.volume=volume;
}

gxtkAudio.prototype.SetPan=function( channel,pan ){
	var chan=this.channels[channel];
	chan.pan=pan;
}

gxtkAudio.prototype.SetRate=function( channel,rate ){
	var chan=this.channels[channel];
	chan.rate=rate;
}

gxtkAudio.prototype.PlayMusic=function( path,flags ){
	this.StopMusic();
	
	this.music=this.LoadSample( path );
	if( !this.music ) return;
	
	this.PlaySample( this.music,32,flags );
}

gxtkAudio.prototype.StopMusic=function(){
	this.StopChannel( 32 );

	if( this.music ){
		this.music.Discard();
		this.music=null;
	}
}

gxtkAudio.prototype.PauseMusic=function(){
	this.PauseChannel( 32 );
}

gxtkAudio.prototype.ResumeMusic=function(){
	this.ResumeChannel( 32 );
}

gxtkAudio.prototype.MusicState=function(){
	return this.ChannelState( 32 );
}

gxtkAudio.prototype.SetMusicVolume=function( volume ){
	this.SetVolume( 32,volume );
}

// ***** gxtkSample class *****

//function gxtkSample( audio ){
var gxtkSample=function( audio ){
	this.audio=audio;
	this.free=new Array();
	this.insts=new Array();
}

gxtkSample.prototype.FreeAudio=function( audio ){
	this.free.push( audio );
}

gxtkSample.prototype.AllocAudio=function(){
	var audio;
	while( this.free.length ){
		audio=this.free.pop();
		try{
			audio.currentTime=0;
			return audio;
		}catch( ex ){
//			print( "AUDIO ERROR1!" );
		}
	}
	
	//Max out?
	if( this.insts.length==8 ) return null;
	
	audio=new Audio( this.audio.src );
	
	//yucky loop handler for firefox!
	//
	audio.addEventListener( 'ended',function(){
		if( this.loop ){
			try{
				this.currentTime=0;
				this.play();
			}catch( ex ){
//				print( "AUDIO ERROR2!" );
			}
		}
	},false );

	this.insts.push( audio );
	return audio;
}

gxtkSample.prototype.Discard=function(){
}

}


function BBThread(){
	this.result=null;
	this.running=false;
}

BBThread.prototype.Start=function(){
	this.result=null;
	this.running=true;
	this.Run__UNSAFE__();
}

BBThread.prototype.IsRunning=function(){
	return this.running;
}

BBThread.prototype.Result=function(){
	return this.result;
}

BBThread.prototype.Run__UNSAFE__=function(){
	this.running=false;
}


function BBAsyncImageLoaderThread(){
	this._running=false;
}

BBAsyncImageLoaderThread.prototype.Start=function(){

	var thread=this;

	thread._surface=null;
	thread._result=false;
	thread._running=true;

	var image=new Image();

	image.onload=function( e ){
		image.meta_width=image.width;
		image.meta_height=image.height;
		thread._surface=new gxtkSurface( image,thread._device )
		thread._result=true;
		thread._running=false;
	}
	
	image.onerror=function( e ){
		thread._running=false;
	}
	
	image.src=BBGame.Game().PathToUrl( thread._path );
}

BBAsyncImageLoaderThread.prototype.IsRunning=function(){
	return this._running;
}



function BBAsyncSoundLoaderThread(){
	this._running=false;
}
  
if( CFG_HTML5_WEBAUDIO_ENABLED=="1" && (window.AudioContext || window.webkitAudioContext) ){

BBAsyncSoundLoaderThread.prototype.Start=function(){

	this._sample=null;
	if( !this._device.okay ) return;
	
	var thread=this;
	
	thread._sample=null;
	thread._result=false;
	thread._running=true;

	var req=new XMLHttpRequest();
	req.open( "get",BBGame.Game().PathToUrl( this._path ),true );
	req.responseType="arraybuffer";
	
	req.onload=function(){
		//load success!
		wa.decodeAudioData( req.response,function( buffer ){
			//decode success!
			thread._sample=new gxtkSample();
			thread._sample.waBuffer=buffer;
			thread._sample.state=1;
			thread._result=true;
			thread._running=false;
		},function(){	
			//decode fail!
			thread._running=false;
		} );
	}
	
	req.onerror=function(){
		//load fail!
		thread._running=false;
	}
	
	req.send();
}
	
}else{
 
BBAsyncSoundLoaderThread.prototype.Start=function(){

	this._sample=null;
	if( !this._device.okay ) return;
	
	var audio=new Audio();
	if( !audio ) return;
	
	var thread=this;
	
	thread._sample=null;
	thread._result=false;
	thread._running=true;

	audio.src=BBGame.Game().PathToUrl( this._path );
	audio.preload='auto';	
	
	var success=function( e ){
		thread._sample=new gxtkSample( audio );
		thread._result=true;
		thread._running=false;
		audio.removeEventListener( 'canplaythrough',success,false );
		audio.removeEventListener( 'error',error,false );
	}
	
	var error=function( e ){
		thread._running=false;
		audio.removeEventListener( 'canplaythrough',success,false );
		audio.removeEventListener( 'error',error,false );
	}
	
	audio.addEventListener( 'canplaythrough',success,false );
	audio.addEventListener( 'error',error,false );
	
	//voodoo fix for Chrome!
	var timer=setInterval( function(){ if( !thread._running ) clearInterval( timer ); },200 );
	
	audio.load();
}

}
  
BBAsyncSoundLoaderThread.prototype.IsRunning=function(){
	return this._running;
}


function BBDataBuffer(){
	this.arrayBuffer=null;
	this.length=0;
}

BBDataBuffer.tbuf=new ArrayBuffer(4);
BBDataBuffer.tbytes=new Int8Array( BBDataBuffer.tbuf );
BBDataBuffer.tshorts=new Int16Array( BBDataBuffer.tbuf );
BBDataBuffer.tints=new Int32Array( BBDataBuffer.tbuf );
BBDataBuffer.tfloats=new Float32Array( BBDataBuffer.tbuf );

BBDataBuffer.prototype._Init=function( buffer ){
  
  this.length=buffer.byteLength;
  
  if (buffer.byteLength != Math.ceil(buffer.byteLength / 4) * 4)
  {
    var new_buffer = new ArrayBuffer(Math.ceil(buffer.byteLength / 4) * 4);
    var src = new Int8Array(buffer);
    var dst = new Int8Array(new_buffer);
    for (var i = 0; i < this.length; i++) {
      dst[i] = src[i];
    }
    buffer = new_buffer;    
  }

	this.arrayBuffer=buffer;
	this.bytes=new Int8Array( buffer );	
	this.shorts=new Int16Array( buffer,0,this.length/2 );	
	this.ints=new Int32Array( buffer,0,this.length/4 );	
	this.floats=new Float32Array( buffer,0,this.length/4 );
}

BBDataBuffer.prototype._New=function( length ){
	if( this.arrayBuffer ) return false;
	
	var buf=new ArrayBuffer( length );
	if( !buf ) return false;
	
	this._Init( buf );
	return true;
}

BBDataBuffer.prototype._Load=function( path ){
	if( this.arrayBuffer ) return false;
	
	var buf=BBGame.Game().LoadData( path );
	if( !buf ) return false;
	
	this._Init( buf );
	return true;
}

BBDataBuffer.prototype._LoadAsync=function( path,thread ){

	var buf=this;
	
	var xhr=new XMLHttpRequest();
	xhr.open( "GET",BBGame.Game().PathToUrl( path ),true );
	xhr.responseType="arraybuffer";
	
	xhr.onload=function(e){
		if( this.status==200 || this.status==0 ){
			buf._Init( xhr.response );
			thread.result=buf;
		}
		thread.running=false;
	}
	
	xhr.onerror=function(e){
		thread.running=false;
	}
	
	xhr.send();
}


BBDataBuffer.prototype.GetArrayBuffer=function(){
	return this.arrayBuffer;
}

BBDataBuffer.prototype.Length=function(){
	return this.length;
}

BBDataBuffer.prototype.Discard=function(){
	if( this.arrayBuffer ){
		this.arrayBuffer=null;
		this.length=0;
	}
}

BBDataBuffer.prototype.PokeByte=function( addr,value ){
	this.bytes[addr]=value;
}

BBDataBuffer.prototype.PokeShort=function( addr,value ){
	if( addr&1 ){
		BBDataBuffer.tshorts[0]=value;
		this.bytes[addr]=BBDataBuffer.tbytes[0];
		this.bytes[addr+1]=BBDataBuffer.tbytes[1];
		return;
	}
	this.shorts[addr>>1]=value;
}

BBDataBuffer.prototype.PokeInt=function( addr,value ){
	if( addr&3 ){
		BBDataBuffer.tints[0]=value;
		this.bytes[addr]=BBDataBuffer.tbytes[0];
		this.bytes[addr+1]=BBDataBuffer.tbytes[1];
		this.bytes[addr+2]=BBDataBuffer.tbytes[2];
		this.bytes[addr+3]=BBDataBuffer.tbytes[3];
		return;
	}
	this.ints[addr>>2]=value;
}

BBDataBuffer.prototype.PokeFloat=function( addr,value ){
	if( addr&3 ){
		BBDataBuffer.tfloats[0]=value;
		this.bytes[addr]=BBDataBuffer.tbytes[0];
		this.bytes[addr+1]=BBDataBuffer.tbytes[1];
		this.bytes[addr+2]=BBDataBuffer.tbytes[2];
		this.bytes[addr+3]=BBDataBuffer.tbytes[3];
		return;
	}
	this.floats[addr>>2]=value;
}

BBDataBuffer.prototype.PeekByte=function( addr ){
	return this.bytes[addr];
}

BBDataBuffer.prototype.PeekShort=function( addr ){
	if( addr&1 ){
		BBDataBuffer.tbytes[0]=this.bytes[addr];
		BBDataBuffer.tbytes[1]=this.bytes[addr+1];
		return BBDataBuffer.tshorts[0];
	}
	return this.shorts[addr>>1];
}

BBDataBuffer.prototype.PeekInt=function( addr ){
	if( addr&3 ){
		BBDataBuffer.tbytes[0]=this.bytes[addr];
		BBDataBuffer.tbytes[1]=this.bytes[addr+1];
		BBDataBuffer.tbytes[2]=this.bytes[addr+2];
		BBDataBuffer.tbytes[3]=this.bytes[addr+3];
		return BBDataBuffer.tints[0];
	}
	return this.ints[addr>>2];
}

BBDataBuffer.prototype.PeekFloat=function( addr ){
	if( addr&3 ){
		BBDataBuffer.tbytes[0]=this.bytes[addr];
		BBDataBuffer.tbytes[1]=this.bytes[addr+1];
		BBDataBuffer.tbytes[2]=this.bytes[addr+2];
		BBDataBuffer.tbytes[3]=this.bytes[addr+3];
		return BBDataBuffer.tfloats[0];
	}
	return this.floats[addr>>2];
}


var bb_texs_loading=0;

function BBLoadStaticTexImage( path,info ){

	var game=BBHtml5Game.Html5Game();

	var ty=game.GetMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;
	
	if( info.length>0 ) info[0]=parseInt( game.GetMetaData( path,"width" ) );
	if( info.length>1 ) info[1]=parseInt( game.GetMetaData( path,"height" ) );
	
	var img=new Image();
	img.src=game.PathToUrl( path );
	
	return img;
}

function BBTextureLoading( tex ){
	return tex && tex._loading;
}

function BBTexturesLoading(){
	return bb_texs_loading;
}

function _glGenerateMipmap( target ){

	var tex=gl.getParameter( gl.TEXTURE_BINDING_2D );
	
	if( tex && tex._loading ){
		tex._genmipmap=true;
	}else{
		gl.generateMipmap( target );
	}
}

function _glBindTexture( target,tex ){
	if( tex ){
		gl.bindTexture( target,tex );
	}else{
		gl.bindTexture( target,null );
	}
}

function _glTexImage2D( target,level,internalformat,width,height,border,format,type,pixels ){

	gl.texImage2D( target,level,internalformat,width,height,border,format,type,pixels ? new Uint8Array(pixels.arrayBuffer) : null );
}

function _glTexImage2D2( target,level,internalformat,format,type,img ){

	if( img.complete ){
		gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true );	
		gl.texImage2D( target,level,internalformat,format,type,img );
		gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false );	
		return;
	}
	
	var tex=gl.getParameter( gl.TEXTURE_BINDING_2D );
	if( 	tex._loading ){
		tex._loading+=1;
	}else{
		tex._loading=1;
	}

	bb_texs_loading+=1;
	
	var onload=function(){
	
		var tmp=gl.getParameter( gl.TEXTURE_BINDING_2D );
		gl.bindTexture( target,tex );
		
		gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true );	
		gl.texImage2D( target,level,internalformat,format,type,img );
		gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false );	

		if( tex._genmipmap && tex._loading==1 ){
			gl.generateMipmap( target );
			tex._genmipmap=false;
		}
		gl.bindTexture( target,tmp );
		
		img.removeEventListener( "load",onload );
		tex._loading-=1;
		
		bb_texs_loading-=1;
	}
	
	img.addEventListener( "load",onload );
}

function _glTexImage2D3( target,level,internalformat,format,type,path ){

	var game=BBHtml5Game.Html5Game();

	var ty=game.GetMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;
	
	var img=new Image();
	img.src=game.PathToUrl( path );
	
	_glTexImage2D2( target,level,internalformat,format,type,img );
}

function _glTexSubImage2D( target,level,xoffset,yoffset,width,height,format,type,data,dataOffset ){

	gl.texSubImage2D( target,level,xoffset,yoffset,width,height,format,type,new Uint8Array( data.arrayBuffer,dataOffset ) );
	
}

function _glTexSubImage2D2( target,level,xoffset,yoffset,format,type,img ){

	if( img.complete ){
		gl.texSubImage2D( target,level,xoffset,yoffset,format,type,img );
		return;
	}
	
	var tex=gl.getParameter( gl.TEXTURE_BINDING_2D );
	if( 	tex._loading>0 ){
		tex._loading+=1;
	}else{
		tex._loading=1;
	}
	
	bb_texs_loading+=1;

	var onload=function(){
	
		var tmp=gl.getParameter( gl.TEXTURE_BINDING_2D );
		gl.bindTexture( target,tex );

		gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true );	
		gl.texSubImage2D( target,level,xoffset,yoffset,format,type,img );
		gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false );

		if( tex._genmipmap && tex._loading==1 ){
			gl.generateMipmap( target );
			tex._genmipmap=false;
		}
		gl.bindTexture( target,tmp );
		
		img.removeEventListener( "load",onload );
		tex._loading-=1;
		
		bb_texs_loading-=1;
	}
	
	img.addEventListener( "load",onload );
}

function _glTexSubImage2D3( target,level,xoffset,yoffset,format,type,path ){

	var game=BBHtml5Game.Html5Game();

	var ty=game.GetMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;
	
	var img=new Image();
	img.src=game.PathToUrl( path );
	
	_glTexSubImage2D2( target,level,xoffset,yoffset,format,type,img );
}

// Dodgy code to convert 'any' to i,f,iv,fv...
//
function _mkf( p ){
	if( typeof(p)=="boolean" ) return p?1.0:0.0;
	if( typeof(p)=="number" ) return p;
	return 0.0;
}

function _mki( p ){
	if( typeof(p)=="boolean" ) return p?1:0;
	if( typeof(p)=="number" ) return p|0;
	if( typeof(p)=="object" ) return p;
	return 0;
}

function _mkb( p ){
	if( typeof(p)=="boolean" ) return p;
	if( typeof(p)=="number" ) return p!=0;
	return false;
}

function _mkfv( p,params ){
	if( !params || !params.length ) return;
	if( (p instanceof Array) || (p instanceof Int32Array) || (p instanceof Float32Array) ){
		var n=Math.min( params.length,p.length );
		for( var i=0;i<n;++i ){
			params[i]=_mkf(p[i]);
		}
	}else{
		params[0]=_mkf(p);
	}
}

function _mkiv( p,params ){
	if( !params || !params.length ) return;
	if( (p instanceof Array) || (p instanceof Int32Array) || (p instanceof Float32Array) ){
		var n=Math.min( params.length,p.length );
		for( var i=0;i<n;++i ){
			params[i]=_mki(p[i]);
		}
	}else{
		params[0]=_mki(p);
	}
}

function _mkbv( p,params ){
	if( !params || !params.length ) return;
	if( (p instanceof Array) || (p instanceof Int32Array) || (p instanceof Float32Array) ){
		var n=Math.min( params.length,p.length );
		for( var i=0;i<n;++i ){
			params[i]=_mkb(p[i]);
		}
	}else{
		params[0]=_mkb(p);
	}
}

function _glBufferData( target,size,data,usage ){
	if( !data ){
		gl.bufferData( target,size,usage );
	}else if( size==data.size ){
		gl.bufferData( target,data.arrayBuffer,usage );
	}else{
		gl.bufferData( target,new Int8Array( data.arrayBuffer,0,size ),usage );
	}
}

function _glBufferSubData( target,offset,size,data,dataOffset ){
	if( size==data.size && dataOffset==0 ){
		gl.bufferSubData( target,offset,data.arrayBuffer );
	}else{
		gl.bufferSubData( target,offset,new Int8Array( data.arrayBuffer,dataOffset,size ) );
	}
}


function _glClearDepthf( depth ){
	gl.clearDepth( depth );
}

function _glDepthRange( zNear,zFar ){
	gl.depthRange( zNear,zFar );
}

function _glGetActiveAttrib( program,index,size,type,name ){
	var info=gl.getActiveAttrib( program,index );
	if( size && size.length ) size[0]=info.size;
	if( type && type.length ) type[0]=info.type;
	if( name && name.length ) name[0]=info.name;
}

function _glGetActiveUniform( program,index,size,type,name ){
	var info=gl.getActiveUniform( program,index );
	if( size && size.length ) size[0]=info.size;
	if( type && type.length ) type[0]=info.type;
	if( name && name.length ) name[0]=info.name;
}

function _glGetAttachedShaders( program, maxcount, count, shaders ){
	var t=gl.getAttachedShaders();
	if( count && count.length ) count[0]=t.length;
	if( shaders ){
		var n=t.length;
		if( maxcount<n ) n=maxcount;
		if( shaders.length<n ) n=shaders.length;
		for( var i=0;i<n;++i ) shaders[i]=t[i];
	}
}

function _glGetBooleanv( pname,params ){
	_mkbv( gl.getParameter( pname ),params );
}

function _glGetBufferParameteriv( target, pname, params ){
	_mkiv( gl.glGetBufferParameter( target,pname ),params );
}

function _glGetFloatv( pname,params ){
	_mkfv( gl.getParameter( pname ),params );
}

function _glGetFramebufferAttachmentParameteriv( target, attachment, pname, params ){
	_mkiv( gl.getFrameBufferAttachmentParameter( target,attachment,pname ),params );
}

function _glGetIntegerv( pname, params ){
	_mkiv( gl.getParameter( pname ),params );
}

function _glGetProgramiv( program, pname, params ){
	_mkiv( gl.getProgramParameter( program,pname ),params );
}

function _glGetRenderbufferParameteriv( target, pname, params ){
	_mkiv( gl.getRenderbufferParameter( target,pname ),params );
}

function _glGetShaderiv( shader, pname, params ){
	_mkiv( gl.getShaderParameter( shader,pname ),params );
}

function _glGetString( pname ){
	var p=gl.getParameter( pname );
	if( typeof(p)=="string" ) return p;
	return "";
}

function _glGetTexParameterfv( target, pname, params ){
	_mkfv( gl.getTexParameter( target,pname ),params );
}

function _glGetTexParameteriv( target, pname, params ){
	_mkiv( gl.getTexParameter( target,pname ),params );
}

function _glGetUniformfv( program, location, params ){
	_mkfv( gl.getUniform( program,location ),params );
}

function _glGetUniformiv( program, location, params ){
	_mkiv( gl.getUniform( program,location ),params );
}

function _glGetUniformLocation( program, name ){
	var l=gl.getUniformLocation( program,name );
	if( l ) return l;
	return -1;
}

function _glGetVertexAttribfv( index, pname, params ){
	_mkfv( gl.getVertexAttrib( index,pname ),params );
}

function _glGetVertexAttribiv( index, pname, params ){
	_mkiv( gl.getVertexAttrib( index,pname ),params );
}

function _glReadPixels( x,y,width,height,format,type,data,dataOffset ){
	gl.readPixels( x,y,width,height,format,type,new Uint8Array( data.arrayBuffer,dataOffset,data.length-dataOffset ) );
}

function _glBindBuffer( target,buffer ){
	if( buffer ){
		gl.bindBuffer( target,buffer );
	}else{
		gl.bindBuffer( target,null );
	}
}

function _glBindFramebuffer( target,framebuffer ){
	if( framebuffer ){
		gl.bindFramebuffer( target,framebuffer );
	}else{
		gl.bindFramebuffer( target,null );
	}
}

function _glBindRenderbuffer( target,renderbuffer ){
	if( renderbuffer ){
		gl.bindRenderbuffer( target,renderbuffer );
	}else{
		gl.bindRenderbuffer( target,null );
	}
}

function _glUniform1fv( location, count, v ){
	if( v.length==count ){
		gl.uniform1fv( location,v );
	}else{
		gl.uniform1fv( location,v.slice(0,cont) );
	}
}

function _glUniform1iv( location, count, v ){
	if( v.length==count ){
		gl.uniform1iv( location,v );
	}else{
		gl.uniform1iv( location,v.slice(0,cont) );
	}
}

function _glUniform2fv( location, count, v ){
	var n=count*2;
	if( v.length==n ){
		gl.uniform2fv( location,v );
	}else{
		gl.uniform2fv( location,v.slice(0,n) );
	}
}

function _glUniform2iv( location, count, v ){
	var n=count*2;
	if( v.length==n ){
		gl.uniform2iv( location,v );
	}else{
		gl.uniform2iv( location,v.slice(0,n) );
	}
}

function _glUniform3fv( location, count, v ){
	var n=count*3;
	if( v.length==n ){
		gl.uniform3fv( location,v );
	}else{
		gl.uniform3fv( location,v.slice(0,n) );
	}
}

function _glUniform3iv( location, count, v ){
	var n=count*3;
	if( v.length==n ){
		gl.uniform3iv( location,v );
	}else{
		gl.uniform3iv( location,v.slice(0,n) );
	}
}

function _glUniform4fv( location, count, v ){
	var n=count*4;
	if( v.length==n ){
		gl.uniform4fv( location,v );
	}else{
		gl.uniform4fv( location,v.slice(0,n) );
	}
}

function _glUniform4iv( location, count, v ){
	var n=count*4;
	if( v.length==n ){
		gl.uniform4iv( location,v );
	}else{
		gl.uniform4iv( location,v.slice(0,n) );
	}
}

function _glUniformMatrix2fv( location, count, transpose, value ){
	var n=count*4;
	if( value.length==n ){
		gl.uniformMatrix2fv( location,transpose,value );
	}else{
		gl.uniformMatrix2fv( location,transpose,value.slice(0,n) );
	}
}

function _glUniformMatrix3fv( location, count, transpose, value ){
	var n=count*9;
	if( value.length==n ){
		gl.uniformMatrix3fv( location,transpose,value );
	}else{
		gl.uniformMatrix3fv( location,transpose,value.slice(0,n) );
	}
}

function _glUniformMatrix4fv( location, count, transpose, value ){
	var n=count*16;
	if( value.length==n ){
		gl.uniformMatrix4fv( location,transpose,value );
	}else{
		gl.uniformMatrix4fv( location,transpose,value.slice(0,n) );
	}
}

function c_App(){
	Object.call(this);
}
c_App.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<162>";
	if((bb_app__app)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<162>";
		error("App has already been created");
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<163>";
	bb_app__app=this;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<164>";
	bb_app__delegate=c_GameDelegate.m_new.call(new c_GameDelegate);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<165>";
	bb_app__game.SetDelegate(bb_app__delegate);
	pop_err();
	return this;
}
c_App.prototype.p_OnResize=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnCreate=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnSuspend=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnResume=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnUpdate=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnLoading=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnRender=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnClose=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<187>";
	bb_app_EndApp();
	pop_err();
	return 0;
}
c_App.prototype.p_OnBack=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<191>";
	this.p_OnClose();
	pop_err();
	return 0;
}
c_App.prototype.p_OnFileDrop=function(t_filename){
	push_err();
	pop_err();
	return 0;
}
function c_Game(){
	c_App.call(this);
	this.m_gameCanvas=null;
	this.m_defaultFont=null;
	this.m_paddle1=null;
	this.m_paddle2=null;
	this.m_ball=null;
	this.m_scoreboard=null;
	this.m_ai=null;
}
c_Game.prototype=extend_class(c_App);
c_Game.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<7>";
	c_App.m_new.call(this);
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<7>";
	pop_err();
	return this;
}
c_Game.prototype.p_OnCreate=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<18>";
	bb_random_Seed=bb_app_Millisecs();
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<19>";
	this.m_gameCanvas=c_Canvas.m_new.call(new c_Canvas,null);
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<20>";
	bb_app_SetUpdateRate(0);
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<22>";
	this.m_defaultFont=c_Font2.m_Load("font.png",32,96,true);
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<23>";
	if(!((this.m_defaultFont)!=null)){
		err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<23>";
		error("Can't load default font");
	}
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<26>";
	this.m_paddle1=c_Paddle.m_new.call(new c_Paddle,0,(((bb_app_DeviceHeight()-50)/2)|0),50,10,[1.0,1.0,1.0,1.0],5,87,83,"player1");
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<27>";
	this.m_paddle2=c_Paddle.m_new.call(new c_Paddle,bb_app_DeviceWidth()-10,(((bb_app_DeviceHeight()-50)/2)|0),50,10,[1.0,0.0,0.0,1.0],5,38,40,"player2");
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<30>";
	this.m_ball=c_Ball.m_new.call(new c_Ball,((bb_app_DeviceWidth()/2)|0),((bb_app_DeviceHeight()/2)|0),10,[1.0,1.0,1.0,1.0],-2.0,2.0,15.0);
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<33>";
	this.m_scoreboard=c_Scoreboard.m_new.call(new c_Scoreboard);
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<34>";
	this.m_scoreboard.p_AddPaddle(this.m_paddle1);
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<35>";
	this.m_scoreboard.p_AddPaddle(this.m_paddle2);
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<38>";
	this.m_ai=c_AI.m_new.call(new c_AI,this.m_paddle2);
	pop_err();
	return 0;
}
c_Game.prototype.p_OnUpdate=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<43>";
	this.m_paddle1.p_Move();
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<44>";
	this.m_ai.p_Follow(this.m_ball);
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<47>";
	this.m_ball.p_Move();
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<48>";
	this.m_ball.p_CollidesWith(this.m_paddle1);
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<49>";
	this.m_ball.p_CollidesWith(this.m_paddle2);
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<56>";
	if(dbg_object(this.m_ball).m_xPos<0){
		err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<53>";
		this.m_scoreboard.p_IncreaseScore(this.m_paddle2);
	}else{
		err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<54>";
		if(dbg_object(this.m_ball).m_xPos+dbg_object(this.m_ball).m_size>bb_app_DeviceWidth()){
			err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<55>";
			this.m_scoreboard.p_IncreaseScore(this.m_paddle1);
		}
	}
	pop_err();
	return 0;
}
c_Game.prototype.p_DrawScore=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<84>";
	var t_score=String(this.m_scoreboard.p_GetScore(this.m_paddle1))+":"+String(this.m_scoreboard.p_GetScore(this.m_paddle2));
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<86>";
	var t_xPos=(bb_app_DeviceWidth())/2.0-this.m_defaultFont.p_TextWidth(t_score)/2.0;
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<87>";
	var t_yPos=(bb_app_DeviceHeight())/4.0-this.m_defaultFont.p_TextHeight(t_score)/2.0;
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<89>";
	this.m_gameCanvas.p_SetColor2(0.0,1.0,0.0,1.0);
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<90>";
	this.m_gameCanvas.p_DrawText(t_score,t_xPos,t_yPos,0.0,0.0);
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<91>";
	this.m_gameCanvas.p_SetColor2(1.0,1.0,1.0,1.0);
	pop_err();
	return 0;
}
c_Game.prototype.p_DrawPaddle=function(t_paddle){
	push_err();
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<72>";
	this.m_gameCanvas.p_SetColor2(dbg_array(dbg_object(t_paddle).m_color,0)[dbg_index],dbg_array(dbg_object(t_paddle).m_color,1)[dbg_index],dbg_array(dbg_object(t_paddle).m_color,2)[dbg_index],1.0);
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<73>";
	this.m_gameCanvas.p_DrawRect((dbg_object(t_paddle).m_xPos),(dbg_object(t_paddle).m_yPos),(dbg_object(t_paddle).m_width),(dbg_object(t_paddle).m_height),null,0.0,0.0,1.0,1.0);
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<74>";
	this.m_gameCanvas.p_SetColor2(1.0,1.0,1.0,1.0);
	pop_err();
	return 0;
}
c_Game.prototype.p_DrawBall=function(t_ball){
	push_err();
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<78>";
	this.m_gameCanvas.p_SetColor2(dbg_array(dbg_object(t_ball).m_color,0)[dbg_index],dbg_array(dbg_object(t_ball).m_color,1)[dbg_index],dbg_array(dbg_object(t_ball).m_color,2)[dbg_index],1.0);
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<79>";
	this.m_gameCanvas.p_DrawOval((dbg_object(t_ball).m_xPos),(dbg_object(t_ball).m_yPos),(dbg_object(t_ball).m_size),(dbg_object(t_ball).m_size),null);
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<80>";
	this.m_gameCanvas.p_SetColor2(1.0,1.0,1.0,1.0);
	pop_err();
	return 0;
}
c_Game.prototype.p_OnRender=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<60>";
	this.m_gameCanvas.p_Clear(0.0,0.0,0.0,1.0);
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<62>";
	this.p_DrawScore();
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<64>";
	this.p_DrawPaddle(this.m_paddle1);
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<65>";
	this.p_DrawPaddle(this.m_paddle2);
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<66>";
	this.p_DrawBall(this.m_ball);
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<68>";
	this.m_gameCanvas.p_Flush();
	pop_err();
	return 0;
}
var bb_app__app=null;
function c_GameDelegate(){
	BBGameDelegate.call(this);
	this.m__graphics=null;
	this.m__audio=null;
	this.m__input=null;
}
c_GameDelegate.prototype=extend_class(BBGameDelegate);
c_GameDelegate.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<72>";
	pop_err();
	return this;
}
c_GameDelegate.prototype.StartGame=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<82>";
	this.m__graphics=(new gxtkGraphics);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<83>";
	bb_graphics_SetGraphicsDevice(this.m__graphics);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<84>";
	bb_graphics_SetFont(null);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<86>";
	this.m__audio=(new gxtkAudio);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<87>";
	bb_audio_SetAudioDevice(this.m__audio);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<89>";
	this.m__input=c_InputDevice.m_new.call(new c_InputDevice);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<90>";
	bb_input_SetInputDevice(this.m__input);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<92>";
	bb_app_ValidateDeviceWindow(false);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<94>";
	bb_app_EnumDisplayModes();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<96>";
	bb_app__app.p_OnCreate();
	pop_err();
}
c_GameDelegate.prototype.SuspendGame=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<100>";
	bb_app__app.p_OnSuspend();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<101>";
	this.m__audio.Suspend();
	pop_err();
}
c_GameDelegate.prototype.ResumeGame=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<105>";
	this.m__audio.Resume();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<106>";
	bb_app__app.p_OnResume();
	pop_err();
}
c_GameDelegate.prototype.UpdateGame=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<110>";
	bb_app_ValidateDeviceWindow(true);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<111>";
	this.m__input.p_BeginUpdate();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<112>";
	bb_app__app.p_OnUpdate();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<113>";
	this.m__input.p_EndUpdate();
	pop_err();
}
c_GameDelegate.prototype.RenderGame=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<117>";
	bb_app_ValidateDeviceWindow(true);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<118>";
	var t_mode=this.m__graphics.BeginRender();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<119>";
	if((t_mode)!=0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<119>";
		bb_graphics_BeginRender();
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<120>";
	if(t_mode==2){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<120>";
		bb_app__app.p_OnLoading();
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<120>";
		bb_app__app.p_OnRender();
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<121>";
	if((t_mode)!=0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<121>";
		bb_graphics_EndRender();
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<122>";
	this.m__graphics.EndRender();
	pop_err();
}
c_GameDelegate.prototype.KeyEvent=function(t_event,t_data){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<126>";
	this.m__input.p_KeyEvent(t_event,t_data);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<127>";
	if(t_event!=1){
		pop_err();
		return;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<128>";
	var t_1=t_data;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<129>";
	if(t_1==432){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<130>";
		bb_app__app.p_OnClose();
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<131>";
		if(t_1==416){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<132>";
			bb_app__app.p_OnBack();
		}
	}
	pop_err();
}
c_GameDelegate.prototype.MouseEvent=function(t_event,t_data,t_x,t_y,t_z){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<137>";
	this.m__input.p_MouseEvent(t_event,t_data,t_x,t_y,t_z);
	pop_err();
}
c_GameDelegate.prototype.TouchEvent=function(t_event,t_data,t_x,t_y){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<141>";
	this.m__input.p_TouchEvent(t_event,t_data,t_x,t_y);
	pop_err();
}
c_GameDelegate.prototype.MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<145>";
	this.m__input.p_MotionEvent(t_event,t_data,t_x,t_y,t_z);
	pop_err();
}
c_GameDelegate.prototype.DiscardGraphics=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<149>";
	this.m__graphics.DiscardGraphics();
	pop_err();
}
c_GameDelegate.prototype.FileDropEvent=function(t_filename){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<153>";
	bb_app__app.p_OnFileDrop(t_filename);
	pop_err();
}
var bb_app__delegate=null;
var bb_app__game=null;
function bbMain(){
	push_err();
	err_info="C:/Users/diego/Downloads/Pong X/Game.cxs<96>";
	c_Game.m_new.call(new c_Game);
	pop_err();
	return 0;
}
var bb_graphics_device=null;
function bb_graphics_SetGraphicsDevice(t_dev){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<68>";
	bb_graphics_device=t_dev;
	pop_err();
	return 0;
}
function c_Font(){
	Object.call(this);
	this.m__pages=[];
	this.m__pageCount=0;
	this.m__firstChar=0;
	this.m__height=.0;
	this.m__charMap=c_IntMap.m_new.call(new c_IntMap);
}
c_Font.m_new=function(t_pages,t_pageCount,t_chars,t_firstChar,t_height){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<105>";
	dbg_object(this).m__pages=t_pages;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<106>";
	dbg_object(this).m__pageCount=t_pageCount;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<107>";
	dbg_object(this).m__firstChar=t_firstChar;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<108>";
	dbg_object(this).m__height=t_height;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<109>";
	dbg_object(this).m__charMap=t_chars;
	pop_err();
	return this;
}
c_Font.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<102>";
	pop_err();
	return this;
}
c_Font.m_Load=function(t_path,t_firstChar,t_numChars,t_padded){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<143>";
	var t_image=bb_graphics_LoadImage(t_path,1,c_Image.m_DefaultFlags);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<144>";
	var t__pages=new_object_array(1);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<145>";
	dbg_array(t__pages,0)[dbg_index]=t_image;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<146>";
	var t__charMap=c_IntMap.m_new.call(new c_IntMap);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<148>";
	var t__pageCount=1;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<149>";
	if(!((t_image)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<149>";
		pop_err();
		return null;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<151>";
	var t_cellWidth=((t_image.p_Width()/t_numChars)|0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<152>";
	var t_cellHeight=t_image.p_Height();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<153>";
	var t_glyphX=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<153>";
	var t_glyphY=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<153>";
	var t_glyphWidth=t_cellWidth;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<153>";
	var t_glyphHeight=t_cellHeight;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<160>";
	if(t_padded==true){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<155>";
		t_glyphX+=1;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<156>";
		t_glyphY+=1;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<157>";
		t_glyphWidth-=2;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<158>";
		t_glyphHeight-=2;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<161>";
	var t_w=((t_image.p_Width()/t_cellWidth)|0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<164>";
	for(var t_i=0;t_i<t_numChars;t_i=t_i+1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<165>";
		var t_y=((t_i/t_w)|0);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<166>";
		var t_x=t_i % t_w;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<167>";
		var t_glyph=c_Glyph.m_new.call(new c_Glyph,0,t_firstChar+t_i,t_x*t_cellWidth+t_glyphX,t_y*t_cellHeight+t_glyphY,t_glyphWidth,t_glyphHeight,t_glyphWidth);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<168>";
		t__charMap.p_Add(t_firstChar+t_i,t_glyph);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<171>";
	var t_=c_Font.m_new.call(new c_Font,t__pages,t__pageCount,t__charMap,t_firstChar,(t_glyphHeight));
	pop_err();
	return t_;
}
c_Font.m_Load2=function(t_path,t_cellWidth,t_cellHeight,t_glyphX,t_glyphY,t_glyphWidth,t_glyphHeight,t_firstChar,t_numChars){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<175>";
	var t_image=bb_graphics_LoadImage(t_path,1,c_Image.m_DefaultFlags);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<176>";
	var t__pages=new_object_array(1);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<177>";
	dbg_array(t__pages,0)[dbg_index]=t_image;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<178>";
	var t__charMap=c_IntMap.m_new.call(new c_IntMap);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<180>";
	var t__pageCount=1;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<181>";
	if(!((t_image)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<181>";
		pop_err();
		return null;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<183>";
	var t_w=((t_image.p_Width()/t_cellWidth)|0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<186>";
	for(var t_i=0;t_i<t_numChars;t_i=t_i+1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<187>";
		var t_y=((t_i/t_w)|0);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<188>";
		var t_x=t_i % t_w;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<189>";
		var t_glyph=c_Glyph.m_new.call(new c_Glyph,0,t_firstChar+t_i,t_x*t_cellWidth+t_glyphX,t_y*t_cellHeight+t_glyphY,t_glyphWidth,t_glyphHeight,t_glyphWidth);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<190>";
		t__charMap.p_Add(t_firstChar+t_i,t_glyph);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<193>";
	var t_=c_Font.m_new.call(new c_Font,t__pages,t__pageCount,t__charMap,t_firstChar,(t_glyphHeight));
	pop_err();
	return t_;
}
c_Font.m_Load3=function(t_url,t_flags){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<198>";
	var t_iniText="";
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<199>";
	var t_pageNum=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<201>";
	var t_tmpChar=null;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<202>";
	var t_plLen=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<203>";
	var t_lines=[];
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<205>";
	var t_filename="";
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<206>";
	var t_lineHeight=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<208>";
	var t__pages=[];
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<209>";
	var t__charMap=c_IntMap.m_new.call(new c_IntMap);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<210>";
	var t__pageCount=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<212>";
	var t_path="";
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<221>";
	if(t_url.indexOf("/",0)>-1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<215>";
		var t_pl=t_url.split("/");
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<216>";
		t_plLen=t_pl.length;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<217>";
		for(var t_pi=0;t_pi<=t_plLen-2;t_pi=t_pi+1){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<218>";
			t_path=t_path+dbg_array(t_pl,t_pi)[dbg_index]+"/";
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<228>";
	if(t_url.indexOf(".txt",0)>0 || t_url.indexOf(".fnt",0)>0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<224>";
		t_iniText=bb_app_LoadString(t_url);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<229>";
	if(t_iniText.length==0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<229>";
		error("\n\nError in file graphics.cxs, Method Font.Load:Font(url:String, flags:Int=Image.DefaultFlags)\n\nCan not load font: "+t_url);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<232>";
	t_lines=t_iniText.split(String.fromCharCode(13)+String.fromCharCode(10));
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<236>";
	if(t_lines.length<2){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<234>";
		t_lines=t_iniText.split(String.fromCharCode(10));
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<237>";
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<237>";
	var t_=t_lines;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<237>";
	var t_2=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<237>";
	while(t_2<t_.length){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<237>";
		var t_line=dbg_array(t_,t_2)[dbg_index];
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<237>";
		t_2=t_2+1;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<239>";
		t_line=string_trim(t_line);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<240>";
		if(string_startswith(t_line,"info") || t_line==""){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<240>";
			continue;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<241>";
		if(string_startswith(t_line,"padding")){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<241>";
			continue;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<260>";
		if(string_startswith(t_line,"common")){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<243>";
			var t_commondata=t_line.split(String.fromCharCode(32));
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<244>";
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<244>";
			var t_3=t_commondata;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<244>";
			var t_4=0;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<244>";
			while(t_4<t_3.length){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<244>";
				var t_common=dbg_array(t_3,t_4)[dbg_index];
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<244>";
				t_4=t_4+1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<251>";
				if(string_startswith(t_common,"lineHeight=")){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<247>";
					var t_lnh=t_common.split("=");
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<248>";
					dbg_array(t_lnh,1)[dbg_index]=string_trim(dbg_array(t_lnh,1)[dbg_index]);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<249>";
					t_lineHeight=parseInt((dbg_array(t_lnh,1)[dbg_index]),10);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<258>";
				if(string_startswith(t_common,"pages=")){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<253>";
					var t_lnh2=t_common.split("=");
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<254>";
					dbg_array(t_lnh2,1)[dbg_index]=string_trim(dbg_array(t_lnh2,1)[dbg_index]);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<255>";
					t__pageCount=parseInt((dbg_array(t_lnh2,1)[dbg_index]),10);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<256>";
					t__pages=new_object_array(t__pageCount);
				}
			}
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<282>";
		if(string_startswith(t_line,"page")){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<263>";
			var t_pagedata=t_line.split(String.fromCharCode(32));
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<264>";
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<264>";
			var t_5=t_pagedata;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<264>";
			var t_6=0;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<264>";
			while(t_6<t_5.length){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<264>";
				var t_data=dbg_array(t_5,t_6)[dbg_index];
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<264>";
				t_6=t_6+1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<280>";
				if(string_startswith(t_data,"file=")){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<266>";
					var t_fn=t_data.split("=");
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<267>";
					dbg_array(t_fn,1)[dbg_index]=string_trim(dbg_array(t_fn,1)[dbg_index]);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<268>";
					t_filename=dbg_array(t_fn,1)[dbg_index];
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<272>";
					if(dbg_charCodeAt(t_filename,0)==34){
						err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<270>";
						t_filename=t_filename.slice(1,t_filename.length-1);
					}
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<272>";
					t_filename=t_path+string_trim(t_filename);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<274>";
					dbg_array(t__pages,t_pageNum)[dbg_index]=bb_graphics_LoadImage(t_filename,1,t_flags);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<276>";
					if(dbg_array(t__pages,t_pageNum)[dbg_index]==null){
						err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<276>";
						error("\n\nError in file graphics.cxs, Method Font.Load:Font(url:String, flags:Int=Image.DefaultFlags)\n\nCan not load page image: "+t_filename);
					}
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<278>";
					t_pageNum=t_pageNum+1;
				}
			}
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<283>";
		if(string_startswith(t_line,"chars")){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<283>";
			continue;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<337>";
		if(string_startswith(t_line,"char")){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<286>";
			t_tmpChar=c_Glyph.m_new2.call(new c_Glyph);
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<287>";
			var t_linedata=t_line.split(String.fromCharCode(32));
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<288>";
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<288>";
			var t_7=t_linedata;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<288>";
			var t_8=0;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<288>";
			while(t_8<t_7.length){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<288>";
				var t_data2=dbg_array(t_7,t_8)[dbg_index];
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<288>";
				t_8=t_8+1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<294>";
				if(string_startswith(t_data2,"id=")){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<290>";
					var t_idc=t_data2.split("=");
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<291>";
					dbg_array(t_idc,1)[dbg_index]=string_trim(dbg_array(t_idc,1)[dbg_index]);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<292>";
					dbg_object(t_tmpChar).m_id=parseInt((dbg_array(t_idc,1)[dbg_index]),10);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<299>";
				if(string_startswith(t_data2,"x=")){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<295>";
					var t_xc=t_data2.split("=");
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<296>";
					dbg_array(t_xc,1)[dbg_index]=string_trim(dbg_array(t_xc,1)[dbg_index]);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<297>";
					dbg_object(t_tmpChar).m_x=parseInt((dbg_array(t_xc,1)[dbg_index]),10);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<304>";
				if(string_startswith(t_data2,"y=")){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<300>";
					var t_yc=t_data2.split("=");
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<301>";
					dbg_array(t_yc,1)[dbg_index]=string_trim(dbg_array(t_yc,1)[dbg_index]);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<302>";
					dbg_object(t_tmpChar).m_y=parseInt((dbg_array(t_yc,1)[dbg_index]),10);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<309>";
				if(string_startswith(t_data2,"width=")){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<305>";
					var t_wc=t_data2.split("=");
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<306>";
					dbg_array(t_wc,1)[dbg_index]=string_trim(dbg_array(t_wc,1)[dbg_index]);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<307>";
					dbg_object(t_tmpChar).m_width=parseInt((dbg_array(t_wc,1)[dbg_index]),10);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<314>";
				if(string_startswith(t_data2,"height=")){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<310>";
					var t_hc=t_data2.split("=");
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<311>";
					dbg_array(t_hc,1)[dbg_index]=string_trim(dbg_array(t_hc,1)[dbg_index]);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<312>";
					dbg_object(t_tmpChar).m_height=parseInt((dbg_array(t_hc,1)[dbg_index]),10);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<319>";
				if(string_startswith(t_data2,"xoffset=")){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<315>";
					var t_xoc=t_data2.split("=");
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<316>";
					dbg_array(t_xoc,1)[dbg_index]=string_trim(dbg_array(t_xoc,1)[dbg_index]);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<317>";
					dbg_object(t_tmpChar).m_xoff=parseInt((dbg_array(t_xoc,1)[dbg_index]),10);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<324>";
				if(string_startswith(t_data2,"yoffset=")){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<320>";
					var t_yoc=t_data2.split("=");
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<321>";
					dbg_array(t_yoc,1)[dbg_index]=string_trim(dbg_array(t_yoc,1)[dbg_index]);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<322>";
					dbg_object(t_tmpChar).m_yoff=parseInt((dbg_array(t_yoc,1)[dbg_index]),10);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<329>";
				if(string_startswith(t_data2,"xadvance=")){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<325>";
					var t_advc=t_data2.split("=");
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<326>";
					dbg_array(t_advc,1)[dbg_index]=string_trim(dbg_array(t_advc,1)[dbg_index]);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<327>";
					dbg_object(t_tmpChar).m_advance=parseInt((dbg_array(t_advc,1)[dbg_index]),10);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<334>";
				if(string_startswith(t_data2,"page=")){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<330>";
					var t_advc2=t_data2.split("=");
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<331>";
					dbg_array(t_advc2,1)[dbg_index]=string_trim(dbg_array(t_advc2,1)[dbg_index]);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<332>";
					dbg_object(t_tmpChar).m_page=parseInt((dbg_array(t_advc2,1)[dbg_index]),10);
				}
			}
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<335>";
			t__charMap.p_Add(dbg_object(t_tmpChar).m_id,t_tmpChar);
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<337>";
		continue;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<339>";
	var t_9=c_Font.m_new.call(new c_Font,t__pages,t__pageCount,t__charMap,-1,(t_lineHeight));
	pop_err();
	return t_9;
}
function c_GraphicsContext(){
	Object.call(this);
	this.m_defaultFont=null;
	this.m_font=null;
	this.m_matrixSp=0;
	this.m_ix=1.0;
	this.m_iy=.0;
	this.m_jx=.0;
	this.m_jy=1.0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_tformed=0;
	this.m_matDirty=0;
	this.m_color_r=.0;
	this.m_color_g=.0;
	this.m_color_b=.0;
	this.m_alpha=.0;
	this.m_blend=0;
	this.m_scissor_x=.0;
	this.m_scissor_y=.0;
	this.m_scissor_width=.0;
	this.m_scissor_height=.0;
}
c_GraphicsContext.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<34>";
	pop_err();
	return this;
}
var bb_graphics_context=null;
function c_Image(){
	Object.call(this);
	this.m_surface=null;
	this.m_width=0;
	this.m_height=0;
	this.m_frames=[];
	this.m_flags=0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_source=null;
}
c_Image.m_DefaultFlags=0;
c_Image.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<351>";
	pop_err();
	return this;
}
c_Image.prototype.p_SetHandle=function(t_tx,t_ty){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<395>";
	dbg_object(this).m_tx=t_tx;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<396>";
	dbg_object(this).m_ty=t_ty;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<397>";
	dbg_object(this).m_flags=dbg_object(this).m_flags&-2;
	pop_err();
	return 0;
}
c_Image.prototype.p_ApplyFlags=function(t_iflags){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<480>";
	this.m_flags=t_iflags;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<488>";
	if((this.m_flags&2)!=0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<483>";
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<483>";
		var t_=this.m_frames;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<483>";
		var t_2=0;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<483>";
		while(t_2<t_.length){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<483>";
			var t_f=dbg_array(t_,t_2)[dbg_index];
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<483>";
			t_2=t_2+1;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<484>";
			dbg_object(t_f).m_x+=1;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<486>";
		this.m_width-=2;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<495>";
	if((this.m_flags&4)!=0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<490>";
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<490>";
		var t_3=this.m_frames;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<490>";
		var t_4=0;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<490>";
		while(t_4<t_3.length){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<490>";
			var t_f2=dbg_array(t_3,t_4)[dbg_index];
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<490>";
			t_4=t_4+1;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<491>";
			dbg_object(t_f2).m_y+=1;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<493>";
		this.m_height-=2;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<499>";
	if((this.m_flags&1)!=0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<497>";
		this.p_SetHandle((this.m_width)/2.0,(this.m_height)/2.0);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<503>";
	if(this.m_frames.length==1 && dbg_object(dbg_array(this.m_frames,0)[dbg_index]).m_x==0 && dbg_object(dbg_array(this.m_frames,0)[dbg_index]).m_y==0 && this.m_width==this.m_surface.Width() && this.m_height==this.m_surface.Height()){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<501>";
		this.m_flags|=65536;
	}
	pop_err();
	return 0;
}
c_Image.prototype.p_Init=function(t_surf,t_nframes,t_iflags){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<425>";
	if((this.m_surface)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<425>";
		error("Image already initialized");
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<426>";
	this.m_surface=t_surf;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<428>";
	this.m_width=((this.m_surface.Width()/t_nframes)|0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<429>";
	this.m_height=this.m_surface.Height();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<431>";
	this.m_frames=new_object_array(t_nframes);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<432>";
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<433>";
		dbg_array(this.m_frames,t_i)[dbg_index]=c_Frame.m_new.call(new c_Frame,t_i*this.m_width,0);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<436>";
	this.p_ApplyFlags(t_iflags);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<437>";
	pop_err();
	return this;
}
c_Image.prototype.p_Init2=function(t_surf,t_x,t_y,t_iwidth,t_iheight,t_nframes,t_iflags,t_src,t_srcx,t_srcy,t_srcw,t_srch){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<441>";
	if((this.m_surface)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<441>";
		error("Image already initialized");
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<442>";
	this.m_surface=t_surf;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<443>";
	this.m_source=t_src;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<445>";
	this.m_width=t_iwidth;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<446>";
	this.m_height=t_iheight;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<448>";
	this.m_frames=new_object_array(t_nframes);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<450>";
	var t_ix=t_x;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<450>";
	var t_iy=t_y;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<452>";
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<457>";
		if(t_ix+this.m_width>t_srcw){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<454>";
			t_ix=0;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<455>";
			t_iy+=this.m_height;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<460>";
		if(t_ix+this.m_width>t_srcw || t_iy+this.m_height>t_srch){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<458>";
			error("Image frame outside surface");
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<460>";
		dbg_array(this.m_frames,t_i)[dbg_index]=c_Frame.m_new.call(new c_Frame,t_ix+t_srcx,t_iy+t_srcy);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<461>";
		t_ix+=this.m_width;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<464>";
	this.p_ApplyFlags(t_iflags);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<465>";
	pop_err();
	return this;
}
c_Image.prototype.p_Width=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<362>";
	pop_err();
	return this.m_width;
}
c_Image.prototype.p_Height=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<366>";
	pop_err();
	return this.m_height;
}
function bb_data_FixDataPath(t_path){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/data.cxs<7>";
	var t_i=t_path.indexOf(":/",0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/data.cxs<8>";
	if(t_i!=-1 && t_path.indexOf("/",0)==t_i+1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/data.cxs<8>";
		pop_err();
		return t_path;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/data.cxs<9>";
	if(string_startswith(t_path,"./") || string_startswith(t_path,"/")){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/data.cxs<9>";
		pop_err();
		return t_path;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/data.cxs<10>";
	var t_="cerberus://data/"+t_path;
	pop_err();
	return t_;
}
function c_Frame(){
	Object.call(this);
	this.m_x=0;
	this.m_y=0;
}
c_Frame.m_new=function(t_x,t_y){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<28>";
	dbg_object(this).m_x=t_x;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<29>";
	dbg_object(this).m_y=t_y;
	pop_err();
	return this;
}
c_Frame.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<23>";
	pop_err();
	return this;
}
function bb_graphics_LoadImage(t_path,t_frameCount,t_flags){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<522>";
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<529>";
	if((t_surf)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<525>";
		var t_=(c_Image.m_new.call(new c_Image)).p_Init(t_surf,t_frameCount,t_flags);
		pop_err();
		return t_;
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<527>";
		debugLog("Error - Unable to load image: "+t_path);
	}
	pop_err();
	return null;
}
function bb_graphics_LoadImage2(t_path,t_frameWidth,t_frameHeight,t_frameCount,t_flags){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<532>";
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<538>";
	if((t_surf)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<534>";
		var t_=(c_Image.m_new.call(new c_Image)).p_Init2(t_surf,0,0,t_frameWidth,t_frameHeight,t_frameCount,t_flags,null,0,0,t_surf.Width(),t_surf.Height());
		pop_err();
		return t_;
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<536>";
		debugLog("Error - Unable to load image: "+t_path);
	}
	pop_err();
	return null;
}
function c_Glyph(){
	Object.call(this);
	this.m_page=0;
	this.m_id=0;
	this.m_x=0;
	this.m_y=0;
	this.m_width=0;
	this.m_height=0;
	this.m_advance=0;
	this.m_xoff=0;
	this.m_yoff=0;
}
c_Glyph.m_new=function(t_page,t_id,t_x,t_y,t_width,t_height,t_advance){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<90>";
	dbg_object(this).m_page=t_page;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<91>";
	dbg_object(this).m_id=t_id;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<92>";
	dbg_object(this).m_x=t_x;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<93>";
	dbg_object(this).m_y=t_y;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<94>";
	dbg_object(this).m_width=t_width;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<95>";
	dbg_object(this).m_height=t_height;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<96>";
	dbg_object(this).m_advance=t_advance;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<97>";
	dbg_object(this).m_xoff=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<98>";
	dbg_object(this).m_yoff=0;
	pop_err();
	return this;
}
c_Glyph.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<77>";
	pop_err();
	return this;
}
function c_Map(){
	Object.call(this);
	this.m_root=null;
}
c_Map.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<7>";
	pop_err();
	return this;
}
c_Map.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map.prototype.p_RotateLeft=function(t_node){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<256>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<266>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<263>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<264>";
		this.m_root=t_child;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map.prototype.p_RotateRight=function(t_node){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<276>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<286>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<283>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<284>";
		this.m_root=t_child;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map.prototype.p_InsertFixup=function(t_node){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<246>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<229>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<225>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<223>";
					this.p_RotateLeft(t_node);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<227>";
				this.p_RotateRight(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<245>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<241>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<239>";
					this.p_RotateRight(t_node);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<243>";
				this.p_RotateLeft(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map.prototype.p_Add=function(t_key,t_value){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<61>";
	var t_node=this.m_root;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<62>";
	var t_parent=null;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<62>";
	var t_cmp=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<64>";
	while((t_node)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<65>";
		t_parent=t_node;
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<66>";
		t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<74>";
		if(t_cmp>0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<68>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<69>";
			if(t_cmp<0){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<70>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<72>";
				pop_err();
				return false;
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<76>";
	t_node=c_Node.m_new.call(new c_Node,t_key,t_value,-1,t_parent);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<88>";
	if((t_parent)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<84>";
		if(t_cmp>0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<80>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<82>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<84>";
		this.p_InsertFixup(t_node);
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<86>";
		this.m_root=t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<88>";
	pop_err();
	return true;
}
function c_IntMap(){
	c_Map.call(this);
}
c_IntMap.prototype=extend_class(c_Map);
c_IntMap.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<534>";
	c_Map.m_new.call(this);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<534>";
	pop_err();
	return this;
}
c_IntMap.prototype.p_Compare=function(t_lhs,t_rhs){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<537>";
	var t_=t_lhs-t_rhs;
	pop_err();
	return t_;
}
function c_Node(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<364>";
	dbg_object(this).m_key=t_key;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<365>";
	dbg_object(this).m_value=t_value;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<366>";
	dbg_object(this).m_color=t_color;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<361>";
	pop_err();
	return this;
}
function bb_app_LoadString(t_path){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<233>";
	var t_=bb_app__game.LoadString(bb_data_FixDataPath(t_path));
	pop_err();
	return t_;
}
function bb_graphics_SetFont(t_font){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<961>";
	if(!((t_font)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<959>";
		if(!((dbg_object(bb_graphics_context).m_defaultFont)!=null)){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<957>";
			dbg_object(bb_graphics_context).m_defaultFont=c_Font.m_Load("mojo_font.png",32,96,true);
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<959>";
		t_font=dbg_object(bb_graphics_context).m_defaultFont;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<961>";
	dbg_object(bb_graphics_context).m_font=t_font;
	pop_err();
}
var bb_audio_device=null;
function bb_audio_SetAudioDevice(t_dev){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/audio.cxs<36>";
	bb_audio_device=t_dev;
	pop_err();
	return 0;
}
function c_InputDevice(){
	Object.call(this);
	this.m__joyStates=new_object_array(4);
	this.m__keyDown=new_bool_array(512);
	this.m__keyHitPut=0;
	this.m__keyHitQueue=new_number_array(33);
	this.m__keyHit=new_number_array(512);
	this.m__charGet=0;
	this.m__charPut=0;
	this.m__charQueue=new_number_array(32);
	this.m__mouseX=.0;
	this.m__mouseY=.0;
	this.m__mouseZ=.0;
	this.m__touchX=new_number_array(32);
	this.m__touchY=new_number_array(32);
	this.m__accelX=.0;
	this.m__accelY=.0;
	this.m__accelZ=.0;
}
c_InputDevice.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<26>";
	for(var t_i=0;t_i<4;t_i=t_i+1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<27>";
		dbg_array(this.m__joyStates,t_i)[dbg_index]=c_JoyState.m_new.call(new c_JoyState);
	}
	pop_err();
	return this;
}
c_InputDevice.prototype.p_PutKeyHit=function(t_key){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<262>";
	if(this.m__keyHitPut==this.m__keyHitQueue.length){
		pop_err();
		return;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<263>";
	dbg_array(this.m__keyHit,t_key)[dbg_index]+=1;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<264>";
	dbg_array(this.m__keyHitQueue,this.m__keyHitPut)[dbg_index]=t_key;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<265>";
	this.m__keyHitPut+=1;
	pop_err();
}
c_InputDevice.prototype.p_BeginUpdate=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<213>";
	for(var t_i=0;t_i<4;t_i=t_i+1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<214>";
		var t_state=dbg_array(this.m__joyStates,t_i)[dbg_index];
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<215>";
		if(!BBGame.Game().PollJoystick(t_i,dbg_object(t_state).m_joyx,dbg_object(t_state).m_joyy,dbg_object(t_state).m_joyz,dbg_object(t_state).m_buttons)){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<215>";
			break;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<216>";
		for(var t_j=0;t_j<32;t_j=t_j+1){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<217>";
			var t_key=256+t_i*32+t_j;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<226>";
			if(dbg_array(dbg_object(t_state).m_buttons,t_j)[dbg_index]){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<223>";
				if(!dbg_array(this.m__keyDown,t_key)[dbg_index]){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<220>";
					dbg_array(this.m__keyDown,t_key)[dbg_index]=true;
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<221>";
					this.p_PutKeyHit(t_key);
				}
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<224>";
				dbg_array(this.m__keyDown,t_key)[dbg_index]=false;
			}
		}
	}
	pop_err();
}
c_InputDevice.prototype.p_EndUpdate=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<231>";
	for(var t_i=0;t_i<this.m__keyHitPut;t_i=t_i+1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<232>";
		dbg_array(this.m__keyHit,dbg_array(this.m__keyHitQueue,t_i)[dbg_index])[dbg_index]=0;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<234>";
	this.m__keyHitPut=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<235>";
	this.m__charGet=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<236>";
	this.m__charPut=0;
	pop_err();
}
c_InputDevice.prototype.p_KeyEvent=function(t_event,t_data){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<134>";
	var t_1=t_event;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<135>";
	if(t_1==1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<147>";
		if(!dbg_array(this.m__keyDown,t_data)[dbg_index]){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<137>";
			dbg_array(this.m__keyDown,t_data)[dbg_index]=true;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<138>";
			this.p_PutKeyHit(t_data);
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<146>";
			if(t_data==1){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<140>";
				dbg_array(this.m__keyDown,384)[dbg_index]=true;
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<141>";
				this.p_PutKeyHit(384);
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<142>";
				if(t_data==384){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<143>";
					dbg_array(this.m__keyDown,1)[dbg_index]=true;
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<144>";
					this.p_PutKeyHit(1);
				}
			}
		}
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<147>";
		if(t_1==2){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<156>";
			if(dbg_array(this.m__keyDown,t_data)[dbg_index]){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<149>";
				dbg_array(this.m__keyDown,t_data)[dbg_index]=false;
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<155>";
				if(t_data==1){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<151>";
					dbg_array(this.m__keyDown,384)[dbg_index]=false;
				}else{
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<152>";
					if(t_data==384){
						err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<153>";
						dbg_array(this.m__keyDown,1)[dbg_index]=false;
					}
				}
			}
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<156>";
			if(t_1==3){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<161>";
				if(this.m__charPut<this.m__charQueue.length){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<158>";
					dbg_array(this.m__charQueue,this.m__charPut)[dbg_index]=t_data;
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<159>";
					this.m__charPut+=1;
				}
			}
		}
	}
	pop_err();
}
c_InputDevice.prototype.p_MouseEvent=function(t_event,t_data,t_x,t_y,t_z){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<165>";
	var t_2=t_event;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<166>";
	if(t_2==4){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<167>";
		this.p_KeyEvent(1,1+t_data);
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<168>";
		if(t_2==5){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<169>";
			this.p_KeyEvent(2,1+t_data);
			pop_err();
			return;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<171>";
			if(t_2==6){
			}else{
				pop_err();
				return;
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<175>";
	this.m__mouseX=t_x;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<176>";
	this.m__mouseY=t_y;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<177>";
	this.m__mouseZ=t_z;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<178>";
	dbg_array(this.m__touchX,0)[dbg_index]=t_x;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<179>";
	dbg_array(this.m__touchY,0)[dbg_index]=t_y;
	pop_err();
}
c_InputDevice.prototype.p_TouchEvent=function(t_event,t_data,t_x,t_y){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<183>";
	var t_3=t_event;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<184>";
	if(t_3==7){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<185>";
		this.p_KeyEvent(1,384+t_data);
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<186>";
		if(t_3==8){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<187>";
			this.p_KeyEvent(2,384+t_data);
			pop_err();
			return;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<189>";
			if(t_3==9){
			}else{
				pop_err();
				return;
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<193>";
	dbg_array(this.m__touchX,t_data)[dbg_index]=t_x;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<194>";
	dbg_array(this.m__touchY,t_data)[dbg_index]=t_y;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<199>";
	if(t_data==0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<196>";
		this.m__mouseX=t_x;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<197>";
		this.m__mouseY=t_y;
	}
	pop_err();
}
c_InputDevice.prototype.p_MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<202>";
	var t_4=t_event;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<203>";
	if(t_4==10){
	}else{
		pop_err();
		return;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<207>";
	this.m__accelX=t_x;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<208>";
	this.m__accelY=t_y;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<209>";
	this.m__accelZ=t_z;
	pop_err();
}
c_InputDevice.prototype.p_KeyDown=function(t_key){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<47>";
	if(t_key>0 && t_key<512){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<47>";
		pop_err();
		return dbg_array(this.m__keyDown,t_key)[dbg_index];
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<48>";
	pop_err();
	return false;
}
function c_JoyState(){
	Object.call(this);
	this.m_joyx=new_number_array(2);
	this.m_joyy=new_number_array(2);
	this.m_joyz=new_number_array(2);
	this.m_buttons=new_bool_array(32);
}
c_JoyState.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/inputdevice.cxs<14>";
	pop_err();
	return this;
}
var bb_input_device=null;
function bb_input_SetInputDevice(t_dev){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/input.cxs<22>";
	bb_input_device=t_dev;
	pop_err();
	return 0;
}
var bb_app__devWidth=0;
var bb_app__devHeight=0;
var bb_app__devWinWidth=0;
var bb_app__devWinHeight=0;
function bb_app_ValidateDeviceWindow(t_notifyApp){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<60>";
	var t_winW=bb_app__game.GetDeviceWindowWidth();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<61>";
	var t_winH=bb_app__game.GetDeviceWindowHeight();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<62>";
	var t_w=bb_app__game.GetDeviceWidth();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<63>";
	var t_h=bb_app__game.GetDeviceHeight();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<64>";
	if(t_w==bb_app__devWidth && t_h==bb_app__devHeight && t_winW==bb_app__devWinWidth && t_winH==bb_app__devWinHeight){
		pop_err();
		return;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<65>";
	bb_app__devWidth=t_w;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<66>";
	bb_app__devHeight=t_h;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<67>";
	bb_app__devWinWidth=t_winW;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<68>";
	bb_app__devWinHeight=t_winH;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<69>";
	if(t_notifyApp){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<69>";
		bb_app__app.p_OnResize();
	}
	pop_err();
}
function c_DisplayMode(){
	Object.call(this);
	this.m__width=0;
	this.m__height=0;
}
c_DisplayMode.m_new=function(t_width,t_height){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<205>";
	this.m__width=t_width;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<206>";
	this.m__height=t_height;
	pop_err();
	return this;
}
c_DisplayMode.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<202>";
	pop_err();
	return this;
}
function c_Map2(){
	Object.call(this);
	this.m_root=null;
}
c_Map2.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<7>";
	pop_err();
	return this;
}
c_Map2.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map2.prototype.p_FindNode=function(t_key){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<157>";
	var t_node=this.m_root;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<159>";
	while((t_node)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<160>";
		var t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<168>";
		if(t_cmp>0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<163>";
			if(t_cmp<0){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<169>";
	pop_err();
	return t_node;
}
c_Map2.prototype.p_Contains=function(t_key){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<25>";
	var t_=this.p_FindNode(t_key)!=null;
	pop_err();
	return t_;
}
c_Map2.prototype.p_RotateLeft2=function(t_node){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<256>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<266>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<263>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<264>";
		this.m_root=t_child;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map2.prototype.p_RotateRight2=function(t_node){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<276>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<286>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<283>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<284>";
		this.m_root=t_child;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map2.prototype.p_InsertFixup2=function(t_node){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<246>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<229>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<225>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<223>";
					this.p_RotateLeft2(t_node);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<227>";
				this.p_RotateRight2(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<245>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<241>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<239>";
					this.p_RotateRight2(t_node);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<243>";
				this.p_RotateLeft2(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map2.prototype.p_Set=function(t_key,t_value){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<29>";
	var t_node=this.m_root;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<30>";
	var t_parent=null;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<30>";
	var t_cmp=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<32>";
	while((t_node)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<33>";
		t_parent=t_node;
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<34>";
		t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<43>";
		if(t_cmp>0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<37>";
			if(t_cmp<0){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<45>";
	t_node=c_Node2.m_new.call(new c_Node2,t_key,t_value,-1,t_parent);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<57>";
	if((t_parent)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<53>";
		if(t_cmp>0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<53>";
		this.p_InsertFixup2(t_node);
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<55>";
		this.m_root=t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<57>";
	pop_err();
	return true;
}
c_Map2.prototype.p_Insert=function(t_key,t_value){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<146>";
	var t_=this.p_Set(t_key,t_value);
	pop_err();
	return t_;
}
function c_IntMap2(){
	c_Map2.call(this);
}
c_IntMap2.prototype=extend_class(c_Map2);
c_IntMap2.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<534>";
	c_Map2.m_new.call(this);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<534>";
	pop_err();
	return this;
}
c_IntMap2.prototype.p_Compare=function(t_lhs,t_rhs){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<537>";
	var t_=t_lhs-t_rhs;
	pop_err();
	return t_;
}
function c_Stack(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack.m_new2=function(t_data){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack.prototype.p_Push=function(t_value){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<74>";
	if(this.m_length==this.m_data.length){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<72>";
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<74>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<75>";
	this.m_length+=1;
	pop_err();
}
c_Stack.prototype.p_Push2=function(t_values,t_offset,t_count){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<83>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<84>";
		this.p_Push(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack.prototype.p_Push3=function(t_values,t_offset){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<79>";
	this.p_Push2(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
c_Stack.prototype.p_ToArray=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<18>";
	var t_t=new_object_array(this.m_length);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<19>";
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<20>";
		dbg_array(t_t,t_i)[dbg_index]=dbg_array(this.m_data,t_i)[dbg_index];
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<22>";
	pop_err();
	return t_t;
}
function c_Node2(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node2.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<364>";
	dbg_object(this).m_key=t_key;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<365>";
	dbg_object(this).m_value=t_value;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<366>";
	dbg_object(this).m_color=t_color;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node2.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<361>";
	pop_err();
	return this;
}
var bb_app__displayModes=[];
var bb_app__desktopMode=null;
function bb_app_DeviceWidth(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<276>";
	pop_err();
	return bb_app__devWidth;
}
function bb_app_DeviceHeight(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<280>";
	pop_err();
	return bb_app__devHeight;
}
function bb_app_EnumDisplayModes(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<35>";
	var t_modes=bb_app__game.GetDisplayModes();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<36>";
	var t_mmap=c_IntMap2.m_new.call(new c_IntMap2);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<37>";
	var t_mstack=c_Stack.m_new.call(new c_Stack);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<38>";
	for(var t_i=0;t_i<t_modes.length;t_i=t_i+1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<39>";
		var t_w=dbg_object(dbg_array(t_modes,t_i)[dbg_index]).width;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<40>";
		var t_h=dbg_object(dbg_array(t_modes,t_i)[dbg_index]).height;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<41>";
		var t_size=t_w<<16|t_h;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<48>";
		if(t_mmap.p_Contains(t_size)){
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<44>";
			var t_mode=c_DisplayMode.m_new.call(new c_DisplayMode,dbg_object(dbg_array(t_modes,t_i)[dbg_index]).width,dbg_object(dbg_array(t_modes,t_i)[dbg_index]).height);
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<45>";
			t_mmap.p_Insert(t_size,t_mode);
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<46>";
			t_mstack.p_Push(t_mode);
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<49>";
	bb_app__displayModes=t_mstack.p_ToArray();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<50>";
	var t_mode2=bb_app__game.GetDesktopMode();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<56>";
	if((t_mode2)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<52>";
		bb_app__desktopMode=c_DisplayMode.m_new.call(new c_DisplayMode,dbg_object(t_mode2).width,dbg_object(t_mode2).height);
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<54>";
		bb_app__desktopMode=c_DisplayMode.m_new.call(new c_DisplayMode,bb_app_DeviceWidth(),bb_app_DeviceHeight());
	}
	pop_err();
}
var bb_graphics_renderDevice=null;
function bb_graphics_SetMatrix(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<623>";
	dbg_object(bb_graphics_context).m_ix=t_ix;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<624>";
	dbg_object(bb_graphics_context).m_iy=t_iy;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<625>";
	dbg_object(bb_graphics_context).m_jx=t_jx;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<626>";
	dbg_object(bb_graphics_context).m_jy=t_jy;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<627>";
	dbg_object(bb_graphics_context).m_tx=t_tx;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<628>";
	dbg_object(bb_graphics_context).m_ty=t_ty;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<629>";
	dbg_object(bb_graphics_context).m_tformed=((t_ix!=1.0 || t_iy!=0.0 || t_jx!=0.0 || t_jy!=1.0 || t_tx!=0.0 || t_ty!=0.0)?1:0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<630>";
	dbg_object(bb_graphics_context).m_matDirty=1;
	pop_err();
	return 0;
}
function bb_graphics_SetMatrix2(t_m){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<619>";
	bb_graphics_SetMatrix(dbg_array(t_m,0)[dbg_index],dbg_array(t_m,1)[dbg_index],dbg_array(t_m,2)[dbg_index],dbg_array(t_m,3)[dbg_index],dbg_array(t_m,4)[dbg_index],dbg_array(t_m,5)[dbg_index]);
	pop_err();
	return 0;
}
function bb_graphics_SetColor(t_r,t_g,t_b){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<546>";
	dbg_object(bb_graphics_context).m_color_r=t_r;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<547>";
	dbg_object(bb_graphics_context).m_color_g=t_g;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<548>";
	dbg_object(bb_graphics_context).m_color_b=t_b;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<549>";
	bb_graphics_renderDevice.SetColor(t_r,t_g,t_b);
	pop_err();
	return 0;
}
function bb_graphics_SetColor2(t_rgb){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<555>";
	dbg_object(bb_graphics_context).m_color_r=(t_rgb>>16&255);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<556>";
	dbg_object(bb_graphics_context).m_color_g=(t_rgb>>8&255);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<557>";
	dbg_object(bb_graphics_context).m_color_b=(t_rgb&255);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<558>";
	bb_graphics_renderDevice.SetColor(dbg_object(bb_graphics_context).m_color_r,dbg_object(bb_graphics_context).m_color_g,dbg_object(bb_graphics_context).m_color_b);
	pop_err();
	return 0;
}
function c_Color(){
	Object.call(this);
	this.m_r=.0;
	this.m_g=.0;
	this.m_b=.0;
}
function bb_graphics_SetColor3(t_col){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<564>";
	dbg_object(bb_graphics_context).m_color_r=dbg_object(t_col).m_r;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<565>";
	dbg_object(bb_graphics_context).m_color_g=dbg_object(t_col).m_g;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<566>";
	dbg_object(bb_graphics_context).m_color_b=dbg_object(t_col).m_b;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<567>";
	bb_graphics_renderDevice.SetColor(dbg_object(bb_graphics_context).m_color_r,dbg_object(bb_graphics_context).m_color_g,dbg_object(bb_graphics_context).m_color_b);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<568>";
	bb_graphics_renderDevice.SetAlpha(dbg_object(bb_graphics_context).m_alpha);
	pop_err();
	return 0;
}
function bb_graphics_SetAlpha(t_alpha){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<582>";
	dbg_object(bb_graphics_context).m_alpha=t_alpha;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<583>";
	bb_graphics_renderDevice.SetAlpha(t_alpha);
	pop_err();
	return 0;
}
function bb_graphics_SetBlend(t_blend){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<591>";
	dbg_object(bb_graphics_context).m_blend=t_blend;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<592>";
	bb_graphics_renderDevice.SetBlend(t_blend);
	pop_err();
	return 0;
}
function bb_graphics_SetScissor(t_x,t_y,t_width,t_height){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<600>";
	dbg_object(bb_graphics_context).m_scissor_x=t_x;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<601>";
	dbg_object(bb_graphics_context).m_scissor_y=t_y;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<602>";
	dbg_object(bb_graphics_context).m_scissor_width=t_width;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<603>";
	dbg_object(bb_graphics_context).m_scissor_height=t_height;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<604>";
	bb_graphics_renderDevice.SetScissor(((t_x)|0),((t_y)|0),((t_width)|0),((t_height)|0));
	pop_err();
	return 0;
}
function bb_graphics_BeginRender(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<508>";
	bb_graphics_renderDevice=bb_graphics_device;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<509>";
	dbg_object(bb_graphics_context).m_matrixSp=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<510>";
	bb_graphics_SetMatrix(1.0,0.0,0.0,1.0,0.0,0.0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<511>";
	bb_graphics_SetColor(255.0,255.0,255.0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<512>";
	bb_graphics_SetAlpha(1.0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<513>";
	bb_graphics_SetBlend(0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<514>";
	bb_graphics_SetScissor(0.0,0.0,(bb_app_DeviceWidth()),(bb_app_DeviceHeight()));
	pop_err();
	return 0;
}
function bb_graphics_EndRender(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/graphics.cxs<518>";
	bb_graphics_renderDevice=null;
	pop_err();
	return 0;
}
function c_BBGameEvent(){
	Object.call(this);
}
function bb_app_EndApp(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<272>";
	error("");
	pop_err();
}
function bb_app_Millisecs(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<246>";
	var t_=bb_app__game.Millisecs();
	pop_err();
	return t_;
}
var bb_random_Seed=0;
function c_DrawList(){
	Object.call(this);
	this.m__font=null;
	this.m__defaultMaterial=null;
	this.m__next=0;
	this.m__ops=c_Stack3.m_new.call(new c_Stack3);
	this.m__data=c_DataBuffer.m_new.call(new c_DataBuffer,4096,true);
	this.m__op=bb_graphics2_nullOp;
	this.m__casters=c_Stack4.m_new.call(new c_Stack4);
	this.m__casterVerts=c_FloatStack.m_new2.call(new c_FloatStack);
	this.m__color=[1.0,1.0,1.0,1.0];
	this.m__alpha=255.0;
	this.m__pmcolor=-1;
	this.m__blend=1;
	this.m__ix=1.0;
	this.m__jx=.0;
	this.m__tx=.0;
	this.m__iy=.0;
	this.m__jy=1.0;
	this.m__ty=.0;
}
c_DrawList.prototype.p_SetFont=function(t_font){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1758>";
	if(!((t_font)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1758>";
		t_font=bb_graphics2_defaultFont;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1759>";
	this.m__font=t_font;
	pop_err();
}
c_DrawList.prototype.p_SetDefaultMaterial=function(t_material){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1767>";
	this.m__defaultMaterial=t_material;
	pop_err();
}
c_DrawList.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1604>";
	bb_graphics2_InitMojo2();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1606>";
	this.p_SetFont(null);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1607>";
	this.p_SetDefaultMaterial(bb_graphics2_fastShader.p_DefaultMaterial());
	pop_err();
	return this;
}
c_DrawList.prototype.p_IsEmpty=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2355>";
	var t_=this.m__next==0;
	pop_err();
	return t_;
}
c_DrawList.prototype.p_Render=function(t_op,t_index,t_count){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2368>";
	if(!dbg_object(t_op).m_material.p_Bind()){
		pop_err();
		return;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2399>";
	if(dbg_object(t_op).m_blend!=bb_graphics2_rs_blend){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2371>";
		bb_graphics2_rs_blend=dbg_object(t_op).m_blend;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2372>";
		var t_4=bb_graphics2_rs_blend;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2373>";
		if(t_4==0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2374>";
			gl.disable(3042);
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2375>";
			if(t_4==1){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2376>";
				gl.enable(3042);
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2377>";
				gl.blendFunc(1,771);
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2378>";
				if(t_4==2){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2379>";
					gl.enable(3042);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2380>";
					gl.blendFunc(1,1);
				}else{
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2381>";
					if(t_4==3){
						err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2382>";
						gl.enable(3042);
						err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2383>";
						gl.blendFunc(774,771);
					}else{
						err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2384>";
						if(t_4==4){
							err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2385>";
							gl.enable(3042);
							err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2386>";
							gl.blendFunc(774,0);
						}else{
							err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2387>";
							if(t_4==5){
								err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2388>";
								gl.enable(3042);
								err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2389>";
								gl.blendFuncSeparate(0,1,1,0);
							}else{
								err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2390>";
								if(t_4==6){
									err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2391>";
									gl.enable(3042);
									err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2392>";
									gl.blendFunc(770,771);
								}else{
									err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2393>";
									if(t_4==7){
										err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2394>";
										gl.enable(3042);
										err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2395>";
										gl.blendFuncSeparate(0,770,1,0);
										err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2396>";
										gl.blendEquation(32774);
									}
								}
							}
						}
					}
				}
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2400>";
	var t_5=dbg_object(t_op).m_order;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2401>";
	if(t_5==1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2402>";
		gl.drawArrays(0,t_index,t_count);
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2403>";
		if(t_5==2){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2404>";
			gl.drawArrays(1,t_index,t_count);
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2405>";
			if(t_5==3){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2406>";
				gl.drawArrays(4,t_index,t_count);
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2407>";
				if(t_5==4){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2408>";
					gl.drawElements(4,((t_count/4)|0)*6,5123,(((t_index/4)|0)*6+(t_index&3)*3510)*2);
				}else{
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2410>";
					var t_j=0;
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2411>";
					while(t_j<t_count){
						err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2412>";
						gl.drawArrays(6,t_index+t_j,dbg_object(t_op).m_order);
						err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2413>";
						t_j+=dbg_object(t_op).m_order;
					}
				}
			}
		}
	}
	pop_err();
}
c_DrawList.prototype.p_Render2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2420>";
	if(!((this.m__next)!=0)){
		pop_err();
		return;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2422>";
	var t_offset=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2422>";
	var t_opid=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2422>";
	var t_ops=this.m__ops.p_Data();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2422>";
	var t_length=this.m__ops.p_Length2();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2424>";
	while(t_offset<this.m__next){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2426>";
		var t_size=this.m__next-t_offset;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2426>";
		var t_lastop=t_length;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2461>";
		if(t_size>65520){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2430>";
			t_size=0;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2431>";
			t_lastop=t_opid;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2432>";
			while(t_lastop<t_length){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2433>";
				var t_op=dbg_array(t_ops,t_lastop)[dbg_index];
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2434>";
				var t_n=dbg_object(t_op).m_count*28;
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2435>";
				if(t_size+t_n>65520){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2435>";
					break;
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2436>";
				t_size+=t_n;
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2437>";
				t_lastop+=1;
			}
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2459>";
			if(!((t_size)!=0)){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2441>";
				var t_op2=dbg_array(t_ops,t_opid)[dbg_index];
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2442>";
				var t_count=dbg_object(t_op2).m_count;
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2443>";
				while((t_count)!=0){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2444>";
					var t_n2=t_count;
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2445>";
					if(t_n2>2340){
						err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2445>";
						t_n2=((2340/dbg_object(t_op2).m_order)|0)*dbg_object(t_op2).m_order;
					}
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2446>";
					var t_size2=t_n2*28;
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2448>";
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2449>";
					_glBufferSubData(34962,0,t_size2,this.m__data,t_offset);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2451>";
					this.p_Render(t_op2,0,t_n2);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2453>";
					t_offset+=t_size2;
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2454>";
					t_count-=t_n2;
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2456>";
				t_opid+=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2457>";
				continue;
			}
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2462>";
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2463>";
		_glBufferSubData(34962,0,t_size,this.m__data,t_offset);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2465>";
		var t_index=0;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2466>";
		while(t_opid<t_lastop){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2467>";
			var t_op3=dbg_array(t_ops,t_opid)[dbg_index];
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2468>";
			this.p_Render(t_op3,t_index,dbg_object(t_op3).m_count);
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2469>";
			t_index+=dbg_object(t_op3).m_count;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2470>";
			t_opid+=1;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2472>";
		t_offset+=t_size;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2476>";
	gl.getError();
	pop_err();
}
c_DrawList.prototype.p_Reset=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2481>";
	this.m__next=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2483>";
	var t_data=this.m__ops.p_Data();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2484>";
	for(var t_i=0;t_i<this.m__ops.p_Length2();t_i=t_i+1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2485>";
		dbg_object(dbg_array(t_data,t_i)[dbg_index]).m_material=null;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2486>";
		bb_graphics2_freeOps.p_Push7(dbg_array(t_data,t_i)[dbg_index]);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2488>";
	this.m__ops.p_Clear4();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2489>";
	this.m__op=bb_graphics2_nullOp;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2491>";
	this.m__casters.p_Clear4();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2492>";
	this.m__casterVerts.p_Clear4();
	pop_err();
}
c_DrawList.prototype.p_Flush=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2496>";
	this.p_Render2();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2497>";
	this.p_Reset();
	pop_err();
}
c_DrawList.prototype.p_SetColor=function(t_r,t_g,t_b){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1619>";
	dbg_array(this.m__color,0)[dbg_index]=t_r;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1620>";
	dbg_array(this.m__color,1)[dbg_index]=t_g;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1621>";
	dbg_array(this.m__color,2)[dbg_index]=t_b;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1622>";
	this.m__pmcolor=((this.m__alpha)|0)<<24|((dbg_array(this.m__color,2)[dbg_index]*this.m__alpha)|0)<<16|((dbg_array(this.m__color,1)[dbg_index]*this.m__alpha)|0)<<8|((dbg_array(this.m__color,0)[dbg_index]*this.m__alpha)|0);
	pop_err();
}
c_DrawList.prototype.p_SetColor2=function(t_r,t_g,t_b,t_a){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1626>";
	dbg_array(this.m__color,0)[dbg_index]=t_r;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1627>";
	dbg_array(this.m__color,1)[dbg_index]=t_g;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1628>";
	dbg_array(this.m__color,2)[dbg_index]=t_b;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1629>";
	dbg_array(this.m__color,3)[dbg_index]=t_a;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1630>";
	this.m__alpha=t_a*255.0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1631>";
	this.m__pmcolor=((this.m__alpha)|0)<<24|((dbg_array(this.m__color,2)[dbg_index]*this.m__alpha)|0)<<16|((dbg_array(this.m__color,1)[dbg_index]*this.m__alpha)|0)<<8|((dbg_array(this.m__color,0)[dbg_index]*this.m__alpha)|0);
	pop_err();
}
c_DrawList.prototype.p_SetColor3=function(t_hex){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1637>";
	dbg_array(this.m__color,0)[dbg_index]=(t_hex>>16&255)/255.0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1638>";
	dbg_array(this.m__color,1)[dbg_index]=(t_hex>>8&255)/255.0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1639>";
	dbg_array(this.m__color,2)[dbg_index]=(t_hex&255)/255.0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1640>";
	this.m__pmcolor=((this.m__alpha)|0)<<24|((dbg_array(this.m__color,2)[dbg_index]*this.m__alpha)|0)<<16|((dbg_array(this.m__color,1)[dbg_index]*this.m__alpha)|0)<<8|((dbg_array(this.m__color,0)[dbg_index]*this.m__alpha)|0);
	pop_err();
}
c_DrawList.prototype.p_SetColor4=function(t_col){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1646>";
	dbg_array(this.m__color,0)[dbg_index]=dbg_object(t_col).m_r;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1647>";
	dbg_array(this.m__color,1)[dbg_index]=dbg_object(t_col).m_g;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1648>";
	dbg_array(this.m__color,2)[dbg_index]=dbg_object(t_col).m_b;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1649>";
	this.m__pmcolor=((this.m__alpha)|0)<<24|((dbg_array(this.m__color,2)[dbg_index]*this.m__alpha)|0)<<16|((dbg_array(this.m__color,1)[dbg_index]*this.m__alpha)|0)<<8|((dbg_array(this.m__color,0)[dbg_index]*this.m__alpha)|0);
	pop_err();
}
c_DrawList.prototype.p_BeginPrim=function(t_material,t_order){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2556>";
	if(!((t_material)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2556>";
		t_material=this.m__defaultMaterial;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2565>";
	if(this.m__next+t_order*28>this.m__data.Length()){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2559>";
		var t_newsize=bb_math_Max(this.m__data.Length()+((this.m__data.Length()/2)|0),this.m__next+t_order*28);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2560>";
		var t_data=c_DataBuffer.m_new.call(new c_DataBuffer,t_newsize,true);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2561>";
		this.m__data.p_CopyBytes(0,t_data,0,this.m__next);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2562>";
		this.m__data.Discard();
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2563>";
		this.m__data=t_data;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2570>";
	if(t_material==dbg_object(this.m__op).m_material && this.m__blend==dbg_object(this.m__op).m_blend && t_order==dbg_object(this.m__op).m_order){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2567>";
		dbg_object(this.m__op).m_count+=t_order;
		pop_err();
		return;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2571>";
	if((bb_graphics2_freeOps.p_Length2())!=0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2571>";
		this.m__op=bb_graphics2_freeOps.p_Pop();
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2571>";
		this.m__op=c_DrawOp.m_new.call(new c_DrawOp);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2573>";
	this.m__ops.p_Push7(this.m__op);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2574>";
	dbg_object(this.m__op).m_material=t_material;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2575>";
	dbg_object(this.m__op).m_blend=this.m__blend;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2576>";
	dbg_object(this.m__op).m_order=t_order;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2577>";
	dbg_object(this.m__op).m_count=t_order;
	pop_err();
}
c_DrawList.prototype.p_PrimVert=function(t_x0,t_y0,t_s0,t_t0){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2609>";
	this.m__data.PokeFloat(this.m__next+0,t_x0*this.m__ix+t_y0*this.m__jx+this.m__tx);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2610>";
	this.m__data.PokeFloat(this.m__next+4,t_x0*this.m__iy+t_y0*this.m__jy+this.m__ty);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2611>";
	this.m__data.PokeFloat(this.m__next+8,t_s0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2612>";
	this.m__data.PokeFloat(this.m__next+12,t_t0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2613>";
	this.m__data.PokeFloat(this.m__next+16,this.m__ix);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2614>";
	this.m__data.PokeFloat(this.m__next+20,this.m__iy);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2615>";
	this.m__data.PokeInt(this.m__next+24,this.m__pmcolor);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2616>";
	this.m__next+=28;
	pop_err();
}
c_DrawList.prototype.p_DrawRect=function(t_x0,t_y0,t_width,t_height,t_material,t_s0,t_t0,t_s1,t_t1){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1967>";
	var t_x1=t_x0+t_width;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1967>";
	var t_y1=t_y0+t_height;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1968>";
	this.p_BeginPrim(t_material,4);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1969>";
	this.p_PrimVert(t_x0,t_y0,t_s0,t_t0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1970>";
	this.p_PrimVert(t_x1,t_y0,t_s1,t_t0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1971>";
	this.p_PrimVert(t_x1,t_y1,t_s1,t_t1);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1972>";
	this.p_PrimVert(t_x0,t_y1,t_s0,t_t1);
	pop_err();
}
c_DrawList.prototype.p_DrawRect2=function(t_x0,t_y0,t_width,t_height,t_image,t_sourceX,t_sourceY,t_sourceWidth,t_sourceHeight){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1984>";
	var t_material=dbg_object(t_image).m__material;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1986>";
	var t_s0=(dbg_object(t_image).m__x+t_sourceX)/(t_material.p_Width());
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1987>";
	var t_t0=(dbg_object(t_image).m__y+t_sourceY)/(t_material.p_Height());
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1988>";
	var t_s1=(dbg_object(t_image).m__x+t_sourceX+t_sourceWidth)/(t_material.p_Width());
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1989>";
	var t_t1=(dbg_object(t_image).m__y+t_sourceY+t_sourceHeight)/(t_material.p_Height());
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1991>";
	this.p_DrawRect(t_x0,t_y0,t_width,t_height,t_material,t_s0,t_t0,t_s1,t_t1);
	pop_err();
}
c_DrawList.prototype.p_DrawRect3=function(t_x,t_y,t_image,t_sourceX,t_sourceY,t_sourceWidth,t_sourceHeight){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1980>";
	this.p_DrawRect2(t_x,t_y,(t_sourceWidth),(t_sourceHeight),t_image,t_sourceX,t_sourceY,t_sourceWidth,t_sourceHeight);
	pop_err();
}
c_DrawList.prototype.p_DrawRect4=function(t_x0,t_y0,t_width,t_height,t_image){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1976>";
	this.p_DrawRect(t_x0,t_y0,t_width,t_height,dbg_object(t_image).m__material,dbg_object(t_image).m__s0,dbg_object(t_image).m__t0,dbg_object(t_image).m__s1,dbg_object(t_image).m__t1);
	pop_err();
}
c_DrawList.prototype.p_DrawText=function(t_text,t_x,t_y,t_xhandle,t_yhandle){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2147>";
	var t_char=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2148>";
	var t_tmpChar=null;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2150>";
	t_x-=this.m__font.p_TextWidth(t_text)*t_xhandle;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2151>";
	t_y-=this.m__font.p_TextHeight("")*t_yhandle;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2153>";
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2153>";
	var t_=t_text;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2153>";
	var t_2=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2153>";
	while(t_2<t_.length){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2153>";
		t_char=dbg_charCodeAt(t_,t_2);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2153>";
		t_2=t_2+1;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2154>";
		var t_tmpChar2=dbg_object(this.m__font).m__charMap.p_Get(t_char);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2158>";
		if(!((t_tmpChar2)!=null)){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2156>";
			continue;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2158>";
		this.p_DrawRect3(t_x+(dbg_object(t_tmpChar2).m_xoff),t_y+(dbg_object(t_tmpChar2).m_yoff),dbg_array(dbg_object(this.m__font).m__pages,dbg_object(t_tmpChar2).m_page)[dbg_index],dbg_object(t_tmpChar2).m_x,dbg_object(t_tmpChar2).m_y,dbg_object(t_tmpChar2).m_width,dbg_object(t_tmpChar2).m_height);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2159>";
		t_x=t_x+(dbg_object(t_tmpChar2).m_advance);
	}
	pop_err();
}
c_DrawList.prototype.p_DrawText2=function(t_textLines,t_x,t_y,t_xhandle,t_yhandle){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2164>";
	var t_char=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2165>";
	var t_tmpChar=null;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2166>";
	var t_currX=.0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2167>";
	var t_text="";
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2169>";
	var t_linesCount=t_textLines.length;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2171>";
	t_y-=this.m__font.p_TextHeight("")*t_yhandle*(t_linesCount);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2172>";
	t_currX=t_x;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2174>";
	for(var t__y=1;t__y<=t_linesCount;t__y=t__y+1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2175>";
		t_text=dbg_array(t_textLines,t__y-1)[dbg_index];
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2176>";
		t_x-=this.m__font.p_TextWidth(t_text)*t_xhandle;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2177>";
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2177>";
		var t_=t_text;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2177>";
		var t_2=0;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2177>";
		while(t_2<t_.length){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2177>";
			t_char=dbg_charCodeAt(t_,t_2);
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2177>";
			t_2=t_2+1;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2178>";
			var t_tmpChar2=dbg_object(this.m__font).m__charMap.p_Get(t_char);
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2179>";
			if(!((t_tmpChar2)!=null)){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2179>";
				continue;
			}
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2180>";
			this.p_DrawRect3(t_x+(dbg_object(t_tmpChar2).m_xoff),t_y+(dbg_object(t_tmpChar2).m_yoff),dbg_array(dbg_object(this.m__font).m__pages,dbg_object(t_tmpChar2).m_page)[dbg_index],dbg_object(t_tmpChar2).m_x,dbg_object(t_tmpChar2).m_y,dbg_object(t_tmpChar2).m_width,dbg_object(t_tmpChar2).m_height);
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2181>";
			t_x=t_x+(dbg_object(t_tmpChar2).m_advance);
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2183>";
		t_y+=this.m__font.p_TextHeight(t_text);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2184>";
		t_x=t_currX;
	}
	pop_err();
}
c_DrawList.prototype.p_DrawOval=function(t_x,t_y,t_width,t_height,t_material){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1801>";
	var t_xr=t_width/2.0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1801>";
	var t_yr=t_height/2.0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1803>";
	var t_dx_x=t_xr*this.m__ix;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1803>";
	var t_dx_y=t_xr*this.m__iy;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1803>";
	var t_dy_x=t_yr*this.m__jx;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1803>";
	var t_dy_y=t_yr*this.m__jy;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1804>";
	var t_dx=Math.sqrt(t_dx_x*t_dx_x+t_dx_y*t_dx_y);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1804>";
	var t_dy=Math.sqrt(t_dy_x*t_dy_x+t_dy_y*t_dy_y);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1806>";
	var t_n=((t_dx+t_dy)|0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1814>";
	if(t_n<12){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1808>";
		t_n=12;
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1809>";
		if(t_n>2340){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1810>";
			t_n=2340;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1812>";
			t_n&=-4;
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1815>";
	var t_x0=t_x+t_xr;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1815>";
	var t_y0=t_y+t_yr;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1817>";
	this.p_BeginPrim(t_material,t_n);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1819>";
	for(var t_i=0;t_i<t_n;t_i=t_i+1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1820>";
		var t_th=(t_i)*360.0/(t_n);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1821>";
		var t_px=t_x0+Math.cos((t_th)*D2R)*t_xr;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1822>";
		var t_py=t_y0+Math.sin((t_th)*D2R)*t_yr;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1823>";
		this.p_PrimVert(t_px,t_py,0.0,0.0);
	}
	pop_err();
}
function c_Canvas(){
	c_DrawList.call(this);
	this.m__dirty=-1;
	this.m__lights=new_object_array(4);
	this.m__seq=0;
	this.m__texture=null;
	this.m__width=0;
	this.m__height=0;
	this.m__twidth=0;
	this.m__theight=0;
	this.m__image=null;
	this.m__viewport=[0,0,640,480];
	this.m__vpx=0;
	this.m__vpy=0;
	this.m__vpw=0;
	this.m__vph=0;
	this.m__scissor=[0,0,10000,10000];
	this.m__scx=0;
	this.m__scy=0;
	this.m__scw=0;
	this.m__sch=0;
	this.m__clsScissor=false;
	this.m__projMatrix=bb_math3d_Mat4New();
	this.m__viewMatrix=bb_math3d_Mat4New();
	this.m__modelMatrix=bb_math3d_Mat4New();
	this.m__ambientLight=[0.0,0.0,0.0,1.0];
	this.m__fogColor=[0.0,0.0,0.0,0.0];
	this.m__shadowMap=null;
	this.m__lineWidth=1.0;
	this.m__colorMask=[true,true,true,true];
}
c_Canvas.prototype=extend_class(c_DrawList);
c_Canvas.prototype.p_Init3=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3087>";
	this.m__dirty=-1;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3088>";
	for(var t_i=0;t_i<4;t_i=t_i+1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3089>";
		dbg_array(this.m__lights,t_i)[dbg_index]=c_LightData.m_new.call(new c_LightData);
	}
	pop_err();
}
c_Canvas.m__active=null;
c_Canvas.prototype.p_Flush=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3006>";
	this.p_FlushPrims();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3008>";
	if(!((this.m__texture)!=null)){
		pop_err();
		return;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3026>";
	if((dbg_object(this.m__texture).m__flags&256)!=0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3011>";
		this.p_Validate();
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3013>";
		gl.disable(3089);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3014>";
		gl.viewport(0,0,this.m__twidth,this.m__theight);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3023>";
		if(this.m__width==this.m__twidth && this.m__height==this.m__theight){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3017>";
			_glReadPixels(0,0,this.m__twidth,this.m__theight,6408,5121,object_downcast((dbg_object(this.m__texture).m__data),c_DataBuffer),0);
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3019>";
			for(var t_y=0;t_y<this.m__height;t_y=t_y+1){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3020>";
				_glReadPixels(dbg_object(this.m__image).m__x,dbg_object(this.m__image).m__y+t_y,this.m__width,1,6408,5121,object_downcast((dbg_object(this.m__texture).m__data),c_DataBuffer),(dbg_object(this.m__image).m__y+t_y)*(this.m__twidth*4)+dbg_object(this.m__image).m__x*4);
			}
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3024>";
		this.m__dirty|=2;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3027>";
	this.m__texture.p_UpdateMipmaps();
	pop_err();
}
c_Canvas.prototype.p_Validate=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3111>";
	if(this.m__seq!=webglGraphicsSeq){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3101>";
		this.m__seq=webglGraphicsSeq;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3102>";
		bb_graphics2_InitVbos();
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3109>";
		if(!((this.m__texture)!=null)){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3104>";
			this.m__width=bb_app_DeviceWidth();
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3105>";
			this.m__height=bb_app_DeviceHeight();
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3106>";
			this.m__twidth=this.m__width;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3107>";
			this.m__theight=this.m__height;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3109>";
		this.m__dirty=-1;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3119>";
	if(c_Canvas.m__active==this){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3113>";
		if(!((this.m__dirty)!=0)){
			pop_err();
			return;
		}
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3115>";
		if((c_Canvas.m__active)!=null){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3115>";
			c_Canvas.m__active.p_Flush();
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3116>";
		c_Canvas.m__active=this;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3117>";
		this.m__dirty=-1;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3130>";
	if((this.m__dirty&1)!=0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3129>";
		if((this.m__texture)!=null){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3125>";
			_glBindFramebuffer(36160,this.m__texture.p_GLFramebuffer());
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3127>";
			_glBindFramebuffer(36160,bb_graphics2_defaultFbo);
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3175>";
	if((this.m__dirty&2)!=0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3133>";
		var t_scale=1.0;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3141>";
		if(!((this.m__texture)!=null)){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3135>";
			this.m__width=bb_app_DeviceWidth();
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3136>";
			this.m__height=bb_app_DeviceHeight();
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3137>";
			t_scale=(this.m__twidth)/(this.m__width);
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3138>";
			this.m__twidth=this.m__width;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3139>";
			this.m__theight=this.m__height;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3142>";
		this.m__vpx=dbg_array(this.m__viewport,0)[dbg_index];
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3142>";
		this.m__vpy=dbg_array(this.m__viewport,1)[dbg_index];
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3142>";
		this.m__vpw=dbg_array(this.m__viewport,2)[dbg_index];
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3142>";
		this.m__vph=dbg_array(this.m__viewport,3)[dbg_index];
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3147>";
		if((this.m__image)!=null){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3144>";
			this.m__vpx+=dbg_object(this.m__image).m__x;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3145>";
			this.m__vpy+=dbg_object(this.m__image).m__y;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3148>";
		this.m__scx=dbg_array(this.m__scissor,0)[dbg_index];
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3148>";
		this.m__scy=dbg_array(this.m__scissor,1)[dbg_index];
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3148>";
		this.m__scw=dbg_array(this.m__scissor,2)[dbg_index];
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3148>";
		this.m__sch=dbg_array(this.m__scissor,3)[dbg_index];
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3150>";
		if(this.m__scx<0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3150>";
			this.m__scx=0;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3150>";
			if(this.m__scx>this.m__vpw){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3150>";
				this.m__scx=this.m__vpw;
			}
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3151>";
		if(this.m__scw<0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3151>";
			this.m__scw=0;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3151>";
			if(this.m__scx+this.m__scw>this.m__vpw){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3151>";
				this.m__scw=this.m__vpw-this.m__scx;
			}
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3153>";
		if(this.m__scy<0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3153>";
			this.m__scy=0;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3153>";
			if(this.m__scy>this.m__vph){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3153>";
				this.m__scy=this.m__vph;
			}
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3154>";
		if(this.m__sch<0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3154>";
			this.m__sch=0;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3154>";
			if(this.m__scy+this.m__sch>this.m__vph){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3154>";
				this.m__sch=this.m__vph-this.m__scy;
			}
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3156>";
		this.m__scx+=this.m__vpx;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3156>";
		this.m__scy+=this.m__vpy;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3162>";
		if(!((this.m__texture)!=null)){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3159>";
			this.m__vpy=this.m__theight-this.m__vpy-this.m__vph;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3160>";
			this.m__scy=this.m__theight-this.m__scy-this.m__sch;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3163>";
		gl.viewport(this.m__vpx,this.m__vpy,this.m__vpw,this.m__vph);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3173>";
		if(this.m__scx!=this.m__vpx || this.m__scy!=this.m__vpy || this.m__scw!=this.m__vpw || this.m__sch!=this.m__vph){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3166>";
			gl.enable(3089);
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3167>";
			gl.scissor(this.m__scx,this.m__scy,this.m__scw,this.m__sch);
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3168>";
			this.m__clsScissor=false;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3170>";
			gl.disable(3089);
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3171>";
			this.m__clsScissor=this.m__scx!=0 || this.m__scy!=0 || this.m__vpw!=this.m__twidth || this.m__vph!=this.m__theight;
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3223>";
	if((this.m__dirty&4)!=0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3178>";
		bb_graphics2_rs_program=null;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3187>";
		if((this.m__texture)!=null){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3181>";
			dbg_array(bb_graphics2_rs_clipPosScale,1)[dbg_index]=1.0;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3182>";
			bb_math3d_Mat4Copy(this.m__projMatrix,bb_graphics2_rs_projMatrix);
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3184>";
			dbg_array(bb_graphics2_rs_clipPosScale,1)[dbg_index]=-1.0;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3185>";
			bb_math3d_Mat4Multiply(bb_graphics2_flipYMatrix,this.m__projMatrix,bb_graphics2_rs_projMatrix);
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3188>";
		bb_math3d_Mat4Multiply(this.m__viewMatrix,this.m__modelMatrix,bb_graphics2_rs_modelViewMatrix);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3189>";
		bb_math3d_Mat4Multiply(bb_graphics2_rs_projMatrix,bb_graphics2_rs_modelViewMatrix,bb_graphics2_rs_modelViewProjMatrix);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3190>";
		bb_math3d_Vec4Copy(this.m__ambientLight,bb_graphics2_rs_ambientLight);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3191>";
		bb_math3d_Vec4Copy(this.m__fogColor,bb_graphics2_rs_fogColor);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3193>";
		bb_graphics2_rs_numLights=0;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3194>";
		for(var t_i=0;t_i<4;t_i=t_i+1){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3196>";
			var t_light=dbg_array(this.m__lights,t_i)[dbg_index];
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3197>";
			if(!((dbg_object(t_light).m_type)!=0)){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3197>";
				continue;
			}
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3199>";
			bb_math3d_Mat4Transform(this.m__viewMatrix,dbg_object(t_light).m_vector,dbg_object(t_light).m_tvector);
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3201>";
			dbg_array(bb_graphics2_rs_lightColors,bb_graphics2_rs_numLights*4+0)[dbg_index]=dbg_array(dbg_object(t_light).m_color,0)[dbg_index];
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3202>";
			dbg_array(bb_graphics2_rs_lightColors,bb_graphics2_rs_numLights*4+1)[dbg_index]=dbg_array(dbg_object(t_light).m_color,1)[dbg_index];
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3203>";
			dbg_array(bb_graphics2_rs_lightColors,bb_graphics2_rs_numLights*4+2)[dbg_index]=dbg_array(dbg_object(t_light).m_color,2)[dbg_index];
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3204>";
			dbg_array(bb_graphics2_rs_lightColors,bb_graphics2_rs_numLights*4+3)[dbg_index]=dbg_array(dbg_object(t_light).m_color,3)[dbg_index];
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3206>";
			dbg_array(bb_graphics2_rs_lightVectors,bb_graphics2_rs_numLights*4+0)[dbg_index]=dbg_array(dbg_object(t_light).m_tvector,0)[dbg_index];
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3207>";
			dbg_array(bb_graphics2_rs_lightVectors,bb_graphics2_rs_numLights*4+1)[dbg_index]=dbg_array(dbg_object(t_light).m_tvector,1)[dbg_index];
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3208>";
			dbg_array(bb_graphics2_rs_lightVectors,bb_graphics2_rs_numLights*4+2)[dbg_index]=dbg_array(dbg_object(t_light).m_tvector,2)[dbg_index];
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3209>";
			dbg_array(bb_graphics2_rs_lightVectors,bb_graphics2_rs_numLights*4+3)[dbg_index]=dbg_object(t_light).m_range;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3211>";
			bb_graphics2_rs_numLights+=1;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3219>";
		if((this.m__shadowMap)!=null){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3215>";
			bb_graphics2_rs_shadowTexture=dbg_object(dbg_object(this.m__shadowMap).m__material).m__colorTexture;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3217>";
			bb_graphics2_rs_shadowTexture=null;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3220>";
		bb_graphics2_rs_blend=-1;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3227>";
	if((this.m__dirty&8)!=0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3225>";
		gl.lineWidth(this.m__lineWidth);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3231>";
	if((this.m__dirty&16)!=0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3229>";
		gl.colorMask(dbg_array(this.m__colorMask,0)[dbg_index],dbg_array(this.m__colorMask,1)[dbg_index],dbg_array(this.m__colorMask,2)[dbg_index],dbg_array(this.m__colorMask,3)[dbg_index]);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3232>";
	this.m__dirty=0;
	pop_err();
}
c_Canvas.prototype.p_FlushPrims=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3094>";
	if(c_DrawList.prototype.p_IsEmpty.call(this)){
		pop_err();
		return;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3095>";
	this.p_Validate();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<3096>";
	c_DrawList.prototype.p_Flush.call(this);
	pop_err();
}
c_Canvas.prototype.p_SetRenderTarget=function(t_target){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2640>";
	this.p_FlushPrims();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2676>";
	if(!((t_target)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2644>";
		this.m__image=null;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2645>";
		this.m__texture=null;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2646>";
		this.m__width=bb_app_DeviceWidth();
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2647>";
		this.m__height=bb_app_DeviceHeight();
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2648>";
		this.m__twidth=this.m__width;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2649>";
		this.m__theight=this.m__height;
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2651>";
		if((object_downcast((t_target),c_Image2))!=null){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2653>";
			this.m__image=object_downcast((t_target),c_Image2);
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2654>";
			this.m__texture=this.m__image.p_Material().p_ColorTexture();
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2655>";
			if(!((this.m__texture.p_Flags()&16)!=0)){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2655>";
				error("Texture is not a render target texture");
			}
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2656>";
			this.m__width=this.m__image.p_Width();
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2657>";
			this.m__height=this.m__image.p_Height();
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2658>";
			this.m__twidth=this.m__texture.p_Width();
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2659>";
			this.m__theight=this.m__texture.p_Height();
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2661>";
			if((object_downcast((t_target),c_Texture))!=null){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2663>";
				this.m__image=null;
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2664>";
				this.m__texture=object_downcast((t_target),c_Texture);
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2665>";
				if(!((this.m__texture.p_Flags()&16)!=0)){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2665>";
					error("Texture is not a render target texture");
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2666>";
				this.m__width=this.m__texture.p_Width();
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2667>";
				this.m__height=this.m__texture.p_Height();
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2668>";
				this.m__twidth=this.m__texture.p_Width();
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2669>";
				this.m__theight=this.m__texture.p_Height();
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2673>";
				error("RenderTarget object must an Image, a Texture or Null");
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2677>";
	this.m__dirty=-1;
	pop_err();
}
c_Canvas.prototype.p_SetViewport=function(t_x,t_y,t_w,t_h){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2707>";
	this.p_FlushPrims();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2708>";
	dbg_array(this.m__viewport,0)[dbg_index]=t_x;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2709>";
	dbg_array(this.m__viewport,1)[dbg_index]=t_y;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2710>";
	dbg_array(this.m__viewport,2)[dbg_index]=t_w;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2711>";
	dbg_array(this.m__viewport,3)[dbg_index]=t_h;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2712>";
	this.m__dirty|=2;
	pop_err();
}
c_Canvas.prototype.p_SetProjection2d=function(t_left,t_right,t_top,t_bottom,t_znear,t_zfar){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2743>";
	this.p_FlushPrims();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2744>";
	bb_math3d_Mat4Ortho(t_left,t_right,t_top,t_bottom,t_znear,t_zfar,this.m__projMatrix);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2745>";
	this.m__dirty|=4;
	pop_err();
}
c_Canvas.m_new=function(t_target){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2627>";
	c_DrawList.m_new.call(this);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2628>";
	this.p_Init3();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2629>";
	this.p_SetRenderTarget(t_target);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2631>";
	this.p_SetViewport(0,0,this.m__width,this.m__height);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2632>";
	this.p_SetProjection2d(0.0,(this.m__width),0.0,(this.m__height),-1.0,1.0);
	pop_err();
	return this;
}
c_Canvas.prototype.p_Clear=function(t_r,t_g,t_b,t_a){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2879>";
	this.p_FlushPrims();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2880>";
	this.p_Validate();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2885>";
	if(this.m__clsScissor){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2882>";
		gl.enable(3089);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2883>";
		gl.scissor(this.m__vpx,this.m__vpy,this.m__vpw,this.m__vph);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2885>";
	gl.clearColor(t_r,t_g,t_b,t_a);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2886>";
	gl.clear(16384);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2887>";
	if(this.m__clsScissor){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2887>";
		gl.disable(3089);
	}
	pop_err();
}
c_Canvas.prototype.p_Clear2=function(t_col){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2898>";
	this.p_Clear(dbg_object(t_col).m_r,dbg_object(t_col).m_g,dbg_object(t_col).m_b,1.0);
	pop_err();
}
c_Canvas.prototype.p_Clear3=function(t_rgb){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2892>";
	var t_r=(t_rgb>>16&255)/255.0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2893>";
	var t_g=(t_rgb>>8&255)/255.0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2894>";
	var t_b=(t_rgb&255)/255.0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<2895>";
	this.p_Clear(t_r,t_g,t_b,1.0);
	pop_err();
}
var bb_graphics2_inited=false;
var bb_graphics2_vbosSeq=0;
var bb_graphics2_rs_vbo=0;
function c_DataBuffer(){
	BBDataBuffer.call(this);
}
c_DataBuffer.prototype=extend_class(BBDataBuffer);
c_DataBuffer.m_new=function(t_length,t_direct){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/brl/databuffer.cxs<102>";
	if(!this._New(t_length)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/brl/databuffer.cxs<102>";
		error("Allocate DataBuffer failed");
	}
	pop_err();
	return this;
}
c_DataBuffer.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/brl/databuffer.cxs<96>";
	pop_err();
	return this;
}
c_DataBuffer.prototype.p_CopyBytes=function(t_address,t_dst,t_dstaddress,t_count){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/brl/databuffer.cxs<123>";
	if(t_address+t_count>this.Length()){
		err_info="C:/Users/diego/Downloads/cerberus/modules/brl/databuffer.cxs<123>";
		t_count=this.Length()-t_address;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/brl/databuffer.cxs<124>";
	if(t_dstaddress+t_count>t_dst.Length()){
		err_info="C:/Users/diego/Downloads/cerberus/modules/brl/databuffer.cxs<124>";
		t_count=t_dst.Length()-t_dstaddress;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/brl/databuffer.cxs<135>";
	if(t_dstaddress<=t_address){
		err_info="C:/Users/diego/Downloads/cerberus/modules/brl/databuffer.cxs<127>";
		for(var t_i=0;t_i<t_count;t_i=t_i+1){
			err_info="C:/Users/diego/Downloads/cerberus/modules/brl/databuffer.cxs<128>";
			t_dst.PokeByte(t_dstaddress+t_i,this.PeekByte(t_address+t_i));
		}
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/brl/databuffer.cxs<131>";
		for(var t_i2=t_count-1;t_i2>=0;t_i2=t_i2+-1){
			err_info="C:/Users/diego/Downloads/cerberus/modules/brl/databuffer.cxs<132>";
			t_dst.PokeByte(t_dstaddress+t_i2,this.PeekByte(t_address+t_i2));
		}
	}
	pop_err();
}
var bb_graphics2_rs_ibo=0;
function bb_graphics2_InitVbos(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<119>";
	if(bb_graphics2_vbosSeq==webglGraphicsSeq){
		pop_err();
		return;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<120>";
	bb_graphics2_vbosSeq=webglGraphicsSeq;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<122>";
	bb_graphics2_rs_vbo=gl.createBuffer();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<123>";
	_glBindBuffer(34962,bb_graphics2_rs_vbo);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<124>";
	_glBufferData(34962,65520,null,35040);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<125>";
	gl.enableVertexAttribArray(0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<125>";
	gl.vertexAttribPointer(0,2,5126,false,28,0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<126>";
	gl.enableVertexAttribArray(1);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<126>";
	gl.vertexAttribPointer(1,2,5126,false,28,8);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<127>";
	gl.enableVertexAttribArray(2);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<127>";
	gl.vertexAttribPointer(2,2,5126,false,28,16);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<128>";
	gl.enableVertexAttribArray(3);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<128>";
	gl.vertexAttribPointer(3,4,5121,true,28,24);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<130>";
	bb_graphics2_rs_ibo=gl.createBuffer();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<131>";
	_glBindBuffer(34963,bb_graphics2_rs_ibo);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<132>";
	var t_idxs=c_DataBuffer.m_new.call(new c_DataBuffer,28080,true);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<133>";
	for(var t_j=0;t_j<4;t_j=t_j+1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<134>";
		var t_k=t_j*3510*2;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<135>";
		for(var t_i=0;t_i<585;t_i=t_i+1){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<136>";
			t_idxs.PokeShort(t_i*12+t_k+0,t_i*4+t_j+0);
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<137>";
			t_idxs.PokeShort(t_i*12+t_k+2,t_i*4+t_j+1);
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<138>";
			t_idxs.PokeShort(t_i*12+t_k+4,t_i*4+t_j+2);
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<139>";
			t_idxs.PokeShort(t_i*12+t_k+6,t_i*4+t_j+0);
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<140>";
			t_idxs.PokeShort(t_i*12+t_k+8,t_i*4+t_j+2);
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<141>";
			t_idxs.PokeShort(t_i*12+t_k+10,t_i*4+t_j+3);
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<144>";
	_glBufferData(34963,t_idxs.Length(),t_idxs,35044);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<145>";
	t_idxs.Discard();
	pop_err();
}
var bb_graphics2_tmpi=[];
var bb_graphics2_defaultFbo=0;
var bb_graphics2_mainShader="";
function c_Shader(){
	Object.call(this);
	this.m__source="";
	this.m__vsource="";
	this.m__fsource="";
	this.m__uniforms=c_StringSet.m_new.call(new c_StringSet);
	this.m__glPrograms=new_object_array(5);
	this.m__defaultMaterial=null;
	this.m__seq=0;
}
c_Shader.prototype.p_Build=function(t_numLights){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<709>";
	var t_defs="";
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<710>";
	t_defs=t_defs+("#define NUM_LIGHTS "+String(t_numLights)+"\n");
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<712>";
	var t_vshader=bb_glutil_glCompile(35633,t_defs+this.m__vsource);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<713>";
	var t_fshader=bb_glutil_glCompile(35632,t_defs+this.m__fsource);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<715>";
	var t_program=gl.createProgram();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<716>";
	gl.attachShader(t_program,t_vshader);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<717>";
	gl.attachShader(t_program,t_fshader);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<718>";
	gl.deleteShader(t_vshader);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<719>";
	gl.deleteShader(t_fshader);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<721>";
	gl.bindAttribLocation(t_program,0,"Position");
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<722>";
	gl.bindAttribLocation(t_program,1,"Texcoord0");
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<723>";
	gl.bindAttribLocation(t_program,2,"Tangent");
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<724>";
	gl.bindAttribLocation(t_program,3,"Color");
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<726>";
	bb_glutil_glLink(t_program);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<729>";
	var t_matuniforms=c_Stack2.m_new.call(new c_Stack2);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<730>";
	var t_size=new_number_array(1);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<730>";
	var t_type=new_number_array(1);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<730>";
	var t_name=new_string_array(1);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<731>";
	_glGetProgramiv(t_program,35718,bb_graphics2_tmpi);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<732>";
	for(var t_i=0;t_i<dbg_array(bb_graphics2_tmpi,0)[dbg_index];t_i=t_i+1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<734>";
		_glGetActiveUniform(t_program,t_i,t_size,t_type,t_name);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<745>";
		if(this.m__uniforms.p_Contains2(dbg_array(t_name,0)[dbg_index])){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<738>";
			var t_location=_glGetUniformLocation(t_program,dbg_array(t_name,0)[dbg_index]);
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<739>";
			if(t_location==-1){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<739>";
				continue;
			}
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<741>";
			t_matuniforms.p_Push4(c_GLUniform.m_new.call(new c_GLUniform,dbg_array(t_name,0)[dbg_index],t_location,dbg_array(t_size,0)[dbg_index],dbg_array(t_type,0)[dbg_index]));
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<747>";
	var t_=c_GLProgram.m_new.call(new c_GLProgram,t_program,t_matuniforms.p_ToArray());
	pop_err();
	return t_;
}
c_Shader.prototype.p_Build2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<752>";
	bb_graphics2_InitMojo2();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<754>";
	var t_p=c_GlslParser.m_new.call(new c_GlslParser,this.m__source);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<756>";
	var t_vars=c_StringSet.m_new.call(new c_StringSet);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<758>";
	while((t_p.p_Toke()).length!=0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<769>";
		if(t_p.p_CParse("uniform")){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<762>";
			var t_ty=t_p.p_ParseType();
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<763>";
			var t_id=t_p.p_ParseIdent();
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<764>";
			t_p.p_Parse2(";");
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<765>";
			this.m__uniforms.p_Insert2(t_id);
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<767>";
			continue;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<770>";
		var t_id2=t_p.p_CParseIdent();
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<779>";
		if((t_id2).length!=0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<777>";
			if(string_startswith(t_id2,"gl_")){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<773>";
				t_vars.p_Insert2("B3D_"+string_replace(t_id2.toUpperCase(),"\u0130","I"));
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<774>";
				if(string_startswith(t_id2,"b3d_")){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<775>";
					t_vars.p_Insert2(string_replace(t_id2.toUpperCase(),"\u0130","I"));
				}
			}
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<777>";
			continue;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<780>";
		t_p.p_Bump();
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<783>";
	var t_vardefs="";
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<784>";
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<784>";
	var t_=t_vars.p_ObjectEnumerator();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<784>";
	while(t_.p_HasNext()){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<784>";
		var t_var=t_.p_NextObject();
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<785>";
		t_vardefs=t_vardefs+("#define "+t_var+" 1\n");
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<790>";
	var t_source=bb_graphics2_mainShader;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<791>";
	var t_i0=t_source.indexOf("//@vertex",0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<792>";
	if(t_i0==-1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<792>";
		error("Can't find //@vertex chunk");
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<793>";
	var t_i1=t_source.indexOf("//@fragment",0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<794>";
	if(t_i1==-1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<794>";
		error("Can't find //@fragment chunk");
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<796>";
	var t_header=t_vardefs+t_source.slice(0,t_i0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<797>";
	this.m__vsource=t_header+t_source.slice(t_i0,t_i1);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<798>";
	this.m__fsource=t_header+string_replace(t_source.slice(t_i1),"${SHADER}",this.m__source);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<800>";
	for(var t_numLights=0;t_numLights<=4;t_numLights=t_numLights+1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<802>";
		dbg_array(this.m__glPrograms,t_numLights)[dbg_index]=this.p_Build(t_numLights);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<804>";
		if(((t_numLights)!=0) || t_vars.p_Contains2("B3D_DIFFUSE") || t_vars.p_Contains2("B3D_SPECULAR")){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<804>";
			continue;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<806>";
		for(var t_i=1;t_i<=4;t_i=t_i+1){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<807>";
			dbg_array(this.m__glPrograms,t_i)[dbg_index]=dbg_array(this.m__glPrograms,0)[dbg_index];
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<810>";
		break;
	}
	pop_err();
}
c_Shader.prototype.p_Build3=function(t_source){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<654>";
	this.m__source=t_source;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<655>";
	this.p_Build2();
	pop_err();
}
c_Shader.m_new=function(t_source){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<614>";
	this.p_Build3(t_source);
	pop_err();
	return this;
}
c_Shader.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<611>";
	pop_err();
	return this;
}
c_Shader.prototype.p_OnInitMaterial=function(t_material){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<659>";
	t_material.p_SetTexture("ColorTexture",c_Texture.m_White());
	pop_err();
}
c_Shader.prototype.p_OnLoadMaterial=function(t_material,t_path,t_texFlags){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<663>";
	var t_texture=c_Texture.m_Load(t_path,4,t_texFlags);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<664>";
	if(!((t_texture)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<664>";
		pop_err();
		return null;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<665>";
	t_material.p_SetTexture("ColorTexture",t_texture);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<666>";
	if((t_texture)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<666>";
		t_texture.p_Release();
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<667>";
	pop_err();
	return t_material;
}
c_Shader.prototype.p_DefaultMaterial=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<618>";
	if(!((this.m__defaultMaterial)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<618>";
		this.m__defaultMaterial=c_Material.m_new.call(new c_Material,this);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<619>";
	pop_err();
	return this.m__defaultMaterial;
}
c_Shader.prototype.p_GLProgram=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<703>";
	if(this.m__seq!=webglGraphicsSeq){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<699>";
		this.m__seq=webglGraphicsSeq;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<700>";
		bb_graphics2_rs_program=null;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<701>";
		this.p_Build2();
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<704>";
	pop_err();
	return dbg_array(this.m__glPrograms,bb_graphics2_rs_numLights)[dbg_index];
}
c_Shader.prototype.p_Bind=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<686>";
	var t_program=this.p_GLProgram();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<688>";
	if(t_program==bb_graphics2_rs_program){
		pop_err();
		return;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<690>";
	bb_graphics2_rs_program=t_program;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<691>";
	bb_graphics2_rs_material=null;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<693>";
	t_program.p_Bind();
	pop_err();
}
function c_GLProgram(){
	Object.call(this);
	this.m_program=0;
	this.m_matuniforms=[];
	this.m_mvpMatrix=0;
	this.m_mvMatrix=0;
	this.m_clipPosScale=0;
	this.m_globalColor=0;
	this.m_fogColor=0;
	this.m_ambientLight=0;
	this.m_lightColors=0;
	this.m_lightVectors=0;
	this.m_shadowTexture=0;
}
c_GLProgram.m_new=function(t_program,t_matuniforms){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<570>";
	dbg_object(this).m_program=t_program;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<571>";
	dbg_object(this).m_matuniforms=t_matuniforms;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<572>";
	this.m_mvpMatrix=_glGetUniformLocation(t_program,"ModelViewProjectionMatrix");
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<573>";
	this.m_mvMatrix=_glGetUniformLocation(t_program,"ModelViewMatrix");
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<574>";
	this.m_clipPosScale=_glGetUniformLocation(t_program,"ClipPosScale");
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<575>";
	this.m_globalColor=_glGetUniformLocation(t_program,"GlobalColor");
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<576>";
	this.m_fogColor=_glGetUniformLocation(t_program,"FogColor");
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<577>";
	this.m_ambientLight=_glGetUniformLocation(t_program,"AmbientLight");
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<578>";
	this.m_lightColors=_glGetUniformLocation(t_program,"LightColors");
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<579>";
	this.m_lightVectors=_glGetUniformLocation(t_program,"LightVectors");
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<580>";
	this.m_shadowTexture=_glGetUniformLocation(t_program,"ShadowTexture");
	pop_err();
	return this;
}
c_GLProgram.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<554>";
	pop_err();
	return this;
}
c_GLProgram.prototype.p_Bind=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<586>";
	gl.useProgram(this.m_program);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<588>";
	if(this.m_mvpMatrix!=-1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<588>";
		_glUniformMatrix4fv(this.m_mvpMatrix,1,false,bb_graphics2_rs_modelViewProjMatrix);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<589>";
	if(this.m_mvMatrix!=-1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<589>";
		_glUniformMatrix4fv(this.m_mvMatrix,1,false,bb_graphics2_rs_modelViewMatrix);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<590>";
	if(this.m_clipPosScale!=-1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<590>";
		_glUniform4fv(this.m_clipPosScale,1,bb_graphics2_rs_clipPosScale);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<591>";
	if(this.m_globalColor!=-1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<591>";
		_glUniform4fv(this.m_globalColor,1,bb_graphics2_rs_globalColor);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<592>";
	if(this.m_fogColor!=-1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<592>";
		_glUniform4fv(this.m_fogColor,1,bb_graphics2_rs_fogColor);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<593>";
	if(this.m_ambientLight!=-1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<593>";
		_glUniform4fv(this.m_ambientLight,1,bb_graphics2_rs_ambientLight);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<594>";
	if(this.m_lightColors!=-1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<594>";
		_glUniform4fv(this.m_lightColors,bb_graphics2_rs_numLights,bb_graphics2_rs_lightColors);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<595>";
	if(this.m_lightVectors!=-1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<595>";
		_glUniform4fv(this.m_lightVectors,bb_graphics2_rs_numLights,bb_graphics2_rs_lightVectors);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<597>";
	gl.activeTexture(33991);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<604>";
	if(this.m_shadowTexture!=-1 && ((bb_graphics2_rs_shadowTexture)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<599>";
		_glBindTexture(3553,bb_graphics2_rs_shadowTexture.p_GLTexture());
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<600>";
		gl.uniform1i(this.m_shadowTexture,7);
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<602>";
		_glBindTexture(3553,c_Texture.m_White().p_GLTexture());
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<604>";
	gl.activeTexture(33984);
	pop_err();
}
var bb_glutil_tmpi=[];
function bb_glutil_glCompile(t_type,t_source){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glutil.cxs<37>";
	t_source="precision mediump float;\n"+t_source;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glutil.cxs<40>";
	var t_shader=gl.createShader(t_type);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glutil.cxs<41>";
	gl.shaderSource(t_shader,t_source);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glutil.cxs<42>";
	gl.compileShader(t_shader);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glutil.cxs<43>";
	_glGetShaderiv(t_shader,35713,bb_glutil_tmpi);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glutil.cxs<52>";
	if(!((dbg_array(bb_glutil_tmpi,0)[dbg_index])!=0)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glutil.cxs<45>";
		print("Failed to compile fragment shader:"+gl.getShaderInfoLog(t_shader));
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glutil.cxs<46>";
		var t_lines=t_source.split("\n");
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glutil.cxs<47>";
		for(var t_i=0;t_i<t_lines.length;t_i=t_i+1){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glutil.cxs<48>";
			print(String(t_i+1)+":\t"+dbg_array(t_lines,t_i)[dbg_index]);
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glutil.cxs<50>";
		error("Compile fragment shader failed");
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glutil.cxs<52>";
	pop_err();
	return t_shader;
}
function bb_glutil_glLink(t_program){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glutil.cxs<57>";
	gl.linkProgram(t_program);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glutil.cxs<58>";
	_glGetProgramiv(t_program,35714,bb_glutil_tmpi);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glutil.cxs<59>";
	if(!((dbg_array(bb_glutil_tmpi,0)[dbg_index])!=0)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glutil.cxs<59>";
		error("Failed to link program:"+gl.getProgramInfoLog(t_program));
	}
	pop_err();
}
function c_GLUniform(){
	Object.call(this);
	this.m_name="";
	this.m_location=0;
	this.m_size=0;
	this.m_type=0;
}
c_GLUniform.m_new=function(t_name,t_location,t_size,t_type){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<546>";
	dbg_object(this).m_name=t_name;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<547>";
	dbg_object(this).m_location=t_location;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<548>";
	dbg_object(this).m_size=t_size;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<549>";
	dbg_object(this).m_type=t_type;
	pop_err();
	return this;
}
c_GLUniform.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<539>";
	pop_err();
	return this;
}
function c_Stack2(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack2.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack2.m_new2=function(t_data){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack2.prototype.p_Push4=function(t_value){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<74>";
	if(this.m_length==this.m_data.length){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<72>";
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<74>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<75>";
	this.m_length+=1;
	pop_err();
}
c_Stack2.prototype.p_Push5=function(t_values,t_offset,t_count){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<83>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<84>";
		this.p_Push4(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack2.prototype.p_Push6=function(t_values,t_offset){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<79>";
	this.p_Push5(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
c_Stack2.prototype.p_ToArray=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<18>";
	var t_t=new_object_array(this.m_length);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<19>";
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<20>";
		dbg_array(t_t,t_i)[dbg_index]=dbg_array(this.m_data,t_i)[dbg_index];
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<22>";
	pop_err();
	return t_t;
}
function c_Set(){
	Object.call(this);
	this.m_map=null;
}
c_Set.m_new=function(t_map){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/set.cxs<16>";
	dbg_object(this).m_map=t_map;
	pop_err();
	return this;
}
c_Set.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/set.cxs<13>";
	pop_err();
	return this;
}
c_Set.prototype.p_Contains2=function(t_value){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/set.cxs<32>";
	var t_=this.m_map.p_Contains2(t_value);
	pop_err();
	return t_;
}
c_Set.prototype.p_Insert2=function(t_value){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/set.cxs<36>";
	this.m_map.p_Insert3(t_value,null);
	pop_err();
	return 0;
}
c_Set.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/set.cxs<44>";
	var t_=this.m_map.p_Keys().p_ObjectEnumerator();
	pop_err();
	return t_;
}
function c_StringSet(){
	c_Set.call(this);
}
c_StringSet.prototype=extend_class(c_Set);
c_StringSet.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/set.cxs<69>";
	c_Set.m_new.call(this,(c_StringMap.m_new.call(new c_StringMap)));
	pop_err();
	return this;
}
function c_Map3(){
	Object.call(this);
	this.m_root=null;
}
c_Map3.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<7>";
	pop_err();
	return this;
}
c_Map3.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map3.prototype.p_FindNode2=function(t_key){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<157>";
	var t_node=this.m_root;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<159>";
	while((t_node)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<160>";
		var t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<168>";
		if(t_cmp>0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<163>";
			if(t_cmp<0){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<169>";
	pop_err();
	return t_node;
}
c_Map3.prototype.p_Contains2=function(t_key){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<25>";
	var t_=this.p_FindNode2(t_key)!=null;
	pop_err();
	return t_;
}
c_Map3.prototype.p_RotateLeft3=function(t_node){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<256>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<266>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<263>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<264>";
		this.m_root=t_child;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map3.prototype.p_RotateRight3=function(t_node){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<276>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<286>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<283>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<284>";
		this.m_root=t_child;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map3.prototype.p_InsertFixup3=function(t_node){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<246>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<229>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<225>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<223>";
					this.p_RotateLeft3(t_node);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<227>";
				this.p_RotateRight3(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<245>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<241>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<239>";
					this.p_RotateRight3(t_node);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<243>";
				this.p_RotateLeft3(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map3.prototype.p_Set2=function(t_key,t_value){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<29>";
	var t_node=this.m_root;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<30>";
	var t_parent=null;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<30>";
	var t_cmp=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<32>";
	while((t_node)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<33>";
		t_parent=t_node;
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<34>";
		t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<43>";
		if(t_cmp>0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<37>";
			if(t_cmp<0){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<45>";
	t_node=c_Node3.m_new.call(new c_Node3,t_key,t_value,-1,t_parent);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<57>";
	if((t_parent)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<53>";
		if(t_cmp>0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<53>";
		this.p_InsertFixup3(t_node);
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<55>";
		this.m_root=t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<57>";
	pop_err();
	return true;
}
c_Map3.prototype.p_Insert3=function(t_key,t_value){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<146>";
	var t_=this.p_Set2(t_key,t_value);
	pop_err();
	return t_;
}
c_Map3.prototype.p_Keys=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<113>";
	var t_=c_MapKeys.m_new.call(new c_MapKeys,this);
	pop_err();
	return t_;
}
c_Map3.prototype.p_FirstNode=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<125>";
	if(!((this.m_root)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<125>";
		pop_err();
		return null;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<127>";
	var t_node=this.m_root;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<128>";
	while((dbg_object(t_node).m_left)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<129>";
		t_node=dbg_object(t_node).m_left;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<131>";
	pop_err();
	return t_node;
}
function c_StringMap(){
	c_Map3.call(this);
}
c_StringMap.prototype=extend_class(c_Map3);
c_StringMap.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<551>";
	c_Map3.m_new.call(this);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<551>";
	pop_err();
	return this;
}
c_StringMap.prototype.p_Compare2=function(t_lhs,t_rhs){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<554>";
	var t_=string_compare(t_lhs,t_rhs);
	pop_err();
	return t_;
}
function c_Node3(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node3.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<364>";
	dbg_object(this).m_key=t_key;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<365>";
	dbg_object(this).m_value=t_value;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<366>";
	dbg_object(this).m_color=t_color;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node3.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<361>";
	pop_err();
	return this;
}
c_Node3.prototype.p_NextNode=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<385>";
	var t_node=null;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<393>";
	if((this.m_right)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<387>";
		t_node=this.m_right;
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<388>";
		while((dbg_object(t_node).m_left)!=null){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<389>";
			t_node=dbg_object(t_node).m_left;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<391>";
		pop_err();
		return t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<393>";
	t_node=this;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<394>";
	var t_parent=dbg_object(this).m_parent;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<395>";
	while(((t_parent)!=null) && t_node==dbg_object(t_parent).m_right){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<396>";
		t_node=t_parent;
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<397>";
		t_parent=dbg_object(t_parent).m_parent;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<399>";
	pop_err();
	return t_parent;
}
function c_Parser(){
	Object.call(this);
	this.m__text="";
	this.m__pos=0;
	this.m__len=0;
	this.m__toke="";
	this.m__tokeType=0;
}
c_Parser.prototype.p_Bump=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<43>";
	while(this.m__pos<this.m__len){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<44>";
		var t_ch=dbg_charCodeAt(this.m__text,this.m__pos);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<49>";
		if(t_ch<=32){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<46>";
			this.m__pos+=1;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<47>";
			continue;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<49>";
		if(t_ch!=39){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<49>";
			break;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<50>";
		this.m__pos+=1;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<51>";
		while(this.m__pos<this.m__len && dbg_charCodeAt(this.m__text,this.m__pos)!=10){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<52>";
			this.m__pos+=1;
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<61>";
	if(this.m__pos==this.m__len){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<57>";
		this.m__toke="";
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<58>";
		this.m__tokeType=0;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<59>";
		pop_err();
		return this.m__toke;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<62>";
	var t_pos=this.m__pos;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<63>";
	var t_ch2=dbg_charCodeAt(this.m__text,this.m__pos);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<64>";
	this.m__pos+=1;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<107>";
	if(bb_glslparser_IsAlpha(t_ch2) || t_ch2==95){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<68>";
		while(this.m__pos<this.m__len){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<69>";
			var t_ch3=dbg_charCodeAt(this.m__text,this.m__pos);
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<70>";
			if(!bb_glslparser_IsIdent(t_ch3)){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<70>";
				break;
			}
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<71>";
			this.m__pos+=1;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<73>";
		this.m__tokeType=1;
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<75>";
		if(bb_glslparser_IsDigit(t_ch2)){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<77>";
			while(this.m__pos<this.m__len){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<78>";
				if(!bb_glslparser_IsDigit(dbg_charCodeAt(this.m__text,this.m__pos))){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<78>";
					break;
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<79>";
				this.m__pos+=1;
			}
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<81>";
			this.m__tokeType=2;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<83>";
			if(t_ch2==34){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<85>";
				while(this.m__pos<this.m__len){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<86>";
					var t_ch4=dbg_charCodeAt(this.m__text,this.m__pos);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<87>";
					if(t_ch4==34){
						err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<87>";
						break;
					}
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<88>";
					this.m__pos+=1;
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<90>";
				if(this.m__pos==this.m__len){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<90>";
					error("String literal missing closing quote");
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<91>";
				this.m__tokeType=4;
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<92>";
				this.m__pos+=1;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<95>";
				var t_digraphs=[":="];
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<105>";
				if(this.m__pos<this.m__len){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<97>";
					var t_ch5=dbg_charCodeAt(this.m__text,this.m__pos);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<98>";
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<98>";
					var t_=t_digraphs;
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<98>";
					var t_2=0;
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<98>";
					while(t_2<t_.length){
						err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<98>";
						var t_t=dbg_array(t_,t_2)[dbg_index];
						err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<98>";
						t_2=t_2+1;
						err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<103>";
						if(t_ch5==dbg_charCodeAt(t_t,1)){
							err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<100>";
							this.m__pos+=1;
							err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<101>";
							break;
						}
					}
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<105>";
				this.m__tokeType=5;
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<108>";
	this.m__toke=this.m__text.slice(t_pos,this.m__pos);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<110>";
	pop_err();
	return this.m__toke;
}
c_Parser.prototype.p_SetText=function(t_text){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<35>";
	this.m__text=t_text;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<36>";
	this.m__pos=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<37>";
	this.m__len=this.m__text.length;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<38>";
	this.p_Bump();
	pop_err();
}
c_Parser.m_new=function(t_text){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<31>";
	this.p_SetText(t_text);
	pop_err();
	return this;
}
c_Parser.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<28>";
	pop_err();
	return this;
}
c_Parser.prototype.p_Toke=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<114>";
	pop_err();
	return this.m__toke;
}
c_Parser.prototype.p_CParse=function(t_toke){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<122>";
	if(this.m__toke!=t_toke){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<122>";
		pop_err();
		return false;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<123>";
	this.p_Bump();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<124>";
	pop_err();
	return true;
}
c_Parser.prototype.p_CParseIdent=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<128>";
	if(this.m__tokeType!=1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<128>";
		pop_err();
		return "";
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<129>";
	var t_id=this.m__toke;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<130>";
	this.p_Bump();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<131>";
	pop_err();
	return t_id;
}
c_Parser.prototype.p_ParseIdent=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<152>";
	var t_id=this.p_CParseIdent();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<153>";
	if(!((t_id).length!=0)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<153>";
		error("Expecting identifier");
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<154>";
	pop_err();
	return t_id;
}
c_Parser.prototype.p_Parse=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<142>";
	var t_toke=this.m__toke;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<143>";
	this.p_Bump();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<144>";
	pop_err();
	return t_toke;
}
c_Parser.prototype.p_Parse2=function(t_toke){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<148>";
	if(!this.p_CParse(t_toke)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<148>";
		error("Expecting '"+t_toke+"'");
	}
	pop_err();
}
function c_GlslParser(){
	c_Parser.call(this);
}
c_GlslParser.prototype=extend_class(c_Parser);
c_GlslParser.m_new=function(t_text){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<176>";
	c_Parser.m_new.call(this,t_text);
	pop_err();
	return this;
}
c_GlslParser.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<173>";
	c_Parser.m_new2.call(this);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<173>";
	pop_err();
	return this;
}
c_GlslParser.prototype.p_ParseType=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<180>";
	var t_id=this.p_ParseIdent();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<181>";
	pop_err();
	return t_id;
}
function bb_glslparser_IsAlpha(t_ch){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<21>";
	var t_=t_ch>=65 && t_ch<91 || t_ch>=97 && t_ch<123;
	pop_err();
	return t_;
}
function bb_glslparser_IsIdent(t_ch){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<25>";
	var t_=t_ch>=65 && t_ch<91 || t_ch>=97 && t_ch<123 || t_ch>=48 && t_ch<58 || t_ch==95;
	pop_err();
	return t_;
}
function bb_glslparser_IsDigit(t_ch){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glslparser.cxs<17>";
	var t_=t_ch>=48 && t_ch<58;
	pop_err();
	return t_;
}
function c_KeyEnumerator(){
	Object.call(this);
	this.m_node=null;
}
c_KeyEnumerator.m_new=function(t_node){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<459>";
	dbg_object(this).m_node=t_node;
	pop_err();
	return this;
}
c_KeyEnumerator.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<456>";
	pop_err();
	return this;
}
c_KeyEnumerator.prototype.p_HasNext=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<463>";
	var t_=this.m_node!=null;
	pop_err();
	return t_;
}
c_KeyEnumerator.prototype.p_NextObject=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<467>";
	var t_t=this.m_node;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<468>";
	this.m_node=this.m_node.p_NextNode();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<469>";
	pop_err();
	return dbg_object(t_t).m_key;
}
function c_MapKeys(){
	Object.call(this);
	this.m_map=null;
}
c_MapKeys.m_new=function(t_map){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<503>";
	dbg_object(this).m_map=t_map;
	pop_err();
	return this;
}
c_MapKeys.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<500>";
	pop_err();
	return this;
}
c_MapKeys.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<507>";
	var t_=c_KeyEnumerator.m_new.call(new c_KeyEnumerator,this.m_map.p_FirstNode());
	pop_err();
	return t_;
}
var bb_graphics2_fastShader=null;
function c_BumpShader(){
	c_Shader.call(this);
}
c_BumpShader.prototype=extend_class(c_Shader);
c_BumpShader.m_new=function(t_source){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<822>";
	c_Shader.m_new.call(this,t_source);
	pop_err();
	return this;
}
c_BumpShader.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<819>";
	c_Shader.m_new2.call(this);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<819>";
	pop_err();
	return this;
}
c_BumpShader.prototype.p_OnInitMaterial=function(t_material){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<828>";
	t_material.p_SetTexture("ColorTexture",c_Texture.m_White());
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<829>";
	t_material.p_SetTexture("SpecularTexture",c_Texture.m_Black());
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<830>";
	t_material.p_SetTexture("NormalTexture",c_Texture.m_Flat());
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<831>";
	t_material.p_SetVector("AmbientColor",[1.0,1.0,1.0,1.0]);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<832>";
	t_material.p_SetScalar("Roughness",1.0);
	pop_err();
}
c_BumpShader.prototype.p_OnLoadMaterial=function(t_material,t_path,t_texFlags){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<837>";
	var t_format=4;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<839>";
	var t_ext=bb_filepath_ExtractExt(t_path);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<840>";
	if((t_ext).length!=0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<840>";
		t_path=bb_filepath_StripExt(t_path);
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<840>";
		t_ext="png";
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<842>";
	var t_colorTex=c_Texture.m_Load(t_path+"."+t_ext,t_format,t_texFlags);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<843>";
	if(!((t_colorTex)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<843>";
		t_colorTex=c_Texture.m_Load(t_path+"_d."+t_ext,t_format,t_texFlags);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<844>";
	if(!((t_colorTex)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<844>";
		t_colorTex=c_Texture.m_Load(t_path+"_diff."+t_ext,t_format,t_texFlags);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<845>";
	if(!((t_colorTex)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<845>";
		t_colorTex=c_Texture.m_Load(t_path+"_diffuse."+t_ext,t_format,t_texFlags);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<847>";
	var t_specularTex=c_Texture.m_Load(t_path+"_s."+t_ext,t_format,t_texFlags);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<848>";
	if(!((t_specularTex)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<848>";
		t_specularTex=c_Texture.m_Load(t_path+"_spec."+t_ext,t_format,t_texFlags);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<849>";
	if(!((t_specularTex)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<849>";
		t_specularTex=c_Texture.m_Load(t_path+"_specular."+t_ext,t_format,t_texFlags);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<850>";
	if(!((t_specularTex)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<850>";
		t_specularTex=c_Texture.m_Load(t_path+"_SPECULAR."+t_ext,t_format,t_texFlags);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<852>";
	var t_normalTex=c_Texture.m_Load(t_path+"_n."+t_ext,t_format,t_texFlags);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<853>";
	if(!((t_normalTex)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<853>";
		t_normalTex=c_Texture.m_Load(t_path+"_norm."+t_ext,t_format,t_texFlags);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<854>";
	if(!((t_normalTex)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<854>";
		t_normalTex=c_Texture.m_Load(t_path+"_normal."+t_ext,t_format,t_texFlags);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<855>";
	if(!((t_normalTex)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<855>";
		t_normalTex=c_Texture.m_Load(t_path+"_NORMALS."+t_ext,t_format,t_texFlags);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<857>";
	if(!((t_colorTex)!=null) && !((t_specularTex)!=null) && !((t_normalTex)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<857>";
		pop_err();
		return null;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<859>";
	t_material.p_SetTexture("ColorTexture",t_colorTex);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<860>";
	t_material.p_SetTexture("SpecularTexture",t_specularTex);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<861>";
	t_material.p_SetTexture("NormalTexture",t_normalTex);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<867>";
	if(((t_specularTex)!=null) || ((t_normalTex)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<864>";
		t_material.p_SetVector("AmbientColor",[0.0,0.0,0.0,1.0]);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<865>";
		t_material.p_SetScalar("Roughness",.5);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<868>";
	if((t_colorTex)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<868>";
		t_colorTex.p_Release();
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<869>";
	if((t_specularTex)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<869>";
		t_specularTex.p_Release();
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<870>";
	if((t_normalTex)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<870>";
		t_normalTex.p_Release();
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<872>";
	pop_err();
	return t_material;
}
var bb_graphics2_bumpShader=null;
function c_MatteShader(){
	c_Shader.call(this);
}
c_MatteShader.prototype=extend_class(c_Shader);
c_MatteShader.m_new=function(t_source){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<880>";
	c_Shader.m_new.call(this,t_source);
	pop_err();
	return this;
}
c_MatteShader.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<877>";
	c_Shader.m_new2.call(this);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<877>";
	pop_err();
	return this;
}
c_MatteShader.prototype.p_OnInitMaterial=function(t_material){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<886>";
	t_material.p_SetTexture("ColorTexture",c_Texture.m_White());
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<887>";
	t_material.p_SetVector("AmbientColor",[0.0,0.0,0.0,1.0]);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<888>";
	t_material.p_SetScalar("Roughness",1.0);
	pop_err();
}
var bb_graphics2_matteShader=null;
var bb_graphics2_shadowShader=null;
var bb_graphics2_lightMapShader=null;
var bb_graphics2_defaultShader=null;
function c_Font2(){
	Object.call(this);
	this.m__pages=[];
	this.m__pageCount=0;
	this.m__firstChar=0;
	this.m__height=.0;
	this.m__charMap=c_IntMap4.m_new.call(new c_IntMap4);
}
c_Font2.m_new=function(t_pages,t_pageCount,t_chars,t_firstChar,t_height){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1341>";
	dbg_object(this).m__pages=t_pages;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1342>";
	dbg_object(this).m__pageCount=t_pageCount;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1343>";
	dbg_object(this).m__firstChar=t_firstChar;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1344>";
	dbg_object(this).m__height=t_height;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1345>";
	dbg_object(this).m__charMap=t_chars;
	pop_err();
	return this;
}
c_Font2.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1338>";
	pop_err();
	return this;
}
c_Font2.m_Load=function(t_path,t_firstChar,t_numChars,t_padded){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1377>";
	var t_image=c_Image2.m_Load(t_path,.5,.5,3,null);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1379>";
	var t__pages=new_object_array(1);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1380>";
	dbg_array(t__pages,0)[dbg_index]=t_image;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1381>";
	var t__charMap=c_IntMap4.m_new.call(new c_IntMap4);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1383>";
	var t__pageCount=1;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1384>";
	if(!((t_image)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1384>";
		pop_err();
		return null;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1386>";
	var t_cellWidth=((t_image.p_Width()/t_numChars)|0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1387>";
	var t_cellHeight=t_image.p_Height();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1388>";
	var t_glyphX=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1388>";
	var t_glyphY=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1388>";
	var t_glyphWidth=t_cellWidth;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1388>";
	var t_glyphHeight=t_cellHeight;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1389>";
	if(t_padded){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1389>";
		t_glyphX+=1;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1389>";
		t_glyphY+=1;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1389>";
		t_glyphWidth-=2;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1389>";
		t_glyphHeight-=2;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1391>";
	var t_w=((t_image.p_Width()/t_cellWidth)|0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1392>";
	var t_h=((t_image.p_Height()/t_cellHeight)|0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1394>";
	for(var t_i=0;t_i<t_numChars;t_i=t_i+1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1395>";
		var t_y=((t_i/t_w)|0);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1396>";
		var t_x=t_i % t_w;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1397>";
		var t_glyph=c_Glyph2.m_new.call(new c_Glyph2,0,t_firstChar+t_i,t_x*t_cellWidth+t_glyphX,t_y*t_cellHeight+t_glyphY,t_glyphWidth,t_glyphHeight,t_glyphWidth);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1398>";
		t__charMap.p_Add2(t_firstChar+t_i,t_glyph);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1401>";
	var t_=c_Font2.m_new.call(new c_Font2,t__pages,t__pageCount,t__charMap,t_firstChar,(t_glyphHeight));
	pop_err();
	return t_;
}
c_Font2.m_Load2=function(t_path,t_cellWidth,t_cellHeight,t_glyphX,t_glyphY,t_glyphWidth,t_glyphHeight,t_firstChar,t_numChars){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1405>";
	var t_image=c_Image2.m_Load(t_path,.5,.5,3,null);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1406>";
	var t__pages=new_object_array(1);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1407>";
	dbg_array(t__pages,0)[dbg_index]=t_image;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1408>";
	var t__charMap=c_IntMap4.m_new.call(new c_IntMap4);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1410>";
	var t__pageCount=1;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1411>";
	if(!((t_image)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1411>";
		pop_err();
		return null;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1413>";
	var t_w=((t_image.p_Width()/t_cellWidth)|0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1414>";
	var t_h=((t_image.p_Height()/t_cellHeight)|0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1416>";
	for(var t_i=0;t_i<t_numChars;t_i=t_i+1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1417>";
		var t_y=((t_i/t_w)|0);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1418>";
		var t_x=t_i % t_w;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1419>";
		var t_glyph=c_Glyph2.m_new.call(new c_Glyph2,0,t_firstChar+t_i,t_x*t_cellWidth+t_glyphX,t_y*t_cellHeight+t_glyphY,t_glyphWidth,t_glyphHeight,t_glyphWidth);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1420>";
		t__charMap.p_Add2(t_firstChar+t_i,t_glyph);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1423>";
	var t_=c_Font2.m_new.call(new c_Font2,t__pages,t__pageCount,t__charMap,t_firstChar,(t_glyphHeight));
	pop_err();
	return t_;
}
c_Font2.m_Load3=function(t_url,t_flags){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1428>";
	var t_iniText="";
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1429>";
	var t_pageNum=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1430>";
	var t_idnum=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1431>";
	var t_tmpChar=null;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1432>";
	var t_plLen=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1433>";
	var t_lines=[];
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1435>";
	var t_filename="";
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1436>";
	var t_lineHeight=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1438>";
	var t__pages=[];
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1439>";
	var t__charMap=c_IntMap4.m_new.call(new c_IntMap4);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1440>";
	var t__pageCount=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1442>";
	var t_path="";
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1451>";
	if(t_url.indexOf("/",0)>-1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1445>";
		var t_pl=t_url.split("/");
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1446>";
		t_plLen=t_pl.length;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1447>";
		for(var t_pi=0;t_pi<=t_plLen-2;t_pi=t_pi+1){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1448>";
			t_path=t_path+dbg_array(t_pl,t_pi)[dbg_index]+"/";
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1458>";
	if(t_url.toLowerCase().indexOf(".txt",0)>0 || t_url.toLowerCase().indexOf(".fnt",0)>0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1454>";
		t_iniText=bb_app_LoadString(t_url);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1459>";
	if(t_iniText.length==0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1459>";
		error("\n\nError in file graphics.cxs, Method Font.Load:Font(url:String, flags:Int=Image.Filter)\n\nCan not load font: "+t_url);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1461>";
	t_lines=t_iniText.split(String.fromCharCode(13)+String.fromCharCode(10));
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1465>";
	if(t_lines.length<2){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1463>";
		t_lines=t_iniText.split(String.fromCharCode(10));
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1466>";
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1466>";
	var t_=t_lines;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1466>";
	var t_2=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1466>";
	while(t_2<t_.length){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1466>";
		var t_line=dbg_array(t_,t_2)[dbg_index];
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1466>";
		t_2=t_2+1;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1468>";
		t_line=string_trim(t_line);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1469>";
		if(string_startswith(t_line,"info") || t_line==""){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1469>";
			continue;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1470>";
		if(string_startswith(t_line,"padding")){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1470>";
			continue;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1489>";
		if(string_startswith(t_line,"common")){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1472>";
			var t_commondata=t_line.split(String.fromCharCode(32));
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1473>";
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1473>";
			var t_3=t_commondata;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1473>";
			var t_4=0;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1473>";
			while(t_4<t_3.length){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1473>";
				var t_common=dbg_array(t_3,t_4)[dbg_index];
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1473>";
				t_4=t_4+1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1480>";
				if(string_startswith(t_common,"lineHeight=")){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1476>";
					var t_lnh=t_common.split("=");
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1477>";
					dbg_array(t_lnh,1)[dbg_index]=string_trim(dbg_array(t_lnh,1)[dbg_index]);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1478>";
					t_lineHeight=parseInt((dbg_array(t_lnh,1)[dbg_index]),10);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1487>";
				if(string_startswith(t_common,"pages=")){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1482>";
					var t_lnh2=t_common.split("=");
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1483>";
					dbg_array(t_lnh2,1)[dbg_index]=string_trim(dbg_array(t_lnh2,1)[dbg_index]);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1484>";
					t__pageCount=parseInt((dbg_array(t_lnh2,1)[dbg_index]),10);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1485>";
					t__pages=new_object_array(t__pageCount);
				}
			}
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1511>";
		if(string_startswith(t_line,"page")){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1492>";
			var t_pagedata=t_line.split(String.fromCharCode(32));
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1493>";
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1493>";
			var t_5=t_pagedata;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1493>";
			var t_6=0;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1493>";
			while(t_6<t_5.length){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1493>";
				var t_data=dbg_array(t_5,t_6)[dbg_index];
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1493>";
				t_6=t_6+1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1509>";
				if(string_startswith(t_data,"file=")){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1495>";
					var t_fn=t_data.split("=");
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1496>";
					dbg_array(t_fn,1)[dbg_index]=string_trim(dbg_array(t_fn,1)[dbg_index]);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1497>";
					t_filename=dbg_array(t_fn,1)[dbg_index];
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1501>";
					if(dbg_charCodeAt(t_filename,0)==34){
						err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1499>";
						t_filename=t_filename.slice(1,t_filename.length-1);
					}
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1501>";
					t_filename=t_path+string_trim(t_filename);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1503>";
					dbg_array(t__pages,t_pageNum)[dbg_index]=c_Image2.m_Load(t_filename,0.5,0.5,t_flags,null);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1505>";
					if(dbg_array(t__pages,t_pageNum)[dbg_index]==null){
						err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1505>";
						error("\n\nError in file graphics.cxs, Method Font.Load:Font(url:String, flags:Int=Image.Filter)\n\nCan not load page image: "+t_filename);
					}
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1507>";
					t_pageNum=t_pageNum+1;
				}
			}
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1512>";
		if(string_startswith(t_line,"chars")){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1512>";
			continue;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1566>";
		if(string_startswith(t_line,"char")){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1515>";
			t_tmpChar=c_Glyph2.m_new2.call(new c_Glyph2);
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1516>";
			var t_linedata=t_line.split(String.fromCharCode(32));
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1517>";
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1517>";
			var t_7=t_linedata;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1517>";
			var t_8=0;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1517>";
			while(t_8<t_7.length){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1517>";
				var t_data2=dbg_array(t_7,t_8)[dbg_index];
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1517>";
				t_8=t_8+1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1523>";
				if(string_startswith(t_data2,"id=")){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1519>";
					var t_idc=t_data2.split("=");
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1520>";
					dbg_array(t_idc,1)[dbg_index]=string_trim(dbg_array(t_idc,1)[dbg_index]);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1521>";
					dbg_object(t_tmpChar).m_id=parseInt((dbg_array(t_idc,1)[dbg_index]),10);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1528>";
				if(string_startswith(t_data2,"x=")){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1524>";
					var t_xc=t_data2.split("=");
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1525>";
					dbg_array(t_xc,1)[dbg_index]=string_trim(dbg_array(t_xc,1)[dbg_index]);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1526>";
					dbg_object(t_tmpChar).m_x=parseInt((dbg_array(t_xc,1)[dbg_index]),10);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1533>";
				if(string_startswith(t_data2,"y=")){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1529>";
					var t_yc=t_data2.split("=");
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1530>";
					dbg_array(t_yc,1)[dbg_index]=string_trim(dbg_array(t_yc,1)[dbg_index]);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1531>";
					dbg_object(t_tmpChar).m_y=parseInt((dbg_array(t_yc,1)[dbg_index]),10);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1538>";
				if(string_startswith(t_data2,"width=")){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1534>";
					var t_wc=t_data2.split("=");
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1535>";
					dbg_array(t_wc,1)[dbg_index]=string_trim(dbg_array(t_wc,1)[dbg_index]);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1536>";
					dbg_object(t_tmpChar).m_width=parseInt((dbg_array(t_wc,1)[dbg_index]),10);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1543>";
				if(string_startswith(t_data2,"height=")){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1539>";
					var t_hc=t_data2.split("=");
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1540>";
					dbg_array(t_hc,1)[dbg_index]=string_trim(dbg_array(t_hc,1)[dbg_index]);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1541>";
					dbg_object(t_tmpChar).m_height=parseInt((dbg_array(t_hc,1)[dbg_index]),10);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1548>";
				if(string_startswith(t_data2,"xoffset=")){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1544>";
					var t_xoc=t_data2.split("=");
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1545>";
					dbg_array(t_xoc,1)[dbg_index]=string_trim(dbg_array(t_xoc,1)[dbg_index]);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1546>";
					dbg_object(t_tmpChar).m_xoff=parseInt((dbg_array(t_xoc,1)[dbg_index]),10);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1553>";
				if(string_startswith(t_data2,"yoffset=")){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1549>";
					var t_yoc=t_data2.split("=");
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1550>";
					dbg_array(t_yoc,1)[dbg_index]=string_trim(dbg_array(t_yoc,1)[dbg_index]);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1551>";
					dbg_object(t_tmpChar).m_yoff=parseInt((dbg_array(t_yoc,1)[dbg_index]),10);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1558>";
				if(string_startswith(t_data2,"xadvance=")){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1554>";
					var t_advc=t_data2.split("=");
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1555>";
					dbg_array(t_advc,1)[dbg_index]=string_trim(dbg_array(t_advc,1)[dbg_index]);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1556>";
					dbg_object(t_tmpChar).m_advance=parseInt((dbg_array(t_advc,1)[dbg_index]),10);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1563>";
				if(string_startswith(t_data2,"page=")){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1559>";
					var t_advc2=t_data2.split("=");
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1560>";
					dbg_array(t_advc2,1)[dbg_index]=string_trim(dbg_array(t_advc2,1)[dbg_index]);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1561>";
					dbg_object(t_tmpChar).m_page=parseInt((dbg_array(t_advc2,1)[dbg_index]),10);
				}
			}
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1564>";
			t__charMap.p_Add2(dbg_object(t_tmpChar).m_id,t_tmpChar);
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1566>";
		continue;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1568>";
	var t_9=c_Font2.m_new.call(new c_Font2,t__pages,t__pageCount,t__charMap,-1,(t_lineHeight));
	pop_err();
	return t_9;
}
c_Font2.prototype.p_GetGlyph=function(t_char){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1349>";
	var t_=dbg_object(this).m__charMap.p_Get(t_char);
	pop_err();
	return t_;
}
c_Font2.prototype.p_TextWidth=function(t_text){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1353>";
	var t_w=0.0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1354>";
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1354>";
	var t_=t_text;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1354>";
	var t_2=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1354>";
	while(t_2<t_.length){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1354>";
		var t_char=dbg_charCodeAt(t_,t_2);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1354>";
		t_2=t_2+1;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1355>";
		var t_glyph=this.p_GetGlyph(t_char);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1356>";
		if(!((t_glyph)!=null)){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1356>";
			continue;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1357>";
		t_w=t_w+(dbg_object(t_glyph).m_advance);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1359>";
	pop_err();
	return t_w;
}
c_Font2.prototype.p_TextHeight=function(t_text){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1374>";
	if(t_text==""){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1364>";
		pop_err();
		return this.m__height;
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1366>";
		var t_h=0.0;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1367>";
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1367>";
		var t_=t_text;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1367>";
		var t_2=0;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1367>";
		while(t_2<t_.length){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1367>";
			var t_char=dbg_charCodeAt(t_,t_2);
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1367>";
			t_2=t_2+1;
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1368>";
			var t_glyph=this.p_GetGlyph(t_char);
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1369>";
			if(!((t_glyph)!=null)){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1369>";
				continue;
			}
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1370>";
			if(t_h<(dbg_object(t_glyph).m_height+dbg_object(t_glyph).m_yoff)){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1370>";
				t_h=(dbg_object(t_glyph).m_height+dbg_object(t_glyph).m_yoff);
			}
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1372>";
		pop_err();
		return t_h;
	}
}
function c_Image2(){
	Object.call(this);
	this.m__material=null;
	this.m__width=0;
	this.m__height=0;
	this.m__x0=-1.0;
	this.m__x1=1.0;
	this.m__y0=-1.0;
	this.m__y1=1.0;
	this.m__x=0;
	this.m__s0=0.0;
	this.m__y=0;
	this.m__t0=0.0;
	this.m__s1=1.0;
	this.m__t1=1.0;
}
c_Image2.m__flagsMask=0;
c_Image2.prototype.p_SetHandle=function(t_xhandle,t_yhandle){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1183>";
	this.m__x0=(this.m__width)*-t_xhandle;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1184>";
	this.m__x1=(this.m__width)*(1.0-t_xhandle);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1185>";
	this.m__y0=(this.m__height)*-t_yhandle;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1186>";
	this.m__y1=(this.m__height)*(1.0-t_yhandle);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1187>";
	this.m__s0=(this.m__x)/(this.m__material.p_Width());
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1188>";
	this.m__t0=(this.m__y)/(this.m__material.p_Height());
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1189>";
	this.m__s1=(this.m__x+this.m__width)/(this.m__material.p_Width());
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1190>";
	this.m__t1=(this.m__y+this.m__height)/(this.m__material.p_Height());
	pop_err();
}
c_Image2.m_new=function(t_width,t_height,t_xhandle,t_yhandle,t_flags){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1098>";
	t_flags&=c_Image2.m__flagsMask;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1099>";
	var t_texture=c_Texture.m_new.call(new c_Texture,t_width,t_height,4,t_flags|12|16);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1100>";
	this.m__material=c_Material.m_new.call(new c_Material,bb_graphics2_fastShader);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1101>";
	this.m__material.p_SetTexture("ColorTexture",t_texture);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1102>";
	t_texture.p_Release();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1103>";
	this.m__width=t_width;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1104>";
	this.m__height=t_height;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1105>";
	this.p_SetHandle(t_xhandle,t_yhandle);
	pop_err();
	return this;
}
c_Image2.m_new2=function(t_image,t_x,t_y,t_width,t_height,t_xhandle,t_yhandle){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1109>";
	this.m__material=dbg_object(t_image).m__material;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1110>";
	this.m__x=dbg_object(t_image).m__x+t_x;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1111>";
	this.m__y=dbg_object(t_image).m__y+t_y;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1112>";
	this.m__width=t_width;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1113>";
	this.m__height=t_height;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1114>";
	this.p_SetHandle(t_xhandle,t_yhandle);
	pop_err();
	return this;
}
c_Image2.m_new3=function(t_material,t_xhandle,t_yhandle){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1118>";
	var t_texture=t_material.p_ColorTexture();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1119>";
	if(!((t_texture)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1119>";
		error("Material has no ColorTexture");
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1120>";
	this.m__material=t_material;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1121>";
	this.m__width=this.m__material.p_Width();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1122>";
	this.m__height=this.m__material.p_Height();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1123>";
	this.p_SetHandle(t_xhandle,t_yhandle);
	pop_err();
	return this;
}
c_Image2.m_new4=function(t_material,t_x,t_y,t_width,t_height,t_xhandle,t_yhandle){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1127>";
	var t_texture=t_material.p_ColorTexture();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1128>";
	if(!((t_texture)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1128>";
		error("Material has no ColorTexture");
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1129>";
	this.m__material=t_material;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1130>";
	this.m__x=t_x;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1131>";
	this.m__y=t_y;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1132>";
	this.m__width=t_width;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1133>";
	this.m__height=t_height;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1134>";
	this.p_SetHandle(t_xhandle,t_yhandle);
	pop_err();
	return this;
}
c_Image2.m_new5=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1079>";
	pop_err();
	return this;
}
c_Image2.m_Load=function(t_path,t_xhandle,t_yhandle,t_flags,t_shader){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1218>";
	t_flags&=c_Image2.m__flagsMask;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1220>";
	var t_material=c_Material.m_Load(t_path,t_flags|12,t_shader);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1225>";
	if(!((t_material)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1222>";
		debugLog("Error - Unable to load image: "+t_path);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1223>";
		pop_err();
		return null;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1226>";
	var t_=c_Image2.m_new3.call(new c_Image2,t_material,t_xhandle,t_yhandle);
	pop_err();
	return t_;
}
c_Image2.prototype.p_Width=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1163>";
	pop_err();
	return this.m__width;
}
c_Image2.prototype.p_Height=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1167>";
	pop_err();
	return this.m__height;
}
c_Image2.prototype.p_Material=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1143>";
	pop_err();
	return this.m__material;
}
function c_RefCounted(){
	Object.call(this);
	this.m__refs=1;
}
c_RefCounted.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<174>";
	pop_err();
	return this;
}
c_RefCounted.prototype.p_Retain=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<177>";
	if(this.m__refs<=0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<177>";
		error("Internal error");
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<178>";
	this.m__refs+=1;
	pop_err();
}
c_RefCounted.prototype.p_Destroy=function(){
}
c_RefCounted.prototype.p_Release=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<182>";
	if(this.m__refs<=0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<182>";
		error("Internal error");
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<183>";
	this.m__refs-=1;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<184>";
	if((this.m__refs)!=0){
		pop_err();
		return;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<185>";
	this.m__refs=-1;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<186>";
	this.p_Destroy();
	pop_err();
}
function c_Texture(){
	c_RefCounted.call(this);
	this.m__flags=0;
	this.m__width=0;
	this.m__height=0;
	this.m__format=0;
	this.m__seq=0;
	this.m__glTexture=0;
	this.m__glFramebuffer=0;
	this.m__data=null;
}
c_Texture.prototype=extend_class(c_RefCounted);
c_Texture.m__white=null;
c_Texture.m__colors=null;
c_Texture.prototype.p_Init3=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<467>";
	this.m__seq=webglGraphicsSeq;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<469>";
	this.m__glTexture=gl.createTexture();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<471>";
	bb_glutil_glPushTexture2d(this.m__glTexture);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<478>";
	if((this.m__flags&1)!=0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<474>";
		gl.texParameteri(3553,10240,9729);
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<476>";
		gl.texParameteri(3553,10240,9728);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<487>";
	if(((this.m__flags&2)!=0) && ((this.m__flags&1)!=0)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<479>";
		gl.texParameteri(3553,10241,9987);
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<480>";
		if((this.m__flags&2)!=0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<481>";
			gl.texParameteri(3553,10241,9984);
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<482>";
			if((this.m__flags&1)!=0){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<483>";
				gl.texParameteri(3553,10241,9729);
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<485>";
				gl.texParameteri(3553,10241,9728);
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<488>";
	if((this.m__flags&4)!=0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<488>";
		gl.texParameteri(3553,10242,33071);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<489>";
	if((this.m__flags&8)!=0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<489>";
		gl.texParameteri(3553,10243,33071);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<490>";
	if((this.m__flags&1024)!=0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<490>";
		gl.texParameteri(3553,10242,10497);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<491>";
	if((this.m__flags&2048)!=0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<491>";
		gl.texParameteri(3553,10243,10497);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<492>";
	if((this.m__flags&4096)!=0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<492>";
		gl.texParameteri(3553,10242,33648);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<493>";
	if((this.m__flags&8192)!=0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<493>";
		gl.texParameteri(3553,10243,33648);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<495>";
	_glTexImage2D(3553,0,6408,this.m__width,this.m__height,0,6408,5121,null);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<498>";
	bb_glutil_glPopTexture2d();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<513>";
	if((this.m__flags&16)!=0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<502>";
		this.m__glFramebuffer=gl.createFramebuffer();
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<504>";
		bb_glutil_glPushFramebuffer(this.m__glFramebuffer);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<506>";
		_glBindFramebuffer(36160,this.m__glFramebuffer);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<507>";
		gl.framebufferTexture2D(36160,36064,3553,this.m__glTexture,0);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<509>";
		if(gl.checkFramebufferStatus(36160)!=36053){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<509>";
			error("Incomplete framebuffer");
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<511>";
		bb_glutil_glPopFramebuffer();
	}
	pop_err();
}
c_Texture.prototype.p_Init4=function(t_width,t_height,t_format,t_flags){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<443>";
	bb_graphics2_InitMojo2();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<446>";
	if(t_format!=4){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<446>";
		error("Invalid texture format: "+String(t_format));
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<450>";
	if(!bb_graphics2_IsPow2(t_width) || !bb_graphics2_IsPow2(t_height)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<450>";
		t_flags&=-3;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<456>";
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<457>";
	this.m__width=t_width;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<458>";
	this.m__height=t_height;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<459>";
	this.m__format=t_format;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<460>";
	this.m__flags=t_flags;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<462>";
	this.p_Init3();
	pop_err();
}
c_Texture.m_new=function(t_width,t_height,t_format,t_flags){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<230>";
	c_RefCounted.m_new.call(this);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<231>";
	this.p_Init4(t_width,t_height,t_format,t_flags);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<240>";
	if((this.m__flags&256)!=0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<234>";
		var t_data=c_DataBuffer.m_new.call(new c_DataBuffer,t_width*t_height*4,false);
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<235>";
		for(var t_i=0;t_i<t_width*t_height*4;t_i=t_i+4){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<236>";
			t_data.PokeInt(t_i,-65281);
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<238>";
		this.m__data=(t_data);
	}
	pop_err();
	return this;
}
c_Texture.prototype.p_Validate=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<252>";
	if(this.m__seq==webglGraphicsSeq){
		pop_err();
		return;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<253>";
	this.p_Init3();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<254>";
	if((this.m__data)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<254>";
		this.p_LoadData(this.m__data);
	}
	pop_err();
}
c_Texture.prototype.p_GLTexture=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<323>";
	this.p_Validate();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<324>";
	pop_err();
	return this.m__glTexture;
}
c_Texture.prototype.p_UpdateMipmaps=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<303>";
	if(!((this.m__flags&2)!=0)){
		pop_err();
		return;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<305>";
	if(this.m__seq!=webglGraphicsSeq){
		pop_err();
		return;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<307>";
	bb_glutil_glPushTexture2d(this.p_GLTexture());
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<309>";
	_glGenerateMipmap(3553);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<311>";
	bb_glutil_glPopTexture2d();
	pop_err();
}
c_Texture.prototype.p_LoadData=function(t_data){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<517>";
	bb_glutil_glPushTexture2d(this.p_GLTexture());
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<527>";
	if((object_downcast((t_data),c_DataBuffer))!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<523>";
		_glTexImage2D(3553,0,6408,this.m__width,this.m__height,0,6408,5121,object_downcast((t_data),c_DataBuffer));
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<525>";
		_glTexImage2D2(3553,0,6408,6408,5121,t_data);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<528>";
	bb_glutil_glPopTexture2d();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<530>";
	this.p_UpdateMipmaps();
	pop_err();
}
c_Texture.m_new2=function(t_width,t_height,t_format,t_flags,t_data){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<432>";
	c_RefCounted.m_new.call(this);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<433>";
	this.p_Init4(t_width,t_height,t_format,t_flags);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<435>";
	this.p_LoadData(t_data);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<440>";
	if(true){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<438>";
		this.m__data=t_data;
	}
	pop_err();
	return this;
}
c_Texture.m_new3=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<211>";
	c_RefCounted.m_new.call(this);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<211>";
	pop_err();
	return this;
}
c_Texture.m_Color=function(t_color){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<383>";
	var t_tex=c_Texture.m__colors.p_Get(t_color);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<384>";
	if((t_tex)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<384>";
		pop_err();
		return t_tex;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<385>";
	var t_data=c_DataBuffer.m_new.call(new c_DataBuffer,4,false);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<386>";
	t_data.PokeInt(0,t_color);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<387>";
	t_tex=c_Texture.m_new2.call(new c_Texture,1,1,4,12,(t_data));
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<391>";
	c_Texture.m__colors.p_Set3(t_color,t_tex);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<392>";
	pop_err();
	return t_tex;
}
c_Texture.m_White=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<401>";
	if(!((c_Texture.m__white)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<401>";
		c_Texture.m__white=c_Texture.m_Color(-1);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<402>";
	pop_err();
	return c_Texture.m__white;
}
c_Texture.m_Load=function(t_path,t_format,t_flags){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<342>";
	var t_info=new_number_array(2);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<365>";
	var t_data=bb_gles20_LoadStaticTexImage(bb_graphics2_KludgePath(t_path),t_info);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<372>";
	if(!((t_data)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<370>";
		pop_err();
		return null;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<373>";
	var t_tex=c_Texture.m_new2.call(new c_Texture,dbg_array(t_info,0)[dbg_index],dbg_array(t_info,1)[dbg_index],t_format,t_flags,t_data);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<379>";
	pop_err();
	return t_tex;
}
c_Texture.prototype.p_Loading=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<316>";
	var t_=BBTextureLoading(this.m__glTexture);
	pop_err();
	return t_;
}
c_Texture.prototype.p_GLFramebuffer=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<328>";
	this.p_Validate();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<329>";
	pop_err();
	return this.m__glFramebuffer;
}
c_Texture.prototype.p_Flags=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<270>";
	pop_err();
	return this.m__flags;
}
c_Texture.prototype.p_Width=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<258>";
	pop_err();
	return this.m__width;
}
c_Texture.prototype.p_Height=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<262>";
	pop_err();
	return this.m__height;
}
c_Texture.m__black=null;
c_Texture.m_Black=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<396>";
	if(!((c_Texture.m__black)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<396>";
		c_Texture.m__black=c_Texture.m_Color(-16777216);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<397>";
	pop_err();
	return c_Texture.m__black;
}
c_Texture.m__flat=null;
c_Texture.m_Flat=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<411>";
	if(!((c_Texture.m__flat)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<411>";
		c_Texture.m__flat=c_Texture.m_Color(-7829368);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<412>";
	pop_err();
	return c_Texture.m__flat;
}
c_Texture.prototype.p_Destroy=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<247>";
	if(this.m__seq==webglGraphicsSeq){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<244>";
		if((this.m__glTexture)!=0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<244>";
			gl.deleteTexture(this.m__glTexture);
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<245>";
		if((this.m__glFramebuffer)!=0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<245>";
			gl.deleteFramebuffer(this.m__glFramebuffer);
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<247>";
	this.m__glTexture=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<248>";
	this.m__glFramebuffer=0;
	pop_err();
}
function c_Material(){
	c_RefCounted.call(this);
	this.m__shader=null;
	this.m__inited=false;
	this.m__textures=c_StringMap2.m_new.call(new c_StringMap2);
	this.m__colorTexture=null;
	this.m__scalars=c_StringMap3.m_new.call(new c_StringMap3);
	this.m__vectors=c_StringMap4.m_new.call(new c_StringMap4);
}
c_Material.prototype=extend_class(c_RefCounted);
c_Material.prototype.p_SetTexture=function(t_param,t_texture){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<955>";
	if(!((t_texture)!=null)){
		pop_err();
		return;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<956>";
	if(this.m__inited && !this.m__textures.p_Contains2(t_param)){
		pop_err();
		return;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<958>";
	var t_old=this.m__textures.p_Get2(t_param);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<959>";
	t_texture.p_Retain();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<960>";
	this.m__textures.p_Set4(t_param,t_texture);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<961>";
	if((t_old)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<961>";
		t_old.p_Release();
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<963>";
	if(t_param=="ColorTexture"){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<963>";
		this.m__colorTexture=t_texture;
	}
	pop_err();
}
c_Material.m_new=function(t_shader){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<897>";
	c_RefCounted.m_new.call(this);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<898>";
	bb_graphics2_InitMojo2();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<900>";
	if(!((t_shader)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<900>";
		t_shader=bb_graphics2_defaultShader;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<901>";
	this.m__shader=t_shader;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<902>";
	this.m__shader.p_OnInitMaterial(this);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<903>";
	this.m__inited=true;
	pop_err();
	return this;
}
c_Material.prototype.p_Shader=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<917>";
	pop_err();
	return this.m__shader;
}
c_Material.m_Load=function(t_path,t_texFlags,t_shader){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<983>";
	var t_material=c_Material.m_new.call(new c_Material,t_shader);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<985>";
	t_material=t_material.p_Shader().p_OnLoadMaterial(t_material,t_path,t_texFlags);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<987>";
	pop_err();
	return t_material;
}
c_Material.prototype.p_Width=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<925>";
	if((this.m__colorTexture)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<925>";
		pop_err();
		return dbg_object(this.m__colorTexture).m__width;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<926>";
	pop_err();
	return 0;
}
c_Material.prototype.p_Height=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<930>";
	if((this.m__colorTexture)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<930>";
		pop_err();
		return dbg_object(this.m__colorTexture).m__height;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<931>";
	pop_err();
	return 0;
}
c_Material.prototype.p_ColorTexture=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<921>";
	pop_err();
	return this.m__colorTexture;
}
c_Material.prototype.p_GetScalar=function(t_param,t_defValue){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<940>";
	if(!this.m__scalars.p_Contains2(t_param)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<940>";
		pop_err();
		return t_defValue;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<941>";
	var t_=this.m__scalars.p_Get2(t_param);
	pop_err();
	return t_;
}
c_Material.prototype.p_GetVector=function(t_param,t_defValue){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<950>";
	if(!this.m__vectors.p_Contains2(t_param)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<950>";
		pop_err();
		return t_defValue;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<951>";
	var t_=this.m__vectors.p_Get2(t_param);
	pop_err();
	return t_;
}
c_Material.prototype.p_GetTexture=function(t_param,t_defValue){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<968>";
	if(!this.m__textures.p_Contains2(t_param)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<968>";
		pop_err();
		return t_defValue;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<969>";
	var t_=this.m__textures.p_Get2(t_param);
	pop_err();
	return t_;
}
c_Material.prototype.p_Bind=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1001>";
	this.m__shader.p_Bind();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1003>";
	if(bb_graphics2_rs_material==this){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1003>";
		pop_err();
		return true;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1005>";
	bb_graphics2_rs_material=this;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1007>";
	var t_texid=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1009>";
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1009>";
	var t_=dbg_object(bb_graphics2_rs_program).m_matuniforms;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1009>";
	var t_2=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1009>";
	while(t_2<t_.length){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1009>";
		var t_u=dbg_array(t_,t_2)[dbg_index];
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1009>";
		t_2=t_2+1;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1010>";
		var t_1=dbg_object(t_u).m_type;
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1011>";
		if(t_1==5126){
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1012>";
			gl.uniform1f(dbg_object(t_u).m_location,this.p_GetScalar(dbg_object(t_u).m_name,1.0));
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1013>";
			if(t_1==35666){
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1014>";
				_glUniform4fv(dbg_object(t_u).m_location,1,this.p_GetVector(dbg_object(t_u).m_name,[1.0,1.0,1.0,1.0]));
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1015>";
				if(t_1==35678){
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1016>";
					var t_tex=this.p_GetTexture(dbg_object(t_u).m_name,null);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1021>";
					if(t_tex.p_Loading()){
						err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1018>";
						bb_graphics2_rs_material=null;
						err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1019>";
						break;
					}
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1021>";
					gl.activeTexture(33984+t_texid);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1022>";
					_glBindTexture(3553,t_tex.p_GLTexture());
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1023>";
					gl.uniform1i(dbg_object(t_u).m_location,t_texid);
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1024>";
					t_texid+=1;
				}else{
					err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1026>";
					error("Unsupported uniform type: name="+dbg_object(t_u).m_name+", location="+String(dbg_object(t_u).m_location)+", size="+String(dbg_object(t_u).m_size)+", type="+String(dbg_object(t_u).m_type));
				}
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1035>";
	if((t_texid)!=0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1035>";
		gl.activeTexture(33984);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1037>";
	var t_3=bb_graphics2_rs_material==this;
	pop_err();
	return t_3;
}
c_Material.prototype.p_SetVector=function(t_param,t_vector){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<945>";
	if(this.m__inited && !this.m__vectors.p_Contains2(t_param)){
		pop_err();
		return;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<946>";
	this.m__vectors.p_Set6(t_param,t_vector);
	pop_err();
}
c_Material.prototype.p_SetScalar=function(t_param,t_scalar){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<935>";
	if(this.m__inited && !this.m__scalars.p_Contains2(t_param)){
		pop_err();
		return;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<936>";
	this.m__scalars.p_Set5(t_param,t_scalar);
	pop_err();
}
c_Material.prototype.p_Destroy=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<911>";
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<911>";
	var t_=this.m__textures.p_ObjectEnumerator();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<911>";
	while(t_.p_HasNext()){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<911>";
		var t_tex=t_.p_NextObject();
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<912>";
		t_tex.p_Value().p_Release();
	}
	pop_err();
}
function c_Map4(){
	Object.call(this);
	this.m_root=null;
}
c_Map4.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<7>";
	pop_err();
	return this;
}
c_Map4.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map4.prototype.p_FindNode=function(t_key){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<157>";
	var t_node=this.m_root;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<159>";
	while((t_node)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<160>";
		var t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<168>";
		if(t_cmp>0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<163>";
			if(t_cmp<0){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<169>";
	pop_err();
	return t_node;
}
c_Map4.prototype.p_Get=function(t_key){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<101>";
	var t_node=this.p_FindNode(t_key);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<102>";
	if((t_node)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<102>";
		pop_err();
		return dbg_object(t_node).m_value;
	}
	pop_err();
	return null;
}
c_Map4.prototype.p_RotateLeft4=function(t_node){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<256>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<266>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<263>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<264>";
		this.m_root=t_child;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map4.prototype.p_RotateRight4=function(t_node){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<276>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<286>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<283>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<284>";
		this.m_root=t_child;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map4.prototype.p_InsertFixup4=function(t_node){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<246>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<229>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<225>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<223>";
					this.p_RotateLeft4(t_node);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<227>";
				this.p_RotateRight4(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<245>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<241>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<239>";
					this.p_RotateRight4(t_node);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<243>";
				this.p_RotateLeft4(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map4.prototype.p_Set3=function(t_key,t_value){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<29>";
	var t_node=this.m_root;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<30>";
	var t_parent=null;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<30>";
	var t_cmp=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<32>";
	while((t_node)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<33>";
		t_parent=t_node;
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<34>";
		t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<43>";
		if(t_cmp>0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<37>";
			if(t_cmp<0){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<45>";
	t_node=c_Node4.m_new.call(new c_Node4,t_key,t_value,-1,t_parent);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<57>";
	if((t_parent)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<53>";
		if(t_cmp>0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<53>";
		this.p_InsertFixup4(t_node);
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<55>";
		this.m_root=t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<57>";
	pop_err();
	return true;
}
function c_IntMap3(){
	c_Map4.call(this);
}
c_IntMap3.prototype=extend_class(c_Map4);
c_IntMap3.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<534>";
	c_Map4.m_new.call(this);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<534>";
	pop_err();
	return this;
}
c_IntMap3.prototype.p_Compare=function(t_lhs,t_rhs){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<537>";
	var t_=t_lhs-t_rhs;
	pop_err();
	return t_;
}
function c_Node4(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node4.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<364>";
	dbg_object(this).m_key=t_key;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<365>";
	dbg_object(this).m_value=t_value;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<366>";
	dbg_object(this).m_color=t_color;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node4.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<361>";
	pop_err();
	return this;
}
function bb_graphics2_IsPow2(t_sz){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<101>";
	var t_=(t_sz&t_sz-1)==0;
	pop_err();
	return t_;
}
function bb_glutil_glPushTexture2d(t_tex){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glutil.cxs<17>";
	_glGetIntegerv(32873,bb_glutil_tmpi);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glutil.cxs<18>";
	_glBindTexture(3553,t_tex);
	pop_err();
}
function bb_glutil_glPopTexture2d(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glutil.cxs<22>";
	_glBindTexture(3553,dbg_array(bb_glutil_tmpi,0)[dbg_index]);
	pop_err();
}
function bb_glutil_glPushFramebuffer(t_framebuf){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glutil.cxs<26>";
	_glGetIntegerv(36006,bb_glutil_tmpi);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glutil.cxs<27>";
	_glBindFramebuffer(36160,t_framebuf);
	pop_err();
}
function bb_glutil_glPopFramebuffer(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/glutil.cxs<31>";
	_glBindFramebuffer(36160,dbg_array(bb_glutil_tmpi,0)[dbg_index]);
	pop_err();
}
function c_Map5(){
	Object.call(this);
	this.m_root=null;
}
c_Map5.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<7>";
	pop_err();
	return this;
}
c_Map5.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map5.prototype.p_FindNode2=function(t_key){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<157>";
	var t_node=this.m_root;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<159>";
	while((t_node)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<160>";
		var t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<168>";
		if(t_cmp>0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<163>";
			if(t_cmp<0){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<169>";
	pop_err();
	return t_node;
}
c_Map5.prototype.p_Contains2=function(t_key){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<25>";
	var t_=this.p_FindNode2(t_key)!=null;
	pop_err();
	return t_;
}
c_Map5.prototype.p_Get2=function(t_key){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<101>";
	var t_node=this.p_FindNode2(t_key);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<102>";
	if((t_node)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<102>";
		pop_err();
		return dbg_object(t_node).m_value;
	}
	pop_err();
	return null;
}
c_Map5.prototype.p_RotateLeft5=function(t_node){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<256>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<266>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<263>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<264>";
		this.m_root=t_child;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map5.prototype.p_RotateRight5=function(t_node){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<276>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<286>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<283>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<284>";
		this.m_root=t_child;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map5.prototype.p_InsertFixup5=function(t_node){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<246>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<229>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<225>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<223>";
					this.p_RotateLeft5(t_node);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<227>";
				this.p_RotateRight5(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<245>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<241>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<239>";
					this.p_RotateRight5(t_node);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<243>";
				this.p_RotateLeft5(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map5.prototype.p_Set4=function(t_key,t_value){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<29>";
	var t_node=this.m_root;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<30>";
	var t_parent=null;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<30>";
	var t_cmp=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<32>";
	while((t_node)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<33>";
		t_parent=t_node;
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<34>";
		t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<43>";
		if(t_cmp>0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<37>";
			if(t_cmp<0){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<45>";
	t_node=c_Node5.m_new.call(new c_Node5,t_key,t_value,-1,t_parent);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<57>";
	if((t_parent)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<53>";
		if(t_cmp>0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<53>";
		this.p_InsertFixup5(t_node);
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<55>";
		this.m_root=t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<57>";
	pop_err();
	return true;
}
c_Map5.prototype.p_FirstNode=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<125>";
	if(!((this.m_root)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<125>";
		pop_err();
		return null;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<127>";
	var t_node=this.m_root;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<128>";
	while((dbg_object(t_node).m_left)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<129>";
		t_node=dbg_object(t_node).m_left;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<131>";
	pop_err();
	return t_node;
}
c_Map5.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<121>";
	var t_=c_NodeEnumerator.m_new.call(new c_NodeEnumerator,this.p_FirstNode());
	pop_err();
	return t_;
}
function c_StringMap2(){
	c_Map5.call(this);
}
c_StringMap2.prototype=extend_class(c_Map5);
c_StringMap2.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<551>";
	c_Map5.m_new.call(this);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<551>";
	pop_err();
	return this;
}
c_StringMap2.prototype.p_Compare2=function(t_lhs,t_rhs){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<554>";
	var t_=string_compare(t_lhs,t_rhs);
	pop_err();
	return t_;
}
function c_Node5(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node5.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<364>";
	dbg_object(this).m_key=t_key;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<365>";
	dbg_object(this).m_value=t_value;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<366>";
	dbg_object(this).m_color=t_color;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node5.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<361>";
	pop_err();
	return this;
}
c_Node5.prototype.p_NextNode=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<385>";
	var t_node=null;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<393>";
	if((this.m_right)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<387>";
		t_node=this.m_right;
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<388>";
		while((dbg_object(t_node).m_left)!=null){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<389>";
			t_node=dbg_object(t_node).m_left;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<391>";
		pop_err();
		return t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<393>";
	t_node=this;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<394>";
	var t_parent=dbg_object(this).m_parent;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<395>";
	while(((t_parent)!=null) && t_node==dbg_object(t_parent).m_right){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<396>";
		t_node=t_parent;
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<397>";
		t_parent=dbg_object(t_parent).m_parent;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<399>";
	pop_err();
	return t_parent;
}
c_Node5.prototype.p_Value=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<381>";
	pop_err();
	return this.m_value;
}
function bb_graphics2_KludgePath(t_path){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<197>";
	if(string_startswith(t_path,".") || string_startswith(t_path,"/")){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<197>";
		pop_err();
		return t_path;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<198>";
	var t_i=t_path.indexOf(":/",0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<199>";
	if(t_i!=-1 && t_path.indexOf("/",0)==t_i+1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<199>";
		pop_err();
		return t_path;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<200>";
	var t_="cerberus://data/"+t_path;
	pop_err();
	return t_;
}
function bb_gles20_LoadStaticTexImage(t_path,t_info){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/opengl/gles20.cxs<957>";
	var t_=BBLoadStaticTexImage(t_path,t_info);
	pop_err();
	return t_;
}
function c_Glyph2(){
	Object.call(this);
	this.m_page=0;
	this.m_id=0;
	this.m_x=0;
	this.m_y=0;
	this.m_width=0;
	this.m_height=0;
	this.m_advance=0;
	this.m_xoff=0;
	this.m_yoff=0;
}
c_Glyph2.m_new=function(t_page,t_id,t_x,t_y,t_width,t_height,t_advance){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1326>";
	dbg_object(this).m_page=t_page;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1327>";
	dbg_object(this).m_id=t_id;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1328>";
	dbg_object(this).m_x=t_x;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1329>";
	dbg_object(this).m_y=t_y;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1330>";
	dbg_object(this).m_width=t_width;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1331>";
	dbg_object(this).m_height=t_height;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1332>";
	dbg_object(this).m_advance=t_advance;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1333>";
	dbg_object(this).m_xoff=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1334>";
	dbg_object(this).m_yoff=0;
	pop_err();
	return this;
}
c_Glyph2.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1313>";
	pop_err();
	return this;
}
function c_Map6(){
	Object.call(this);
	this.m_root=null;
}
c_Map6.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<7>";
	pop_err();
	return this;
}
c_Map6.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map6.prototype.p_RotateLeft6=function(t_node){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<256>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<266>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<263>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<264>";
		this.m_root=t_child;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map6.prototype.p_RotateRight6=function(t_node){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<276>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<286>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<283>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<284>";
		this.m_root=t_child;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map6.prototype.p_InsertFixup6=function(t_node){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<246>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<229>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<225>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<223>";
					this.p_RotateLeft6(t_node);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<227>";
				this.p_RotateRight6(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<245>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<241>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<239>";
					this.p_RotateRight6(t_node);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<243>";
				this.p_RotateLeft6(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map6.prototype.p_Add2=function(t_key,t_value){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<61>";
	var t_node=this.m_root;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<62>";
	var t_parent=null;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<62>";
	var t_cmp=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<64>";
	while((t_node)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<65>";
		t_parent=t_node;
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<66>";
		t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<74>";
		if(t_cmp>0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<68>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<69>";
			if(t_cmp<0){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<70>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<72>";
				pop_err();
				return false;
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<76>";
	t_node=c_Node6.m_new.call(new c_Node6,t_key,t_value,-1,t_parent);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<88>";
	if((t_parent)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<84>";
		if(t_cmp>0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<80>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<82>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<84>";
		this.p_InsertFixup6(t_node);
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<86>";
		this.m_root=t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<88>";
	pop_err();
	return true;
}
c_Map6.prototype.p_FindNode=function(t_key){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<157>";
	var t_node=this.m_root;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<159>";
	while((t_node)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<160>";
		var t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<168>";
		if(t_cmp>0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<163>";
			if(t_cmp<0){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<169>";
	pop_err();
	return t_node;
}
c_Map6.prototype.p_Get=function(t_key){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<101>";
	var t_node=this.p_FindNode(t_key);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<102>";
	if((t_node)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<102>";
		pop_err();
		return dbg_object(t_node).m_value;
	}
	pop_err();
	return null;
}
function c_IntMap4(){
	c_Map6.call(this);
}
c_IntMap4.prototype=extend_class(c_Map6);
c_IntMap4.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<534>";
	c_Map6.m_new.call(this);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<534>";
	pop_err();
	return this;
}
c_IntMap4.prototype.p_Compare=function(t_lhs,t_rhs){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<537>";
	var t_=t_lhs-t_rhs;
	pop_err();
	return t_;
}
function c_Node6(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node6.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<364>";
	dbg_object(this).m_key=t_key;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<365>";
	dbg_object(this).m_value=t_value;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<366>";
	dbg_object(this).m_color=t_color;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node6.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<361>";
	pop_err();
	return this;
}
var bb_graphics2_defaultFont=null;
function bb_math3d_Mat4New(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<17>";
	var t_=[1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0];
	pop_err();
	return t_;
}
var bb_graphics2_flipYMatrix=[];
function bb_graphics2_InitMojo2(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<151>";
	if(bb_graphics2_inited){
		pop_err();
		return;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<152>";
	bb_graphics2_inited=true;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<154>";
	bb_graphics2_InitVbos();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<156>";
	_glGetIntegerv(36006,bb_graphics2_tmpi);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<157>";
	bb_graphics2_defaultFbo=dbg_array(bb_graphics2_tmpi,0)[dbg_index];
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<159>";
	bb_graphics2_mainShader=bb_app_LoadString("cerberus://data/mojo2_program.glsl");
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<161>";
	bb_graphics2_fastShader=c_Shader.m_new.call(new c_Shader,bb_app_LoadString("cerberus://data/mojo2_fastshader.glsl"));
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<162>";
	bb_graphics2_bumpShader=(c_BumpShader.m_new.call(new c_BumpShader,bb_app_LoadString("cerberus://data/mojo2_bumpshader.glsl")));
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<163>";
	bb_graphics2_matteShader=(c_MatteShader.m_new.call(new c_MatteShader,bb_app_LoadString("cerberus://data/mojo2_matteshader.glsl")));
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<164>";
	bb_graphics2_shadowShader=c_Shader.m_new.call(new c_Shader,bb_app_LoadString("cerberus://data/mojo2_shadowshader.glsl"));
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<165>";
	bb_graphics2_lightMapShader=c_Shader.m_new.call(new c_Shader,bb_app_LoadString("cerberus://data/mojo2_lightmapshader.glsl"));
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<166>";
	bb_graphics2_defaultShader=bb_graphics2_bumpShader;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<168>";
	bb_graphics2_defaultFont=c_Font2.m_Load("cerberus://data/mojo2_font.png",32,96,true);
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<169>";
	if(!((bb_graphics2_defaultFont)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<169>";
		error("Can't load default font");
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<171>";
	dbg_array(bb_graphics2_flipYMatrix,5)[dbg_index]=-1.0;
	pop_err();
}
function c_LightData(){
	Object.call(this);
	this.m_type=0;
	this.m_vector=[0.0,0.0,-10.0,1.0];
	this.m_tvector=new_number_array(4);
	this.m_color=[1.0,1.0,1.0,1.0];
	this.m_range=10.0;
}
c_LightData.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<104>";
	pop_err();
	return this;
}
function c_DrawOp(){
	Object.call(this);
	this.m_material=null;
	this.m_blend=0;
	this.m_order=0;
	this.m_count=0;
}
c_DrawOp.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/graphics.cxs<1582>";
	pop_err();
	return this;
}
var bb_graphics2_rs_program=null;
var bb_graphics2_rs_numLights=0;
var bb_graphics2_rs_material=null;
var bb_graphics2_rs_modelViewProjMatrix=[];
var bb_graphics2_rs_modelViewMatrix=[];
var bb_graphics2_rs_clipPosScale=[];
var bb_graphics2_rs_globalColor=[];
var bb_graphics2_rs_fogColor=[];
var bb_graphics2_rs_ambientLight=[];
var bb_graphics2_rs_lightColors=[];
var bb_graphics2_rs_lightVectors=[];
var bb_graphics2_rs_shadowTexture=null;
function c_Map7(){
	Object.call(this);
	this.m_root=null;
}
c_Map7.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<7>";
	pop_err();
	return this;
}
c_Map7.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map7.prototype.p_FindNode2=function(t_key){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<157>";
	var t_node=this.m_root;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<159>";
	while((t_node)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<160>";
		var t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<168>";
		if(t_cmp>0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<163>";
			if(t_cmp<0){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<169>";
	pop_err();
	return t_node;
}
c_Map7.prototype.p_Contains2=function(t_key){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<25>";
	var t_=this.p_FindNode2(t_key)!=null;
	pop_err();
	return t_;
}
c_Map7.prototype.p_Get2=function(t_key){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<101>";
	var t_node=this.p_FindNode2(t_key);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<102>";
	if((t_node)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<102>";
		pop_err();
		return dbg_object(t_node).m_value;
	}
	pop_err();
	return 0;
}
c_Map7.prototype.p_RotateLeft7=function(t_node){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<256>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<266>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<263>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<264>";
		this.m_root=t_child;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map7.prototype.p_RotateRight7=function(t_node){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<276>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<286>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<283>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<284>";
		this.m_root=t_child;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map7.prototype.p_InsertFixup7=function(t_node){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<246>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<229>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<225>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<223>";
					this.p_RotateLeft7(t_node);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<227>";
				this.p_RotateRight7(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<245>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<241>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<239>";
					this.p_RotateRight7(t_node);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<243>";
				this.p_RotateLeft7(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map7.prototype.p_Set5=function(t_key,t_value){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<29>";
	var t_node=this.m_root;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<30>";
	var t_parent=null;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<30>";
	var t_cmp=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<32>";
	while((t_node)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<33>";
		t_parent=t_node;
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<34>";
		t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<43>";
		if(t_cmp>0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<37>";
			if(t_cmp<0){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<45>";
	t_node=c_Node7.m_new.call(new c_Node7,t_key,t_value,-1,t_parent);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<57>";
	if((t_parent)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<53>";
		if(t_cmp>0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<53>";
		this.p_InsertFixup7(t_node);
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<55>";
		this.m_root=t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<57>";
	pop_err();
	return true;
}
function c_StringMap3(){
	c_Map7.call(this);
}
c_StringMap3.prototype=extend_class(c_Map7);
c_StringMap3.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<551>";
	c_Map7.m_new.call(this);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<551>";
	pop_err();
	return this;
}
c_StringMap3.prototype.p_Compare2=function(t_lhs,t_rhs){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<554>";
	var t_=string_compare(t_lhs,t_rhs);
	pop_err();
	return t_;
}
function c_Node7(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=0;
	this.m_color=0;
	this.m_parent=null;
}
c_Node7.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<364>";
	dbg_object(this).m_key=t_key;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<365>";
	dbg_object(this).m_value=t_value;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<366>";
	dbg_object(this).m_color=t_color;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node7.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<361>";
	pop_err();
	return this;
}
function c_Map8(){
	Object.call(this);
	this.m_root=null;
}
c_Map8.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<7>";
	pop_err();
	return this;
}
c_Map8.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map8.prototype.p_FindNode2=function(t_key){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<157>";
	var t_node=this.m_root;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<159>";
	while((t_node)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<160>";
		var t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<168>";
		if(t_cmp>0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<163>";
			if(t_cmp<0){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<169>";
	pop_err();
	return t_node;
}
c_Map8.prototype.p_Contains2=function(t_key){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<25>";
	var t_=this.p_FindNode2(t_key)!=null;
	pop_err();
	return t_;
}
c_Map8.prototype.p_Get2=function(t_key){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<101>";
	var t_node=this.p_FindNode2(t_key);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<102>";
	if((t_node)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<102>";
		pop_err();
		return dbg_object(t_node).m_value;
	}
	pop_err();
	return [];
}
c_Map8.prototype.p_RotateLeft8=function(t_node){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<256>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<266>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<263>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<264>";
		this.m_root=t_child;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map8.prototype.p_RotateRight8=function(t_node){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<276>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<286>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<283>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<284>";
		this.m_root=t_child;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map8.prototype.p_InsertFixup8=function(t_node){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<246>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<229>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<225>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<223>";
					this.p_RotateLeft8(t_node);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<227>";
				this.p_RotateRight8(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<245>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<241>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<239>";
					this.p_RotateRight8(t_node);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<243>";
				this.p_RotateLeft8(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map8.prototype.p_Set6=function(t_key,t_value){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<29>";
	var t_node=this.m_root;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<30>";
	var t_parent=null;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<30>";
	var t_cmp=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<32>";
	while((t_node)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<33>";
		t_parent=t_node;
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<34>";
		t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<43>";
		if(t_cmp>0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<37>";
			if(t_cmp<0){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<45>";
	t_node=c_Node8.m_new.call(new c_Node8,t_key,t_value,-1,t_parent);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<57>";
	if((t_parent)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<53>";
		if(t_cmp>0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<53>";
		this.p_InsertFixup8(t_node);
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<55>";
		this.m_root=t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<57>";
	pop_err();
	return true;
}
function c_StringMap4(){
	c_Map8.call(this);
}
c_StringMap4.prototype=extend_class(c_Map8);
c_StringMap4.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<551>";
	c_Map8.m_new.call(this);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<551>";
	pop_err();
	return this;
}
c_StringMap4.prototype.p_Compare2=function(t_lhs,t_rhs){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<554>";
	var t_=string_compare(t_lhs,t_rhs);
	pop_err();
	return t_;
}
function c_Node8(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=[];
	this.m_color=0;
	this.m_parent=null;
}
c_Node8.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<364>";
	dbg_object(this).m_key=t_key;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<365>";
	dbg_object(this).m_value=t_value;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<366>";
	dbg_object(this).m_color=t_color;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node8.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<361>";
	pop_err();
	return this;
}
var bb_graphics2_rs_blend=0;
function c_BlendMode(){
	Object.call(this);
}
function c_Stack3(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack3.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack3.m_new2=function(t_data){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack3.prototype.p_Data=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<41>";
	pop_err();
	return dbg_object(this).m_data;
}
c_Stack3.m_NIL=null;
c_Stack3.prototype.p_Length=function(t_newlength){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<52>";
	if(t_newlength<this.m_length){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<46>";
		for(var t_i=t_newlength;t_i<this.m_length;t_i=t_i+1){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<47>";
			dbg_array(this.m_data,t_i)[dbg_index]=c_Stack3.m_NIL;
		}
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<49>";
		if(t_newlength>this.m_data.length){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<50>";
			this.m_data=resize_object_array(this.m_data,bb_math_Max(this.m_length*2+10,t_newlength));
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<52>";
	this.m_length=t_newlength;
	pop_err();
}
c_Stack3.prototype.p_Length2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<56>";
	pop_err();
	return this.m_length;
}
c_Stack3.prototype.p_Push7=function(t_value){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<74>";
	if(this.m_length==this.m_data.length){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<72>";
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<74>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<75>";
	this.m_length+=1;
	pop_err();
}
c_Stack3.prototype.p_Push8=function(t_values,t_offset,t_count){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<83>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<84>";
		this.p_Push7(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack3.prototype.p_Push9=function(t_values,t_offset){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<79>";
	this.p_Push8(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
c_Stack3.prototype.p_Clear4=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<34>";
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<35>";
		dbg_array(this.m_data,t_i)[dbg_index]=c_Stack3.m_NIL;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<37>";
	this.m_length=0;
	pop_err();
}
c_Stack3.prototype.p_Pop=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<89>";
	this.m_length-=1;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<90>";
	var t_v=dbg_array(this.m_data,this.m_length)[dbg_index];
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<91>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=c_Stack3.m_NIL;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<92>";
	pop_err();
	return t_v;
}
function bb_math_Max(t_x,t_y){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/math.cxs<56>";
	if(t_x>t_y){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/math.cxs<56>";
		pop_err();
		return t_x;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/math.cxs<57>";
	pop_err();
	return t_y;
}
function bb_math_Max2(t_x,t_y){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/math.cxs<83>";
	if(t_x>t_y){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/math.cxs<83>";
		pop_err();
		return t_x;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/math.cxs<84>";
	pop_err();
	return t_y;
}
var bb_graphics2_freeOps=null;
var bb_graphics2_nullOp=null;
function c_ShadowCaster(){
	Object.call(this);
}
function c_Stack4(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack4.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack4.m_new2=function(t_data){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack4.m_NIL=null;
c_Stack4.prototype.p_Clear4=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<34>";
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<35>";
		dbg_array(this.m_data,t_i)[dbg_index]=c_Stack4.m_NIL;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<37>";
	this.m_length=0;
	pop_err();
}
function c_Stack5(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack5.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack5.m_new2=function(t_data){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack5.m_NIL=0;
c_Stack5.prototype.p_Clear4=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<34>";
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<35>";
		dbg_array(this.m_data,t_i)[dbg_index]=c_Stack5.m_NIL;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<37>";
	this.m_length=0;
	pop_err();
}
function c_FloatStack(){
	c_Stack5.call(this);
}
c_FloatStack.prototype=extend_class(c_Stack5);
c_FloatStack.m_new=function(t_data){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<338>";
	c_Stack5.m_new2.call(this,t_data);
	pop_err();
	return this;
}
c_FloatStack.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<335>";
	c_Stack5.m_new.call(this);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/stack.cxs<335>";
	pop_err();
	return this;
}
var bb_graphics2_rs_projMatrix=[];
function bb_math3d_Mat4Copy(t_m,t_r){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<39>";
	dbg_array(t_r,0)[dbg_index]=dbg_array(t_m,0)[dbg_index];
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<39>";
	dbg_array(t_r,1)[dbg_index]=dbg_array(t_m,1)[dbg_index];
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<39>";
	dbg_array(t_r,2)[dbg_index]=dbg_array(t_m,2)[dbg_index];
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<39>";
	dbg_array(t_r,3)[dbg_index]=dbg_array(t_m,3)[dbg_index];
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<40>";
	dbg_array(t_r,4)[dbg_index]=dbg_array(t_m,4)[dbg_index];
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<40>";
	dbg_array(t_r,5)[dbg_index]=dbg_array(t_m,5)[dbg_index];
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<40>";
	dbg_array(t_r,6)[dbg_index]=dbg_array(t_m,6)[dbg_index];
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<40>";
	dbg_array(t_r,7)[dbg_index]=dbg_array(t_m,7)[dbg_index];
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<41>";
	dbg_array(t_r,8)[dbg_index]=dbg_array(t_m,8)[dbg_index];
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<41>";
	dbg_array(t_r,9)[dbg_index]=dbg_array(t_m,9)[dbg_index];
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<41>";
	dbg_array(t_r,10)[dbg_index]=dbg_array(t_m,10)[dbg_index];
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<41>";
	dbg_array(t_r,11)[dbg_index]=dbg_array(t_m,11)[dbg_index];
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<42>";
	dbg_array(t_r,12)[dbg_index]=dbg_array(t_m,12)[dbg_index];
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<42>";
	dbg_array(t_r,13)[dbg_index]=dbg_array(t_m,13)[dbg_index];
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<42>";
	dbg_array(t_r,14)[dbg_index]=dbg_array(t_m,14)[dbg_index];
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<42>";
	dbg_array(t_r,15)[dbg_index]=dbg_array(t_m,15)[dbg_index];
	pop_err();
}
function bb_math3d_Mat4Init(t_ix,t_jy,t_kz,t_tw,t_r){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<21>";
	dbg_array(t_r,0)[dbg_index]=t_ix;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<21>";
	dbg_array(t_r,1)[dbg_index]=0.0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<21>";
	dbg_array(t_r,2)[dbg_index]=0.0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<21>";
	dbg_array(t_r,3)[dbg_index]=0.0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<22>";
	dbg_array(t_r,4)[dbg_index]=0.0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<22>";
	dbg_array(t_r,5)[dbg_index]=t_jy;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<22>";
	dbg_array(t_r,6)[dbg_index]=0.0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<22>";
	dbg_array(t_r,7)[dbg_index]=0.0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<23>";
	dbg_array(t_r,8)[dbg_index]=0.0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<23>";
	dbg_array(t_r,9)[dbg_index]=0.0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<23>";
	dbg_array(t_r,10)[dbg_index]=t_kz;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<23>";
	dbg_array(t_r,11)[dbg_index]=0.0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<24>";
	dbg_array(t_r,12)[dbg_index]=0.0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<24>";
	dbg_array(t_r,13)[dbg_index]=0.0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<24>";
	dbg_array(t_r,14)[dbg_index]=0.0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<24>";
	dbg_array(t_r,15)[dbg_index]=t_tw;
	pop_err();
}
function bb_math3d_Mat4Init2(t_ix,t_iy,t_iz,t_iw,t_jx,t_jy,t_jz,t_jw,t_kx,t_ky,t_kz,t_kw,t_tx,t_ty,t_tz,t_tw,t_r){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<28>";
	dbg_array(t_r,0)[dbg_index]=t_ix;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<28>";
	dbg_array(t_r,1)[dbg_index]=t_iy;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<28>";
	dbg_array(t_r,2)[dbg_index]=t_iz;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<28>";
	dbg_array(t_r,3)[dbg_index]=t_iw;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<29>";
	dbg_array(t_r,4)[dbg_index]=t_jx;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<29>";
	dbg_array(t_r,5)[dbg_index]=t_jy;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<29>";
	dbg_array(t_r,6)[dbg_index]=t_jz;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<29>";
	dbg_array(t_r,7)[dbg_index]=t_jw;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<30>";
	dbg_array(t_r,8)[dbg_index]=t_kx;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<30>";
	dbg_array(t_r,9)[dbg_index]=t_ky;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<30>";
	dbg_array(t_r,10)[dbg_index]=t_kz;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<30>";
	dbg_array(t_r,11)[dbg_index]=t_kw;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<31>";
	dbg_array(t_r,12)[dbg_index]=t_tx;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<31>";
	dbg_array(t_r,13)[dbg_index]=t_ty;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<31>";
	dbg_array(t_r,14)[dbg_index]=t_tz;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<31>";
	dbg_array(t_r,15)[dbg_index]=t_tw;
	pop_err();
}
function bb_math3d_Mat4Init3(t_r){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<35>";
	bb_math3d_Mat4Init(1.0,1.0,1.0,1.0,t_r);
	pop_err();
}
function bb_math3d_Mat4Multiply(t_m,t_n,t_r){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<87>";
	bb_math3d_Mat4Init2(dbg_array(t_m,0)[dbg_index]*dbg_array(t_n,0)[dbg_index]+dbg_array(t_m,4)[dbg_index]*dbg_array(t_n,1)[dbg_index]+dbg_array(t_m,8)[dbg_index]*dbg_array(t_n,2)[dbg_index]+dbg_array(t_m,12)[dbg_index]*dbg_array(t_n,3)[dbg_index],dbg_array(t_m,1)[dbg_index]*dbg_array(t_n,0)[dbg_index]+dbg_array(t_m,5)[dbg_index]*dbg_array(t_n,1)[dbg_index]+dbg_array(t_m,9)[dbg_index]*dbg_array(t_n,2)[dbg_index]+dbg_array(t_m,13)[dbg_index]*dbg_array(t_n,3)[dbg_index],dbg_array(t_m,2)[dbg_index]*dbg_array(t_n,0)[dbg_index]+dbg_array(t_m,6)[dbg_index]*dbg_array(t_n,1)[dbg_index]+dbg_array(t_m,10)[dbg_index]*dbg_array(t_n,2)[dbg_index]+dbg_array(t_m,14)[dbg_index]*dbg_array(t_n,3)[dbg_index],dbg_array(t_m,3)[dbg_index]*dbg_array(t_n,0)[dbg_index]+dbg_array(t_m,7)[dbg_index]*dbg_array(t_n,1)[dbg_index]+dbg_array(t_m,11)[dbg_index]*dbg_array(t_n,2)[dbg_index]+dbg_array(t_m,15)[dbg_index]*dbg_array(t_n,3)[dbg_index],dbg_array(t_m,0)[dbg_index]*dbg_array(t_n,4)[dbg_index]+dbg_array(t_m,4)[dbg_index]*dbg_array(t_n,5)[dbg_index]+dbg_array(t_m,8)[dbg_index]*dbg_array(t_n,6)[dbg_index]+dbg_array(t_m,12)[dbg_index]*dbg_array(t_n,7)[dbg_index],dbg_array(t_m,1)[dbg_index]*dbg_array(t_n,4)[dbg_index]+dbg_array(t_m,5)[dbg_index]*dbg_array(t_n,5)[dbg_index]+dbg_array(t_m,9)[dbg_index]*dbg_array(t_n,6)[dbg_index]+dbg_array(t_m,13)[dbg_index]*dbg_array(t_n,7)[dbg_index],dbg_array(t_m,2)[dbg_index]*dbg_array(t_n,4)[dbg_index]+dbg_array(t_m,6)[dbg_index]*dbg_array(t_n,5)[dbg_index]+dbg_array(t_m,10)[dbg_index]*dbg_array(t_n,6)[dbg_index]+dbg_array(t_m,14)[dbg_index]*dbg_array(t_n,7)[dbg_index],dbg_array(t_m,3)[dbg_index]*dbg_array(t_n,4)[dbg_index]+dbg_array(t_m,7)[dbg_index]*dbg_array(t_n,5)[dbg_index]+dbg_array(t_m,11)[dbg_index]*dbg_array(t_n,6)[dbg_index]+dbg_array(t_m,15)[dbg_index]*dbg_array(t_n,7)[dbg_index],dbg_array(t_m,0)[dbg_index]*dbg_array(t_n,8)[dbg_index]+dbg_array(t_m,4)[dbg_index]*dbg_array(t_n,9)[dbg_index]+dbg_array(t_m,8)[dbg_index]*dbg_array(t_n,10)[dbg_index]+dbg_array(t_m,12)[dbg_index]*dbg_array(t_n,11)[dbg_index],dbg_array(t_m,1)[dbg_index]*dbg_array(t_n,8)[dbg_index]+dbg_array(t_m,5)[dbg_index]*dbg_array(t_n,9)[dbg_index]+dbg_array(t_m,9)[dbg_index]*dbg_array(t_n,10)[dbg_index]+dbg_array(t_m,13)[dbg_index]*dbg_array(t_n,11)[dbg_index],dbg_array(t_m,2)[dbg_index]*dbg_array(t_n,8)[dbg_index]+dbg_array(t_m,6)[dbg_index]*dbg_array(t_n,9)[dbg_index]+dbg_array(t_m,10)[dbg_index]*dbg_array(t_n,10)[dbg_index]+dbg_array(t_m,14)[dbg_index]*dbg_array(t_n,11)[dbg_index],dbg_array(t_m,3)[dbg_index]*dbg_array(t_n,8)[dbg_index]+dbg_array(t_m,7)[dbg_index]*dbg_array(t_n,9)[dbg_index]+dbg_array(t_m,11)[dbg_index]*dbg_array(t_n,10)[dbg_index]+dbg_array(t_m,15)[dbg_index]*dbg_array(t_n,11)[dbg_index],dbg_array(t_m,0)[dbg_index]*dbg_array(t_n,12)[dbg_index]+dbg_array(t_m,4)[dbg_index]*dbg_array(t_n,13)[dbg_index]+dbg_array(t_m,8)[dbg_index]*dbg_array(t_n,14)[dbg_index]+dbg_array(t_m,12)[dbg_index]*dbg_array(t_n,15)[dbg_index],dbg_array(t_m,1)[dbg_index]*dbg_array(t_n,12)[dbg_index]+dbg_array(t_m,5)[dbg_index]*dbg_array(t_n,13)[dbg_index]+dbg_array(t_m,9)[dbg_index]*dbg_array(t_n,14)[dbg_index]+dbg_array(t_m,13)[dbg_index]*dbg_array(t_n,15)[dbg_index],dbg_array(t_m,2)[dbg_index]*dbg_array(t_n,12)[dbg_index]+dbg_array(t_m,6)[dbg_index]*dbg_array(t_n,13)[dbg_index]+dbg_array(t_m,10)[dbg_index]*dbg_array(t_n,14)[dbg_index]+dbg_array(t_m,14)[dbg_index]*dbg_array(t_n,15)[dbg_index],dbg_array(t_m,3)[dbg_index]*dbg_array(t_n,12)[dbg_index]+dbg_array(t_m,7)[dbg_index]*dbg_array(t_n,13)[dbg_index]+dbg_array(t_m,11)[dbg_index]*dbg_array(t_n,14)[dbg_index]+dbg_array(t_m,15)[dbg_index]*dbg_array(t_n,15)[dbg_index],t_r);
	pop_err();
}
function bb_math3d_Vec4Copy(t_v,t_r){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<9>";
	dbg_array(t_r,0)[dbg_index]=dbg_array(t_v,0)[dbg_index];
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<9>";
	dbg_array(t_r,1)[dbg_index]=dbg_array(t_v,1)[dbg_index];
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<9>";
	dbg_array(t_r,2)[dbg_index]=dbg_array(t_v,2)[dbg_index];
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<9>";
	dbg_array(t_r,3)[dbg_index]=dbg_array(t_v,3)[dbg_index];
	pop_err();
}
function bb_math3d_Vec4Copy2(t_v,t_r,t_src,t_dst){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<13>";
	dbg_array(t_r,0+t_dst)[dbg_index]=dbg_array(t_v,0+t_src)[dbg_index];
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<13>";
	dbg_array(t_r,1+t_dst)[dbg_index]=dbg_array(t_v,1+t_src)[dbg_index];
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<13>";
	dbg_array(t_r,2+t_dst)[dbg_index]=dbg_array(t_v,2+t_src)[dbg_index];
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<13>";
	dbg_array(t_r,3+t_dst)[dbg_index]=dbg_array(t_v,3+t_src)[dbg_index];
	pop_err();
}
function bb_math3d_Vec4Init(t_x,t_y,t_z,t_w,t_r){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<5>";
	dbg_array(t_r,0)[dbg_index]=t_x;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<5>";
	dbg_array(t_r,1)[dbg_index]=t_y;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<5>";
	dbg_array(t_r,2)[dbg_index]=t_z;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<5>";
	dbg_array(t_r,3)[dbg_index]=t_w;
	pop_err();
}
function bb_math3d_Mat4Transform(t_m,t_v,t_r){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<95>";
	bb_math3d_Vec4Init(dbg_array(t_m,0)[dbg_index]*dbg_array(t_v,0)[dbg_index]+dbg_array(t_m,4)[dbg_index]*dbg_array(t_v,1)[dbg_index]+dbg_array(t_m,8)[dbg_index]*dbg_array(t_v,2)[dbg_index]+dbg_array(t_m,12)[dbg_index]*dbg_array(t_v,3)[dbg_index],dbg_array(t_m,1)[dbg_index]*dbg_array(t_v,0)[dbg_index]+dbg_array(t_m,5)[dbg_index]*dbg_array(t_v,1)[dbg_index]+dbg_array(t_m,9)[dbg_index]*dbg_array(t_v,2)[dbg_index]+dbg_array(t_m,13)[dbg_index]*dbg_array(t_v,3)[dbg_index],dbg_array(t_m,2)[dbg_index]*dbg_array(t_v,0)[dbg_index]+dbg_array(t_m,6)[dbg_index]*dbg_array(t_v,1)[dbg_index]+dbg_array(t_m,10)[dbg_index]*dbg_array(t_v,2)[dbg_index]+dbg_array(t_m,14)[dbg_index]*dbg_array(t_v,3)[dbg_index],dbg_array(t_m,3)[dbg_index]*dbg_array(t_v,0)[dbg_index]+dbg_array(t_m,7)[dbg_index]*dbg_array(t_v,1)[dbg_index]+dbg_array(t_m,11)[dbg_index]*dbg_array(t_v,2)[dbg_index]+dbg_array(t_m,15)[dbg_index]*dbg_array(t_v,3)[dbg_index],t_r);
	pop_err();
}
function bb_math3d_Mat4Ortho(t_left,t_right,t_bottom,t_top,t_znear,t_zfar,t_r){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<46>";
	var t_w=t_right-t_left;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<46>";
	var t_h=t_top-t_bottom;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<46>";
	var t_d=t_zfar-t_znear;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo2/math3d.cxs<47>";
	bb_math3d_Mat4Init2(2.0/t_w,0.0,0.0,0.0,0.0,2.0/t_h,0.0,0.0,0.0,0.0,2.0/t_d,0.0,-(t_right+t_left)/t_w,-(t_top+t_bottom)/t_h,-(t_zfar+t_znear)/t_d,1.0,t_r);
	pop_err();
}
var bb_app__updateRate=0;
function bb_app_SetUpdateRate(t_hertz){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<237>";
	bb_app__updateRate=t_hertz;
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/app.cxs<238>";
	bb_app__game.SetUpdateRate(t_hertz);
	pop_err();
}
function c_Paddle(){
	Object.call(this);
	this.m_xPos=0;
	this.m_yPos=0;
	this.m_height=0;
	this.m_width=0;
	this.m_color=[];
	this.m_speed=0;
	this.m_keyUp=0;
	this.m_keyDown=0;
	this.m_name="";
}
c_Paddle.m_new=function(t_x,t_y,t_h,t_w,t_c,t_s,t_up,t_down,t_n){
	push_err();
	err_info="C:/Users/diego/Downloads/Pong X/classes/paddle.cxs<15>";
	this.m_xPos=t_x;
	err_info="C:/Users/diego/Downloads/Pong X/classes/paddle.cxs<16>";
	this.m_yPos=t_y;
	err_info="C:/Users/diego/Downloads/Pong X/classes/paddle.cxs<17>";
	this.m_height=t_h;
	err_info="C:/Users/diego/Downloads/Pong X/classes/paddle.cxs<18>";
	this.m_width=t_w;
	err_info="C:/Users/diego/Downloads/Pong X/classes/paddle.cxs<19>";
	this.m_color=t_c;
	err_info="C:/Users/diego/Downloads/Pong X/classes/paddle.cxs<20>";
	this.m_speed=t_s;
	err_info="C:/Users/diego/Downloads/Pong X/classes/paddle.cxs<21>";
	this.m_keyUp=t_up;
	err_info="C:/Users/diego/Downloads/Pong X/classes/paddle.cxs<22>";
	this.m_keyDown=t_down;
	err_info="C:/Users/diego/Downloads/Pong X/classes/paddle.cxs<23>";
	this.m_name=t_n;
	pop_err();
	return this;
}
c_Paddle.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/Pong X/classes/paddle.cxs<3>";
	pop_err();
	return this;
}
c_Paddle.prototype.p_Move=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/Pong X/classes/paddle.cxs<32>";
	if((bb_input_KeyDown(this.m_keyUp))!=0){
		err_info="C:/Users/diego/Downloads/Pong X/classes/paddle.cxs<31>";
		if(this.m_yPos-this.m_speed>=0){
			err_info="C:/Users/diego/Downloads/Pong X/classes/paddle.cxs<30>";
			this.m_yPos=this.m_yPos-this.m_speed;
		}
	}
	err_info="C:/Users/diego/Downloads/Pong X/classes/paddle.cxs<39>";
	if((bb_input_KeyDown(this.m_keyDown))!=0){
		err_info="C:/Users/diego/Downloads/Pong X/classes/paddle.cxs<38>";
		if(this.m_yPos+this.m_height+this.m_speed<=bb_app_DeviceHeight()){
			err_info="C:/Users/diego/Downloads/Pong X/classes/paddle.cxs<37>";
			this.m_yPos=this.m_yPos+this.m_speed;
		}
	}
	pop_err();
	return 0;
}
function c_Ball(){
	Object.call(this);
	this.m_xPos=0;
	this.m_yPos=0;
	this.m_size=0;
	this.m_color=[];
	this.m_speedX=.0;
	this.m_speedY=.0;
	this.m_minSpeed=.0;
	this.m_maxSpeed=.0;
}
c_Ball.m_new=function(t_x,t_y,t_sz,t_c,t_s,t_min,t_max){
	push_err();
	err_info="C:/Users/diego/Downloads/Pong X/classes/ball.cxs<14>";
	this.m_xPos=t_x;
	err_info="C:/Users/diego/Downloads/Pong X/classes/ball.cxs<15>";
	this.m_yPos=t_y;
	err_info="C:/Users/diego/Downloads/Pong X/classes/ball.cxs<16>";
	this.m_size=t_sz;
	err_info="C:/Users/diego/Downloads/Pong X/classes/ball.cxs<17>";
	this.m_color=t_c;
	err_info="C:/Users/diego/Downloads/Pong X/classes/ball.cxs<18>";
	this.m_speedX=t_s;
	err_info="C:/Users/diego/Downloads/Pong X/classes/ball.cxs<19>";
	this.m_speedY=t_s;
	err_info="C:/Users/diego/Downloads/Pong X/classes/ball.cxs<20>";
	this.m_minSpeed=t_min;
	err_info="C:/Users/diego/Downloads/Pong X/classes/ball.cxs<21>";
	this.m_maxSpeed=t_max;
	pop_err();
	return this;
}
c_Ball.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/Pong X/classes/ball.cxs<3>";
	pop_err();
	return this;
}
c_Ball.prototype.p_Move=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/Pong X/classes/ball.cxs<25>";
	this.m_xPos=(((this.m_xPos)+this.m_speedX)|0);
	err_info="C:/Users/diego/Downloads/Pong X/classes/ball.cxs<26>";
	this.m_yPos=(((this.m_yPos)+this.m_speedY)|0);
	err_info="C:/Users/diego/Downloads/Pong X/classes/ball.cxs<31>";
	if(this.m_yPos<0 || this.m_yPos+this.m_size>bb_app_DeviceHeight()){
		err_info="C:/Users/diego/Downloads/Pong X/classes/ball.cxs<30>";
		this.m_speedY=-this.m_speedY;
	}
	err_info="C:/Users/diego/Downloads/Pong X/classes/ball.cxs<43>";
	if(this.m_xPos<0 || this.m_xPos+this.m_size>bb_app_DeviceWidth()){
		err_info="C:/Users/diego/Downloads/Pong X/classes/ball.cxs<35>";
		this.m_speedX=-this.m_speedX;
		err_info="C:/Users/diego/Downloads/Pong X/classes/ball.cxs<39>";
		if(bb_math_Abs2(this.m_speedX)>this.m_minSpeed){
			err_info="C:/Users/diego/Downloads/Pong X/classes/ball.cxs<38>";
			this.m_speedX*=0.9;
		}
		err_info="C:/Users/diego/Downloads/Pong X/classes/ball.cxs<42>";
		if(bb_math_Abs2(this.m_speedY)>this.m_minSpeed){
			err_info="C:/Users/diego/Downloads/Pong X/classes/ball.cxs<41>";
			this.m_speedY*=0.9;
		}
	}
	pop_err();
	return 0;
}
c_Ball.prototype.p_CollidesWith=function(t_paddle){
	push_err();
	err_info="C:/Users/diego/Downloads/Pong X/classes/ball.cxs<69>";
	if(this.m_xPos<dbg_object(t_paddle).m_xPos+dbg_object(t_paddle).m_width && this.m_xPos+this.m_size>dbg_object(t_paddle).m_xPos && this.m_yPos<dbg_object(t_paddle).m_yPos+dbg_object(t_paddle).m_height && this.m_yPos+this.m_size>dbg_object(t_paddle).m_yPos){
		err_info="C:/Users/diego/Downloads/Pong X/classes/ball.cxs<53>";
		if(this.m_speedX>0.0){
			err_info="C:/Users/diego/Downloads/Pong X/classes/ball.cxs<50>";
			this.m_xPos=dbg_object(t_paddle).m_xPos-this.m_size;
		}else{
			err_info="C:/Users/diego/Downloads/Pong X/classes/ball.cxs<52>";
			this.m_xPos=dbg_object(t_paddle).m_xPos+dbg_object(t_paddle).m_width;
		}
		err_info="C:/Users/diego/Downloads/Pong X/classes/ball.cxs<55>";
		this.m_speedX=-this.m_speedX*1.1;
		err_info="C:/Users/diego/Downloads/Pong X/classes/ball.cxs<60>";
		if(bb_math_Abs2(this.m_speedX)>this.m_maxSpeed){
			err_info="C:/Users/diego/Downloads/Pong X/classes/ball.cxs<59>";
			this.m_speedX=this.m_maxSpeed*bb_math_Sgn2(this.m_speedX);
		}
		err_info="C:/Users/diego/Downloads/Pong X/classes/ball.cxs<63>";
		this.m_speedY=-this.m_speedY*1.1;
		err_info="C:/Users/diego/Downloads/Pong X/classes/ball.cxs<68>";
		if(bb_math_Abs2(this.m_speedY)>this.m_maxSpeed){
			err_info="C:/Users/diego/Downloads/Pong X/classes/ball.cxs<67>";
			this.m_speedY=this.m_maxSpeed*bb_math_Sgn2(this.m_speedY);
		}
	}
	pop_err();
	return 0;
}
function c_Scoreboard(){
	Object.call(this);
	this.m_scores=null;
}
c_Scoreboard.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/Pong X/classes/scoreboard.cxs<8>";
	this.m_scores=c_StringMap5.m_new.call(new c_StringMap5);
	pop_err();
	return this;
}
c_Scoreboard.prototype.p_AddPaddle=function(t_paddle){
	push_err();
	err_info="C:/Users/diego/Downloads/Pong X/classes/scoreboard.cxs<12>";
	this.m_scores.p_Add3(dbg_object(t_paddle).m_name,0);
	pop_err();
	return 0;
}
c_Scoreboard.prototype.p_IncreaseScore=function(t_player){
	push_err();
	err_info="C:/Users/diego/Downloads/Pong X/classes/scoreboard.cxs<16>";
	this.m_scores.p_Set7(dbg_object(t_player).m_name,this.m_scores.p_Get2(dbg_object(t_player).m_name)+1);
	pop_err();
	return 0;
}
c_Scoreboard.prototype.p_GetScore=function(t_player){
	push_err();
	err_info="C:/Users/diego/Downloads/Pong X/classes/scoreboard.cxs<20>";
	var t_=this.m_scores.p_Get2(dbg_object(t_player).m_name);
	pop_err();
	return t_;
}
function c_Map9(){
	Object.call(this);
	this.m_root=null;
}
c_Map9.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<7>";
	pop_err();
	return this;
}
c_Map9.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map9.prototype.p_RotateLeft9=function(t_node){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<256>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<266>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<263>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<264>";
		this.m_root=t_child;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map9.prototype.p_RotateRight9=function(t_node){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<276>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<286>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<283>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<284>";
		this.m_root=t_child;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map9.prototype.p_InsertFixup9=function(t_node){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<246>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<229>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<225>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<223>";
					this.p_RotateLeft9(t_node);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<227>";
				this.p_RotateRight9(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<245>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<241>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<239>";
					this.p_RotateRight9(t_node);
				}
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<243>";
				this.p_RotateLeft9(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map9.prototype.p_Add3=function(t_key,t_value){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<61>";
	var t_node=this.m_root;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<62>";
	var t_parent=null;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<62>";
	var t_cmp=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<64>";
	while((t_node)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<65>";
		t_parent=t_node;
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<66>";
		t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<74>";
		if(t_cmp>0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<68>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<69>";
			if(t_cmp<0){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<70>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<72>";
				pop_err();
				return false;
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<76>";
	t_node=c_Node9.m_new.call(new c_Node9,t_key,t_value,-1,t_parent);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<88>";
	if((t_parent)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<84>";
		if(t_cmp>0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<80>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<82>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<84>";
		this.p_InsertFixup9(t_node);
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<86>";
		this.m_root=t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<88>";
	pop_err();
	return true;
}
c_Map9.prototype.p_FindNode2=function(t_key){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<157>";
	var t_node=this.m_root;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<159>";
	while((t_node)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<160>";
		var t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<168>";
		if(t_cmp>0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<163>";
			if(t_cmp<0){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<169>";
	pop_err();
	return t_node;
}
c_Map9.prototype.p_Get2=function(t_key){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<101>";
	var t_node=this.p_FindNode2(t_key);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<102>";
	if((t_node)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<102>";
		pop_err();
		return dbg_object(t_node).m_value;
	}
	pop_err();
	return 0;
}
c_Map9.prototype.p_Set7=function(t_key,t_value){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<29>";
	var t_node=this.m_root;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<30>";
	var t_parent=null;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<30>";
	var t_cmp=0;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<32>";
	while((t_node)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<33>";
		t_parent=t_node;
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<34>";
		t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<43>";
		if(t_cmp>0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<37>";
			if(t_cmp<0){
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<45>";
	t_node=c_Node9.m_new.call(new c_Node9,t_key,t_value,-1,t_parent);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<57>";
	if((t_parent)!=null){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<53>";
		if(t_cmp>0){
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<53>";
		this.p_InsertFixup9(t_node);
	}else{
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<55>";
		this.m_root=t_node;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<57>";
	pop_err();
	return true;
}
function c_StringMap5(){
	c_Map9.call(this);
}
c_StringMap5.prototype=extend_class(c_Map9);
c_StringMap5.m_new=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<551>";
	c_Map9.m_new.call(this);
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<551>";
	pop_err();
	return this;
}
c_StringMap5.prototype.p_Compare2=function(t_lhs,t_rhs){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<554>";
	var t_=string_compare(t_lhs,t_rhs);
	pop_err();
	return t_;
}
function c_Node9(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=0;
	this.m_color=0;
	this.m_parent=null;
}
c_Node9.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<364>";
	dbg_object(this).m_key=t_key;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<365>";
	dbg_object(this).m_value=t_value;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<366>";
	dbg_object(this).m_color=t_color;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node9.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<361>";
	pop_err();
	return this;
}
function c_AI(){
	Object.call(this);
	this.m_paddle=null;
}
c_AI.m_new=function(t_p){
	push_err();
	err_info="C:/Users/diego/Downloads/Pong X/classes/ai.cxs<8>";
	this.m_paddle=t_p;
	pop_err();
	return this;
}
c_AI.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/Pong X/classes/ai.cxs<4>";
	pop_err();
	return this;
}
c_AI.prototype.p_Follow=function(t_ball){
	push_err();
	err_info="C:/Users/diego/Downloads/Pong X/classes/ai.cxs<13>";
	var t_timeToIntercept=(dbg_object(this.m_paddle).m_xPos-dbg_object(t_ball).m_xPos)/dbg_object(t_ball).m_speedX;
	err_info="C:/Users/diego/Downloads/Pong X/classes/ai.cxs<16>";
	var t_predictedY=dbg_object(t_ball).m_yPos+((dbg_object(t_ball).m_speedY*t_timeToIntercept)|0);
	err_info="C:/Users/diego/Downloads/Pong X/classes/ai.cxs<19>";
	t_predictedY=bb_math_Max(bb_math_Min(t_predictedY,bb_app_DeviceHeight()-dbg_object(t_ball).m_size),0);
	err_info="C:/Users/diego/Downloads/Pong X/classes/ai.cxs<22>";
	var t_marginOfError=((dbg_object(this.m_paddle).m_height/4)|0);
	err_info="C:/Users/diego/Downloads/Pong X/classes/ai.cxs<31>";
	if(bb_math_Abs(dbg_object(this.m_paddle).m_yPos+((dbg_object(this.m_paddle).m_height/2)|0)-t_predictedY)>t_marginOfError){
		err_info="C:/Users/diego/Downloads/Pong X/classes/ai.cxs<30>";
		if(dbg_object(this.m_paddle).m_yPos+((dbg_object(this.m_paddle).m_height/2)|0)<t_predictedY){
			err_info="C:/Users/diego/Downloads/Pong X/classes/ai.cxs<27>";
			dbg_object(this.m_paddle).m_yPos=bb_math_Min(dbg_object(this.m_paddle).m_yPos+dbg_object(this.m_paddle).m_speed,bb_app_DeviceHeight()-dbg_object(this.m_paddle).m_height);
		}else{
			err_info="C:/Users/diego/Downloads/Pong X/classes/ai.cxs<28>";
			if(dbg_object(this.m_paddle).m_yPos+((dbg_object(this.m_paddle).m_height/2)|0)>t_predictedY){
				err_info="C:/Users/diego/Downloads/Pong X/classes/ai.cxs<29>";
				dbg_object(this.m_paddle).m_yPos=bb_math_Max(dbg_object(this.m_paddle).m_yPos-dbg_object(this.m_paddle).m_speed,0);
			}
		}
	}
	pop_err();
	return 0;
}
function bb_input_KeyDown(t_key){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/mojo/input.cxs<40>";
	var t_=((bb_input_device.p_KeyDown(t_key))?1:0);
	pop_err();
	return t_;
}
function bb_math_Min(t_x,t_y){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/math.cxs<51>";
	if(t_x<t_y){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/math.cxs<51>";
		pop_err();
		return t_x;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/math.cxs<52>";
	pop_err();
	return t_y;
}
function bb_math_Min2(t_x,t_y){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/math.cxs<78>";
	if(t_x<t_y){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/math.cxs<78>";
		pop_err();
		return t_x;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/math.cxs<79>";
	pop_err();
	return t_y;
}
function bb_math_Abs(t_x){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/math.cxs<46>";
	if(t_x>=0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/math.cxs<46>";
		pop_err();
		return t_x;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/math.cxs<47>";
	var t_=-t_x;
	pop_err();
	return t_;
}
function bb_math_Abs2(t_x){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/math.cxs<73>";
	if(t_x>=0.0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/math.cxs<73>";
		pop_err();
		return t_x;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/math.cxs<74>";
	var t_=-t_x;
	pop_err();
	return t_;
}
function bb_math_Sgn(t_x){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/math.cxs<41>";
	if(t_x<0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/math.cxs<41>";
		pop_err();
		return -1;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/math.cxs<42>";
	var t_=((t_x>0)?1:0);
	pop_err();
	return t_;
}
function bb_math_Sgn2(t_x){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/math.cxs<67>";
	if(t_x<0.0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/math.cxs<67>";
		pop_err();
		return -1.0;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/math.cxs<68>";
	if(t_x>0.0){
		err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/math.cxs<68>";
		pop_err();
		return 1.0;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/math.cxs<69>";
	pop_err();
	return 0.0;
}
function bb_filepath_ExtractExt(t_path){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/brl/filepath.cxs<22>";
	var t_i=t_path.lastIndexOf(".");
	err_info="C:/Users/diego/Downloads/cerberus/modules/brl/filepath.cxs<23>";
	if(t_i!=-1 && t_path.indexOf("/",t_i+1)==-1 && t_path.indexOf("\\",t_i+1)==-1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/brl/filepath.cxs<23>";
		var t_=t_path.slice(t_i+1);
		pop_err();
		return t_;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/brl/filepath.cxs<24>";
	pop_err();
	return "";
}
function bb_filepath_StripExt(t_path){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/brl/filepath.cxs<16>";
	var t_i=t_path.lastIndexOf(".");
	err_info="C:/Users/diego/Downloads/cerberus/modules/brl/filepath.cxs<17>";
	if(t_i!=-1 && t_path.indexOf("/",t_i+1)==-1 && t_path.indexOf("\\",t_i+1)==-1){
		err_info="C:/Users/diego/Downloads/cerberus/modules/brl/filepath.cxs<17>";
		var t_=t_path.slice(0,t_i);
		pop_err();
		return t_;
	}
	err_info="C:/Users/diego/Downloads/cerberus/modules/brl/filepath.cxs<18>";
	pop_err();
	return t_path;
}
function c_NodeEnumerator(){
	Object.call(this);
	this.m_node=null;
}
c_NodeEnumerator.m_new=function(t_node){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<437>";
	dbg_object(this).m_node=t_node;
	pop_err();
	return this;
}
c_NodeEnumerator.m_new2=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<434>";
	pop_err();
	return this;
}
c_NodeEnumerator.prototype.p_HasNext=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<441>";
	var t_=this.m_node!=null;
	pop_err();
	return t_;
}
c_NodeEnumerator.prototype.p_NextObject=function(){
	push_err();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<445>";
	var t_t=this.m_node;
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<446>";
	this.m_node=this.m_node.p_NextNode();
	err_info="C:/Users/diego/Downloads/cerberus/modules/cerberus/map.cxs<447>";
	pop_err();
	return t_t;
}
function bbInit(){
	bb_app__app=null;
	bb_app__delegate=null;
	bb_app__game=BBGame.Game();
	bb_graphics_device=null;
	bb_graphics_context=c_GraphicsContext.m_new.call(new c_GraphicsContext);
	c_Image.m_DefaultFlags=0;
	bb_audio_device=null;
	bb_input_device=null;
	bb_app__devWidth=0;
	bb_app__devHeight=0;
	bb_app__devWinWidth=0;
	bb_app__devWinHeight=0;
	bb_app__displayModes=[];
	bb_app__desktopMode=null;
	bb_graphics_renderDevice=null;
	bb_random_Seed=1234;
	bb_graphics2_inited=false;
	bb_graphics2_vbosSeq=0;
	bb_graphics2_rs_vbo=0;
	bb_graphics2_rs_ibo=0;
	bb_graphics2_tmpi=new_number_array(16);
	bb_graphics2_defaultFbo=0;
	bb_graphics2_mainShader="";
	bb_glutil_tmpi=new_number_array(16);
	bb_graphics2_fastShader=null;
	bb_graphics2_bumpShader=null;
	bb_graphics2_matteShader=null;
	bb_graphics2_shadowShader=null;
	bb_graphics2_lightMapShader=null;
	bb_graphics2_defaultShader=null;
	c_Image2.m__flagsMask=15631;
	c_Texture.m__white=null;
	c_Texture.m__colors=c_IntMap3.m_new.call(new c_IntMap3);
	bb_graphics2_defaultFont=null;
	bb_graphics2_flipYMatrix=bb_math3d_Mat4New();
	c_Canvas.m__active=null;
	bb_graphics2_rs_program=null;
	bb_graphics2_rs_numLights=0;
	bb_graphics2_rs_material=null;
	bb_graphics2_rs_modelViewProjMatrix=bb_math3d_Mat4New();
	bb_graphics2_rs_modelViewMatrix=bb_math3d_Mat4New();
	bb_graphics2_rs_clipPosScale=[1.0,1.0,1.0,1.0];
	bb_graphics2_rs_globalColor=[1.0,1.0,1.0,1.0];
	bb_graphics2_rs_fogColor=[0.0,0.0,0.0,0.0];
	bb_graphics2_rs_ambientLight=[0.0,0.0,0.0,1.0];
	bb_graphics2_rs_lightColors=new_number_array(16);
	bb_graphics2_rs_lightVectors=new_number_array(16);
	bb_graphics2_rs_shadowTexture=null;
	bb_graphics2_rs_blend=-1;
	c_Stack3.m_NIL=null;
	bb_graphics2_freeOps=c_Stack3.m_new.call(new c_Stack3);
	bb_graphics2_nullOp=c_DrawOp.m_new.call(new c_DrawOp);
	c_Stack4.m_NIL=null;
	c_Stack5.m_NIL=0;
	bb_graphics2_rs_projMatrix=bb_math3d_Mat4New();
	bb_app__updateRate=0;
	c_Texture.m__black=null;
	c_Texture.m__flat=null;
}
//${TRANSCODE_END}
