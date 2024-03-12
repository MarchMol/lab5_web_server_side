import express from 'express'
import { createPost, getAllPosts, getAllPostsId, deletePost, updatePost } from './db.js'

const app = express()
const port = 3000

app.use(express.json())

app.delete('/posts/:postId', async (req, res) => {
  const id = req.params.postId
  const posts = await deletePost(id)
  res.json(posts)
})

app.put('/posts/:postId', async (req, res) => {
  const id = req.params.postId;
  const {
    title,
    imgSrc,
    pelicula,
    content,
  } = req.body;
  const posts = await updatePost(id,title,imgSrc,pelicula,content)
  res.json(posts)
})


app.get('/posts', async (req, res) => {
    const posts = await getAllPosts()
    res.json(posts)
})

app.get('/posts/:postId', async (req, res) => {
  const id = req.params.postId;
  const posts = await getAllPostsId(id)
  res.json(posts)
})

app.post('/posts', async (req, res) => {
  const{
    title,
    imgSrc,
    pelicula,
    content,
  } = req.body;

  const result = await createPost(title,imgSrc,pelicula,content)
  res.json(result)
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, '127.0.0.1', () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})