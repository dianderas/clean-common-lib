import { UniqueEntityID } from '../UniqueEntityId';

export interface IDomainEvent {
  dateTimeOcurred: Date;
  getAggregateId(): UniqueEntityID;
}
