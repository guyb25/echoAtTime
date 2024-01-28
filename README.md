# Echo At Time
This application hosts an API that has the route `/echoAtTime` which accepts a message and a time and will make sure to print the message at that time to the console.

## Getting Started
To run the application, you first need an instance of Redis running. You can easily set one up by typing
```bash
docker compose up
```
Then, to run the application, simply use
```bash
npm start
```
You can access the swagger documentation at `localhost:3000`

## Behind the scenes
The application stores the messages with a unique ID in the Redis instance in an ordered set. 
The score for each element is the timestamp of the time they should be printed.
The application will poll the Redis instance at a constant interval, and pick up a batch of messages to print. It will create a lock with an expiration time to make sure no other instance of the application
is trying to print the message, and yet allow the message to be printed at a later time by a different instance in case of an error.
