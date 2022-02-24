# Overview of Backend Structure 

## Spring Boot

Now that the database has been set up, the server should be able to start without any errors. Make sure you have opened the server in an IDE so that maven can download all the necessary packages. You might need to install a plugin for your IDE to be able to parse Lombok annotations

### Running the server

Once the server packages have been downloaded and installed, and the database is running, simply run the file SafewalkServerApplication.java. This is the file that actually starts the server. You should be able to see the Spring logo in the console and check for any errors it gives.

### Server File Structure

As you should be able to see, there are a lot of folders in the server src folder already, so I will let you know what all the folders mean and how the server works.

#### Controllers

These are where the server endpoints go. All the files in this folder will have @RestController annotations and whenever the server gets a request, it will try to match the url to the methods in these classes. You should try to keep these classes pretty thin, the logic in these classes should be delegated to a method in one of the Services class.

#### Models

Models contains the database entities as Java objects. These are the objects that you will be working with and operating on if you need to do any logic other than just retrieving objects from the database. The repository methods will return these.

We will likely also have a subdirectory here called "domain" which will hold similar objects to the models, but with some fields ommitted or added. These domain objects will be what is used for requests and return types. They are the immutable copies that get passed around and only include the information we actually want to receive from/give to the user. 

#### Repositories

These are the representations of the database tables. These classes will likely all extend JPARepository, and will have built in methods to access data in the database. You should look at the methods here first if you want to get data from the database.


#### Services

The services is where the "business logic" of the app goes.

#### Domains

The domains are objects used to reference models without the need to include all data required by each model.

#### Exceptions

The exceptions are used to respond to invalid HTTP requests with specific messages.

#### There will probably be more folders
