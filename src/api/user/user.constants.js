export const populateUser = [
  {
    path: 'votePosts',
    select: ['vote', 'post'],
    // match: { post: { classify: 'forum' } },
    // match: { "classify": 'forum'  },
    populate: [
      {
        path: 'post',
        select: ['classify'],
        // match: { classify: { $eq: type } }
      }
    ],
  },
  {
    path: 'voteComments',
    select: ['vote', 'comment'],
  }
]