import { PiWebhooksLogoDuotone, PiNotionLogoBold } from "react-icons/pi";
import { BsDiscord } from "react-icons/bs";
import { BiLogoGmail } from "react-icons/bi";

interface IconProps {
  icon: string;
}

export const Icon: React.FC<IconProps> = ({ icon }) => {
  switch (icon) {
    case "webhooks":
      return <PiWebhooksLogoDuotone className="w-6 h-6" />;
    case "notion":
      return <PiNotionLogoBold className="w-6 h-6" />;
    case "discord":
      return <BsDiscord className="w-6 h-6" />;
    case "gmail":
      return <BiLogoGmail className="w-6 h-6" />;
    default:
      return null;
  }
};
