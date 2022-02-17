# Getting Started with automated testing

Testing in software is a broad subject and is a lot to think about. Here is an example repo of how you can get started testing an existing code base in an effective and efficient way. Our goal is not to create 100% test coverage or a process that takes a lot of extra time to write tests. As you learn you will see how you structure and organize your code can impact the complexity and reliability of testing your application.

## Clear boundaries

What is a boundary in an application? A boundary is where there is a separation of systems. For example, your server side code and you client side code there is a boundary that separates these code bases. Also your server side code and services like a database, there is a boundary there as well. The most effective tests are test that test code within a boundary. For example, your server-side boundary is a natural area of focus for many applications.

Many applications have these natural boundaries or layers, the presentation layer, application layer, and services layer. The application layer is where you want to start, because it contains the transformation code or business logic. This is usually the code that changes the most over the course of an application. When architecting applications you will find the more business logic or decision based code you place in the application layer, the easier your app is to maintain.

> Maintenance hell, when you discover a bug and it requires modification to every layer crossing boundaries, but in some layers the current code works for given scenarios, so you end up breaking something to fix another thing. And if you don't have tests this results in a production regression. The worse kind of bugs, these should be un-acceptable for any professional software developer.

By thinking about your design and keeping your presentation layer focused on taking crafted data and presenting it, and providing clean input to submit to your application layer, you begin to move your business logic into the application layer. This results is the ability to write tests on your application layer and as changes occur your tests are able to catch breakage and regressions.

## Integration Tests

Integration tests take a workflow that may work through several units of code to achieve an outcome, the test verifies that outcome. With REST or Graphql API servers, it is good to use the http request as the entry point of your test and a mocking tool like `nock` or `mongo-mock` to address the application layer to service layer boundary, so that your tests can:

1. Focus on testing your code
2. Run in an automated environment like CI
3. Be reliable and consistent

### Example

> In this example, we are using tools like uvu, supertest, mongo-mock and express, but do not recommend them for your use case, you may determine to use tools that work best for you. 

In our example, we want to test a `POST /api/users` endpoint.

```gerkin
Given I have access to endpoint /api/users
And the body of that post is `{_id: 'user-1', type: 'user', username: 'rakis' }`
When I submit a POST request
Then I should receive a response
And it should be of content type application/json
And it should have a body of `{ok: true}`
```

```js
import { test } from 'uvu'
import * as assert from 'uvu/assert'
import request from 'supertest'
import app from '../server'

test('POST /api/users', () => 
  request(app)
    .post('/api/users')
    .send({_id: 'user-1', type: 'user', username: 'rakis'})
    .expect('Content-Type', /json/)
    .expect(201)
    .expect(({body}) => assert.is(body.ok, true))

)

test.run()

```