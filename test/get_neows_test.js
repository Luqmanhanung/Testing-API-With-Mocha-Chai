const chai = require('chai');
const assert = require('chai').expect;
chai.use(require('chai-json-schema'));

const page = require('../page/get_neows_page');
const schemavalid = require('../data/schemavalid.json')
const schemainvalid = require('../data/schemainvalid.json')

let payload = {
    'start_date'    : '2022-12-01',
    'end_date'      : '2022-12-02', 
    'api_key'       : process.env.API_KEY
}

const testCase={
    describe :'As User I want to see data Neows',
    positive :{
        validParams:'As User I want to see object near earth'
    },
    negative1 :{
        invalidParamsdate:'As User I want to see object near earth before today'
    },
    negative2 :{
        invalidParams: 'As User I  want to see object near earth more than 7 days'
    }
}

describe(`@get ${testCase.describe}`, () => {
    it(`@positive ${testCase.positive.validParams}`, async () => {
        const response = await page.getNeows(payload);
        assert(response.status).to.equal(200);
        assert(response.body).to.be.jsonSchema(schemavalid);
    });

    it(`@negative ${testCase.negative2.invalidParams}`, async () => {
        payload.end_date ='2023-01-01';
        const response = await page.getNeows(payload);
        assert(response.status).to.equal(400);
        assert(response.body).to.be.jsonSchema(schemainvalid);
    });

    it(`@negative ${testCase.negative1.invalidParamsdate}`, async () => {
        payload.start_date = '2022-01-0'
        payload.end_date ='2022-01-0';
        const response = await page.getNeows(payload);
        assert(response.status).to.equal(400);
        assert(response.body).to.be.jsonSchema(schemainvalid);
    });
});