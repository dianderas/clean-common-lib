"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateRoot = void 0;
const Entity_1 = require("./Entity");
const events_1 = require("./events");
class AggregateRoot extends Entity_1.Entity {
    constructor() {
        super(...arguments);
        this._domainEvents = [];
    }
    get id() {
        return this._id;
    }
    get domainEvents() {
        return this._domainEvents;
    }
    addDomainEvent(domainEvent) {
        this._domainEvents.push(domainEvent);
        events_1.DomainEvents.markAggregateForDispatch(this);
        this.logDomainAdded(domainEvent);
    }
    clearEvents() {
        this._domainEvents.splice(0, this._domainEvents.length);
    }
    logDomainAdded(domainEvent) {
        const thisClass = Reflect.getPrototypeOf(this);
        const domainEventClass = Reflect.getPrototypeOf(domainEvent);
        console.info(`[Domain Event Created]: `, thisClass.constructor.name, '===>', domainEventClass.constructor.name);
    }
}
exports.AggregateRoot = AggregateRoot;
//# sourceMappingURL=AggregateRoot.js.map