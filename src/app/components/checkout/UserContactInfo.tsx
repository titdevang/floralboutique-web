"use client";
import React from "react";

const UserContactInfo = () => {


    return (
        <div className={"bg-white rounded-[40px] md:space-y-0 space-y-4 md:flex items-center justify-between py-10 px-6"}>
            <div className={"flex items-center gap-4"}>
                <div className={"bg-primary w-10 h-10"}>
                    <p className={"text-white flex items-center justify-center h-full text-md"}>
                        1
                    </p>
                </div>
                <div>
                    <p className={"text-md"}>
                        Username
                    </p>
                </div>
            </div>
            <div className={"flex items-center w-full justify-center md:justify-end gap-4"}>
                <div>
                    <p>
                        Hello@gmail.com
                    </p>
                </div>
                <div>
                    <p>
                        898575412165656
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserContactInfo;