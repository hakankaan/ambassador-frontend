import { Button, TextField } from "@mui/material";
import axios from "axios";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import Layout from "../components/Layout";

const Profile = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");

    useEffect(() => {
        (async () => {
            const { data } = await axios.get("user");

            setFirstName(data.first_name);
            setLastName(data.last_name);
            setEmail(data.email);
        })();
    }, []);

    const infoSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        await axios.put("users/info", {
            first_name: firstName,
            last_name: lastName,
            email
        })
    }
    const passwordSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        await axios.put("users/password", {
            password,
            password_confirm: passwordConfirm
        })
    }

    return (
        <Layout>
            <h3>Account Information</h3>
            <form onSubmit={infoSubmit}>
                <div className="mb-3">
                    <TextField
                        label="First Name"
                        value={firstName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setFirstName(e.target.value)
                        }
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        label="Last Name"
                        value={lastName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setLastName(e.target.value)
                        }
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setEmail(e.target.value)
                        }
                    />
                </div>
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </form>

            <h3 className="mt-4">Change Password</h3>
            <form onSubmit={passwordSubmit}>
                <div className="mb-3">
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setPassword(e.target.value)
                        }
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        label="Password Confirm"
                        type="password"
                        value={passwordConfirm}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setPasswordConfirm(e.target.value)
                        }
                    />
                </div>
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </form>
        </Layout>
    );
};

export default Profile;
