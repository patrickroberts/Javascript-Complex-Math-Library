import { Complex, ComplexConstructor } from '../internal/complex';
import Mask from '../internal/mask';
import getReal from '../methods/real';
import getImag from '../methods/imag';

export default function coth<T extends Complex> (Complex: ComplexConstructor<T>, z: Complex | number, imag: number = 0): T {
  let zReal: number, zImag: number;

  if (typeof z === 'number') {
    zReal = z; zImag = imag;
  } else {
    zReal = getReal(z); zImag = getImag(z);
  }

  if (zImag === 0) {
    const zCoth = -Math.sinh(2 * zReal) / (1 - Math.cosh(2 * zReal));

    return new Complex(
      zCoth,
      0,
      Math.abs(zCoth),
      zCoth < 0 ? Math.PI : 0,
      Mask.HAS_ALL
    );
  }

  if (zReal === 0) {
    const zCoth = Math.sin(2 * zImag) / (Math.cos(2 * zImag) - 1);

    return new Complex(
      0,
      zCoth,
      Math.abs(zCoth),
      (zCoth < 0 ? -0.5 : 0.5) * Math.PI,
      Mask.HAS_ALL
    );
  }

  const zCothDenom = Math.cos(2 * zImag) - Math.cosh(2 * zReal);

  return new Complex(
    -Math.sinh(2 * zReal) / zCothDenom,
    Math.sin(2 * zImag) / zCothDenom,
    NaN,
    NaN,
    Mask.HAS_CARTESIAN 
  );
}