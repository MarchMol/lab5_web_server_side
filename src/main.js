import express from 'express'
import { body, validationResult } from 'express-validator'
import cors from 'cors'
import {
  createPost, getAllPosts, getAllPostsId, deletePost, updatePost,
} from './db'
import swagger from './swagger'

const app = express()
app.use(cors())
app.use(express.json())
swagger(app)

const port = 22398

app.delete('/posts/:postId', cors(), async (req, res) => {
  try {
    const id = req.params.postId
    const posts = await deletePost(id)
    res.json(posts)
  } catch (error) {
    res.status(500).json({ error: 'Ocurrio un error eliminando los posts' })
  }
})

/**
 * @swagger
 * /posts/{postId}:
 *   delete:
 *     summary: Delete a post by ID
 *     description: Deletes a post from the database using its ID.
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post to delete
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post deleted successfully
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Ocurrio un error eliminando los posts
 */

app.put('/posts/:postId', cors(), [
  body('title').notEmpty().isString(),
  body('imgSrc').notEmpty().isURL(),
  body('pelicula').notEmpty().isString(),
  body('content').notEmpty().isString(),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const id = req.params.postId
  const {
    title, imgSrc, pelicula, content,
  } = req.body

  try {
    const posts = await updatePost(id, title, imgSrc, pelicula, content)
    return res.json(posts)
  } catch (error) {
    return res.status(500).json({ error: 'Ocurrio un error alterando los posts' })
  }
})

/**
 * @swagger
 * /posts/{postId}:
 *   put:
 *     summary: Update a post by ID
 *     description: Update a post with the specified ID using the provided data
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID of the post to update
 *         schema:
 *           type: string
 *       - in: body
 *         name: post
 *         description: Post object containing title, imgSrc, pelicula, and content
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             imgSrc:
 *               type: string
 *               format: url
 *             pelicula:
 *               type: string
 *             content:
 *               type: string
 *     responses:
 *       200:
 *         description: Successfully updated the post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 postId:
 *                   type: string
 *                   description: The ID of the updated post
 *       400:
 *         description: Bad request due to invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         description: Error message describing the validation error
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the server encountered an issue
 */

app.get('/posts', cors(), async (req, res) => {
  try {
    const posts = await getAllPosts()
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ error: 'Ocurrio un error obteniendo los posts' })
  }
})

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     description: Retrieve all posts from the database
 *     responses:
 *       200:
 *         description: A list of posts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   postId:
 *                     type: string
 *                     description: The ID of the post
 *                   title:
 *                     type: string
 *                     description: The title of the post
 *                   imgSrc:
 *                     type: string
 *                     description: The image source URL of the post
 *                   pelicula:
 *                     type: string
 *                     description: The movie associated with the post
 *                   content:
 *                     type: string
 *                     description: The content of the post
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the server encountered an issue
 */

app.get('/posts/:postId', cors(), async (req, res) => {
  try {
    const id = req.params.postId
    const posts = await getAllPostsId(id)
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ error: 'Ocurrio un error obteniendo los posts' })
  }
})

/**
 * @swagger
 * /posts/{postId}:
 *   get:
 *     summary: Get a specific post by ID
 *     description: Retrieve a specific post from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID of the post to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A specific post retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 postId:
 *                   type: string
 *                   description: The ID of the post
 *                 title:
 *                   type: string
 *                   description: The title of the post
 *                 imgSrc:
 *                   type: string
 *                   description: The image source URL of the post
 *                 pelicula:
 *                   type: string
 *                   description: The movie associated with the post
 *                 content:
 *                   type: string
 *                   description: The content of the post
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the server encountered
 *                                an issue while retrieving the post
 */

app.post('/posts/', cors(), [
  body('title').notEmpty().isString(),
  body('imgSrc').notEmpty().isURL(),
  body('pelicula').notEmpty().isString(),
  body('content').notEmpty().isString(),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: 'Formato incorrecto' })
  }

  const {
    title, imgSrc, pelicula, content,
  } = req.body

  try {
    const posts = await createPost(title, imgSrc, pelicula, content)
    return res.json(posts)
  } catch (error) {
    return res.status(500).json({ error: 'Ocurrio un error alterando los posts' })
  }
})

/**
 * @swagger
 * /posts/{postId}:
 *   get:
 *     summary: Get a specific post by ID
 *     description: Retrieve a specific post from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID of the post to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A specific post retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 postId:
 *                   type: string
 *                   description: The ID of the post
 *                 title:
 *                   type: string
 *                   description: The title of the post
 *                 imgSrc:
 *                   type: string
 *                   description: The image source URL of the post
 *                 pelicula:
 *                   type: string
 *                   description: The movie associated with the post
 *                 content:
 *                   type: string
 *                   description: The content of the post
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the server
 *                                encountered an issue while retrieving the post
 */

app.get('/', cors(), (req, res) => {
  res.send('Blog de Peliculas de Marchena')
})

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get home page
 *     description: Endpoint to retrieve the home page of the blog.
 *     responses:
 *       200:
 *         description: Successful response with the home page content.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Blog de Peliculas de Marchena
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating an internal server error occurred.
 */

app.listen(port, '127.0.0.1', () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})

app.use((req, res) => {
  res.status(400).send('Endpoint no implementado')
})

/**
 * @swagger
 * /:
 *   use:
 *     summary: Error - Endpoint not implemented
 *     description: This endpoint is used to handle requests to
 *                  routes that have not been implemented.
 *     responses:
 *       400:
 *         description: Bad request response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Endpoint no implementado
 */
