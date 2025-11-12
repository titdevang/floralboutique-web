import Modal from "../../ui/modal/modal";
import Select, { Option } from "../../common/fields/Select";
import InputField from "../../common/fields/InputField";
import { useState } from "react";

interface RechargeWalletProps {
  rechargeWalletModal: boolean;
  setRechargeWalletModal: React.Dispatch<React.SetStateAction<boolean>>;
} 

const RechargeWallet: React.FC<RechargeWalletProps> = ({rechargeWalletModal, setRechargeWalletModal}) => {
  const paymentMethodList: Option[] = [
    { value: 1, label: "gpay" },
    { value: 2, label: "rozorpay" },
    { value: 3, label: "paytm" },
  ];

  const [paymentMethod, setPaymentMethod] = useState(paymentMethodList[0]);
  const [amount, setAmount] = useState("");
  return (
    <div>
      <Modal
        isOpen={!!rechargeWalletModal}
        onClose={() => setRechargeWalletModal(false)}
        title="Recharge Wallet"
        className="max-w-lg"
      >
        <div className="h-full space-y-4 mb-4">
          <div className="md:flex items-center space-y-1">
            <label className="w-1/2">
              Payment method <span className="text-red-600">*</span>{" "}
            </label>
            <Select
              options={paymentMethodList}
              selected={paymentMethod}
              onChange={(selection) => setPaymentMethod(selection)}
              placeholder="Select payment method"
            />
          </div>
          <div className="md:flex items-center space-y-1">
            <label className="w-1/2">
              Amount <span className="text-red-600">*</span>
            </label>
            <InputField
              type="text"
              name="amount"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="text-end">
            <button className="bg-primary hover:bg-hov-primary px-2 py-1 duration-300 rounded-xs text-white ">
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RechargeWallet;