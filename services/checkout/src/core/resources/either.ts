import { EitherProps } from '/opt/layers/banking/src/core/types/either-props.type';

export class Left<L, R> {
  readonly value: L

  constructor(value: L) {
    this.value = value
  }

  isFailure(): this is Left<L, R> {
    return true
  }

  isSuccess(): this is Right<L, R> {
    return false
  }
}

export class Right<L, R> {
  readonly value: R

  constructor(value: R) {
    this.value = value
  }

  isFailure(): this is Left<L, R> {
    return false
  }

  isSuccess(): this is Right<L, R> {
    return true
  }
}

export class Either {
  fail = <L, R>(l: L): EitherProps<L, R> => {
    return new Left<L, R>(l)
  }

  success = <L, R>(a: R): EitherProps<L, R> => {
    return new Right<L, R>(a)
  }
}
