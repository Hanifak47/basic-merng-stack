import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { Button, Icon, Confirm } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from '../util/graphql';

import MyPopup from '../util/MyPopup';

function DeleteButton({ postId, commentId, callback }) {

    const [confirmOpen, SetConfirmOpen] = useState(false);


    // jika parsing id coment maka ini semua menjalankan hapus komen di postingan tertentu, jika tidak maka menjalankan hapus postingan
    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    const [deletePostOrMutation] = useMutation(mutation, {
        update(proxy) {
            SetConfirmOpen(false);
            if (!commentId) {
                // membaca cache
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                });
                // mencari data
                data.getPosts = data.getPosts.filter(p => p.id !== postId);
                // menulis cache
                proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
            }
            if (callback) callback();
        },

        variables: {
            postId,
            commentId
        }
    })


    return (
        <>


            <MyPopup
                content={commentId ? "Delete Comment" : "Delete Post"}
            >
                <Button
                    as="div"
                    color="red"
                    floated="right"
                    onClick={() => SetConfirmOpen(true)}
                >
                    <Icon name="trash" style={{ margin: 0 }} />
                </Button>
            </MyPopup>

            <Confirm
                open={confirmOpen}
                onCancel={() => SetConfirmOpen(false)}
                onConfirm={deletePostOrMutation}
            />
        </>

    )
}

const DELETE_POST_MUTATION = gql`
mutation deletePost($postId: ID!){
    deletePost(postId: $postId)
}
`

const DELETE_COMMENT_MUTATION = gql`
mutation deleteComment($postId: ID!, $commentId: ID!){
    deleteComment(postId: $postId, commentId: $commentId){
        id
        comments{
            id username createdAt body
        }
        commentCount
    }
}
`

export default DeleteButton;