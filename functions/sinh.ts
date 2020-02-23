import { Complex, ComplexConstructor } from '../internal/complex';
import Mask from '../internal/mask';
import getReal from '../methods/real';
import getImag from '../methods/imag';

export default function sinh<T extends Complex> (Complex: ComplexConstructor<T>, z: Complex | number, imag: number = 0): T {
  let zReal: number, zImag: number;

  if (typeof z === 'number') {
    zReal = z; zImag = imag;
  } else {
    zReal = getReal(z); zImag = getImag(z);
  }

  if (zImag === 0) {
    const zSinh = Math.sinh(zReal);

    return new Complex(
      zSinh,
      0,
      Math.abs(zSinh),
      zSinh < 0 ? Math.PI : 0,
      Mask.HAS_ALL
    );
  }

  if (zReal === 0) {
    const zSinh = Math.sin(zImag);

    return new Complex(
      0,
      zSinh,
      Math.abs(zSinh),
      (zSinh < 0 ? -0.5 : 0.5) * Math.PI,
      Mask.HAS_ALL
    );
  }

  return new Complex(
    Math.sinh(zReal) * Math.cos(zImag),
    Math.cosh(zReal) * Math.sin(zImag),
    NaN,
    NaN,
    Mask.HAS_CARTESIAN 
  );
}