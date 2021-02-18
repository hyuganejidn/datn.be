export const populate = [
  {
    path: 'author',
    select: ['fullName', 'avatarUrl']
  },
  {
    path: 'commentChildren',
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
