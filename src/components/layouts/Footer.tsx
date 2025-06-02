import Image from "next/image";
import { useRouter } from "next/navigation";
import { Divider, Link } from "@nextui-org/react";

const footerNavigation = {
  company: [
    { name: "About", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Get in Touch", href: "#" },
  ],
  platform: [
    { name: "Dashboard", href: "#" },
    { name: "Wallet Features", href: "#" },
    { name: "Rewards", href: "#" },
    { name: "Security Overview", href: "#" },
  ],
  resources: [
    { name: "FAQ", href: "#" },
    { name: "Help Center", href: "#" },
    { name: "Live Support", href: "#" },
    { name: "Blog", href: "#" },
  ],
  legal: [
    { name: "Terms of Use", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "AML/KYC Policy", href: "#" },
    { name: "Risk Disclosure", href: "#" },
  ],
}

const Footer = () => {
  const router = useRouter();

  return (
    <>
      <div className="w-full border ">
        <div className="max-w-[1440px] m-auto">
          <div className="flex pt-20 pb-14">
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex gap-3 items-center">
                <Image
                  src="/assets/logo.png"
                  alt="logo"
                  width={36}
                  height={36}
                />
                <h6 className="font-bold">Controlled Custodial Crypto</h6>
              </div>
              <div className="flex gap-5 items-center">
                <Image
                  src="/assets/icon/discord.svg"
                  alt="discord"
                  width={24}
                  height={24}
                />
                <Image
                  src="/assets/icon/twitter.svg"
                  alt="twitter"
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <div className="flex-2 grid grid-cols-4">
              <div className="flex flex-col gap-5">
                <h6 className="text-sm font-bold">
                  Company
                </h6>
                {footerNavigation.company.map((item) => (
                  <Link key={item.name} className="text-text hover:text-white transition-all duration-200" href={item.href}>
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-5">
                <h6 className="text-sm font-bold">
                  Platform
                </h6>
                {footerNavigation.platform.map((item) => (
                  <Link key={item.name} className="text-text hover:text-white transition-all duration-200" href={item.href}>
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-5">
                <h6 className="text-sm font-bold">
                  Resources
                </h6>
                {footerNavigation.resources.map((item) => (
                  <Link key={item.name} className="text-text hover:text-white transition-all duration-200" href={item.href}>
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-5">
                <h6 className="text-sm font-bold">
                  Legal
                </h6>
                {footerNavigation.legal.map((item) => (
                  <Link key={item.name} className="text-text hover:text-white transition-all duration-200" href={item.href}>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Divider />
          <div className="py-10 flex items-center justify-between">
            <h6 className="text-text text-[14px]">
              Secure Crypto Wallet Built for Performance & Protection.
            </h6>
            <h6 className="text-text text-[14px]">
              © 2025 Only-Stay. All rights reserved.
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
