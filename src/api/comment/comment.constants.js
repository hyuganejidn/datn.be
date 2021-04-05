export const _populateComment = [
  {
    path: 'author',
    select: ['fullName', 'avatarUrl']
  },
  {
    path: 'userBeingReply',
    select: ['fullName']
  },
  {
    path: 'post',
    select: ['title'],
  }
]

export const populateComment = [..._populateComment,
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
  path: 'reports',
  select: ['reason', 'userReport', 'value']
}
]