const { expect } = require("chai");
const request = require("supertest");


const app = require("../../../app");

before(done => {
  console.log("Starting the test");
  done();
});

describe("GET /college", _ => {
  it("OK, fetching college deatials works", done => {
    request(app)
      .get('/colleges')
      .query({zip: 90201, degrees: 1, year: 2017 })
      .then(res => {
        const results = res.body.results;
        let fail = false;

        for (const key of results) {
            if(key.school_name === '' || key.no_of_students === ''){
                fail = true;
            }
            if(key.school_name === null || key.no_of_students === null){
                fail = true;
            }

        }
        expect(fail).to.be.false;
        done();
      });
  });
  it("FAIL, Failed fetching college deatials works", done => {
    request(app)
    .get('/colleges')
    .query({zip: 90201, degrees: 1})
      .then(res => {
        console.log(res.body.msg.name);
        const results = res.body.msg.name;
        
        expect(results).to.equal("Error"); // Recommended
        
        done();
      });
  });
  
});