import { populatePost } from "../post/post.constants";
import Post from "../post/post.model";
import Topic from "./topic.model";

export const getPosts = async ({ query, select, cursor }, slug) => {
  try {
    const topic = await Topic.findOne({ slug: slug });
    const posts = await Post.find(
      { ...query, topic: topic._id },
      select,
      cursor
    ).populate(populatePost);

    const total = await Post.countDocuments({
      ...query,
      topic: topic._id,
    }).exec();
    return { data: posts, total };
  } catch (error) {
    throw new Error(error);
  }
}