
import server from '../src/setup/server';
import supertest from 'supertest';
import connection from '../src/setup/database'
jest.setTimeout(30000);

afterAll(() => setTimeout(() => process.exit(), 1000))

const request = supertest(server);
test("Create user", async (done) => {
  const randomEmail = Math.random().toString(36).substring(7) + '@test.com';
  request
    .post("/")
    .send({
      "query": "mutation ($name: String, $email: String, $password: String) {\n  userSignup (name: $name, email: $email, password: $password) {\n    id, name, email\n  }\n}",
      "variables": {
          "name": "Test",
          "email": randomEmail,
          "password": "test"
      }
  })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.data.userSignup.name).toEqual('Test');
      expect(res.body.data.userSignup.email).toEqual(randomEmail);
      done();
    });
  });
    test("Login user", async (done) => {
    const randomEmail = Math.random().toString(36).substring(7) + '@test.com';
    request
      .post("/")
      .send({
        "query": "mutation ($name: String, $email: String, $password: String) {\n  userSignup (name: $name, email: $email, password: $password) {\n    id, name, email\n  }\n}",
        "variables": {
            "name": "The User",
            "email": randomEmail,
            "password": "123456"
        }
    })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data.userSignup.name).toEqual('The User');
        expect(res.body.data.userSignup.email).toEqual(randomEmail);
        request
        .post("/")
        .send({
          "query": "query ($email: String, $password: String) { userLogin (email: $email, password: $password) { user {name, email, role}, token } }",
          "variables": {
              "email": randomEmail,
              "password": "123456"
          }
      })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.statusCode).toBe(200);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body.data.userLogin.user.name).toEqual('The User');
          expect(res.body.data.userLogin.user.email).toEqual(randomEmail);
          expect(res.body.data.userLogin.token).toEqual(expect.any(String));
          done();
        });
    });
});

afterAll(async done => {
  connection.close();
  done();
});