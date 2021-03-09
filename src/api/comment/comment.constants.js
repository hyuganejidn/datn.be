export const populateComment = [
  {
    path: 'author',
    select: ['fullName', 'avatarUrl']
  },
  {
    path: 'userBeingReply',
    select: ['fullName']
  },
  {
    path: 'commentsChild',
    populate: [
      {
        path: 'post',
        select: ['title'],
      },
      {
        path: 'author',
        select: ['fullName', 'avatarUrl'],
      },
      {
        path: 'userBeingReply',
        select: ['fullName']
      },
    ]
  },
  {
    path: 'post',
    select: ['title'],
  }
]
