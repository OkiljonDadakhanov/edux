import { getImagePrefix } from "@/utils/util";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center flex-shrink-0 hover:opacity-90 transition-opacity">
      <Image
        src={`${getImagePrefix()}images/logo/edux.png`}
        alt="EduX Logo"
        width={140}
        height={55}
        className="h-auto w-[100px] sm:w-[120px] lg:w-[140px] object-contain" 
        quality={100}
        priority
      />
    </Link>
  );
};

export default Logo;
