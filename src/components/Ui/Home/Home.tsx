"use client";
import { Auth } from "@/components/Auth/Auth";
import Navbar from "@/components/Shared/Navbar/Navbar";
import Charts from "./Charts";
import Overview from "./Overview";
import Transactions from "./Transactions";

const Home = () => {
    return (
        <div className="container mx-auto">
            <Navbar />
            <Overview />
            <Charts />
            <Transactions />
        </div>
    );
};

export default Auth(Home);
