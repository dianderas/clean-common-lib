"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const UniqueEntityId_1 = require("./UniqueEntityId");
class Entity {
    constructor(props, id) {
        this.isEntity = (v) => {
            return v instanceof Entity;
        };
        this._id = id ? id : new UniqueEntityId_1.UniqueEntityID();
        this.props = props;
    }
    equals(object) {
        if (object === null || object === undefined) {
            return false;
        }
        if (this === object) {
            return true;
        }
        if (!this.isEntity(object)) {
            return false;
        }
        return this._id.equals(object._id);
    }
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map