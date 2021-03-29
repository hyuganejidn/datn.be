import { socketHome } from "./socketHome";
import { socketPost } from "./socketPost"

export const catchEvent = (io) => {
  const post = io.of("/posts")
  // const home = io.of("/home")
  socketPost(post)
  // socketHome(home)
};
