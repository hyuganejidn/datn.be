export const handleVote = (vote, voteNum) => {
  let _vote
  console.log(vote, voteNum)
  if (vote.vote !== 0) {
    if (vote.vote === voteNum) {
      _vote = {
        voteTotal: vote.voteTotal - voteNum,
        vote: 0,
      }
    }
    else {
      _vote = {
        vote: voteNum,
        voteTotal: vote.voteTotal + (voteNum === 1 ? 2 : -2),
      }
    }
  } else {
    _vote = {
      vote: voteNum,
      voteTotal: vote.voteTotal + voteNum,
    }
  }
  return _vote
}

export const handleLike = () => {
  const like = 1
}