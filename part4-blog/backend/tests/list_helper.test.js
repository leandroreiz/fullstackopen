const listHelper = require('../utils/list_helper')

const emptyList = []

const listWithOneBlog = [
  {
    title: 'REST API Design Best Practices Handbook',
    author: 'Jean-Marc Möckel',
    url: 'https://www.freecodecamp.org/news/rest-api-design-best-practices-build-a-rest-api/',
    likes: 22,
  }
]

const biggerList = [
  {
    title: 'REST API Design Best Practices Handbook',
    author: 'Jean-Marc Möckel',
    url: 'https://www.freecodecamp.org/news/rest-api-design-best-practices-build-a-rest-api/',
    likes: 22,
  },
  {
    title: 'Git Commit Best Practices',
    author: 'Luis Matos',
    url: 'https://gist.github.com/luismts/495d982e8c5b1a0ced4a57cf3d93cf60',
    likes: 999,
  },
  {
    title: 'Statements Vs. Expressions',
    author: 'Josh Comeau',
    url: 'https://www.joshwcomeau.com/javascript/statements-vs-expressions/',
    likes: 45,
  },
  {
    title: 'Regular Expressions Cheat Sheet',
    author: 'Dave Child',
    url: 'https://cheatography.com/davechild/cheat-sheets/regular-expressions/',
    likes: 33,
  },
  {
    title: 'Clean Code Best Practices',
    author: 'Luis Matos',
    url: 'https://gist.github.com/luismts/495d982e8c5b1a0ced4a57cf3d93cf6e',
    likes: 1,
  },
  {
    title: 'React Best Practices',
    author: 'Jean-Marc Möckel',
    url: 'https://www.freecodecamp.org/news/best-practices-for-react/',
    likes: 3,
  },
  {
    title: 'Healthy Habits',
    author: 'Jean-Marc Möckel',
    url: 'https://www.freecodecamp.org/news/how-to-become-a-better-developer-and-live-a-happier-life/',
    likes: 7,
  },
  {
    title: 'The Surprising Truth About Pixels and Accessibility',
    author: 'Josh Comeau',
    url: 'https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/',
    likes: 26,
  },
  {
    title: 'How I Landed My First Developer Job Without Writing a Single Application',
    author: 'Jean-Marc Möckel',
    url: 'https://www.freecodecamp.org/news/how-i-landed-my-first-developer-job-without-an-application/',
    likes: 17,
  },
  {
    title: 'Why React Re-Renders',
    author: 'Josh Comeau',
    url: 'https://www.joshwcomeau.com/react/why-react-re-renders/',
    likes: 34,
  },
  {
    title: 'Testing TypeScript apps using Jest',
    author: 'Ibiyemi Adewakun',
    url: 'https://blog.logrocket.com/testing-typescript-apps-using-jest/',
    likes: 5,
  },
  {
    title: 'My Wonderful HTML Email Workflow',
    author: 'Josh Comeau',
    url: 'https://www.joshwcomeau.com/react/wonderful-emails-with-mjml-and-mdx/',
    likes: 51,
  },
  {
    title: 'You Don\'t Need A UI Framework',
    author: 'Josh Comeau',
    url: 'https://www.smashingmagazine.com/2022/05/you-dont-need-ui-framework/',
    likes: 14,
  }
]

test('dummy return one', () => {
  const result = listHelper.dummy(emptyList)
  expect(result).toBe(1)
})

describe('total likes', () => {
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
    expect(result).toBe(1257)
  })
})

describe('favorite blog', () => {
  test('return the blog with most likes', () => {
    const result = listHelper.favoriteBlog(biggerList)
    expect(result).toEqual({
      title: 'Git Commit Best Practices',
      author: 'Luis Matos',
      url: 'https://gist.github.com/luismts/495d982e8c5b1a0ced4a57cf3d93cf60',
      likes: 999,
    })
  })
})

describe('most common author', () => {
  test('return the author that has more blogs saved', () => {
    const result = listHelper.mostBlogs(biggerList)
    expect(result).toEqual({
      author: 'Josh Comeau',
      blogs: 5
    })
  })
})

describe('most liked author', () => {
  test('return the author with the most likes among all blogs', () => {
    const result = listHelper.mostLikes(biggerList)
    expect(result).toEqual({
      author: 'Luis Matos',
      likes: 1000
    })
  })
})