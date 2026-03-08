import Head from "next/head";
import { PostParams } from "./types";
import Link from "next/link";

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
            <button>編集</button>
            <button>削除</button>
          </div>
        ))}
      </div>

    </div>
  );
}
