"use client";

import ButtonLoder from "@/app/components/ui/loader/ButtonLoder";
import {useAuth} from "@/app/context/AuthContext";
import {apiRequest} from "@/app/utils/apiRequest";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {toast} from "react-toastify";
import {ApiResponse} from "@/app/types/ApiRequest";
import OTPVerify from "@/app/components/common/fields/OTPVerify";
import PhoneInput from "@/app/components/common/fields/PhoneInput";
import SvgIcon from "@/app/components/ui/SvgIcon";
import { getGuestToken } from "@/app/utils/cartToken";
import Modal from "./modal";

export default function LoginPage() {
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [showVerifyFlag, setShowVerifyFlag] = useState<boolean>(false)
    const [guestUser, setGuestUser] = useState<boolean>(false)
    const router = useRouter();
    const { login, userAuthenticated, setLoginModal, loginModal } = useAuth();

    const handleRequestCode = async () => {
        setMessage("");
        if (!phone) {
            toast.error("Mobile number is required.");
            return;
        }
        if (phone.length != 12) {
            toast.error("Mobile number is not valid");
            return;
        }

        setLoading(true);
        try {
            const response = await apiRequest<ApiResponse>(
                "POST",
                "/login/request-code",
                {phone: '+' + phone, guest_user: guestUser}
            );
            if (response?.status == 200) {
                setShowVerifyFlag(true);
                toast.success(response.data.message);
            } else {
                toast.error(response?.data.message);
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async (code: string): Promise<boolean> => {
        setMessage("");
        setLoading(true);

        try {
            const response = await apiRequest<ApiResponse>(
              "POST",
              "/login/verify",
              { phone: "+" + phone, code },
              {
                headers: userAuthenticated
                  ? {}
                  : { "X-Guest-Token": getGuestToken() },
              }
            );

            if (response?.status === 201) {
                toast.success(response.data.message);
                const {user, token} = response.data;

                login(token, user.name);

                setPhone("")
                setLoginModal(false);
                setShowVerifyFlag(false);
                setGuestUser(false);
                return true;
            } else {
                toast.error(response?.data.message);
                return false;
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong. Please try again.");
            return false;
        } finally {
            setLoading(false);
        }
    };

const handleGoogleRedirect = async (e?: React.MouseEvent) => {
  e?.preventDefault(); // stops page reload if inside form

  try {
    const response = await apiRequest("GET", "/google/redirect", {},  {
            headers: userAuthenticated ? {} : { "X-Guest-Token": getGuestToken() },
          });

    if (response?.status === 200) {
      const redirectUrl = (response.data as {data: {url: string}})?.data.url;
       const width = 500;
       const height = 600;
       const left = (window.innerWidth - width) / 2;
       const top = (window.innerHeight - height) / 2;
        setLoginModal(false);
       window.open(
         redirectUrl,
         "GoogleAuth",
         `width=${width},height=${height},top=${top},left=${left}`
       );
    }
  } catch (error) {
    console.error(error);
  }

  return false; 
};


    return (
      <Modal isOpen={!!loginModal} onClose={() => setLoginModal(false)} className="!max-w-md">
        <div className=" h-full w-full">
          <div className=" w-full">

            {/* Right Form Section */}
            <div className=" flex flex-col justify-center items-center w-full px-6 sm:px-10">
              <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex flex-col items-center">
                  <Image
                    src="/assets/images/floralboutique.png"
                    alt="Floral Boutique"
                    width={100}
                    height={80}
                    className="mb-4"
                  />
                  <h2 className="text-center text-[16px] text-primary font-semibold uppercase">
                    Welcome to Floral Boutique
                  </h2>
                </div>

                {(showVerifyFlag || guestUser) && (
                  <div>
                    <button
                      type={"button"}
                      className={"flex items-center mt-6 gap-2"}
                      onClick={() => {
                        setShowVerifyFlag(false);
                        setGuestUser(false);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z"
                        />
                      </svg>
                      <div className={"text-[17px]"}>
                        {showVerifyFlag ? "Login with OTP" : "Guest Checkout"}
                      </div>
                    </button>
                  </div>
                )}
                {/* Form */}
                {!showVerifyFlag ? (
                  <div className="mt-6 space-y-4">
                    {/* Phone */}
                    <div className={"w-full"}>
                      <PhoneInput value={phone} onChange={setPhone} />
                    </div>

                    {!guestUser && (
                      <div className={"space-y-4"}>
                        <div className={"flex items-center w-full"}>
                          <div
                            className={"border border-gray-light w-full"}
                          ></div>
                          <p
                            className={
                              "w-full text-sm font-semibold text-gray-dark text-center"
                            }
                          >
                            Or Sign Up
                          </p>
                          <div
                            className={"border border-gray-light w-full"}
                          ></div>
                        </div>

                        <div
                          className={
                            "flex flex-col items-center justify-between w-full gap-4"
                          }
                        >
                          <div className={"w-full"}>
                            <button
                              type="button"
                              onClick={() => {
                                handleGoogleRedirect();
                              }}
                              className="w-full uppercase p-2 flex items-center justify-center gap-2 font-semibold border border-primary text-primary transition duration-500"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22px"
                                height="22px"
                                viewBox="-3 0 262 262"
                                preserveAspectRatio="xMidYMid"
                              >
                                <path
                                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                                  fill="#4285F4"
                                />
                                <path
                                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                                  fill="#34A853"
                                />
                                <path
                                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                                  fill="#FBBC05"
                                />
                                <path
                                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                                  fill="#EB4335"
                                />
                              </svg>
                              Login with google
                            </button>
                          </div>
                          <div className={"w-full"}>
                            <button
                              type="button"
                              onClick={() => {
                                setGuestUser(true);
                              }}
                              className="w-full uppercase p-2 flex items-center justify-center gap-1 font-semibold border border-primary text-primary transition duration-500"
                            >
                              <SvgIcon
                                name={"guestProfile.svg"}
                                width={25}
                                height={25}
                                fill={"currentColor"}
                                localImage={"guestProfile.svg"}
                              />
                              Checkout As Guest
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="py-6">
                      <button
                        type="submit"
                        disabled={loading}
                        onClick={handleRequestCode}
                        className="w-full bg-primary text-white h-10 font-bold text-sm hover:bg-hov-primary transition duration-500 disabled:opacity-50"
                      >
                        {loading ? <ButtonLoder /> : "Next"}
                      </button>
                    </div>

                    {/* Message */}
                    {message && <p className="text-center mt-2">{message}</p>}

                    {/* Footer */}
                    <div className="text-center mt-2 pb-4 lg:pb-0">
                      Dont have an account?{" "}
                      <Link
                        href="/users/registration"
                        onClick={() => setLoginModal(false)}
                        className="text-primary hover:underline font-semibold pl-1 duration-500 underline-offset-4 text-sm"
                      >
                        Register Now
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div>
                    <OTPVerify
                      handleResend={handleRequestCode}
                      verifyOtpApi={handleVerifyCode}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
}
