const router = require('express').Router();
const { registerUser } = require('../controller/users.controller');

router.post('/user/register', registerUser);
/**
 * @swagger
 * /user/register:
 *  post:
 *    summary: User registration
 *    description: Netflix user registarion
 *    tags:
 *      - Netflix User APIs 
 *    parameters:
 *      - in: body
 *        description: Netflix clone user registration
 *        schema:
 *          type: object
 *          required:
 *            - username
 *            - email
 *            - password
 *          properties:
 *            username:
 *              type: string
 *              min: 8
 *              max: 15
 *              example: "Sophia"
 *            email:
 *              type: string
 *              min: 10
 *              max: 15
 *              example: "sophia@gmail.com"
 *            password:
 *              type: string
 *              min: 8
 *              max: 15
 *              example: "Sophia#404"
 *    responses:
 *      200:
 *        description: User registered successfully
 *      400:
 *        description: Bad request
 *      500:
 *        description: Internal server errror
 *  */

module.exports = router;
