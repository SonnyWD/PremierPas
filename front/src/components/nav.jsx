import { Link } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { SlNotebook } from "react-icons/sl";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import { FaIdBadge } from "react-icons/fa";

function Nav(){
     const navItems = [
  {
    label: "Accueil",
    icon: IoIosHome ,
    path: "/welcome",
  },
  {
    label: "Découvrir",
    icon: RiStickyNoteAddLine ,
    path: "/discover",
  },
  {
    label: "Outils",
    icon: SlNotebook,
    path: "/tools",
  },
  {
    label: "Communauté",
    icon: IoIosPeople,
    path: "/community",
  },
  {
    label: "Mon espace",
    icon: FaIdBadge,
    path: "/userProfile",
  },
];
    return (
        <nav className="fixed bottom-0 pr-3 pl-3 w-full h-25 border-secondary-bg rounded-t-4xl bg-secondary-bg shadow-md border-t z-50">
            <div className="flex justify-around items-center py-3 pt-7 text-sm text-gray-700">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                        to={item.path}
                        key={item.label}
                        className="flex flex-col items-center gap-2 text-white hover:text-orange-500"
                        >
                        <Icon size={22}/>
                        <span className="text-xs text-white">{item.label}</span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
export default Nav;