import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import { Button, Container, Form, Header } from 'semantic-ui-react'

const Register = () => {

    const [errors, setErrors] = useState({});

    const [values,setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const onChange = (e) => {
        setValues({
            ...values,[e.target.name]: e.target.value
        })
    }
    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(proxy,result){
            console.log(result);
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })

    const onSubmit = (e) => {
        e.preventDefault();
        addUser();
    }

    

    return (
        <Container>
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
            <Header as='h1' textAlign='center'>
                Register
            </Header>
                <Form.Input
                label="Username"
                placeholder="johndoe12"
                name="username"
                type="text"
                value={values.username}
                onChange={onChange}
                />
                <Form.Input
                label="Email"
                placeholder="johndoe12@gmail.com"
                name="email"
                type="email"
                value={values.email}
                onChange={onChange}
                />
                <Form.Input
                label="Password"
                placeholder="password"
                name="password"
                type="password"
                value={values.passsword}
                onChange={onChange}
                />
                <Form.Input
                label="Confirm password"
                placeholder="password"
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={onChange}
                />
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>

            {Object.keys(errors).length > 0 && <div className="ui error message">
                <ul className="list">
                    {
                        Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))
                    }
                </ul>
            </div>}
        </Container>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            id 
            email 
            username 
            createdAt 
            token
        }
    }
`

export default Register
