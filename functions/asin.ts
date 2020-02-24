import { Complex, ComplexConstructor } from '../internal/complex';
import from from './from';
import log from './log';
import square from './square';
import sqrt from './sqrt';
import add from '../methods/add';
import sub from '../methods/sub';
import mul from '../methods/mul';

export default function asin<T extends Complex> (Complex: ComplexConstructor<T>, z: Complex | number, imag: number = 0): T {
  const ONE = from(Complex, 1);
  const I = from(Complex, 0, 1);
  const NEG_I = from(Complex, 0, -1);

  const mul1 = mul(Complex, I, z, imag);
  const square1 = square(Complex, z, imag);
  const sub1 = sub(Complex, ONE, square1);
  const sqrt1 = sqrt(Complex, sub1);
  const add1 = add(Complex, mul1, sqrt1);
  const log1 = log(Complex, add1);
  const mul2 = mul(Complex, NEG_I, log1);

  return mul2;
}
