"use client"
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/")
            .then(response => setData(response.data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return <h1 className="bg-red-300">{data ? data.message : "Loading..."}</h1>;
}

export default Home;