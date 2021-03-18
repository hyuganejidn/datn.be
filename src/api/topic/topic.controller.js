import Topic from "./topic.model";
import Post from "../post/post.model";
import { error, notFound, success } from "../../helpers/api";
import { populatePost } from "../post/post.constants";
import { getPosts } from "./topic.service";

export const index = async ({ querymen: { query, select, cursor } }, res) =>
  Topic.find(query, select, cursor)
    .then(async (topic) => {
      const total = await Topic.countDocuments(query).exec();
      return { data: topic, total };
    })
    .then(success(res))
    .catch(error(res))

export const create = ({ body }, res) =>
  Topic.create(body).then(success(res, 201)).catch(error(res));

export const createMany = ({ body }, res) =>
  Topic.insertMany(body).then(success(res, 201)).catch(error(res));

export const show = ({ params }, res) =>
  Topic.findById(params.id)
    .then(notFound(res))
    .then(success(res))
    .catch(error(res))

export const update = ({ params, body }, res) =>
  Topic.findByIdAndUpdate(params.id, body, { new: true })
    .then(success(res))
    .catch(error(res))

export const destroy = ({ params }, res) =>
  Topic.findById(params.id)
    .then(notFound(res))
    .then((topic) => topic.remove())
    .then(success(res, 204))
    .catch(error(res))

export const destroyMany = ({ params }, res) =>
  Topic.remove({})
    .then(notFound(res))
    // .then((topic) => topic.remove())
    .then(success(res, 204))
    .catch(error(res))

export const findPosts = ({ querymen, params }, res) =>
  getPosts(querymen, params.slug)
    .then(success(res))
    .catch(error(res))

// Topic.findOne({ slug: params.slug })
// 	.then((topic) => Post.find({ query }, select, cursor))
// 	.populate(populatePost)
// 	.then(async (posts) => {
// 		const total = await Post.countDocuments({
// 			...query,
// 			"topic.slug": params.slug,
// 		}).exec();
// 		return { data: posts, total };
// 	})
// 	.then(success(res))
// 	.catch(error(res));
