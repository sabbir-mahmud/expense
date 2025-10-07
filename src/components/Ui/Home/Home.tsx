"use client";
import { Auth } from "@/components/Auth/Auth";
import Navbar from "@/components/Shared/Navbar/Navbar";

const Home = () => {
    return (
        <div className="container mx-auto">
            <Navbar />
        </div>
    );
};

export default Auth(Home);
