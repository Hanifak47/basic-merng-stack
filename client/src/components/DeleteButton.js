import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { Button, Icon, Confirm } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from '../util/graphql';

function DeleteButton({ postId, callback }) {

    const [confirmOpen, SetConfirmOpen] = useState(false);

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(proxy) {
            SetConfirmOpen(false);

            // membaca cache
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            // mencari data
            data.getPosts = data.getPosts.filter(p => p.id !== postId);
            // menulis cache
            proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
            if (callback) callback();
        },

        variables: {
            postId
        }
    })


    return (
        <>
            <Button
                as="div"
                color="red"
                floated="right"
                onClick={() => SetConfirmOpen(true)}
            >
                <Icon name="trash" style={{ margin: 0 }} />
            </Button>

            <Confirm
                open={confirmOpen}
                onCancel={() => SetConfirmOpen(false)}
                onConfirm={deletePost}
            />
        </>

    )
}

const DELETE_POST_MUTATION = gql`
mutation deletePost($postId: ID!){
    deletePost(postId: $postId)
}
`

export default DeleteButton;