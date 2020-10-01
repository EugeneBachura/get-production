import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_POSTS = gql`
  query {
    posts {
      id
      title
      prev
      img
    }
  }
`;

function PostList({ idOpenPost }) {
  return (
    <Query query={GET_POSTS}>
      {({ loading, data }) =>
        !loading && (
          <div className="PostList">
            {data.posts.map((post) => (
              <div key={post.id} className="Post" id={"post_" + post.id}>
                <div className="PostItem">
                  <img
                    src={process.env.PUBLIC_URL + post.img}
                    alt={post.title}
                  />
                </div>
                <div className="PostItem">
                  <h3>{post.title}</h3>
                  <p>{post.prev}</p>
                  <button
                    type="submit"
                    href="#"
                    onClick={() => idOpenPost(post.id)}
                  >
                    Подробнее...
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      }
    </Query>
  );
}

export default PostList;
