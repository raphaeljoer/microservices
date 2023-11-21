import { Entity } from '/opt/layers/banking/src/core/domain/entity';

export abstract class AggregateRoot<T> extends Entity<T> {}
