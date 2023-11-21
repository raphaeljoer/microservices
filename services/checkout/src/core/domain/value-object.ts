import { Validator } from '../resources/validator';
import { Component } from '/opt/layers/banking/src/core/component';
import { PlainObject } from '/opt/layers/banking/src/core/types/plain-object.type';

export abstract class ValueObject<T extends PlainObject> extends Component {
  static validator = new Validator();
  protected readonly validator = ValueObject.validator
  protected readonly props: T

  constructor(props: T) {
    super()
    this.props = props
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) return false
    if (vo.props === undefined) return false
    return JSON.stringify(this.props) === JSON.stringify(vo.props)
  }
}
