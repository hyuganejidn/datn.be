export const populatePost = [
  {
    path: 'author',
    select: ['fullName']
  },
  {
    path: 'blog',
    select: ['title'],
  },
  {
    path: 'topic',
    select: ['name', 'slug'],
  }
]