import axios from 'axios';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useState } from 'react'

const CreatePost = () => {
    const [title,setTitle] = useState("");
    const [content,setContent] =useState("");
    const router = useRouter();

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault();

        console.log(title,content);

        //APIを叩く
        try {
            await axios.post("http://localhost:3001/api/v1/posts",{
                title: title,
                content: content,
            });

            router.push("/");
        } catch (error) {
            alert("投稿に失敗しました");
        }
    }

    return (
        <div>
            <h1>ブログ新規登録</h1>
            <form onSubmit={handleSubmit}>
                <label>タイトル</label>
                <input type="text" 
                    onChange={(e:ChangeEvent<HTMLInputElement>)=>
                        setTitle(e.target.value)
                } 
            />
                <label>本文</label>
                <textarea name="" id=""
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>)=>
                        setContent(e.target.value)
                    }>

                </textarea>
                <button type="submit">
                    投稿
                </button>
            </form>
        </div>
    )
}

export default CreatePost