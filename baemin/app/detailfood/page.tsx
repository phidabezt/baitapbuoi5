'use client'

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ClockCircleTwoTone, DollarTwoTone, DoubleRightOutlined, LikeFilled, ShoppingCartOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { CartContext } from "../../contexts/cart/cartContext";

export default function Home() {
    const { addToCart } = useContext(CartContext)
    const searchParams = useSearchParams()
    const [foodDetails, setFoodDetails] = useState<any>({
        name: "",
        image: "",
        price: "",
    });

    useEffect(() => {
        const fetchFoodDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/foods/${searchParams?.get('id')}`);
                const data = await response.json();
                setFoodDetails({
                    ...data,
                    image: '/food/ga1.jpg',
                });
            } catch (error) {
                console.error('Error fetching food details:', error);
            }
        };
        fetchFoodDetails();
    }, [])

    return (
        <div className="flex flex-col w-full h-auto">
            <div className="bg-white w-full h-80 flex">
                <div className="w-[45%] h-full py-4 px-10">
                    <div className="w-full relative h-full" >
                        <Image layout="fill" objectFit="cover" src={"/food/ga1.jpg"} alt="Ga"></Image>
                    </div>
                </div>
                <div className=" w-[55%] h-full relative">
                    <div className="absolute top-0 left-0 px-8 py-4">
                        <span className="text-[13px] text-[#187CAA]"><a href="">Home</a> <DoubleRightOutlined className="text-[10px]" /> <a href="">TP.HCM</a> <DoubleRightOutlined className="text-[10px]" /> <a href="">{foodDetails.name}</a> </span>
                        <div className="flex flex-row text-[11px] justify-start items-center mt-3">
                            <div className="bg-beamin text-white p-1 mr-2 cursor-pointer tracking-wider flex gap-1">
                                <LikeFilled />
                                <span>Yêu thích</span>
                            </div>
                            <span className="text-[#959595]">QUÁN ĂN - <a href="" className="text-[#0288D1]">Chi nhánh</a></span>
                        </div>
                        <div className="text-[22px] font-bold mt-2">{foodDetails.name}</div>
                        <div className="text-[13px] mt-1">
                            356 Trần Hưng Đạo, Phường 2, Quận 5, TP.Hồ Chí Minh
                        </div>
                        <div className="flex flex-row text-[14px] gap-2 justify-start items-center">
                            <ol className="flex flex-row text-[#FFC107] gap-1">
                                <li><StarFilled /></li>
                                <li><StarFilled /></li>
                                <li><StarFilled /></li>
                                <li><StarFilled /></li>
                                <li><StarOutlined /></li>
                            </ol>
                            <p className="bg-[#FFC107] py-[2px] px-1 text-white rounded-md">999+</p>
                            <span>đánh giá trên Baemin</span>
                        </div>
                        <div className="flex flex-row gap-4 justify-start items-center my-1 text-[15px]">
                            <div className="flex flex-row gap-1 text-[#6CC942] justify-start items-center">
                                <div className="w-2 h-2 bg-[#6CC942] rounded-full"></div>
                                <span>Mở cửa</span>
                            </div>
                            <div className="flex flex-row gap-1 justify-start items-center">
                                <ClockCircleTwoTone twoToneColor={"#3AC5C9"} />
                                <span>06:00 - 22:59</span>
                            </div>
                        </div>
                        <div className="flex flex-row gap-1 justify-start items-center text-[#959595] text-[15px]">
                            <DollarTwoTone twoToneColor={"#c0c0c0"} className="text-[16px]" />
                            <span>{foodDetails.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                        </div>
                    </div>

                    <button className="absolute bottom-0 right-0 px-8 py-4 cursor-pointer z-10">
                        <div className="bg-beamin text-white p-1 mr-2 cursor-pointer tracking-wider flex gap-1">
                            <ShoppingCartOutlined />
                            <span onClick={() => addToCart(
                                {
                                    id: foodDetails.id,
                                    name: foodDetails.name,
                                    price: foodDetails.price,
                                    quantity: 1,
                                }
                            )}>Đặt hàng</span>
                        </div>
                    </button>

                    <div className="w-full flex flex-col absolute bottom-0 left-0 px-8 mb-4 text-[#959595] text-[13px]">
                        <div className="border-t-[1px]"></div>
                        <div className="flex flex-row gap-4 justify-start items-center py-[10px]">
                            <div className="flex flex-col ">
                                <span>PHÍ DỊCH VỤ</span>
                                <span className="text-beamin font-bold text-[14px]">0.8% Phí dịch vụ</span>
                            </div>
                            <div className="border-l border-solid h-6"></div>
                            <div className="flex flex-col">
                                <span>DỊCH VỤ BỞI</span>
                                <span className="text-beamin font-bold text-[14px]">Baemin</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}