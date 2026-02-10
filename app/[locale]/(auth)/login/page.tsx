import Login from "@/app/components/forms/login/Login";

export default function Page(){
    return (
        <div className="h-screen">
            <div className="mb-8">
                <h2 className="text-center md:text-center lg:text-start">Welcome back</h2>
                <p className="text-[#545454] text-[16px] md:text-[18px] text-center md:text-center lg:text-start">Enter your email to login to your account.</p>
            </div>
            <Login />
        </div>

    )
}