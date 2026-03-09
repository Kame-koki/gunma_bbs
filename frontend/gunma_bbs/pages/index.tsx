import Head from "next/head";
import { PostParams } from "./types";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

type Props = {
  posts: PostParams[];
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3001/api/v1/posts");
  const posts = await res.json();

  console.log(posts);

  return{
    props:{
      posts,
    },
    revalidate: 60 * 60 * 24,
  }
}



export default function Home({ posts }: Props) {
  const router = useRouter();

  const handleDelete = async (postId: string) => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/posts/${postId}`);
      router.reload();
    } catch (error) {
      alert("削除に失敗しました");
    }
  }

  return (
    <div>
      <Head>
        <title>群馬県の掲示板</title>
        <meta name="description" content="自分の好きな群馬県をみんなに届ける" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />4
      </Head>
      <div className="pageContainer">
        <div className="titleContainer">
          <h2>群馬県の掲示板</h2>
        </div>
        <Link href="/create-post" className="createButton">Create new Post</Link>
        {posts.map((post: PostParams) => (
          <div key={post.id} className="">
            <Link href={`posts/${post.id}`} className="">
              <h2>{post.title}</h2>
            </Link>
            <p>{post.content}</p>
            <Link href={`/edit-post/${post.id}`}>
              <button>編集</button>
            </Link>
≈            <button onClick={() => handleDelete(post.id)}>
              削除
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
