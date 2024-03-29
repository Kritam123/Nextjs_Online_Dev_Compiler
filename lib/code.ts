import { db } from "./db";
import { getCurrentUser } from "./getCurrentUser";

export const createCodeApi = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Error("Unauthenticate User !");
    }
    const fullCode = await db.fullCode.create({
      data: {
        html: "code html!",
        css: "code css!",
        javascript: "code js!",
      },
    });
    const newCode = await db.code.create({
      data: {
        ownerName: user.username,
        fullCodeId: fullCode.id,
        ownerInfo: user.id,
        title: "Untitled Code!",
      },
      include: {
        fullCode: true,
      },
    });
    return newCode;
  } catch (error) {
    console.log(error);
  }
};

export const saveCodeApi = async (
  fullCode: { html: string; css: string; javascript: string; id: string },
  codeId: string,
  title: string
) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Error("Unauthenticate User !");
    }
    const findCode = await db.code.findUnique({
      where: {
        id: codeId,
      },
    });
    if (findCode === null) {
      const fullCode = await db.fullCode.create({
        data: {
          html: "code html!",
          css: "code css!",
          javascript: "code js!",
        },
      });
      const newCode = await db.code.create({
        data: {
          ownerName: user.username,
          fullCodeId: fullCode.id,
          ownerInfo: user.id,
          title: "Untitled Code!",
        },
        include: {
          fullCode: true,
        },
      });
      return { id: newCode.id };
    } else {
      const updateCode = await db.code.update({
        where: {
          id: codeId,
        },
        data: {
          title,
        },
      });
      await db.fullCode.update({
        where: {
          id: updateCode.fullCodeId,
        },
        data: {
          css: fullCode.css,
          html: fullCode.html,
          javascript: fullCode.javascript,
        },
      });
      return { id: updateCode.id };
    }
  } catch (error) {
    console.log(error);
  }
};

// get code

export const getCode = async (codeId: string) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Error("Unauthenticate User !");
    }
    let isOwner = false;
    const findCode = await db.code.findUnique({
      where: {
        id: codeId,
      },
      include: {
        fullCode: true,
      },
    });
    if (user?.id === findCode?.ownerInfo) {
      isOwner = true;
    }
    return {
      findCode,
      isOwner,
    };
  } catch (error) {
    console.log(error);
  }
};

// getmycodes

export const getMyCodesApi = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Error("Unauthenticate User !");
    }
    return user.fullCodes;
  } catch (error) {
    console.log(error);
  }
};

// delete code

export const deleteCodeApi = async (codeId: string) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Error("Cannot Found user Profile");
    }
    const existingCode = await db.code.findUnique({
      where: {
        id: codeId,
      },
    });
    if (!existingCode) {
      return new Error("Code not found");
    }
    if (existingCode.ownerInfo.toString() !== user.id.toString()) {
      return new Error("You don't have permission to delete this code!");
    }
    const deleteCode = await db.code.delete({
      where: {
        id: codeId,
      },
    });

    return deleteCode;
  } catch (error) {
    console.log(error);
  }
};
