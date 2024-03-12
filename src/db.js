import conn from './conn.js'

export async function getAllPosts() {
 const [rows] = await conn.query('SELECT * FROM blog_posts')
 return rows
}

export async function getAllPostsId(id) {
    const [rows] = await conn.query(`SELECT * FROM blog_posts WHERE id =  ${id}`)
    return rows
   }

export async function createPost(title,imgSrc,pelicula,content) {
    const [result] = await conn.query('INSERT INTO blog_posts (title,imgSrc,pelicula,content) VALUES (?, ?, ?, ?)', [title, imgSrc, pelicula, content])
    return result
 }

 export async function deletePost(id) {
    const [result] = await conn.query(`DELETE FROM blog_posts WHERE id = ${id}`)
    return result
 }

 export async function updatePost(id,title,imgSrc,pelicula,content) {
    const [result] = await conn.query(`UPDATE blog_posts 
    SET title = '${title}', 
    imgSrc = '${imgSrc}',
    pelicula = '${pelicula}',
    content = '${content}'
    WHERE id = ${id};`)
    return result
 }
