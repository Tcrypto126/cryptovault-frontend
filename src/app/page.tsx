"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useNotification } from "@/providers/notificationProvider";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EmblaOptionsType } from 'embla-carousel'
import { ArrowRightIcon } from "@/components/ui/icon";

import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import EmblaCarousel from "@/components/EmblaCarousel";
import { AccordionDemo } from "@/components/Faq";

import './css/embla.css'

const Home = () => {
  const { setTheme } = useTheme();
  const { toast } = useNotification();

  const OPTIONS: EmblaOptionsType = {
    dragFree: true,
    loop: true
  };
  const OPTIONS2: EmblaOptionsType = {
    dragFree: true,
    direction: 'rtl',
    loop: true
  };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <div className="bg-background relative z-0 overflow-hidden">
      <Header />

      <Image
        src="/assets/home/hero-stars.svg"
        alt="stars"
        width={2880}
        height={3105}
        className="absolute top-0 left-0 lg:w-full z-10"
      />
      <Image
        src="/assets/home/light.svg"
        alt="light"
        width={403}
        height={476}
        className="absolute top-0 left-0 z-10"
      />
      <Image
        src="/assets/home/light-top.png"
        alt="light-top"
        width={806}
        height={434}
        className="absolute top-0 right-[16%]"
      />
      <div className="absolute top-[1500px] left-0 w-full">
        <Image
          src="/assets/home/stars.svg"
          alt="stars"
          width={2880}
          height={3105}
          className="w-full"
        />
        <Image
          src="/assets/home/stars.svg"
          alt="stars"
          width={2880}
          height={3105}
          className="w-full"
        />
        <Image
          src="/assets/home/stars.svg"
          alt="stars"
          width={2880}
          height={3105}
          className="w-full"
        />
        <Image
          src="/assets/home/stars.svg"
          alt="stars"
          width={2880}
          height={3105}
          className="w-full"
        />
      </div>

      <div className="w-full relative z-20">
        <div className="max-w-[1440px] m-auto px-2.5 lg:px-20 py-[92px]">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 py-6 md:py-14 md:pl-5 z-20">
              <Button className="border-border bg-[#0A0D1F] hover:bg-[#0A0D1F] border-[1px] rounded-full text-[14px] text-white !px-4 !py-2">
                Flexible Plans for You
                <ArrowRightIcon width="12" height="9" />
              </Button>
              <h2 className="leading-[1.35em] mt-3">
                Control {" "}
                <span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#cabbf0] to-[#632EE4]"
                >
                  Your Crypto
                </span>
                . Earn Rewards. Stay Secure.
              </h2>
              <p className="mt-6 ">
                A next-gen custodial crypto wallet built for simplicity, speed, and safety.
              </p>
              <div className="flex gap-3 mt-8 flex-wrap">
                <Button className="login-button !w-[141px] !h-[52px]">
                  Create Free Account
                </Button>
                <Button className="signup-button !w-[141px] !h-[52px]">
                  Watch 60s Demo
                </Button>
              </div>
            </div>
            <div className="relative flex-1 flex justify-center z-0">
              <Image
                src="/assets/home/light-bar.svg"
                alt="light-bar"
                width={224}
                height={760}
                className="h-[600px] md:h-[760px] mt-10 md:-mt-[92px]"
              />
              <Image
                src="/assets/home/bitcoin.png"
                alt="polygon"
                width={170}
                height={170}
                className="w-[140px] md:w-[170px] absolute top-0"
              />
              <Image
                src="/assets/home/usd.png"
                alt="usd"
                width={170}
                height={170}
                className="w-[140px] md:w-[170px] absolute top-[30%]"
              />
              <Image
                src="/assets/home/polygon.png"
                alt="bitcoin"
                width={170}
                height={170}
                className="w-[140px] md:w-[170px] absolute top-[60%]"
              />
            </div>
          </div>

          <div className="relative -mt-[140px]">
            <Image
              src="/assets/home/dashboard.png"
              width={1284}
              height={783}
              alt="dashboard"
              className="w-full hidden md:block"
            />
            <Image
              src="/assets/home/dashboard-mobile.png"
              width={750}
              height={516}
              alt="dashboard"
              className="w-full block md:hidden"
            />
          </div>

          <div className="py-6 md:py-10">
            <h3 className="text-center">
              Empowering the Future of Finance
            </h3>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-6 mt-4 md:mt-12">
              <Image
                src="/assets/home/coin-brand-1.png"
                alt="coin"
                width={151}
                height={47}
              />
              <Image
                src="/assets/home/coin-brand-2.png"
                alt="coin"
                width={151}
                height={47}
              />
              <Image
                src="/assets/home/coin-brand-3.png"
                alt="coin"
                width={151}
                height={47}
              />
              <Image
                src="/assets/home/coin-brand-4.png"
                alt="coin"
                width={151}
                height={47}
              />
              <Image
                src="/assets/home/coin-brand-5.png"
                alt="coin"
                width={151}
                height={47}
              />
              <Image
                src="/assets/home/coin-brand-6.png"
                alt="coin"
                width={151}
                height={47}
              />
              <Image
                src="/assets/home/coin-brand-4.png"
                alt="coin"
                width={151}
                height={47}
              />
              <Image
                src="/assets/home/coin-brand-6.png"
                alt="coin"
                width={151}
                height={47}
              />
              <Image
                src="/assets/home/coin-brand-5.png"
                alt="coin"
                width={151}
                height={47}
              />
              <Image
                src="/assets/home/coin-brand-3.png"
                alt="coin"
                width={151}
                height={47}
              />
              <Image
                src="/assets/home/coin-brand-2.png"
                alt="coin"
                width={151}
                height={47}
              />
              <Image
                src="/assets/home/coin-brand-1.png"
                alt="coin"
                width={151}
                height={47}
              />
            </div>
          </div>

          <div className="py-6 md:py-10">
            <h3 className="text-center">
              Why Choose Our Wallet?
            </h3>
            <p className="mt-3 text-center">
              Built for real people. Trusted by thousands. Designed for the future.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4 md:mt-10">
              <Image
                src="/assets/home/card1.png"
                alt="card"
                width={411}
                height={428}
                className="m-auto"
              />
              <Image
                src="/assets/home/card2.png"
                alt="card"
                width={411}
                height={428}
                className="m-auto"
              />
              <Image
                src="/assets/home/card3.png"
                alt="card"
                width={411}
                height={428}
                className="m-auto"
              />
              <Image
                src="/assets/home/card4.png"
                alt="card"
                width={411}
                height={428}
                className="m-auto"
              />
              <Image
                src="/assets/home/card5.png"
                alt="card"
                width={411}
                height={428}
                className="m-auto"
              />
              <Image
                src="/assets/home/card6.png"
                alt="card"
                width={411}
                height={428}
                className="m-auto"
              />
            </div>
          </div>

          <div className="py-6 md:py-10">
            <h3 className="text-center">
              How It Works
            </h3>
            <p className="mt-3 text-center">
              Built for real people. Trusted by thousands. Designed for the future.
            </p>
            <div>
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-0 justify-between py-6 md:py-10">
                <div className="w-full sm:w-[45%]">
                  <h3 className="!text-xl md:!text-4xl !font-medium text-[#C6C8D0]">
                    Sign Up in Seconds
                  </h3>
                  <h1 className="!text-[195px] md:!text-[250px] lg:!text-[308px] text-center text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#ffffff]">
                    01
                  </h1>
                </div>
                <div>
                  <Separator orientation="vertical" className="!bg-white hidden sm:block" />
                  <Separator orientation="horizontal" className="!bg-white sm:hidden" />
                </div>
                <div className="w-full sm:w-[45%] space-y-3 sm:space-y-0">
                  <h5 className="text-[#C6C8D0]">
                    Just an email and password – no delays.
                  </h5>
                  <div className="h-[87%] md:h-[95%] flex justify-center sm:justify-start items-center">
                    <Image
                      src="/assets/home/roadmap1.png"
                      width={544}
                      height={440}
                      alt="roadmap"
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col-reverse sm:flex-row gap-6 sm:gap-0 justify-between py-6 md:py-10">
                <div className="w-full sm:w-[45%] space-y-3 sm:space-y-0">
                  <h5 className="text-[#C6C8D0]">
                    Deposit crypto or fiat and earn up to 5% bonus.
                  </h5>
                  <div className="h-[87%] md:h-[95%] flex justify-center sm:justify-start items-center">
                    <Image
                      src="/assets/home/roadmap2.png"
                      width={544}
                      height={440}
                      alt="roadmap"
                      className="rounded-xl"
                    />
                  </div>
                </div>
                <div>
                  <Separator orientation="vertical" className="!bg-white hidden sm:block" />
                  <Separator orientation="horizontal" className="!bg-white sm:hidden" />
                </div>
                <div className="w-full sm:w-[45%]">
                  <h3 className="!text-xl md:!text-4xl !font-medium text-[#C6C8D0]">
                    Fund Your Wallet
                  </h3>
                  <h1 className="!text-[195px] md:!text-[250px] lg:!text-[308px] text-center text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#ffffff]">
                    02
                  </h1>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-0 justify-between pt-6 md:pt-10">
                <div className="w-full sm:w-[45%]">
                  <h3 className="!text-xl md:!text-4xl !font-medium text-[#C6C8D0]">
                    Use, Send or Withdraw
                  </h3>
                  <h1 className="!text-[195px] md:!text-[250px] lg:!text-[308px] text-center text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#ffffff]">
                    03
                  </h1>
                </div>
                <div>
                  <Separator orientation="vertical" className="!bg-white hidden sm:block" />
                  <Separator orientation="horizontal" className="!bg-white sm:hidden" />
                </div>
                <div className="w-full sm:w-[45%] space-y-3 sm:space-y-0">
                  <h5 className="text-[#C6C8D0]">
                    Just an email and password – no delays.
                  </h5>
                  <div className="h-[87%] md:h-[95%] flex justify-center sm:justify-start items-center">
                    <Image
                      src="/assets/home/roadmap3.png"
                      width={544}
                      height={440}
                      alt="roadmap"
                      className="sm:max-h-[266px] md:max-h-[439px] rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="py-6 md:py-10">
            <h3 className="text-center">
              Trusted by Thousands Around the World
            </h3>
            <div className="mt-4 sm:mt-10 py-4">
              <div className="relative flex flex-col gap-6">
                <Image
                  src="/assets/home/left-side.png"
                  alt="left-side"
                  width={200}
                  height={576}
                  className="h-full absolute top-0 -left-[160px] sm:-left-[5px] z-20"
                />
                <Image
                  src="/assets/home/right-side.png"
                  alt="right-side"
                  width={200}
                  height={576}
                  className="h-full absolute top-0 -right-[160px] sm:-right-[5px] z-20"
                />
                <EmblaCarousel slides={SLIDES} options={OPTIONS} direction="left" />
                <EmblaCarousel slides={SLIDES} options={OPTIONS2} direction="right" />
                <EmblaCarousel slides={SLIDES} options={OPTIONS} direction="left" />
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center px-2 sm:px-12 py-16 sm:py-12 rounded-2xl border-border border-[1px] bg-[url('/assets/home/deposit_bg.png')] bg-cover bg-center bg-no-repeat">
            <Image
              src="/assets/home/coin_group.png"
              alt="coin-group"
              width={333}
              height={237}
            />
            <h1 className="text-center">
              Deposit $500+ and Get $100 Instantly
            </h1>
            <h4 className="mt-4 text-center">
              Hurry — offer ends Sept 30th!
            </h4>
            <Button className="login-button mt-7">
              Deposit Now
            </Button>
          </div>

          <div className="py-6 md:py-10">
            <h3 className="text-center">
              Frequently Asked Questions
            </h3>
            <div className="flex justify-center mt-10">
              <AccordionDemo />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
