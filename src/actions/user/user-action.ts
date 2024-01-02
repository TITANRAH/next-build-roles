"use server";

import connectToDatabase from "@/utils/connectToDatabase";
import userModel from "@/utils/models/user";

import z from "zod";

const userSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
});

export async function saveUser(formData: FormData) {
  await connectToDatabase();
  const data = userSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
  });
  if (!data.success) {
    return {
      error: data.error,
      ok: false,
      message: "schema validation failed",
    };
  }

  try {
    const user = await userModel.create(data.data);

    return {
      ok: true,
      user,
      message: "user created successfully",
    };
  } catch (error) {
    return {
      ok: false,
      error,
      message: "failed to save user",
    };
  }
}
