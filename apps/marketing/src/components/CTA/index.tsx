"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "~config/site";
import Link from "next/link";
import useBrowserName from "~hooks/use-browser-name";
import WaitlistForm from "~components/WaitlistForm";

const CTA = () => {
  const browserName = useBrowserName();
  return (
    <>
      {/* <!-- ===== CTA Start ===== --> */}
      <section
        id="waitlist"
        className="py-20 lg:py-25 xl:py-30 px-4 md:px-8 2xl:px-0 overflow-hidden">
        <div className="mx-auto max-w-c-1390 px-7.5 md:px-12.5 xl:px-17.5 py-12.5 xl:py-0 rounded-lg bg-gradient-to-t from-[#F8F9FF] to-[#DEE7FF] dark:bg-gradient-to-t dark:from-transparent dark:to-transparent dark:bg-blacksection dark:stroke-strokedark">
          <div className="flex flex-wrap md:flex-nowrap md:items-center md:justify-between gap-8 md:gap-0">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left md:w-[70%] lg:w-1/2"
            >
              <h2 className="text-black dark:text-white text-3xl xl:text-sectiontitle4 font-bold mb-4 w-11/12">
                Be an Early Adopter and Make a Difference!
              </h2>
              <p>I am committed to providing you with the best experience possible, which is why I am continually updating and enhancing Exo. I strive to make it the ultimate social companion for all users ready to help you cultivate meaningful conversations with others</p>
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right lg:w-[45%]"
            >
              <div className="flex items-center justify-end xl:justify-between">
                <Image
                  width={299}
                  height={299}
                  src="./images/shape/shape-06.svg"
                  alt="Saly"
                  className="hidden xl:block"
                />
                {/* <WaitlistForm /> */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== CTA End ===== --> */}
    </>
  );
};

export default CTA;
