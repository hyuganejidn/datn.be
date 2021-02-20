export const populateBlog = [
  {
    path: 'author',
    select: ['fullName', 'avatarUrl']
  },
  {
    path: 'commentsChild',
    select: ['author', 'content'],
    populate: {
      path: 'author',
    }
  },
  {
    path: 'post',
    select: ['id'],
  }
]
