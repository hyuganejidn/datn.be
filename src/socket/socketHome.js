import { handleVote } from "./service";

export const socketHome = (channel) => channel.on("connection", (socket) => {
  console.log("Connected post chanel", socket.id);
  socket.on("JoiningRoom", (post) => {
    const room = post.id
    socket.join(room)
    socket.room = room
    socket.to(room).emit('JoiningRoom', { status: 'Joined' });
  });

  socket.on('VotePost', ({ voteNum, vote, userId }) => {
    const _vote = handleVote(vote, voteNum)
    socket.to(socket.room).emit('VotePost', { _vote, _userId: userId })
  })

  socket.on('LikePost', ({ voteNum, vote }) => {
    const _vote = handleVote(vote, voteNum)
    socket.to(socket.room).emit('LikePost', _vote)
  })

  socket.on('Comment', data => {
    console.log(data)
    socket.to(socket.room).emit('Comment', data)
  })

  socket.on('DeleteComment', data => {
    console.log(data)
    socket.to(socket.room).emit('DeleteComment', data)
  })

  socket.on('VoteComment', ({ voteNum, vote, commentId, userId }) => {
    const _vote = handleVote(vote, voteNum)
    socket.to(socket.room).emit('VoteComment', {
      _vote,
      _commentId: commentId,
      _userId: userId
    })
  })

  socket.on('LeavingRoom', () => {
    socket.leave(socket.room);
    console.log('\n@@@ LEAVING_ROOM leaving ', socket.room ? socket.room : 'EMPTY')
  });

  socket.on('LeavedRoom', reason => {
    socket.leave(socket.room);
  })

  socket.on('disconnect', reason => {
    console.log(reason)
    socket.to(socket.room).emit('LeavedRoom', socket.id);
    socket.leave(socket.room);
    // console.log(`\n@ DISCONNECTED ${socket.id} in room ${socket.room} reason ${reason}`);
    // socket.leave(socket.room);
  })
});