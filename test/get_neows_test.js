const chai = require('chai');
const assert = require('chai').expect;
chai.use(require('chai-json-schema'));

const page = require('../page/get_neows_page');
const schema = require('../data/schema.json')

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
    negative :{
        invalidParams: 'As User I  want to see object near earth more than 7 days'
    }
}

describe(`@get ${testCase.describe}`, () => {
    it(`@positive ${testCase.positive.validParams}`, async () => {
        const response = await page.getNeows(payload);
        assert(response.status).to.equal(200);
        assert(response.body).to.be.jsonSchema(schema);
    });

    it(`@negative ${testCase.negative.invalidParams}`, async () => {
        payload.end_date ='2023-01-01';
        const response = await page.getNeows(payload);
        assert(response.status).to.equal(400);
    });
});