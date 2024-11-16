'use client'

import { useState } from "react";
import { Input } from "antd";
import Link from "next/link";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const validatePasswords = () => {
        if (password !== verifyPassword) {
            setErrorMessage('Mật khẩu và Mật khẩu xác nhận không khớp!');
            return false;
        } else {
            setErrorMessage('');
            return true;
        }
    };

    const onRegister = async () => {
        if (!validatePasswords()) {
            return;
        }

        const payload = {
            email,
            password,
        };

        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                console.log('Registration successful!');
                router.push('/login');
            } else {
                setErrorMessage('Registration failed');
            }
        } catch (error) {
            setErrorMessage('An error occurred while registering');
            console.error('Registration error:', error);
        }

    }

    return (
        <>
            <div className="mt-28 w-1/3  bg-white border rounded-2xl flex flex-col p-5 gap-5 pb-8">
                <div className="flex justify-center items-center w-full text-beamin font-semibold text-[26px]">
                    Đăng Kí
                </div>
                <div className="flex flex-col w-full gap-3">
                    <Input placeholder="Email" className="h-[40px]"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex flex-col w-full ">
                    <Input.Password
                        placeholder="Mật khẩu"
                        className="h-[40px]"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex flex-col w-full ">
                    <Input.Password
                        placeholder="Nhập lại mật khẩu"
                        className="h-[40px]"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        onChange={(e) => setVerifyPassword(e.target.value)}
                    />
                    {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                </div>
                <div className="flex flex-col w-full">
                    <button className="w-full h-[40px] uppercase text-white bg-beamin rounded-lg" onClick={onRegister}>Đăng ký</button>
                </div>
                <div className="flex items-center justify-center gap-1">
                    <span className="text-gray-600">Bạn đã có tài khoản?
                    </span>
                    <Link className="text-beamin cursor-pointer" href={"/login"}> Đăng nhập</Link>
                </div>
            </div>
        </>
    );

}
export default Page;