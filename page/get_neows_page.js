const supertest = require('supertest');
const env = require('dotenv').config();
const api = supertest(process.env.BASE_URL);

const getNeows = (payload) => 
    api
        .get('neo/rest/v1/feed')
        .set('Content-Type', 'application/json')
        .query(payload);

module.exports ={
    getNeows
};        