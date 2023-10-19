import { Form } from "react-router-dom";

export default function Login() {
    return (
        <div id="login">
            <Form method="post">
                <input
                    type="text"
                    name="username"
                    placeholder="Username" 
                />
                <input 
                    type="password" 
                    name="password"
                    placeholder="Password" 
                />
                <button
                    name="favorite"
                    value="Submit"
                    aria-label="Submit"
                >
                    Submit
                </button>
            </Form>
        </div>
    )
}