// requires complext.js

function mul_mat_matc(a, b, c, n){
    for(let i = 0; i < n; i++){
	for (let j = 0; j < n; j++){
	    let tempc = new comp(0, 0);
	    for (let k = 0; k < n; k++){
		let aik = new comp(a[i][k].real, a[i][k].imag);
		let bkj = new comp(b[k][j].real, b[k][j].imag);
		aik.mul(bkj);
		tempc.add(aik);
	    }
	    c[i][j] = tempc;
	}
    }
}

function mul_mat_vecc(a, b, c, n){
    for(let i = 0; i < n; i++){
	let tempc = new comp(0, 0);
	for (let k = 0; k < n; k++){
	    let aik = new comp(a[i][k].real, a[i][k].imag);
	    let bk = new comp(b[k].real, b[k].imag);
	    aik.mul(bk);
	    tempc.add(aik);
	}
	c[i] = tempc;
    }
}

    
function mul_vec_vecc(a, b, n){
    let c = new comp(0, 0);
    for (let i = 0; i < n; i++){
	let ai = new comp(a[i].real, a[i].imag);
	let bi = new comp(b[i].real, b[i].imag);
	ai.mul(bi);
	c.add(ai);
    }
    return c;
}

function mul_vec_tvecc(a, x, y, n){
    for(let i = 0; i < N; i++){
	for (let j = 0; j < N; j++){
	    let xi = new comp(x[i].real, x[i].imag);
	    xi.mul(y[j]);
	    a[i][j] = xi;
	}
    }
}

// LU decompositon

function LUdecompc(a, n){
    if (n < 1) return false;
    for (let i = 0; i < n; i++){
	// calculating L
	for (let j = 0; j <= i; j++){
	    let lu = new comp(a[i][j].real, a[i][j].imag);
	    for (let k = 0; k < j; k++){
		let aik = new comp(a[i][k].real, a[i][k].imag);
		let akj = new comp(a[k][j].real, a[k][j].imag);
		aik.mul(akj);
		lu.sub(aik);
	    }
	    a[i][j] = lu;
	}
	// calculating U
	for (let j = i + 1; j < n; j++){
	    let lu = new comp(a[i][j].real, a[i][j].imag);
	    for (let k = 0; k < i; k++){
		let aik = new comp(a[i][k].real, a[i][k].imag);
		let akj = new comp(a[k][j].real, a[k][j].imag);
		aik.mul(akj);
		lu.sub(aik);
	    }
	    lu.div(a[i][i]);
	    a[i][j] = lu;
	}
    }
    return true;
}

// LU Solver

function LUsolverc(a, b, x, n){
    if (n < 1) return false;
    // Forward substitution
    // Calculating y by Ly = b

    for (let i = 0; i < n; i++){
	let bly = new comp(b[i].real, b[i].imag);
	for (let j = 0; j < i; j++){
	    let aij = new comp(a[i][j].real, a[i][j].imag);
	    let xj = new comp(x[j].real, x[j].imag);
	    aij.mul(xj);
	    bly.sub(aij);
	}
	bly.div(a[i][i]);
	x[i] = bly;
    }

    // Back substitution
    // calculating x by Ux = y
    for (let i = n -1; i >= 0; i--){
	let yux = new comp(x[i].real, x[i].imag);
	for (let j = i + 1; j < n; j++){
	    let aij = new comp(a[i][j].real, a[i][j].imag);
	    let xj = new comp(x[j].real, x[j].imag);
	    aij.mul(xj);
	    yux.sub(aij);
	}
	x[i] = yux;
    }

    return true;
}

// LU decompositon with pivot selection

function LUdecompPVc(a, p, n){
    if (n < 1) return false;
    for (let i = 0; i < n; i++)
	p[i] = i;
    for (let i = 0; i < n - 1; i++){
	// find max abs value
	let amax = a[i][i].abs();
	let imax = i;
	for (let j = i + 1; j < n; j++){
	    let t = a[j][i].abs();
	    if ( t > amax){
		amax = t;
		imax = j;
	    }
	}
	if (amax == 0)
	    alert("ERROR: pivot = 0");
	if (i != imax){
	    let itemp = p[i];
	    p[i] = p[imax];
	    p[imax] = itemp;
	    for (let j = 0; j < n; j++){
		let temp = a[i][j];
		a[i][j] = a[imax][j];
		a[imax][j] = temp;
	    }
	}
	// calculating L
	for (let j = i + 1; j < n; j++){
	    let aji = new comp(a[j][i].real, a[j][i].imag);
	    let aii = new comp(a[i][i].real, a[i][i].imag);
	    aji.div(aii);
	    a[j][i] = aji;
	}
	// calculating U
	for (let j = i + 1; j < n; j++){
	    for (let k = i + 1; k < n; k++){
		let aki = new comp(a[k][i].real, a[k][i].imag);
		let aij = new comp(a[i][j].real, a[i][j].imag);
		aki.mul(aij);
		let akj = new comp(a[k][j].real, a[k][j].imag)
		akj.sub(aki);
		a[k][j] = akj;
	    }
	}
    }
    return true;
}

// LU Solver with Pivot selection

function LUsolverPVc(a, b, x, p, n){
    if (n < 1) return false;
    // Forward substitution
    // Calculating y by Ly = b
    let y = new Array(N);
    for (let i = 0; i < n; i++)
	y[i] = new comp(0, 0);
    for (let i = 0; i < n; i++){
	let s = new comp(0, 0);
	for (let j = 0; j < i; j++){
	    let aij = new comp(a[i][j].real, a[i][j].imag);
	    let yj = new comp(y[j].real, y[j].imag);
	    aij.mul(yj);
	    s.add(aij);
	}
	let bi_s = new comp(b[p[i]].real, b[p[i]].imag);
	bi_s.sub(s);
	y[i] = bi_s;
    }

    // Back substitution
    // calculating x by Ux = y
    for (let i = 0; i < n; i++)
	x[i] = new comp(0, 0);
    for (let i = n - 1; i >= 0; i--){
	let s = new comp(0, 0);
	for (let j = i + 1; j < n; j++){
	    let aij = new comp(a[i][j].real, a[i][j].imag);
	    let xj = new comp(x[j].real, x[j].imag);
	    aij.mul(xj);
	    s.add(aij);
	}
	let y_s = new comp(y[i].real, y[i].imag);
	y_s.sub(s);
	y_s.div(a[i][i]);
	x[i] = y_s;
    }
    return true;
}

// Split decomposited matrix into L and U

function split_LUc(a, L, U, n){
    for (let i = 0; i < n; i++){
	for (let j = 0; j < n; j++){
	    if (j == i){
		L[i][j] = new comp(1, 0);
		U[i][j] = a[i][j];
	    }else if (j > i){
		L[i][j] = new comp(0, 0);
		U[i][j] = a[i][j];
	    }else {
		L[i][j] = a[i][j];
		U[i][j] = new comp(0, 0);
	    }
	}
    }
}

// Debug ; matix dump

// display complex number

function writec(c){
    if (c.imag == 0)
	document.write(c.real);
    else if (c.imag == 1)
	document.write(c.real+"+i");
    else if (c.imag == -1)
	document.write(c.real+"-i");
    else if (c.imag > 0)
	document.write(c.real+"+"+(Math.abs(c.imag))+"i");
    else
	document.write(c.real+"-"+(Math.abs(c.imag))+"i");
}

function dispmc(msg, a, n){
    document.write(msg+"<br>");
    for (let i = 0; i < n; i++){
	document.write("[ ");
	for (let j = 0; j < n - 1; j++){
	    writec(a[i][j]);
	    document.write(", ");
	}
	writec(a[i][n - 1]);
	document.write("]<br>");
    }
    document.write("<br>");
}

function dispvc(msg, v, n){
    document.write(msg+" [");
    for (let i = 0; i < n - 1; i++){
	writec(v[i]);
	document.write(", ");
    }
    writec(v[n - 1]);
    document.write("]<br><br>");
}


