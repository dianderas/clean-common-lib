import { IDomainEvent } from './IDomainEvent';

export interface IHandle<IDomainEvent> {
  setupSubscription(): void;
}
