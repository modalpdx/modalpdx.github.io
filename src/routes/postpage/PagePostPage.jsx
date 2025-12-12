import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLoaderData } from "react-router";
import './css/PagePostPage.css';

const PagePostPage = () => {
    const post = useLoaderData();

    return (
        <>
            <div className="post-page-container">
                <img 
                    src="https://placehold.co/1000x600" 
                    alt={post.title} 
                    className="post-page-image"
                />
                <h1 className="post-page-title">{post.title}</h1>
                <p className="post-page-date">{post.created_at}</p>
                <div className="post-page-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {post.content_md}
                    </ReactMarkdown>
                </div>
            </div>
        </>
    );
}

export default PagePostPage;
