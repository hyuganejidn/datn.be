type Roles = 'admin' | 'user'
type Classify = 'Forum' | 'Blog'

type Topic = {
  [key: string]: string
}

interface User {
  role: Roles
  username: string
  fullName: string
  password: string
  avatarUrl?: string
  blogsFollowing: Blog[]
}

interface Post {
  author: User
  classify: Classify
  topic?: Topic
  blog?: Blog

  title: string
  content: string
  vote_num: number
  comment_num: number
  view_num: number
}

interface Blog {
  author: User
  title: string
  description: string
  slug: string
  info: string
  follow_num: number
  post_num: number
}

interface Comment {
  author: User
  post: Post
  commentChildren: Comment[]
  commentParent: Comment

  like_num: number
  content: string
}