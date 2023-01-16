"use client";

import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";

type Tprops = {
  path: string;
  children: React.ReactNode;
  className?: string;
};

export default function NavLink({ path, children, className }: Tprops) {
  const pathName = usePathname();
  const segments = useSelectedLayoutSegment();

  const isPathActive = (): boolean => {
    if (pathName && path === pathName) {
      return true;
    } else if (segments) {
      if (path.includes(segments)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <Link
      href={path}
      className={` sm:text-xl flex flex-col items-center py-3 data-[active=true]:text-CustomActive sm:data-[active=true]:text-CustomWhite  sm:flex-row  sm:px-3 sm:data-[active=true]:bg-CustomActive sm:gap-2 sm:items-center ${className} group`}
      data-active={isPathActive()}
      replace
    >
      {children}
    </Link>
  );
}
