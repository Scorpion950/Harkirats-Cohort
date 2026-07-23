import { useState } from "react";
import { PostComponent } from "./Post";
import { Noti } from "./Noti";
import Greetings from "./Greetings";

function App() {
  const [posts, setPosts] = useState([]);

  const postComponents = posts.map((post, index) => (
    <PostComponent
      key={index}
      name={post.title}
      subtitle={post.subtitle}
      time={post.time}
      image={post.image}
      description={post.description}
    />
  ));

  function addPost() {
    setPosts([
      ...posts,
      {
        title: "yash",
        subtitle: "11000 followers",
        time: "2m ago",
        image:
          "https://www.freepnglogos.com/uploads/gta-5-logo-png/gta-v-green-4.png",
        description:
          "What to know how to win big? Check out how these folks won $6000 in bounties.",
      },
    ]);
  }

  return (
    <div style={{ background: "#dfe6e9", height: "100vh" }}>
      <button onClick={addPost}>Add post</button>

      <div>
        <Noti />
      </div>

      <div>
        <Greetings />
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>{postComponents}</div>
      </div>
    </div>
  );
}

export default App;