const write = (s) => document.write(s);
const writeln = (s) => document.write(s+"<br>");
const ln = () => document.write("<br>");
function  writea(a){
    var len = a.length;
    document.write("[");
    for (var i = 0; i < len - 1; i++)
	document.write(a[i],", ");
    document.write(a[len - 1]+"]");
}
const writealn = (a) => {writea(a); ln()};

function makeArray(n, init = 0){
    let ret = [];
    if (Array.isArray(n))
	return n;
    if (n < 1)
	return ret;
    if (n == 1){
	for (let i = 0; i < n; i++)
	    ret[i] = init;
	return ret;
    }
    if (n > 1){
	for (let i = 0; i < n; i++)
	    ret[i] = makeArray(n - 1, init);
	return ret;
    }
}
