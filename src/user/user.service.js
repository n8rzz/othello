const UserCollection = require('./user.collection');
const UserModel = require('./user.model');


const addUserToCollection = function addUserToCollection(username) {
    if (typeof username === 'undefined') {
        return;
    }

    const userModel = new UserModel(username);

    if (!(userModel instanceof UserModel)) {
        throw TypeError(`Expected userModel to be and instanceof UserModel: ${typeof userModel}`);
    }

    UserCollection.addItem(userModel);
}

const removeUserFromCollection = function removeUserFromCollection(username) {
    const userModel = UserCollection.items.filter((item) => item.username === username);

    if (!userModel) {
        c
        return;
    }

    UserCollection.removeItem(username);
}

const getConnectedUsers = function getConnectedUsers() {
    return UserCollection.getUsersByUsername();
}

module.exports = {
    addUserToCollection: addUserToCollection,
    removeUserFromCollection: removeUserFromCollection,
    getConnectedUsers: getConnectedUsers,
};
