<!---*-Mode:javascript;-*--->

// Complex number and operations

let comp = function(real, imag){
    this.real = real;
    this.imag = imag;
};
comp.prototype = {
    add: function(real, imag) {
	if (real instanceof comp){
	    this.real += real.real; this.imag += real.imag;
	}else{
	    this.real += real; this.imag += imag;
	}
    },
    sub: function(real, imag) {
	if (real instanceof comp){
	    this.real -= real.real; this.imag -= real.imag;
	}else{
	    this.real -= real; this.imag -= imag;
	}
    },
    mul: function(real, imag) {
	let mreal, mimag;
	if (real instanceof comp){
	    mreal = real.real; mimag = real.imag;
	}else{
	    mreal = real; mimag = imag;
	}
	let treal = this.real; let timag = this.imag;
	this.real = (treal * mreal - timag * mimag);
	this.imag = (mreal * timag + mimag * treal);},
    div: function(real, imag){
	let mreal, mimag;
	if (real instanceof comp){
	    mreal = real.real; mimag = real.imag;
	}else{
	    mreal = real; mimag = imag;
	}
	let common_divisor = mreal * mreal + mimag * mimag;
	let treal = this.real; let timag = this.imag;
	this.real = (mreal * treal + mimag * timag) / common_divisor;
	this.imag = (mreal * timag - mimag * treal) / common_divisor;
    },
    sqrt: function(){
	let treal = this.real; let timag = this.imag;
	let r = Math.sqrt(treal*treal+timag*timag);
	this.real = Math.sqrt((r+treal)/2);
	this.imag = Math.sign(timag) * Math.sqrt((r-treal)/2);},
    abs: function(){
	return Math.sqrt(this.real * this.real + this.imag * this.imag)},
    sin: function(){
	let treal = this.real; let timag = this.imag;
	this.real = Math.cosh(-timag) * Math.sin(treal);
	this.imag = -Math.sinh(-timag) * Math.cos(treal);},
    cos: function(){
	let treal = this.real; let timag = this.imag;
	this.real = Math.cosh(-timag) * Math.cos(treal);
	this.imag = Math.sinh(-timag) * Math.sin(treal);},
    exp: function(){
	let treal = this.real; let timag = this.imag;
	let ee = Math.exp(treal);
	this.real = ee * Math.cos(timag);
	this.imag = ee * Math.sin(timag);},
    log: function(){
	let treal = this.real; let timag = this.imag;
	let r = Math.sqrt(treal*treal+timag*timag);
	let theta = Math.atan2(timag,treal);
	this.real = Math.log(r);
	this.imag = theta;},
    pow: function(real, imag){
	if (real instanceof comp){
	    this.log();
	    this.mul(y);
	}else{
	    this.log();
	    this.mul(real, imag);
	}
	return this.exp();},
    print: function(){
	if (this.imag >= 0)
	    write("{"+this.real+"+"+this.imag+"i)");
	else
	    write("{"+this.real+"-"+this.imag+"i)");
    },
    println: function(){
	if (this.imag >= 0)
	    writeln("{"+this.real+"+"+this.imag+"i)");
	else
	    writeln("{"+this.real+"-"+this.imag+"i)");
    }
}

