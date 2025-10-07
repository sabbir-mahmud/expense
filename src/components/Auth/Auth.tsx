"use client";

import { useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

export function Auth<T extends object>(Component: ComponentType<T>) {
    return function WithAuth(props: T) {
        const router = useRouter();
        const token = useAppSelector((state) => state.token?.token);

        useEffect(() => {
            if (!token) {
                router.push("/auth/login");
            }
        }, [token, router]);

        return <Component {...props} />;
    };
}
