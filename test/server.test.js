var chai = require('chai');
var chaiHttp = require("chai-http");
var expect  = require("chai").expect;
const app = require('../server'); 

chai.use(chaiHttp);

const unitTitle = 'API Testing Unit Title';
const unitSubTitle = 'API Testing Unit SubTitle';
const unitDescription = 'API Testing Unit Description';
const unitLink = 'API Testing Unit Link';

describe('Unit API', () => {
    it('should GET all the units', (done) => {
        chai.request(app)
            .get('/api/units')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
    it('should GET the SIT726 Unit', (done) => {
        chai.request(app)
            .get('/api/unit/title/SIT726')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.data).to.have.property('title', 'SIT726');
                expect(res.body.data).to.have.property('subTitle', 'Information Technology Innovations and Entrepreneurship');
                done();
            });
    });
    it('should fail to find unit XXX000', (done) => {
        chai.request(app)
            .get('/api/unit/title/XXX000')
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });
    it('should POST a new test unit', (done) => {
        let unitData = {
            title: unitTitle,
            subTitle: unitSubTitle,
            description: unitDescription,
            link: unitLink
        };
        chai.request(app)
            .post('/api/units')
            .send(unitData)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.include.keys('statusCode', 'data', 'message');
                done();
            });
    });
    it('should GET the newly created test unit', (done) => {
        chai.request(app)
        .get('/api/units/title/' + encodeURIComponent(unitTitle))
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body.data).to.have.property('title', unitTitle);
            expect(res.body.data).to.have.property('subTitle', unitSubTitle);
            expect(res.body.data).to.have.property('description', unitDescription);
            expect(res.body.data).to.have.property('link', unitLink);
            done();
        });
    });
});