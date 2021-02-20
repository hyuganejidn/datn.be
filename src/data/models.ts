type Roles = 'admin' | 'user'
type Classify = 'Forum' | 'Blog'


interface Topic {
  name: string
  slug: string
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
  voteNum: number
  commentNum: number
  viewNum: number
}

interface Blog {
  author: User
  title: string
  description: string
  slug: string
  info: string
  followNum: number
  postNum: number
}

interface Comment {
  author: User
  post: Post
  commentParent: Comment

  like_num: number
  content: string
}

interface VoteComment {
  comment: Comment
  user: User
  vote: number
}

interface VotePost {
  comment: Post
  user: User
  vote: number
}