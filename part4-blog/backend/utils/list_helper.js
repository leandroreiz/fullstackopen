const _ = require('lodash')

const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = (blogs) => {
  let favorite = -1
  let max = 0

  blogs.forEach((blog, idx) => {
    if (blog.likes > max) {
      max = blog.likes
      favorite = idx
    }
  })

  return blogs[favorite]
}

const mostBlogs = (blogs) => {
  // creates an array with the authors
  const authorsList = _.map(blogs, 'author')

  const mostBlogs = _
    .chain(authorsList)
    .countBy()
    .toPairs()
    .maxBy(_.last)
    .value()
  return {
    author: mostBlogs[0],
    blogs: mostBlogs[1]
  }
}

const mostLikes = (blogs) => {
  const list = blogs
    .reduce((blog, { author, likes }) => {
      blog[author] = blog[author] || 0
      blog[author] += likes

      return blog
    }, {})

  const mostLiked = _
    .chain(list)
    .toPairs()
    .maxBy(_.last)
    .value()

  return {
    author: mostLiked[0],
    likes: mostLiked[1]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}