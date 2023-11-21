import { Component } from "../component";

export class Identifier<T> extends Component {
  protected value: T

  constructor(value: T) {
    super()
    this.value = value
  }

  toString () { 
    if (!this.value) return undefined
    return String(this.value) 
  }

  toNumber() {
    if (!this.value) return undefined
    return Number(this.value) 
  }

  toValue (): T { return this.value }

  equals (id?: Identifier<T>): boolean {
    if (id === null || id === undefined) return false
    if (!(id instanceof this.constructor)) return false
    return id.toValue() === this.value
  }
}
