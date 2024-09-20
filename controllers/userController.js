const { User, Thought } = require('../models');

const userController = {
  // Get all users
  getAllUsers(req, res) {
    User.find()
      .select('-__v') // Exclude the __v field from the result
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Get a single user by ID
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('thoughts friends') // Populate thoughts and friends data
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with this ID!' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Update a user by ID
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, {
      new: true,
      runValidators: true, // Enforce schema validation
    })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with this ID!' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Delete a user and associated thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with this ID!' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } }) // Delete associated thoughts
      )
      .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add a friend to a user's friend list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } }, // Add friend if not already present
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with this ID!' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Remove a friend from a user's friend list
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } }, // Remove the friend from the list
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with this ID!' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = userController;
