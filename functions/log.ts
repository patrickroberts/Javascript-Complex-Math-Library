import Complex, { ComplexConstructor } from '../internal/complex';
import Mask from '../internal/mask';
import absImpl from '../internal/abs';
import argImpl from '../internal/arg';
import getAbs from '../methods/abs';
import getArg from '../methods/arg';

export default function log<T extends Complex> (Complex: ComplexConstructor<T>, z: Complex | number, imag: number = 0): T {
  let zAbs: number, zArg: number;

  if (typeof z === 'number') {
    zAbs = absImpl(z, imag); zArg = argImpl(z, imag);
  } else {
    zAbs = getAbs(z); zArg = getArg(z);
  }

  return new Complex(
    Math.log(zAbs),
    zArg,
    NaN,
    NaN,
    Mask.HAS_CARTESIAN 
  );
}