import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import { Button, Confirm, Icon } from 'semantic-ui-react'
import { FETCH_POSTS_QUERY } from '../utils/graphql'

const DeleteButton = ({postId, callback}) => {

    const [confirm, setConfirm] = useState(false);

    const [deletePost] = useMutation(DELETE_POST, {
        update(proxy){
            setConfirm(false);
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            const newPosts = data.getPosts.filter(p => p.id != postId);
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY, 
                data: {
                    getPosts: newPosts
                }
            });
            if(callback) callback();
        },
        variables: {
            postId
        }
    })

    return (
        <>
            <Button as='div' labelPosition='right' floated='right' onClick={() => setConfirm(true)}>
                <Button color='red'>
                    <Icon name='trash' style={{margin: 0}} />
                </Button>
            </Button> 
            <Confirm 
            open={confirm} 
            onCancel={() => {setConfirm(false)}}
            onConfirm={deletePost}
            />
        </>
    )
}

const DELETE_POST = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`;

export default DeleteButton;