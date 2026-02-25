import React, { useEffect } from 'react'
import "../style/feed.scss"
import Post from '../components/Post'
import { usePost } from '../hook/usePost'
import Nav from '../../shared/components/Nav'

const Feed = () => {
  const { feed, handleGetFeed, loading } = usePost()

  useEffect(() => { 
    handleGetFeed()
  }, []) // runs only once

  if (loading || !feed) {
    return (
      <main>
        <h1>Feed is loading...</h1>
      </main>
    )
  }

  // clone array to avoid mutating state
  const sortedFeed = [...feed] 

  return (
    <main className='feed-page'>
      <Nav/>
      <div className="feed">
        <div className="posts">
          {sortedFeed.map((post) => (
            <Post key={post._id} user={post.user} post={post} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default Feed