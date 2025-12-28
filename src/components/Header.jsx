export default function Header() {
    return (
        <header className="logo h-[8vh] sticky top-0 w-full bg-white border-b shadow-sm flex items-center justify-between px-4 sm:px-5 md:px-10 lg:px-20 xl:px-50 duration-300">

            {/* Left: Logo / Title */}
            <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-wide text-gray-800">
                    WEB<span className="text-blue-600">TYPING</span>
                </span>
            </div>

            {/* Right: User info */}
            <div className="flex items-center gap-3">
                <div className="hidden sm:block text-md text-gray-600">
                    Hi, <span className="font-semibold text-gray-800">User</span>
                </div>

                {/* Avatar */}
                <div className="w-9 h-9 rounded-sm bg-blue-600 text-white flex items-center justify-center font-bold">
                    U
                </div>
            </div>
        </header>
    );
}
