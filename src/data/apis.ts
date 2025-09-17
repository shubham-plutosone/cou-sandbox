import { ApiEndpoint } from '@/types/api';

export const APIs: ApiEndpoint[] = [
  {
    id: 'jsonplaceholder-posts',
    name: 'JSONPlaceholder - Posts',
    description: 'Get or create blog posts',
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/posts',
    parameters: [
      {
        name: 'userId',
        type: 'number',
        required: false,
        description: 'Filter posts by user ID',
        defaultValue: 1
      }
    ],
    defaultPayload: {},
    headers: { 'Content-Type': 'application/json' }
  },
  {
    id: 'jsonplaceholder-create-post',
    name: 'JSONPlaceholder - Create Post',
    description: 'Create a new blog post',
    method: 'POST',
    url: 'https://jsonplaceholder.typicode.com/posts',
    parameters: [
      {
        name: 'title',
        type: 'string',
        required: true,
        description: 'Post title',
        defaultValue: 'My New Post'
      },
      {
        name: 'body',
        type: 'string',
        required: true,
        description: 'Post content',
        defaultValue: 'This is the post content.'
      },
      {
        name: 'userId',
        type: 'number',
        required: true,
        description: 'User ID',
        defaultValue: 1
      }
    ],
    defaultPayload: {
      title: 'My New Post',
      body: 'This is the post content.',
      userId: 1
    },
    headers: { 'Content-Type': 'application/json' }
  },
  {
    id: 'httpbin-get',
    name: 'HTTPBin - GET Request',
    description: 'Test GET request with parameters',
    method: 'GET',
    url: 'https://httpbin.org/get',
    parameters: [
      {
        name: 'param1',
        type: 'string',
        required: false,
        description: 'Test parameter 1',
        defaultValue: 'value1'
      },
      {
        name: 'param2',
        type: 'string',
        required: false,
        description: 'Test parameter 2',
        defaultValue: 'value2'
      }
    ],
    defaultPayload: {},
    headers: { 'Content-Type': 'application/json' }
  },
  {
    id: 'httpbin-post',
    name: 'HTTPBin - POST Request',
    description: 'Test POST request with JSON data',
    method: 'POST',
    url: 'https://httpbin.org/post',
    parameters: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Your name',
        defaultValue: 'John Doe'
      },
      {
        name: 'email',
        type: 'string',
        required: true,
        description: 'Your email',
        defaultValue: 'john@example.com'
      }
    ],
    defaultPayload: {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello from the API sandbox!'
    },
    headers: { 'Content-Type': 'application/json' }
  },
  {
    id: 'reqres-users',
    name: 'ReqRes - Get Users',
    description: 'Get list of users from ReqRes API',
    method: 'GET',
    url: 'https://reqres.in/api/users',
    parameters: [
      {
        name: 'page',
        type: 'number',
        required: false,
        description: 'Page number',
        defaultValue: 1
      },
      {
        name: 'per_page',
        type: 'number',
        required: false,
        description: 'Users per page',
        defaultValue: 6
      }
    ],
    defaultPayload: {},
    headers: { 'Content-Type': 'application/json' }
  },
  {
    id: 'reqres-create-user',
    name: 'ReqRes - Create User',
    description: 'Create a new user',
    method: 'POST',
    url: 'https://reqres.in/api/users',
    parameters: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'User name',
        defaultValue: 'Jane Smith'
      },
      {
        name: 'job',
        type: 'string',
        required: true,
        description: 'User job title',
        defaultValue: 'Developer'
      }
    ],
    defaultPayload: {
      name: 'Jane Smith',
      job: 'Developer'
    },
    headers: { 'Content-Type': 'application/json' }
  },
  {
    id: 'dog-api',
    name: 'Dog API - Random Dog',
    description: 'Get a random dog image',
    method: 'GET',
    url: 'https://dog.ceo/api/breeds/image/random',
    parameters: [],
    defaultPayload: {},
    headers: { 'Content-Type': 'application/json' }
  },
  {
    id: 'cat-fact',
    name: 'Cat Facts API',
    description: 'Get a random cat fact',
    method: 'GET',
    url: 'https://catfact.ninja/fact',
    parameters: [
      {
        name: 'max_length',
        type: 'number',
        required: false,
        description: 'Maximum fact length',
        defaultValue: 140
      }
    ],
    defaultPayload: {},
    headers: { 'Content-Type': 'application/json' }
  },
  {
    id: 'joke-api',
    name: 'JokesAPI - Programming Joke',
    description: 'Get a random programming joke',
    method: 'GET',
    url: 'https://v2.jokeapi.dev/joke/Programming',
    parameters: [
      {
        name: 'type',
        type: 'string',
        required: false,
        description: 'Joke type (single or twopart)',
        defaultValue: 'single'
      }
    ],
    defaultPayload: {},
    headers: { 'Content-Type': 'application/json' }
  },
  {
    id: 'weather-api',
    name: 'OpenWeatherMap Mock',
    description: 'Mock weather API endpoint',
    method: 'GET',
    url: 'https://httpbin.org/json',
    parameters: [
      {
        name: 'city',
        type: 'string',
        required: true,
        description: 'City name',
        defaultValue: 'London'
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: 'Temperature units',
        defaultValue: 'metric'
      }
    ],
    defaultPayload: {},
    headers: { 'Content-Type': 'application/json' }
  }
];