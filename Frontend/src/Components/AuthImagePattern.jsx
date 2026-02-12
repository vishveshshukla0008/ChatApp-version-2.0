import React from "react";

const AuthImagePattern = ({ title, desc }) => {
    return (
        <div className="h-full flex items-center  justify-center bg-base-200  ">
            <div className=" text-center w-[60%] md:w-[50%]  sm:w-[90%]">
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {[...Array(9)].map((_, i) => (
                        <div
                            key={i}
                            className={`h-20  aspect-auto rounded-2xl bg-primary/60  ${i % 2 === 0 ? "animate-pulse" : ""
                                } `}
                        ></div>
                    ))}
                </div>
                <div>
                    <p className="font-medium text-center">{title}</p>
                    <p className="text-gray-500 text-center">{desc}</p>
                </div>
            </div>
        </div>
    );
};

export default AuthImagePattern;
