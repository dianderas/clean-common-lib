"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEvents = void 0;
class DomainEvents {
    static markAggregateForDispatch(aggregate) {
        const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id);
        if (!aggregateFound) {
            this.markedAggregates.push(aggregate);
        }
    }
    static dispatchEventsForAggregate(id) {
        const aggregate = this.findMarkedAggregateByID(id);
        if (aggregate) {
            this.dispatchAggregateEvents(aggregate);
            aggregate.clearEvents();
            this.removeAggregateFromMarkedDispatchList(aggregate);
        }
    }
    static clearHandlers() {
        this.handlersMap = {};
    }
    static clearMarkedAggregates() {
        this.markedAggregates = [];
    }
    static register(callback, eventClassName) {
        if (!this.handlersMap.hasOwnProperty(eventClassName)) {
            this.handlersMap[eventClassName] = [];
            this.handlersMap[eventClassName].push(callback);
        }
    }
    static removeAggregateFromMarkedDispatchList(aggregate) {
        const index = this.markedAggregates.findIndex((a) => a.equals(aggregate));
        this.markedAggregates.splice(index, 1);
    }
    static dispatchAggregateEvents(aggregate) {
        aggregate.domainEvents.forEach((event) => this.dispatch(event));
    }
    static dispatch(event) {
        const eventClassName = event.constructor.name;
        if (this.handlersMap.hasOwnProperty(eventClassName)) {
            const handlers = this.handlersMap[eventClassName];
            for (let handler of handlers) {
                handler(event);
            }
        }
    }
    static findMarkedAggregateByID(id) {
        let found = null;
        for (let aggregate of this.markedAggregates) {
            if (aggregate.id.equals(id)) {
                found = aggregate;
            }
        }
        return found;
    }
}
DomainEvents.handlersMap = {};
DomainEvents.markedAggregates = [];
exports.DomainEvents = DomainEvents;
//# sourceMappingURL=DomainEvents.js.map