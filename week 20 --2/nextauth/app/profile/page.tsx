"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Profile() {
    const [profilePicture, setProfilePicture] = useState("");

    useEffect(() => {
        async function getProfile() {
            const res = await axios.get("http://localhost:3000/api/profile");
            setProfilePicture(res.data.avatarUrl);
        }

        getProfile();
    }, []);

    return (
        <div>
            {profilePicture}
        </div>
    );
}