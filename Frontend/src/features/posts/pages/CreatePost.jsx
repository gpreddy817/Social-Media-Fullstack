import React, { useState, useRef } from "react"
import "../style/createpost.scss"
import { usePost } from "../hook/usePost"
import { useNavigate } from "react-router-dom"

const CreatePost = () => {
  const [caption, setCaption] = useState("")
  const postImageInputFieldRef = useRef(null)

  const navigate = useNavigate()
  const { loading, handleCreatePost } = usePost()

  async function handleSubmit(e) {
    e.preventDefault()

    if (!postImageInputFieldRef.current) return

    const file = postImageInputFieldRef.current.files[0]

    if (!file) {
      alert("Please select an image")
      return
    }

    await handleCreatePost(file, caption)

    // Redirect after successful post
    navigate("/")
  }

  if (loading) {
    return (
      <main>
        <h1>Creating...</h1>
      </main>
    )
  }

  return (
    <main className="create-post-page">
      <div className="form-container">
        <h1>Create Post</h1>

        <form onSubmit={handleSubmit}>
          <label
            className="post-image-label"
            htmlFor="postImage"
          >
            Select Image
          </label>

          <input
            ref={postImageInputFieldRef}
            hidden
            type="file"
            name="postImage"
            id="postImage"
            accept="image/*"
          />

          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            type="text"
            name="caption"
            id="caption"
            placeholder="Enter Caption"
          />

          <button
            type="submit"
            className="button primary-button"
          >
            Create Post
          </button>
        </form>
      </div>
    </main>
  )
}

export default CreatePost