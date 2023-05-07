const express = require('express');
const router = express.Router();
const usersController = require('../../api/users/users.controllers');


router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.post('/', usersController.create);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.deleteUser);

module.exports = router;
