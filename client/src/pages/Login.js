
import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";


import { AuthContext } from "../context/auth";

import { useForm } from "../util/hooks";


function Login(props) {

    
    const context = useContext(AuthContext);

    // use state default menampung objek kosong
    const [errors, setErrors] = useState({});

    // menggunakan custom hook useform dengan parameter loginusercallbakc dan nilai awal username dan password yg mana mengembalikan onchange onsubmit dan values ketiganya diperoleh dari useform (return valuenya)
    // login user sendiri dapat dari usemutation di bawah 
    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: '',
        password: ''
    });


    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            // sama dengan update: function() {}, diatas adalah shorthand

            // mengugnakan scope fungsi pada context yaitu login
            context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function loginUserCallback() {
        loginUser();
    }
    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}>
                <h1>Login</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                />

                <Form.Input
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />
                <Button type="submit" primary onSubmit={onSubmit}>
                    Login
                </Button>

            </Form>


            {/* list errornya */}

            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((value) => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    );
}

const LOGIN_USER = gql`
# lihat pada resolvers user
  mutation login(
    $username: String!
    $password: String!
  ) {
    login(
        username: $username
        password: $password
    ) {
#    returnnya
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;