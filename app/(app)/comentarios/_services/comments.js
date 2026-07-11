export const getComments = async () => {
  const response = await fetch('https://api.jsonbin.io/v3/qs/6a51f3ddda38895dfe4e76c4', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      //'X-Access-Key': apiKey
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch comments.')
  }

  const json = await response.json()

  return json?.record
}

export const postComment = async (comment) => {
  const comments = await getComments()

  const id = crypto.randomUUID()
  console.log({id})
  const newComment = { ...comment, id }
  const commentsToSave = [...comments, newComment]

    const response = await fetch('https://api.jsonbin.io/v3/qs/6a51f3ddda38895dfe4e76c4', {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        //'X-Access-Key': import.meta.env.VITE_PUBLIC_API_KEY
        },
        body: JSON.stringify(commentsToSave)
    })

    if (!response.ok) {
        throw new Error('Failed to post comment.')
    }

  return newComment
}