import ReactMarkdown from 'react-markdown';
import { useLoaderData } from "react-router";
import './css/PagePosts.css';

const PagePosts = () => {

    const postData = useLoaderData();

    const Post = ({ post }) => {
        return (
            <article>
                <header>
                    <h2>{post.title}</h2>
                    <p>{post.created_at}</p>
                </header>
                <section>
                <ReactMarkdown>{post.content_md}</ReactMarkdown>
                </section>
            </article>
        );
    };

    return (
        <>
        <h2 className='page-title'>Posts Page</h2>
        {postData.map((post) => (
            <Post key={post.id} post={post} />
        ))}
        </>
    );
}

export default PagePosts;