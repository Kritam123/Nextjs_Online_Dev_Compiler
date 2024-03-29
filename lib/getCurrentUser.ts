import { currentUser } from "@clerk/nextjs";
import { db } from "./db";

export const getCurrentUser = async () => {
  const user = await currentUser();
  if(!user) {
    return null;
  }
  const dbUser = await db.user.findUnique({
    where: {
      externalUserId: user?.id,
    },
    include: {
      fullCodes: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          fullCode: true,
        },
      },
    },
  });
  return dbUser;
};
