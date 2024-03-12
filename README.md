## **Introduction**
This repository contains a simple API for managing blog posts. It allows users to perform diverse operations on blog posts stored in a local mysql database ran by a docker image.

## **Features**
Create: Users can create new blog posts by sending a POST request to the appropriate endpoint.\n
Read: Existing blog posts can be retrieved using GET requests.\n
Update: Users can update existing blog posts by sending a PUT request with the updated data.\n
Delete: Blog posts can be deleted using a DELETE request.\n

_Installation_
To use this API, follow these steps:

_Clone the repository:_ git clone 
_Install dependencies:_ npm install
npm install express
npm install cors
npm install express-validator
npm install eslint

_build the dockerfile_
docker build -t name_of_your_image .
docker run -d name_of_your_image

_Start the server:_ npm start

_Check the lint summary:_ npm run lint


## **Usage**
Once the server is running, you can interact with the API using HTTP requests. Here are the available endpoints:

GET /posts: Retrieve all blog posts.\n
GET /posts/:PostId: Retrieve a specific blog post by its ID.\n
POST /posts: Create a new blog post.\n
PUT /posts/:PostId: Update an existing blog post.\n
DELETE /posts/:PostId: Delete a blog post.\n

## **Technologies Used**
Node.js\n
Express.js\n
cors (suported)\n
mysql\n
swagger\n
lint/eslint\n

## **License**
This project is licensed under the MIT License.

## **Acknowledgements**
Thanks to the dependencies Express.js and others because if they werent free to use maybe this project wouldn't be here :)
