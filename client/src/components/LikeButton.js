import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

// apollo inilah penghubung type defs beserta resolvernya pada backend dengan frontend
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Label, Icon } from 'semantic-ui-react';


import { AuthContext } from "../context/auth";

// menggunakan destructuring dari props, krn menggunakan {},
// function LikeButton({ post: { id, likeCount, likes } }) { <<< fungsi tanpa destruction
function LikeButton({ post: { id, likeCount, likes } }) {
    
    const { user } = useContext(AuthContext);
    const [liked, setLiked] = useState(false);

    // use effect, ini pertamakali di render
    useEffect(() => {
        if (user && likes.find(like => like.username === user.username)) {
            setLiked(true)
        } else setLiked(false)
    }, 
    // ini adala dependecies tidak wajib ada tapi jika ada maka setipa ada perubahan dependencies paka isi useffect akan dirender ulang,
    // jika ada perubahan user dan likes maka akan dirender ulang, sifatnya adalah or salah 1 berubah logic dalam useeffect di run ulang
    [user, likes]);


    // menggunakan custom hook bawaan apollo
    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        // inisilaisasi parameter bawha mencari post dengan post id id yg dikirim pada komponen ini
        variables: { postId: id }
    });

    const likeButton = user ? (
        liked ? (
            <Button color="teal">
                <Icon name="heart" />
            </Button>
        ) : (
            <Button color="teal" basic>
                <Icon name="heart" />
            </Button>
        )
    ) : (
        <Button as={Link} to="/login" color="teal" basic>
            <Icon name="heart" />
        </Button>
    )

    return (
        <Button as="div" labelPosition="right" onClick={likePost}>
            {likeButton}
            <Label basic color="teal" pointing="left">
                {likeCount}
            </Label>
        </Button>
    )

}

const LIKE_POST_MUTATION = gql`
# deklarasi variabel
  mutation likePost($postId: ID!){
    # variabel diparsing ke typedefs harus ada method ini pada typedefs dengan paramter yg sama
    likePost(postId: $postId){
    # isi bebas, dikarenakan mutation likePost return valuenya adalah post (lihat di typeDefs.js) maka fieldnya ya field yg ada pada type post pada typeDefs tersebut
      id
      likes{
        id username
      }
      likeCount
    }
  }
`

export default LikeButton