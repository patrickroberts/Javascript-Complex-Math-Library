import { IComplex, IComplexConstructor } from '../internal/complex';
import mask from '../internal/mask';

export default function cube<T extends IComplex> (Complex: IComplexConstructor<T>, z: IComplex | number, i = 0): T {
  let zReal: number;
  let zImag: number;
  let zAbs: number;
  let zArg: number;
  let zMask: mask;

  if (typeof z === 'number') {
    zReal = z;
    zImag = i;
    zAbs = NaN;
    zArg = NaN;
    zMask = mask.HAS_CARTESIAN;
  } else {
    zReal = z._real;
    zImag = z._imag;
    zAbs = z._abs;
    zArg = z._arg;
    zMask = z._mask;
  }

  if ((zMask & mask.HAS_CARTESIAN) !== mask.HAS_CARTESIAN) {
    return new Complex(NaN, NaN, zAbs * zAbs * zAbs, 3 * zArg, mask.HAS_POLAR);
  }

  const real2 = zReal * zReal;
  const imag2 = zImag * zImag;

  return new Complex(
    (real2 - 3 * imag2) * zReal,
    (3 * real2 - imag2) * zImag,
    zAbs * zAbs * zAbs,
    3 * zArg,
    zMask
  );
}
