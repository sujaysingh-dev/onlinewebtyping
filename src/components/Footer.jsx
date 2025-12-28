import {
    FaFacebookF,
    FaGithub,
    FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className=" logo min-h-[8vh] bg-gray-50 border-t flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-5 md:px-10 lg:px-20 xl:px-50 py-2 duration-300">

            {/* Left */}
            <div className="text-sm text-gray-600 text-center sm:text-left">
                © {new Date().getFullYear()}{" "}
                <span className="font-semibold text-gray-800">Pixentia</span>.
                All rights reserved.
            </div>

            <div>
                ❤️ From <span className="font-bold">Pixentia</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
                {/* Facebook */}
                <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-9 h-9 flex items-center justify-center
                     rounded-sm border border-gray-300 text-gray-600
                     hover:bg-blue-100 hover:border-blue-400 hover:text-blue-600
                     focus:outline-none focus:ring-2 focus:ring-blue-400
                     transition-all duration-200 hover:scale-110"
                >
                    <FaFacebookF size={14} />
                </a>

                {/* GitHub */}
                <a
                    href="https://github.com/sujaysingh-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="w-9 h-9 flex items-center justify-center
                     rounded-sm border border-gray-300 text-gray-600
                     hover:bg-gray-200 hover:border-gray-500 hover:text-gray-900
                     focus:outline-none focus:ring-2 focus:ring-gray-400
                     transition-all duration-200 hover:scale-110"
                >
                    <FaGithub size={14} />
                </a>

                {/* LinkedIn */}
                <a
                    href="https://www.linkedin.com/in/sujay-singh-abb22b39a"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-9 h-9 flex items-center justify-center
                     rounded-sm border border-gray-300 text-gray-600
                     hover:bg-blue-100 hover:border-blue-500 hover:text-blue-700
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     transition-all duration-200 hover:scale-110"
                >
                    <FaLinkedinIn size={14} />
                </a>
            </div>
        </footer>
    );
}
