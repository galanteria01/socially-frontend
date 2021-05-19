import React from 'react'
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'

const PostCard = ({post: {body, createdAt, username, id, likeCount, commentCount, likes}}) => {

    const likePost = () => {

    }

    const commentOnPost = () => {
        console.log("Comment on post")
    }

    return (
        <Card fluid>
            <Card.Content>
                <Image
                floated='right'
                size='mini'
                src='https://semantic-ui.com/images/avatar/large/elliot.jpg'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>
                {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button as='div' labelPosition='right'>
                    <Button color='teal' basic>
                        <Icon name='heart' />
                    </Button>
                    <Label as='a' basic color='teal' pointing='left' onClick={likePost}>
                        {likeCount}
                    </Label>
                </Button>
                <Button as='div' labelPosition='right'>
                    <Button basic color='blue'>
                        <Icon name='comments' />
                    </Button>
                    <Label as='a' basic color='blue' pointing='left' onClick={commentOnPost}>
                        {commentCount}
                    </Label>
                </Button>
            </Card.Content>
        </Card>
    )
}

export default PostCard
