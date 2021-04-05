export const populateReport = [
  {
    path: 'userReport',
    select: ['fullName', 'username', 'avatarUrl', 'role'],
  },
  {
    path: 'post',
    select: ['title', 'content'],
    populate: [
      {
        path: 'author',
        select: ['fullName', 'username', 'avatarUrl', 'role'],
      }
    ]
  },
  {
    path: 'comment',
    select: ['content'],
    populate: [
      {
        path: 'author',
        select: ['fullName', 'username', 'avatarUrl', 'role'],
      }
    ]
  }
]