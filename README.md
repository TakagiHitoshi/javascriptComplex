# javascriptComplex
javascrip complex number calculation library

#Instantiation:
let a = new complex(1, 1);
let b = new complex(2); // imaginary part assumed to be zero

#Computation Examples:
a = a + b;
a.add(b);
a = a * 2 + b * 3;
a.mul(2).push().add(b).mul(3).add(); // can be written a.mul(2,0).push().add(b).mul(3,0).add()

a = c / (a + b);
a.add(b).swap(c).div();

#Function that performs s**2/(s**3 - a**3):

function func(real, imag, a){ // Re(s) = real, Im(s) = imag
    let aa = a ** 3;
    let s3 = new comp(real, imag);
    s3.mul(real, imag);
    let s2 = new comp(s3.real, s3.imag);
    s3.mul(real, imag).sub(aa).swap(s2).div();
    return s3;
}
