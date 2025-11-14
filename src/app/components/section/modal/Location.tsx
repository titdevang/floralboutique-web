import Modal from "../../ui/modal/modal";
import PincodeDropdown from "../../ui/fields/PincodeDropdown";
import { useState } from "react";
import Tooltip from "../../ui/Tooltip";
import SvgIcon from "../../ui/SvgIcon";

interface LocationProps {
    
} 

const Location: React.FC<LocationProps> = () => {
    const [LocationModal, setLocationModal] = useState(false);
  return (
    <div>
      <Modal
        isOpen={!!LocationModal}
        onClose={() => setLocationModal(false)}
        title="Select Pincode"
        className="max-w-lg"
      >
        <div className="h-full space-y-4 mb-4">
          <PincodeDropdown isBlink={false} />
        </div>
      </Modal>

      <Tooltip text="Location">
        <button
          type="button"
          aria-label="Location"
          onClick={() => setLocationModal(true)}
        >
          <span className="cursor-pointer">
            <span
              className="position-relative d-inline-block"
              data-toggle="tooltip"
              data-title="{{ translate('Location') }}"
              data-placement="top"
            >
              <SvgIcon
                name={"location.svg"}
                localImage="location.svg"
                fill="currentColor"
                className="text-primary"
                width={25}
                height={25}
              />
            </span>
          </span>
        </button>
      </Tooltip>
    </div>
  );
};

export default Location;