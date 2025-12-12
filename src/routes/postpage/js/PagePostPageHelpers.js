export async function pagePostPageLoader({ params }) {
    const response = await fetch('/posts.json');
    const posts = await response.json();
    
    // Find the post by slug
    const post = posts.find(p => p.slug === params.slug);
    
    if (!post) {
        throw new Response("Post not found", { status: 404 });
    }
    
    return post;
}
