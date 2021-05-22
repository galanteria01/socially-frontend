import { useQuery } from '@apollo/client';
import gql from 'graphql-tag'
import moment from 'moment';
import React, { useContext } from 'react'
import { Button, Card, Grid, Icon, Image, Label } from 'semantic-ui-react';
import DeleteButton from '../components/DeleteButton';
import LikeButton from '../components/LikeButton';
import { AuthContext } from '../context/auth';

const SinglePost = (props) => {
    const postId = props.match.params.postId;

    const {user} = useContext(AuthContext);

    const {data: {getPost}} = useQuery(POST_QUERY, {
        variables: {
            postId
        }
    })

    let postMarkup;

    if(!getPost){
        postMarkup = (<p>Loading Post...</p>)
    }else{
        const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = getPost;
        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                        floated='right'
                        size='small'
                        src='https://semantic-ui.com/images/avatar/large/elliot.jpg'
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>
                                    {username}
                                </Card.Header>
                                <Card.Meta>
                                    {moment(createdAt).fromNow()}
                                </Card.Meta>
                                <Card.Description>
                                    {body}
                                </Card.Description>
                                <hr />
                                <Card.Content extra>
                                    <LikeButton post={{id, likes, likeCount}}  />
                                    <Button as='div' labelPosition="right">
                                        <Button basic color="blue">
                                            <Icon name="comments" />
                                        </Button>
                                        <Label basic color="blue" pointing="left">
                                            {commentCount}
                                        </Label>
                                    </Button>
                                    {user && user.username === username && <DeleteButton postId={{id}} />}
                                </Card.Content>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }


    return (
        <div>
            
        </div>
    )
}

const POST_QUERY = gql`
    query($postId: ID!) {
        getPost(postId: $postId ){
            id body createdAt username likeCount 
            likes{
                username
            }
            commentCount
            comments{
                id username createdAt body
            }
        }
    }
`


export default SinglePost
