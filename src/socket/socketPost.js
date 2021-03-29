import { handleLike, handleVote } from "./service";

export const socketPost = (channel) => channel.on("connection", (socket) => {
  socket.emit("test", socket.id);
  socket.on("JoiningRoom", (post) => {
    const room = post.id
    socket.join(room)
    socket.room = room
    socket.to(room).emit('JoiningRoom', { status: 'Joined' });
  });

  socket.on('VotePost', ({ voteNum, vote }) => {
    const _vote = handleVote(vote, voteNum)
    socket.to(socket.room).emit('VotePost', { _vote })
  })

  socket.on('LikePost', vote => {
    socket.to(socket.room).emit('LikePost', vote)
  })

  socket.on('UpdatePost', post => {
    socket.to(socket.room).emit('UpdatePost', post)
  })

  socket.on('LikeComment', ({ vote: _vote, commentId: _commentId }) => {
    socket.to(socket.room).emit('LikeComment', { _vote, _commentId })
  })

  socket.on('Comment', data => {
    console.log(data)
    socket.to(socket.room).emit('Comment', data)
  })

  socket.on('DeleteComment', data => {
    console.log(data)
    socket.to(socket.room).emit('DeleteComment', data)
  })

  socket.on('UpdateComment', ({ comment, content }) => {
    socket.to(socket.room).emit('UpdateComment', { comment, content })
  })

  socket.on('VoteComment', ({ voteNum, vote, commentId }) => {
    const _vote = handleVote(vote, voteNum)
    socket.to(socket.room).emit('VoteComment', {
      _vote,
      _commentId: commentId,
    })
  })

  socket.on('DeletePost', (id) => {
    socket.to(socket.room).emit('DeletePost', id)
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