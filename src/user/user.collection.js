const UserModel = require('./user.model');

const UserCollection = function UserCollection() {
    return this._init();
}

UserCollection.prototype._init = function _init() {
    this.items = [];
    this.length = 0;
}

UserCollection.prototype.addItem = function addItem(userModel) {
    if (!(userModel instanceof UserModel)) {
        throw new TypeError(`Expected userModel to be an instance of UserModel, instead received ${userModel}`);
    }

    this.items.push(userModel);
    this.length++;
}

UserCollection.prototype.removeItem = function removeItem(username) {
    const filteredItems = this.items.filter((item) => item.username !== username);
    this.items = filteredItems;
    this.length = this.items.length;
}

UserCollection.prototype.getUsersByUsername = function getUsersByUsername() {
    return this.items.map((item) => item.username);
}

module.exports = new UserCollection();
