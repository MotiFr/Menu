import AppNav from "@/components/App/AppNav";
import Dashboard from "@/components/App/Dashboard";
import { Suspense } from "react";

export default function layout({children}) {
    return <>
    <Suspense>
    <AppNav />
    {children}
    <Dashboard />
    </Suspense>
    </>
}