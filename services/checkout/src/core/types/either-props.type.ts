import { Left, Right } from '/opt/layers/banking/src/core/resources/either';

export type EitherProps<L, R> = Left<L, R> | Right<L, R>