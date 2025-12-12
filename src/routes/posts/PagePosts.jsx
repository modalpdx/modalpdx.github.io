import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLoaderData, Link } from "react-router";
import './css/PagePosts.css';

const PagePosts = () => {

    const postData = useLoaderData();

    // Get the latest post and older posts
    const [latestPost, ...olderPosts] = postData;

    const FeaturedPost = ({ post }) => {
        return (
            <div className="featured-post">
                <Link to={`/post/${post.slug}`}>
                    <img src={post.image_lg_url || "https://placehold.co/500x300"} alt={post.title} />
                </Link>
                <Link to={`/post/${post.slug}`}>
                    <h2>{post.title}</h2>
                </Link>
                <p className="post-date">{post.created_at}</p>
                <p className="post-summary">{post.summary}</p>
            </div>
        );
    };

    const OlderPost = ({ post }) => {
        return (
            <div className="older-post">
                <Link to={`/post/${post.slug}`}>
                    <img src={post.image_sm_url || "https://placehold.co/250x175"} alt={post.title} />
                </Link>
                <Link to={`/post/${post.slug}`}>
                    <h3>{post.title}</h3>
                </Link>
                <p className="post-date">{post.created_at}</p>
            </div>
        );
    };

    // Split older posts between two columns
    // For now, split evenly. Later we can add logic for vertical space checking
    const midPoint = Math.ceil(olderPosts.length / 2);
    const column2Posts = olderPosts.slice(0, midPoint);
    const column3Posts = olderPosts.slice(midPoint);

    return (
        <>
            <div className="posts-container">
                {latestPost && <FeaturedPost post={latestPost} />}
                
                <div className="older-posts-column column-2">
                    {column2Posts.map((post) => (
                        <OlderPost key={post.id} post={post} />
                    ))}
                </div>
                
                <div className="older-posts-column column-3">
                    {column3Posts.map((post) => (
                        <OlderPost key={post.id} post={post} />
                    ))}
                    {olderPosts.length > 6 && (
                        <Link to="/archive" className="archive-link">
                            View Archive →
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}

export default PagePosts;