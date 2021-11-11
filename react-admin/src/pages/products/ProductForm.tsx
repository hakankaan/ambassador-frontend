import { Button, TextField } from "@mui/material";
import axios from "axios";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import Layout from "../../components/Layout";

const ProductForm = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [redirect, setRedirect] = useState<boolean>(false);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            (async () => {
                const { data } = await axios.get(`products/${id}`);

                setTitle(data.title);
                setDescription(data.description);
                setImage(data.image);
                setPrice(data.price);
            })();
        }
    }, []);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const data = {
            title,
            description,
            image,
            price,
        };

        if(id){
            await axios.put(`products/${id}`, data)
        } else {
            await axios.post("products", data);
        }

        setRedirect(true);
    };

    if (redirect) {
        return <Navigate to="/products" />;
    }

    return (
        <Layout>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <TextField
                        label="Title"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setTitle(e.target.value)
                        }
                        value={title}
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        label="Description"
                        rows={4}
                        multiline
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setDescription(e.target.value)
                        }
                        value={description}
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        label="Image"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setImage(e.target.value)
                        }
                        value={image}
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        label="Price"
                        type="number"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setPrice(parseFloat(e.target.value))
                        }
                        value={price}
                    />
                </div>
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </form>
        </Layout>
    );
};

export default ProductForm;
