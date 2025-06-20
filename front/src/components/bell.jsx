import { BiSolidBellRing } from "react-icons/bi";

function Bell({className}){
    return(
        <button className={className}>
            <BiSolidBellRing className="text-bleu-turquoise h-10 w-10 rounded-full p-2"/>
        </button>
    )
}
export default Bell;