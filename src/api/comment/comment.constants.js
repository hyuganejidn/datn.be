export const populateComment = [
  {
    path: 'author',
    select: ['fullName', 'avatarUrl']
  },

  {
    path: 'commentsChild',
    select: ['author', 'content', 'voteNum'],
    populate: [
      {
        path: 'author',
        select: ['fullName'],
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
