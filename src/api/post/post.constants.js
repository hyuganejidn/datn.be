import { populateComment } from "../comment/comment.constants";
import { populateReport } from "../report/report.constants";

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
  {
    path: 'reports',
    select: ['reason', 'userReport', 'value'],
    populate: populateReport
  }
]

export const populatePostComment = [...populatePost,
{
  path: 'comments',
  populate: populateComment
},
]