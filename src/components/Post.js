import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

function Post({ idPost }) {
  const GET_POST = gql`
  query {
    post(id: ${idPost}) {
      id
      title
      body
      img
    }
  }
`;

  return (
    <Query query={GET_POST}>
      {({ loading, data }) =>
        !loading && (
          <div className="PostList">
            <div
              key={data.post.id}
              className="Post Open"
              id={"post_" + data.post.id}
            >
              <div className="PostItem">
                <img
                  src={process.env.PUBLIC_URL + data.post.img}
                  alt={data.post.title}
                />
                <h3>{data.post.title}</h3>
                <p>{data.post.body}</p>
              </div>
            </div>
          </div>
        )
      }
    </Query>
  );
}

export default Post;
