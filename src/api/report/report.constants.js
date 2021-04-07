export const populateReport = [

  {
    path: 'post',
    select: ['title', 'content', 'classify', 'isBlock'],
    populate: [
      {
        path: 'author',
        select: ['fullName', 'username', 'avatarUrl', 'role'],
      }
    ]
  },
  {
    path: 'reports',
    populate: [
      {
        path: 'userReport',
        select: ['fullName', 'username', 'avatarUrl', 'role'],
      },
    ]
  },
  {
    path: 'comment',
    select: ['content', 'post', 'isBlock'],
    populate: [
      {
        path: 'author',
        select: ['fullName', 'username', 'avatarUrl', 'role'],
      },
      {
        path: 'post',
        select: ['title', 'content', 'classify'],
        populate: [
          {
            path: 'author',
            select: ['fullName', 'username', 'avatarUrl', 'role'],
          }
        ]
      }
    ]
  }
]