import React from "react";
import Section from "./Section";

import Image from "next/image";
import { socials } from "@/constants";
import Link from "next/link";

const Footer = () => {
  return (
    <Section crosses className="!px-0 !py-10">
      <div className="container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col">
        <p className="caption text-n-4 lg:block">
          © {new Date().getFullYear()}. Все права защищены.
        </p>

        <ul className="flex gap-5 flex-wrap">
          {socials.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              target="_blank"
              className="flex items-center justify-center w-10 h-10 bg-n-7 rounded-full transition-colors hover:bg-n-6"
            >
              <Image src={item.iconUrl} width={16} height={16} alt={item.title} />
            </Link>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default Footer;
