import z from "zod";

export const schema = z.object({
  username: z.string().min(1, "Обязательное поле"),
  password: z.string().min(1, "Обязательное поле"),
});
