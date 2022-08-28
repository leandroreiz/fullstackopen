const listHelper = require('../utils/list_helper')

test('dummy return one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '630bbb555412809a9e4bbd0d',
      title: 'REST API Design Best Practices Handbook',
      author: 'Jean-Marc Möckel',
      url: 'https://www.freecodecamp.org/news/rest-api-design-best-practices-build-a-rest-api/',
      likes: 22,
      __v: 0
    }
  ]

  const biggerList = [
    {
      _id: '630bbb555412809a9e4bbd0d',
      title: 'REST API Design Best Practices Handbook',
      author: 'Jean-Marc Möckel',
      url: 'https://www.freecodecamp.org/news/rest-api-design-best-practices-build-a-rest-api/',
      likes: 22,
      __v: 0
    },
    {
      _id: '630bbbaa5412809a9e4bbd10',
      title: 'Git Commit Best Practices',
      author: 'Luis Matos',
      url: 'https://gist.github.com/luismts/495d982e8c5b1a0ced4a57cf3d93cf60',
      likes: 99,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the like of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(22)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(biggerList)
    expect(result).toBe(121)
  })
})