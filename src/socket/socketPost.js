import { handleLike, handleVote } from "./service";

export const socketPost = (channel) => channel.on("connection", (socket) => {
  socket.emit("test", socket.id);
  socket.on("JoiningRoom", (id) => {
    const room = id
    socket.join(room)
    socket.room = room
    socket.to(room).emit('JoiningRoom', { status: 'Joined' });
  });

  socket.on('VotePost', ({ vote, postId, userId }) => {
    // const _vote = handleVote(vote, voteNum)
    console.log(vote, postId, userId)
    socket.to(socket.room).emit('VotePost', { vote, postId, userId })
  })

  socket.on('LikePost', ({ vote: _vote, userId: _userId }) => {
    socket.to(socket.room).emit('LikePost', { _vote, _userId })
  })

  socket.on('UpdatePost', post => {
    socket.to(socket.room).emit('UpdatePost', post)
  })

  socket.on('LikeComment', ({ vote: _vote, commentId: _commentId, userId: _userId }) => {
    socket.to(socket.room).emit('LikeComment', { _vote, _commentId, _userId })
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

  socket.on('VoteComment', ({ vote, commentId, userId }) => {
    // const _vote = handleVote(vote, voteNum)
    socket.to(socket.room).emit('VoteComment', {
      _vote: vote,
      _commentId: commentId,
      _userId: userId
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