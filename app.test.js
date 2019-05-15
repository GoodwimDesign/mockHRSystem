const request = require('supertest');
const app = require('./app');
const employeeJson = require('./data/employeeData');

describe('mockHRSystem', () => {
    describe('employees GET', () => {
        test('returns employee JSON', () => {
            return request(app).get('/employees').then(response => {                
                expect(response.body).toStrictEqual(employeeJson);
            })
        });
        test('returns status code 200', () => {
            return request(app).get('/employees').then(response => {                
                expect(response.status).toBe(200);
            })
        });
    })
})