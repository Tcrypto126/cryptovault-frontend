"use client";

import { useState } from "react";
import Image from "next/image";
import { useNotification } from "@/providers/notificationProvider";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconEye, IconEyeOff, IconUpload } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema1 = z.object({
  avatar: z.instanceof(File),

  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email format" }),

  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
  username: z.string().nonempty({ message: "Username is required" }),
});

const FormSchema2 = z
  .object({
    oldPassword: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
      }),

    newPassword: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
      }),

    confirmPassword: z
      .string()
      .nonempty({ message: "Please confirm your new password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const Settings = () => {
  const { toast } = useNotification();
  const [isVisible, setIsVisible] = useState(true);
  const [isVisible2, setIsVisible2] = useState(true);
  const [isVisible3, setIsVisible3] = useState(true);

  const form1 = useForm<z.infer<typeof FormSchema1>>({
    resolver: zodResolver(FormSchema1),
    defaultValues: {
      avatar: undefined,
      email: "sdfds@asd.com",
      firstName: "kaori",
      lastName: "fujio",
      username: "kaori125",
    },
  });

  const form2 = useForm<z.infer<typeof FormSchema2>>({
    resolver: zodResolver(FormSchema2),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit1(data: z.infer<typeof FormSchema1>) {
    toast("Profile updated successfully", "Success");
    console.log("data: ", data);
  }

  function onSubmit2(data: z.infer<typeof FormSchema2>) {
    toast("Password updated successfully", "Success");
    console.log("data: ", data);
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <h3>Settings</h3>
      <div className="flex flex-col gap-6">
        <Form {...form1}>
          <form
            onSubmit={form1.handleSubmit(onSubmit1)}
            className="w-full space-y-6"
          >
            <FormField
              control={form1.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <label
                        htmlFor="file-input"
                        style={{
                          width: "200px",
                          height: "200px",
                          borderRadius: "5px",
                          border: "1px solid #373940",
                          cursor: "pointer",
                        }}
                        className="overflow-hidden flex justify-center items-center bg-[#02050eee]"
                      >
                        {field.value ? (
                          <Image
                            src={URL.createObjectURL(field.value)}
                            alt="Profile avatar"
                            width={200}
                            height={200}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex flex-col gap-3 items-center justify-center">
                            <IconUpload width="20" height="20" />
                            <span className="text-[12px]">Profile Picture</span>
                          </div>
                        )}
                      </label>
                      <Input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            field.onChange(file);
                          }
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full grid grid-cols-2 gap-4 gap-y-6">
              <FormField
                control={form1.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form1.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form1.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form1.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                variant="withdraw"
                type="submit"
                className="w-full max-w-24 h-10"
                onClick={(e) => {
                  e.preventDefault();
                  form1.reset();
                }}
              >
                Cancel
              </Button>
              <Button
                variant="deposit"
                type="submit"
                className="w-full max-w-34 h-10"
              >
                Update Profile
              </Button>
            </div>
          </form>
        </Form>

        <Form {...form2}>
          <form
            onSubmit={form2.handleSubmit(onSubmit2)}
            className="w-full space-y-6"
          >
            <FormField
              control={form2.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={`${isVisible ? "password" : "text"}`}
                        placeholder="Enter your old password"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form2.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={`${isVisible2 ? "password" : "text"}`}
                        placeholder="Enter your new password"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form2.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={`${isVisible3 ? "password" : "text"}`}
                        placeholder="Enter your confirm password"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-4">
              <Button
                variant="withdraw"
                type="submit"
                className="w-full max-w-24 h-10"
                onClick={(e) => {
                  e.preventDefault();
                  form2.reset();
                }}
              >
                Cancel
              </Button>
              <Button
                variant="deposit"
                type="submit"
                className="w-full max-w-34 h-10"
              >
                Update Password
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Settings;
