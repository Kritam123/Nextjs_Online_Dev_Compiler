import { Code, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import Link from "next/link";
import { deleteCode } from "@/action/code";
import { handleError } from "@/utils/handleError";
import { useState } from "react";
import { toast } from "sonner";

export default function CodeItem({
    data,
    deleteBtn,
}: {
    data: any;
    deleteBtn: boolean;
}) {

    const [isLoading, setIsLoading] = useState(false)
    const handleDelete = async () => {
        setIsLoading(true)
        try {
          await deleteCode(data.id);
          toast.success("Deleted Code SuccessFully!")
        } catch (error) {
          handleError(error);
        }finally{
            setIsLoading(false)
        }
      };
    return (
        <div className="p-3 rounded cursor-pointer bg-slate-900 flex justify-start items-center flex-col gap-3">
            <div className="__top flex justify-start items-start gap-3 w-full">
                <Code className="text-white" />
                <p className="font-mono font-bold text-white text-lg">{data.title}</p>
            </div>
            <Separator />
            <div className="__btn_container flex gap-3">
                <Link target="_blank" href={`/compiler/${data?.id}`}>
                    <Button variant="secondary">Open Code</Button>
                </Link>
                {deleteBtn && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="destructive" >
                                Delete
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="flex gap-1 justify-center items-center">
                                    <Trash2 />
                                    Delete Code confirmation!
                                </DialogTitle>
                                <div className="__url flex justify-center items-center flex-col gap-1">
                                    <p>
                                        Are you sure, that you want to delete this code, this action
                                        is not reversible.
                                    </p>
                                    <Button
                                        variant="destructive"
                                        className="h-full"
                                        disabled={isLoading}
                                        onClick={handleDelete}
                                    >
                                        Confirm Delete
                                    </Button>
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </div>
    );
}