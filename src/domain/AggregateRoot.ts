import { Entity } from './Entity';
import { UniqueEntityID } from './UniqueEntityId';
import { DomainEvents, IDomainEvent } from './events';

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: IDomainEvent[] = [];

  get id(): UniqueEntityID {
    return this._id;
  }

  get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: IDomainEvent): void {
    this._domainEvents.push(domainEvent);

    DomainEvents.markAggregateForDispatch(this);
    this.logDomainAdded(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  private logDomainAdded(domainEvent: IDomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);
    console.info(
      `[Domain Event Created]: `,
      thisClass.constructor.name,
      '===>',
      domainEventClass.constructor.name
    );
  }
}
