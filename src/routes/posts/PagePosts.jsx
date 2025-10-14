import ReactMarkdown from 'react-markdown';
import { useLoaderData } from "react-router";

const PagePosts = () => {

    const postData = useLoaderData();

    const Post = ({ post }) => {
        return (
            <div className="post">
                <article>
                <header>
                    <h2>{post.title}</h2>
                    <p>{post.created_at}</p>
                </header>
                <ReactMarkdown>{post.content_md}</ReactMarkdown>
                </article>
            </div>
        );
    };

    return (
        <div>
            <h1>Posts Page</h1>
            {postData.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
}

export default PagePosts;