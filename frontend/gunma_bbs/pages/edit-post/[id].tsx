import axios from 'axios';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { PostParams } from '../types';

type Props = {
    post: PostParams;
};

export async function getServerSideProps(context: any){
    const id = context.params.id;

    const res = await fetch(`http://localhost:3001/api/v1/posts/${id}`);
    const post = await res.json();

    return{
        props: {
            post,
        },
    };

}

const EditPost = ({ post }: Props) => {
    const [title,setTitle] = useState(post.title);
    const [content,setContent] =useState(post.content);
    const router = useRouter();

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault();

        console.log(title,content);

        //APIを叩く
        try {
            await axios.put(`http://localhost:3001/api/v1/posts/${post.id}`,{
                title: title,
                content: content,
            });

            router.push("/");
        } catch (error) {
            alert("編集に失敗しました");
        }
    }

    return (
        <div>
            <h1>ブログの編集</h1>
            <form onSubmit={handleSubmit}>
                <label>タイトル</label>
                <input type="text" 
                    onChange={(e:ChangeEvent<HTMLInputElement>)=>
                        setTitle(e.target.value)
                    } 
                    value = {title}
                />
                <label>本文</label>
                <textarea name="" id=""
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>)=>
                        setContent(e.target.value)
                    }
                    value = {content}
                    >
                </textarea>
                <button type="submit">
                    編集
                </button>
            </form>
        </div>
    )
}

export default EditPost