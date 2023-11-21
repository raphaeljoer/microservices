import { Either } from './resources/either'
import { Utils } from './resources/utils'

export abstract class Component {
  static readonly either = new Either()
  static readonly utils = Utils

  protected readonly either = Component.either
  protected readonly utils = Component.utils
}
