import Head from "next/head";
import { Post } from "./types";
import Link from "next/link";

type Props = {
  posts: Post[];
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

      <div className="">
        <h2>群馬県の掲示板</h2>
        <Link href="/create-post" className="">Create new Post</Link>
        {posts.map((post: Post) => (
          <div key={post.id} className="">
            <Link href={`posts/${post.id}`} className="">
              <h2>{post.title}</h2>
            </Link>
            <p>{post.content}</p>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        ))}
      </div>

    </div>
  );
}
