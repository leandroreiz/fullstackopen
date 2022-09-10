const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const listHelper = require('../utils/list_helper')
const request = require('supertest')

const api = request(app)

beforeEach(async () => {
  await Blog.deleteMany()

  const blogObjects = helper.initialState
    .map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('dummy return one', () => {
  const result = listHelper.dummy([])
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the like of that', () => {
    const result = listHelper.totalLikes([helper.initialState[0]])
    expect(result).toBe(helper.initialState[0].likes)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(helper.initialState)
    expect(result).toBe(1257)
  })
})

describe('author', () => {
  test('that has more blogs saved', () => {
    const result = listHelper.mostBlogs(helper.initialState)
    expect(result).toEqual({
      author: 'Josh Comeau',
      blogs: 5
    })
  })

  test('with the most likes', () => {
    const result = listHelper.mostLikes(helper.initialState)
    expect(result).toEqual({
      author: 'Luis Matos',
      likes: 1000
    })
  })
})

describe('blog', () => {
  test('with most likes', () => {
    const result = listHelper.favoriteBlog(helper.initialState)
    expect(result).toEqual({
      title: 'Git Commit Best Practices',
      author: 'Luis Matos',
      url: 'https://gist.github.com/luismts/495d982e8c5b1a0ced4a57cf3d93cf60',
      likes: 999,
    })
  })

  test('s\' total number', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialState.length)
  })

  test('has a property named id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })

  test('is successfully created', async () => {
    const newPost = {
      title: 'New post created for test purposes',
      author: 'Test Author',
      url: 'https://testingapplication.com',
      likes: 10,
    }

    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialState.length + 1)
  })

  test('likes if not informed, default value equals 0 (zero)', async () => {
    const newPost = {
      title: 'New post created for test purposes',
      author: 'Test Author',
      url: 'https://testingapplication.com',
    }

    const response = await api.post('/api/blogs').send(newPost)
    expect(response.body.likes).toBe(0)
  })

  test('title and url properties are missing', async () => {
    const newPost = {
      title: '',
      author: 'Test Author',
      url: '',
      likes: 10,
    }

    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
