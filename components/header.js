import Image from "next/image";
import "@/app/components/header.css";

const BrandHeader = () => {
  return (
    <div className="brand-header">
      {/* Logo */}
      <Image src="/icon.png" alt="Recruit Logo" width={30} height={30} />

      {/* Company Name */}
      <h1>Recruit</h1>
    </div>
  );
};

export default BrandHeader;