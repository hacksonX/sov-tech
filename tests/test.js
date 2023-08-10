const { describe, it, beforeEach, before, after } = require ('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/server')
const expect = chai.expect;

chai.use(chaiHttp);
chai.should();

describe('CRUD user infromation', () => { 
    
    it('Get all users on initialisation', () => {
        chai.request(app).get('/users').end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object')
        });
    });

    it('Add a user', () => {
        chai.request(app).post('/users').set('Content-Type', 'application/json')
            .send(
                {
                    'first_name': 'Jane',
                    'last_name': 'Smith',
                    'id_number': '9012254321081',
                    'physical_address': '100 Sunset drive, Cape town',
                    'phone': '0833217654'
                }
            ).end((err, res) => {
                res.should.have.status(201);
                expect(res.body).to.eql({'users': '2'});
        });
    });

    it('Get all user after update', () => {
        chai.request(app).get('/users').end((err, res) => {
            expect(res.body).to.eql({'body': [{
                    'first_name': 'John',
                    'last_name': 'Doe',
                    'id_number': '0001121221080',
                    'phone': '0821234567',
                    'physical_address': '1 Fountain road, Johannesburg'
                },
                {
                    'first_name': 'Jane',
                    'last_name': 'Smith',
                    'id_number': '9012254321081',
                    'physical_address': '100 Sunset drive, Cape town',
                    'phone': '0833217654'
                }
            ]})
        });
    });

    it('Update by id number', () => {
        chai.request(app).patch('/users/0001121221080').set('Content-Type', 'application/json')
            .send({
                'first_name': 'Johnny',
                'last_name': 'Doe',
                'id_number': '0001121221080',
                'phone': '0821234567',
                'physical_address': '1 Roadshow, Johannesburg'
            }).end((err, res) => {
                res.should.have.status(204)
        });
    });

    it('Get all user after update', () => {
        chai.request(app).get('/users').end((err, res) => {
            expect(res.body).to.eql({'body': [{
                    'first_name': 'Johnny',
                    'last_name': 'Doe',
                    'id_number': '0001121221080',
                    'phone': '0821234567',
                    'physical_address': '1 Roadshow, Johannesburg'
                },
                {
                    'first_name': 'Jane',
                    'last_name': 'Smith',
                    'id_number': '9012254321081',
                    'physical_address': '100 Sunset drive, Cape town',
                    'phone': '0833217654'
                }
            ]})
        });
    });

    it('Fail to add a user missing first name', () => {
        chai.request(app).post('/users').set('Content-Type', 'application/json')
            .send(
                {
                    'last_name': 'Smith',
                    'id_number': '9012254321081',
                    'physical_address': '100 Sunset drive, Cape town',
                    'phone': '0833217654'
                }
            ).end((err, res) => {
                res.should.have.status(400);
        });
    });

    it('Fail to add a user duplicate id number', () => {
        chai.request(app).post('/users').set('Content-Type', 'application/json')
            .send(
                {
                    "first_name": "Jennifer",
                    'last_name': 'Smith',
                    'id_number': '9012254321081',
                    'physical_address': '100 Sunset drive, Cape town',
                    'phone': '0833217654'
                }
            ).end((err, res) => {
                res.should.have.status(400);
        });
    });

    it('Fail to add a user duplicate phone', () => {
        chai.request(app).post('/users').set('Content-Type', 'application/json')
            .send(
                {
                    "first_name": "Jennifer",
                    'last_name': 'Smith',
                    'id_number': '9012254321083',
                    'physical_address': '100 Sunset drive, Cape town',
                    'phone': '0833217654'
                }
            ).end((err, res) => {
                res.should.have.status(400);
        });
    });

 });