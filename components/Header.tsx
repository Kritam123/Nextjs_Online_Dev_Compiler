"use client"
import { Button } from "./ui/button";
import { handleError } from "@/utils/handleError";
import { toast } from "sonner";
import { ModeToggle } from "@/components/ModeToogle";
import Link from "next/link";
import { User } from "@prisma/client";
import { UserButton } from "@clerk/nextjs";
import { createCode } from "@/action/code";
import { useRouter } from "next/navigation";
import useCompilerStore from "@/hooks/use-code";
import { Code, Menu } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "./ui/dropdown-menu";
import { useState } from "react";

interface HeaderProps {
    user: User | null
}
export default function Header({ user }: HeaderProps) {
    const { updateCodeTitle, updateFullCode } = useCompilerStore();
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();
    const handleCreateNewCode = async () => {
        setIsLoading(true);
        try {
            const result = await createCode();
            // @ts-ignore
            router.push(`/compiler/${result?.id}`);
            // @ts-ignore
            updateFullCode(result?.fullCode);
            // @ts-ignore
            updateCodeTitle(result?.title);
            toast.success("create new code!");
        } catch (error) {
            handleError(error);
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <nav className="w-full h-[60px] bg-gray-900 text-white p-3 flex justify-between items-center">
            <Link className="flex gap-1" href="/">
                <Code />
                <h2 className="font-bold select-none">Dev Compiler</h2>
            </Link>
            <ul className="flex gap-2">


                {user !== null ? (
                    <div className="flex gap-3 items-center ">
                        <DropdownMenu >
                            <DropdownMenuTrigger asChild>
                                <Menu className="sm:hidden block" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="sm:hidden flex flex-col justify-center items-center" align="end">
                                <DropdownMenuItem >
                                    <Link href="/my-codes">
                                        <Button className="text-white" variant="success">My Codes</Button>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem >
                                    <Button disabled={isLoading} onClick={handleCreateNewCode} className="" variant="secondary">{isLoading ? "Creating New...." : "New Compiler"}</Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div className=" sm:flex max-[640px]:hidden  items-center gap-3">
                            <li>
                                <Link href="/my-codes">
                                    <Button variant="success">My Codes</Button>
                                </Link>
                            </li>
                            <li>
                                <Button onClick={handleCreateNewCode} variant="secondary">New Compiler</Button>

                            </li>



                        </div>
                        <li >
                            <UserButton afterSignOutUrl="/" />
                        </li>
                    </div>
                ) : (
                    <div className="flex items-center ">
                        <DropdownMenu >
                            <DropdownMenuTrigger asChild>
                                <Menu className="sm:hidden block" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="sm:hidden flex flex-col justify-center items-center" align="end">
                                <DropdownMenuItem >
                                    <Link href="/compiler">
                                        <Button  variant="link">Try Compiler</Button>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem >
                                    <Link href="/sign-in">
                                        <Button className="text-white" variant="success">Login</Button>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem >
                                    <Link href="/sign-up">
                                        <Button className="text-white" variant="success">Signup</Button>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <div className=" items-center gap-3 sm:flex max-[640px]:hidden">
                            <li>
                                <Link href="/compiler">
                                    <Button className="text-white" variant="link">Try Compiler</Button>
                                </Link>
                            </li>
                            <li>
                                <Link href="/sign-in">
                                    <Button variant="success">Login</Button>
                                </Link>
                            </li>
                            <li>
                                <Link href="/sign-up">
                                    <Button variant="success">Signup</Button>
                                </Link>
                            </li>
                        </div>
                    </div>
                )}
                <ModeToggle />
            </ul>
        </nav>
    );
}