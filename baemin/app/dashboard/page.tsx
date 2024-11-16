import ScrollBar from "@/components/scrollBar";
import ScrollFood from "@/components/scrollFood";
import Image from "next/image";
import React from "react";
import { banneritems, getFoods } from "./helper";

export default async function Home() {
    const { todayFood, foodList } = await getFoods();

    return (
        <>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3 pt-3 pl-8 pr-8 z-40">
                    <div className="flex flex-col fixed bg-white w-64 rounded-2xl pl-3 pt-2 pb-5 gap-3 overflow-y-auto" style={{ maxHeight: '80vh' }}>
                        <span>Thực đơn</span>
                        {foodList.map((item, index) => (
                            <div key={index} className="flex flex-col gap-3 cursor-pointer hover:bg-slate-100">
                                <div className="flex flex-row items-center gap-1">
                                    <Image src={item.imgSmall} width={30} height={30} alt={item.description} />
                                    <span>{item.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-span-9 w-full  pt-3 pr-8 gap-3 flex flex-col">
                    <ScrollBar items={banneritems} ></ScrollBar>
                    <ScrollFood items={todayFood}></ScrollFood>
                    <ScrollFood items={todayFood}></ScrollFood>
                </div>

            </div>

        </>
    )
}