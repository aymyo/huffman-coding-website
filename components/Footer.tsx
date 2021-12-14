import Link from "next/link";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="bg-primary text-light pt-4">
      <div className="h-44 bg-tesselation-3-pattern bg-repeat-x animation-wave"></div>
      <div className="flex justify-center items-center text-xs pb-6 pt-5 font-serif italic">
        <p>Developed by</p>
        <Link href="https://github.com/aymyo">
          <a target="_blank" className="btn-light text-xs font-base ml-1 mb-1">
            @aymyo
          </a>
        </Link>
      </div>
    </footer>
  );
};
