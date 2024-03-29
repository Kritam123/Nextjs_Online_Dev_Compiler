import { Button } from "@/components/ui/button"
import Link from "next/link"

const NotFound = () => {
  return (
    <div 
    className="flex flex-col bg-gray-800  justify-center items-center min-h-[calc(100vh-60px)]">
            <h1 className="text-white text-2xl font-bold">404 Page Error</h1>
        <span className="text-white text-xl font-semibold ">Bhai yo page xaena !</span>
        <span className="text-white text-md mt-3">Bhai Home Page ma ja! </span>
        <Link href={"/"}>
        <Button className="mt-5 font-bold bg-blue-500 text-white" variant={"outline"}>Go Home Page</Button>
        </Link>
    </div>
  )
}

export default NotFound