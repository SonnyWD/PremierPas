import ProgressBar from "./progressBar"
import Btn from "./btn";

function BabyCard({ img, text, className, onClick, showProgress}) {
  return (
    <div className={className} onClick={onClick}>
      <div className="text-bleu-clair mb-2 text-center">
        <img src={img} alt="" className="w-[82px] h-[67px]"/>
        <p className="mt-2.5">{text}</p>
      </div>
      {showProgress ? <ProgressBar /> : <Btn variant="secondary" className={`rounded-[15px] w-full py-[15px] px-2.5`}>À faire 2/3</Btn>}
      
    </div>
  );
}

export default BabyCard;
