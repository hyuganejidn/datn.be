import { populateComment } from "../comment/comment.constants";

export const populatePost = [
  {
    path: 'author',
    select: ['fullName']
  },
  {
    path: 'blog',
    select: ['title', 'slug', 'avatar'],
    populate: [
      {
        path: 'author',
        select: ['fullName'],
      },
    ]
  },
  {
    path: 'topic',
    select: ['name', 'slug'],
  },
]

export const populatePostComment = [...populatePost, {
  path: 'comments',
  populate: populateComment
}]