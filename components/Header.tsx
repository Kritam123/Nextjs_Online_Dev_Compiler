"use client"
import { Button } from "./ui/button";
import { handleError } from "@/utils/handleError";
import { toast } from "sonner";
import { ModeToggle } from "@/components/ModeToogle";
import Link from "next/link";
import {  User } from "@prisma/client";
import { UserButton } from "@clerk/nextjs";
import { createCode } from "@/action/code";
import { useRouter } from "next/navigation";
import useCompilerStore from "@/hooks/use-code";
import { Code } from "lucide-react";

interface HeaderProps {
    user: User | null
}
export default function Header({ user }: HeaderProps) {
    const {updateCodeTitle,updateFullCode} = useCompilerStore();
    const router = useRouter();
    const handleCreateNewCode = async()=>{
        try {
            const result = await createCode();
            // @ts-ignore
            router.push(`/compiler/${result?.id }`);
            // @ts-ignore
            updateFullCode(result?.fullCode);
            // @ts-ignore
            updateCodeTitle(result?.title)
            toast.success("create new code!");
        } catch (error) {
            handleError(error);
            console.log(error);
        }
    }
    return (
        <nav className="w-full h-[60px] bg-gray-900 text-white p-3 flex justify-between items-center">
            <Link className="flex gap-1" href="/">
                <Code/>
                <h2 className="font-bold select-none">Dev Compiler</h2>
            </Link>
            <ul className="flex gap-2">


                {user !==null ? (
                    <div className="flex items-center gap-3">
                        <li>
                            <Link href="/my-codes">
                                <Button variant="success">My Codes</Button>
                            </Link>
                        </li>
                        <li>
                            <Button onClick={handleCreateNewCode} variant="secondary">New Compiler</Button>

                        </li>
                        
                        <li className="w-full h-full">
                        <UserButton afterSignOutUrl="/signin" />
                        </li>
                        
                    </div>
                ) : (
                    <>
                        <li>
                            <Link href="/compiler">
                                <Button className="text-white" variant="link">Try Compiler</Button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/signin">
                                <Button variant="success">Login</Button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/signup">
                                <Button variant="success">Signup</Button>
                            </Link>
                        </li>
                    </>
                )}
                <ModeToggle />
            </ul>
        </nav>
    );
}