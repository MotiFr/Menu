import { cn } from "@/lib/utils";

export default function ({ classname, children }) {
    return <div className={cn("h-full mx-auto", classname)}>{children}</div>
}