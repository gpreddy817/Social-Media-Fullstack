import { getFeed, createPost } from "../services/post.api"
import { useContext, useEffect } from "react"
import { PostContext } from "../post.context"

export const usePost = () => {
  const context = useContext(PostContext)

  if (!context) {
    throw new Error("usePost must be used inside PostProvider")
  }

  const {
    loading, setLoading, post, setPost, feed, setFeed
  } = context

  const handleGetFeed = async () => {
    try {
      setLoading(true)

      const data = await getFeed()

      if (data?.posts) {
        setFeed(data.posts.reverse())
      }

    } catch (error) {
      console.error("Error fetching feed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePost = async (imageFile, caption) => {
    try {
      setLoading(true)

      const data = await createPost(imageFile, caption)

      if (data?.post) {
        setFeed((prevFeed) => [data.post, ...prevFeed])
      }

    } catch (error) {
      console.error("Error creating post:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLikePost = async (post) =>{
    setLoading(true)
    const data = await likePost(post._id)
    await handleGetFeed()
    setLoadings(false)
  }

  const handleUnlikePost = async (post) =>{
    setLoading(true)
    const data = await unlikePost(post._id)
    await handleGetFeed()
    setLoadings(false)
  }


  useEffect(()=>{
    handleGetFeed()
  },[])

  return {
    loading,
    feed,
    post,
    handleGetFeed,
    handleCreatePost,
    handleLikePost,
    handleUnlikePost
  
  }
}