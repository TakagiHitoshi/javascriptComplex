<!---*-Mode:javascript;-*--->

// Complex number and operations (Version 2)

let comp = function(real=0, imag=0){
    if (real instanceof comp){
	this.real = real.real;
	this.imag = real.imag;
    } else{
	this.real = real;
	this.imag = imag;
    }
    this.stackreal = [];
    this.stackimag = [];
    return this;
};
comp.prototype = {
    add: function (real, imag=0){
	if (real === undefined){
	    real = this.stackreal.pop();
	    imag = this.stackimag.pop();
	}
	if (real instanceof comp){
	    this.real = this.real + real.real;
	    this.imag = this.imag + real.imag;
	}else{
	    this.real = this.real + real;
	    this.imag = this.imag + imag;
	}
	return this;
    },
    sub: function (real, imag=0){
	if (real === undefined){
	    real = this.stackreal.pop();
	    imag = this.stackimag.pop();
	}
	if (real instanceof comp){
	    this.real = this.real - real.real;
	    this.imag = this.imag - real.imag;
	}else{
	    this.real = this.real - real;
	    this.imag = this.imag - imag;
	}
	return this;
    },
    mul:function(real, imag=0) {
	if (real === undefined){
	    real = this.stackreal.pop();
	    imag = this.stackimag.pop();
	}
	if (real instanceof comp){
	    const re = this.real * real.real - this.imag * real.imag;
	    const im = this.real * real.imag + this.imag * real.real;
	    this.real = re;
	    this.imag = im;
	}else{
	    const re = this.real * real - this.imag * imag;
	    const im = this.real * imag + this.imag * real;
	    this.real = re; this.imag = im;
	}
	return this;
    },
    div: function(real, imag=0){
	let re, im
	if (real === undefined){
	    re = this.stackreal.pop();
	    im = this.stackimag.pop();
	}else if (real instanceof comp){
	    re = real.real; im = real.imag;
	}else{
	    re = real; im = imag;
	}
	const ret = _compDiv(re, im, this.real, this.imag)
	this.real = ret[0]; this.imag = ret[1];
	return this;
    },
    sqrt: function(){
	let r = Math.sqrt(this.real * this.real + this.imag * this.imag);
	const re = Math.sqrt((r + this.real) / 2);
	const im = Math.sign(this.imag) * Math.sqrt((r - this.real) / 2);
	this.real = re; this.imag = im;
	return this;
    },
    conj: function(){
	this.imag = -this.imag;
	return this;
    },
    neg: function(){
	this.real = -this.real;
	this.imag = -this.imag;
	return this;
    },
    abs: function(){
	let real = this.real;
	let imag = this.imag;
	return Math.sqrt(real * real + imag * imag)},
    sin: function(){
	const re = Math.cosh(-this.imag) * Math.sin(this.real);
	const im = -Math.sinh(-this.imag) * Math.cos(this.real);
	this.real = re; this.imag = im;
	return this;
    },
    cos: function(){
	const re = Math.cosh(-this.imag) * Math.cos(this.real);
	const im = Math.sinh(-this.imag) * Math.sin(this.real);
	this.real = re; this.imag = im;
	return this;
    },
    exp: function(){
	const ee = Math.exp(this.real);
	this.real = ee * Math.cos(this.imag)
	this.imag = ee * Math.sin(this.imag);
	return this;
    },
    log: function(){
	const r = Math.sqrt(this.real * this.real + this.imag * this.imag);
	const theta = Math.atan2(this.imag, this.real);
	this.real = Math.log(r)
	this.imag = theta;
	return this;
    },
    pow: function(real, imag=0){
	let re, im
	if (real === undefined){
	    re = this.stackreal.pop();
	    im = this.stackimag.pop();
	}else if (real instanceof comp){
	    re = real.real; im = real.imag;
	}else{
	    re = real; im = imag;
	}
	const ret = _compPow(this.real, this.imag, re, im);
	this.real = ret[0];
	this.imag = ret[1];
	return this;
    },
    push: function(real, imag=0){
	if (real instanceof comp){
	    this.stackreal.push(real.real);
	    this.stackimag.push(real.imag);
	}else if (real === undefined){
	    this.stackreal.push(this.real);
	    this.stackimag.push(this.imag);
	}else{
	    this.stackreal.push(real);
	    this.stackimag.push(imag);
	}
	this.real = 0;
	this.imag = 0;
	return this;
    },
    swap: function(real, imag=0){
	this.stackreal.push(this.real)
	this.stackimag.push(this.imag)
	if (real instanceof comp){
	    this.real = real.real;
	    this.imag = real.imag;
	}else{
	    this.real = real;
	    this.imag = imag;
	}
	return this;
    },	    
    dup: function(){
	this.stackreal.push(this.real)
	this.stackimag.puhs(this.imag)
	return this;
    },	    
    pop: function(){
	this.stackreal.pop();
	this.stackimag.pop();
	return this;
    },
    print: function(N){
	if (N === undefined)
	    _compPrint(this);
	else
	    _compPrintFixed(this, N);
    },
    println: function(N){
	if (N === undefined){
	    _compPrint(this); ln();
	}else{
	    _compPrintFixed(this, N); ln();
	}
    }
}

function _compDiv(a, b, c, d){
    let cd = a*a + b*b;
    return [(a*c + b*d) / cd, (a*d - b*c) / cd];
}


function _compPow(a, b, c, d){
    const r = Math.sqrt(a*a + b*b);
    const logi = Math.atan2(b,a);
    const logr = Math.log(r);
    const logmr = logr*c - logi*d, logmi = logi*c + logr*d;
    const ee = Math.exp(logmr);
    return [ee * Math.cos(logmi), ee * Math.sin(logmi)];
}

function _compPrint(z){
    if (z.imag >= 0)
	write("{"+z.real+"+"+z.imag+"i}");
    else
	write("{"+z.real+z.imag+"i}");
}

function _compPrintFixed(z, N){
    if (z.imag >= 0)
	write("{"+z.real.toFixed(N)+"+"+z.imag.toFixed(N)+"i}");
    else
	write("{"+z.real.toFixed(N)+z.imag.toFixed(N)+"i}");
}
