"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { z } from "zod";
import { IconLoader2, IconUpload } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useNotification } from "@/providers/notificationProvider";
import instance from "@/lib/axios";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const FormSchema1 = z.object({
  avatar: z.instanceof(File),
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email format" }),
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(50, { message: "First name must be less than 50 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(50, { message: "Last name must be less than 50 characters" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be less than 20 characters" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Username must contain only letters and numbers",
    }),
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

const FormSchema3 = z.object({
  avatar: z.instanceof(File),
  phone: z.string().nonempty({ message: "Phone number is required" }),
  address: z.string().nonempty({ message: "Address is required" }),
  govId: z.string().nonempty({ message: "Government ID is required" }),
  idCard: z.string().nonempty({ message: "ID Card is required" }),
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
  email: z.string().email().nonempty({ message: "Email is required" }),
});

const SettingsPage = () => {
  const pathname = usePathname();
  const { toast } = useNotification();
  const [isVisible, setIsVisible] = useState(true);
  const [isVisible2, setIsVisible2] = useState(true);
  const [isVisible3, setIsVisible3] = useState(true);
  const [activeTab, setActiveTab] = useState("userSettings");

  const form1 = useForm<z.infer<typeof FormSchema1>>({
    resolver: zodResolver(FormSchema1),
    defaultValues: {
      avatar: undefined,
      email: "",
      firstName: "",
      lastName: "",
      username: "",
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await instance.get("/api/user/profile");
        if (res.status === 200) {
          const { user } = res.data;
          console.log("user: ", user);

          // Update form values when user data is fetched
          form1.reset({
            // avatar: user.avatar || "/assets/avatars/avatar-sample.jpg",
            email: user.email,
            firstName: user.full_name.split(" ")[0] || "",
            lastName: user.full_name.split(" ")[1] || "",
            username: user.username || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUser();
  }, []);

  const form2 = useForm<z.infer<typeof FormSchema2>>({
    resolver: zodResolver(FormSchema2),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const form3 = useForm<z.infer<typeof FormSchema3>>({
    resolver: zodResolver(FormSchema3),
    defaultValues: {
      avatar: undefined,
      phone: "",
      address: "",
      govId: "",
      idCard: "",
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  async function onSubmit1(data: z.infer<typeof FormSchema1>) {
    try {
      const formData = new FormData();
      formData.append("avatar", data.avatar);
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("username", data.username);

      const res = await instance.put("/api/user/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        console.log("res: ", res.data);
        toast("Profile updated successfully", "Success");
      } else {
        toast(res.data.message, "Error");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast("Failed to update profile", "Error");
    }
  }

  function onSubmit2(data: z.infer<typeof FormSchema2>) {
    toast("Password updated successfully", "Success");
    console.log("data: ", data);
  }

  function onSubmit3(data: z.infer<typeof FormSchema3>) {
    toast("Password updated successfully", "Success");
    console.log("data: ", data);
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <h3>Settings</h3>

      <Tabs
        defaultValue="userSettings"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full flex-col justify-start gap-6"
      >
        <div className="flex items-center justify-between gap-1 flex-wrap">
          <Select
            defaultValue="userSettings"
            onValueChange={(value) => {
              setActiveTab(value);
            }}
          >
            <SelectTrigger
              className="flex !w-full !h-[36px] md:hidden"
              size="sm"
              id="view-selector"
            >
              <SelectValue placeholder="Select a view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="userSettings">User Settings</SelectItem>
              <SelectItem value="kycSettings">KYC Settings</SelectItem>
            </SelectContent>
          </Select>
          <TabsList className="hidden md:flex border-b-[1px] border-border w-full">
            <TabsTrigger value="userSettings" className="!h-9">
              User Settings
            </TabsTrigger>
            <TabsTrigger value="kycSettings" className="!h-9">
              KYC Settings
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          value="userSettings"
          className="relative flex flex-col gap-4"
        >
          <div className="flex flex-col gap-10">
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
                        <div className="flex justify-center sm:justify-start">
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
                                <span className="text-[12px]">
                                  Profile Picture
                                </span>
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
                          <Input
                            placeholder="Enter your first name"
                            {...field}
                          />
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
                          <Input
                            placeholder="Enter your last name"
                            {...field}
                          />
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
                          <Input
                            placeholder="Enter your email"
                            disabled
                            {...field}
                          />
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

                <div className="flex justify-between sm:justify-end gap-4">
                  <Button
                    variant="withdraw"
                    type="submit"
                    className="w-full max-w-[48%] sm:max-w-24 h-10"
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
                    className="w-full max-w-[48%] sm:max-w-34 h-10"
                  >
                    {form1.formState.isSubmitting && (
                      <IconLoader2 className="w-4 h-4 animate-spin" />
                    )}
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
                <div className="flex justify-between sm:justify-end gap-4">
                  <Button
                    variant="withdraw"
                    type="submit"
                    className="w-full max-w-[48%] sm:max-w-24 h-10"
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
                    className="w-full max-w-[48%] sm:max-w-34 h-10"
                  >
                    Update Password
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </TabsContent>
        <TabsContent
          value="kycSettings"
          className="relative flex flex-col gap-4"
        >
          <Form {...form3}>
            <form
              onSubmit={form3.handleSubmit(onSubmit3)}
              className="w-full space-y-6"
            >
              <FormField
                control={form3.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex justify-center sm:justify-start">
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
                              <span className="text-[12px]">
                                Profile Picture
                              </span>
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
                  control={form3.control}
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
                  control={form3.control}
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
                  control={form3.control}
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
                  control={form3.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form3.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form3.control}
                name="govId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Government ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your government id"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form3.control}
                name="idCard"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Card</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your id card" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between sm:justify-end gap-4">
                <Button
                  variant="withdraw"
                  type="submit"
                  className="w-full max-w-[48%] sm:max-w-24 h-10"
                  onClick={(e) => {
                    e.preventDefault();
                    form3.reset();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="deposit"
                  type="submit"
                  className="w-full max-w-[48%] sm:max-w-34 h-10"
                >
                  Update KYC
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
