import { getImagePrefix } from "@/utils/util";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="block">
      <Image
        src={`${getImagePrefix()}images/logo/edux.png`}
        alt="logo"
        width={90}      // smaller size
        height={40}
        className="w-[90px] h-auto md:w-[110px] lg:w-[130px]" 
        quality={100}
      />
    </Link>
  );
};

export default Logo;
