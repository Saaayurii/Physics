import Image from "next/image";
import Section from "./Section";
import Heading from "./Heading";
import PricingList from "./PricingList";
import { smallSphere, stars } from "@/public/assets";
import { LeftLine, RightLine } from "./design/Pricing";
import Link from "next/link";

const Pricing = () => {
  return (
    <Section className="overflow-hidden" id="pricing">
      <div className="container relative z-2">
        <div className="hidden relative justify-center mb-[6.5rem] lg:flex">
          <Image
            src={smallSphere}
            className="relative z-1"
            width={255}
            height={255}
            alt="Sphere"
          />
          <div className="absolute top-1/2 left-1/2 w-[60rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <Image
              src={stars}
              className="w-full"
              width={950}
              height={400}
              alt="Stars"
            />
          </div>
        </div>

        <Heading
          tag="Начать структурный синтез программ"
          title="Выберите нужный синтез"
        />

        <div className="relative">
          <PricingList />
          <LeftLine />
          <RightLine />
        </div>

        <div className="flex justify-center mt-10">
          <Link
            className="text-xs font-code font-bold tracking-wider uppercase border-b"
            href="/pricing"
          >
            Смотрите полную информацию
          </Link>
        </div>
      </div>
    </Section>
  );
};

export default Pricing;
