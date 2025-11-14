import SayItwithFlowersCard from "../ui/card/SayItwithFlowersCard";
import { useHomeItem } from "@/app/context/HomeItemContext";

const SayItwithFlowers = () => {
  const { sayItWithFlower } = useHomeItem();
 
  return (
    <div>
      <div>
        <h4 className="heading-2">Say It with Flowers</h4>
      </div>
      <div className="flex flex-wrap items-center justify-center mt-4 gap-2 md:gap-4">
        {sayItWithFlower.length > 0 &&
          sayItWithFlower.map((card, index) => (
            <div
              key={index}
              className="flex-[0_0_40%] sm:flex-[0_0_30%] lg:flex-[0_0_20%]"
            >
              <SayItwithFlowersCard item={card} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SayItwithFlowers;
