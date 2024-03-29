"use server";

import { createCodeApi, deleteCodeApi, saveCodeApi } from "@/lib/code";
import { revalidatePath } from "next/cache";

export const createCode = async () => {
    const response = await createCodeApi();
    revalidatePath(`/compiler`);
    return response;
};
export const saveCode = async (fullCode:{html:string,css:string,javascript:string,id:string},codeId:string,title:string) => {
  const response =  await saveCodeApi(fullCode,codeId,title);
  revalidatePath(`/compiler/${codeId}`);
  return response;
};
export const deleteCode = async (codeId:string) => {
 const response =   deleteCodeApi(codeId);
  revalidatePath(`/my-codes`);
  return response;
};
