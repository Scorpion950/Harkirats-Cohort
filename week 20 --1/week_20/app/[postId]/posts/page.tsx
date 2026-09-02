import axios from "axios";

export default async function BlogPage({ params }: any) {
    const { postId } = await params;
    const responce = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const data = responce.data;

    return <div>
        <h1>Blog post {postId} </h1>

        <br>
        </br>

        title - {data.title}
        body - {data.body}
    </div>
}