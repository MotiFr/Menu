import AppNav from "@/components/App/AppNav";
import Dashboard from "@/components/App/Dashboard";

export default function layout({children}) {
    return <>
    <AppNav />
    {children}
    <Dashboard />
    </>
}