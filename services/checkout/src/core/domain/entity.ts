import { Validator } from '../resources/validator';
import { Component } from '/opt/layers/banking/src/core/component';
import { UniqueEntityID } from '/opt/layers/banking/src/core/domain/unique-entity-id';
import { Notification } from '/opt/layers/banking/src/core/resources/notification';

export abstract class Entity<T> extends Component {
  static validator = new Validator();
  protected readonly validator = Entity.validator
  protected readonly uniqueEntityId: UniqueEntityID
  protected readonly notification = new Notification()
  protected props: T

  protected constructor(props: T, id: UniqueEntityID) {
    super()
    this.props = props
    this.uniqueEntityId = id
  }

  get id(): UniqueEntityID {
    return this.uniqueEntityId
  }

  public equals (object?: Entity<T>) : boolean {
    if (object == null || object == undefined) return false;
    if (this === object) return true;
    if (!isEntity(object)) return false;
    return this.id.equals(object.id);
  }
}

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};
