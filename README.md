# Getting Started with automated testing

Testing in software is a broad subject and is a lot to think about. Here is an example repo of how you can get started testing an existing code base in an effective and efficient way. Our goal is not to create 100% test coverage or a process that takes a lot of extra time to write tests. As you learn you will see how you structure and organize your code can impact the complexity and reliability of testing your application.

## Clear boundaries

What is a boundary in an application? A boundary is where there is a separation of systems. For example, your server side code and you client side code there is a boundary that separates these code bases. Also your server side code and services like a database, there is a boundary there as well. The most effective tests are test that test code within a boundary. For example, your server-side boundary is a natural area of focus for many applications.

Many applications have these natural boundaries or layers, the presentation layer, application layer, and services layer. The application layer is where you want to start, because it contains the transformation code or business logic. This is usually the code that changes the most over the course of an application. When architecting applications you will find the more business logic or decision based code you place in the application layer, the easier your app is to maintain.

> Maintenance hell, when you discover a bug and it requires modification to every layer crossing boundaries, but in some layers the current code works for given scenarios, so you end up breaking something to fix another thing. And if you don't have tests this results in a production regression. The worse kind of bugs, these should be un-acceptable for any professional software developer.

By thinking about your design and keeping your presentation layer focused on taking crafted data and presenting it, and providing clean input to submit to your application layer, you begin to move your business logic into the application layer. This results is the ability to write tests on your application layer and as changes occur your tests are able to catch breakage and regressions.

## Integration Tests

Integration tests take a workflow that may work through several units of code to achieve an outcome, the test verifies that outcome. The mos