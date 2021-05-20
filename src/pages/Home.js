import React from 'react'
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag'
import { Grid, Header } from 'semantic-ui-react';
import PostCard from '../components/PostCard';

const Home = () => {

    const { loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS_QUERY)

    
    return (
        <Grid columns={3}>
            <Grid.Row style={{display:'flex', justifyContent: 'center', marginTop: 10}}>
                <h2>Recent posts</h2>
            </Grid.Row>
            <Grid.Row>
                {loading ? ( <h1>Loading posts</h1> ) : (
                    posts && posts.map(post => (
                        <Grid.Column key={post.id} style={{marginBottom: 10}}>
                            <PostCard post={post} />
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
    )
}

const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
            id
            body
            createdAt
            username
            likeCount
            likes{
                username
            }
            commentCount
            comments{
                body
                id
                username
                createdAt
            }
        }
    }
`;

export default Home
