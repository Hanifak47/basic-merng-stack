import React, { useContext } from "react";

import { useQuery } from '@apollo/react-hooks'
// import gql from 'graphql-tag';

import { Grid } from "semantic-ui-react";

import { AuthContext } from '../context/auth'
import PostCard from '../components/PostCard';

import PostForm from '../components/PostForm';

import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {


  const { user } = useContext(AuthContext);

  // const result = useQuery(FETCH_POSTS_QUERY);
  // lalu memanggil result.loading dan result.data


  // const { loading, data} = useQuery(FETCH_POSTS_QUERY);

  // Tambahkan = {} di akhir agar jika data kosong, aplikasi tidak crash
  const { loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS_QUERY);

  
  // const { loading, data: { getPosts: posts }  } = useQuery(FETCH_POSTS_QUERY);

  console.log('posts di home:', posts);
  
  // const { loading, data: { getPosts: posts } } = useQuery(FETCH_POSTS_QUERY);

  // if (data) {
  //     console.log(data);
  // }

  return (
    <Grid columns={3} >
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>

        {
          user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )
        }

        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid >
  );
}

export default Home;