import PostCard from "@/components/PostCard";
// ?server component
async function loadPosts() {
     const res = await fetch('https://jsonplaceholder.typicode.com/posts')
     const data= await res.json()
     return data; 
}
export default async function PostsPage() {
    const posts= await loadPosts();
    //console.log(posts)
  return (
    <>
    <div>PostsPage</div>
    <div>
        {posts.map((post)=>(
            <PostCard post={post} key={post.id}/>
        ))}
    </div>
        
    </>
  )
}