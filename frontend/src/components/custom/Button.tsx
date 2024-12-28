import ShinyButton from "../magicui/shiny-button";
import { useNavigate } from "react-router-dom";

const Button = ({
  text,
  classname,
}: {
  text: string;
  classname?: string;
}) => {
  const navigate = useNavigate();

  const handleFormShow = () => {
    navigate("/contact");
  };

  return (
    <ShinyButton
      onClick={handleFormShow}
      className={`bg-green-secondary rounded-md flex items-center justify-center ${classname}`}>
      <p className="flex text-nowrap text-white font-base lg:font-semibold items-center justify-center gap-2">
        {text} <img src="/icons/arrright.svg" alt="" />
      </p>
    </ShinyButton>
  );
};

export default Button;
