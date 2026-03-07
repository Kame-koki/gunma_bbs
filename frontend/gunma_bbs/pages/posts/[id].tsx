import React from 'react'
import { PostParams } from "../types";
import { useRouter } from 'next/router';

type Props = {
    post: PostParams;
};


export async function getStaticPaths(){
    const res = await fetch("http://localhost:3001/api/v1/posts");
    const posts: PostParams[] = await res.json();

    const paths = posts.map((post) => ({
        params: {id: post.id.toString()},
    }));


    return{
        paths,
        fallback: true
    };
}

export async function getStaticProps({ params }:{params:{id:string}}) {
    const res = await fetch(`http://localhost:3001/api/v1/posts/${params.id}`);
    const post = await res.json();


    return{
    props:{
        post,
    },
    revalidate: 60,
    };
}

const Post = ({ post }: Props) => {
    const router = useRouter();

    if(router.isFallback){
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>{post.title}</div>
            <div>{post.created_at}</div>
            <p>{post.content}</p>
        </div>
    );
};

export default Post;