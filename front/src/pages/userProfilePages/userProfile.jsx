import PointUpdater from '../../components/pointUpdater'; 
import LogoutButton from '../../components/logoutBtn';
import Btn from '../../components/btn';
import { PiArrowBendUpRight } from "react-icons/pi";
import ParentCard from '../welcomePages/components/parentCard';
import BabyCard from '../welcomePages/components/babyCard';
import { useUser } from '../../context/userContext';
import grossesse from "../../assets/img/grossesse.svg"
import { FaArrowsRotate } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";

function UserProfile() {

    const { user, userLoading } = useUser();

    if (userLoading) {
    return <div>Chargement des informations de l'utilisateur...</div>;
    }

    const babyId = user?.babyId;

  return (
    <div className="bg-primary-bg pb-30 p-5 font-primary-text 
                      bg-gradient-to-b from-[#FFF6EB] from-[24.52%] via-[#F7DFC7] via-[84.13%] to-[#EFC7A2] to-[100%] bg-fixed">
      <div className="flex items-center justify-between mt-5 mb-4">
          <div className='flex justify-between w-full'>
              <h1 className="font-title-primary ml-1">
                Mon espace{" "}
                {user.isPremium ? (
                  <span className="text-orange">PREMIUM</span>
                ) : (
                  <span className='text-orange'>FREE</span>
            )}
              </h1>
              <Btn variant='premiumBtn' className='flex '><span>S'abonner </span><PiArrowBendUpRight className="text-lg" /></Btn>
          </div>   
      </div>
      <Btn variant="secondary" className="w-full mt-4 rounded-full ml-auto mr-5 py-[15px]">Modifier mes infos</Btn>     
      <Btn variant="changeAbo" className="flex justify-center gap-4 items-center w-full mt-4 rounded-full ml-auto mr-5 py-[15px]">Changer d'abonnement <FaArrowsRotate/> </Btn>     
      <Btn variant="secondary" className="w-full mt-4 rounded-full ml-auto mr-5 py-[15px]">Gérer mes alertes</Btn>  

      <section>
        <h2 className="font-title-primary mb-4 mt-8 ml-1">Mon suivi de grossesse</h2>
        <Btn variant="secondary" className="flex justify-center gap-4 items-center rounded-full ml-auto py-2.5 my-4 title-bleu">Modifier ma grossesse <FaPencilAlt/> </Btn>
        <img src={grossesse} alt="" className='m-auto'/>
        <div>
          <h2 className="font-title-primary title-orange2 text-center mb-4 mt-8 ml-1">Hier</h2>
          <ParentCard/>
          <Btn className="w-full bg-bleu-clair rounded-full my-4 py-[15px]">Voir mes notes et ressentis</Btn>
          <BabyCard babyId={babyId}/>
          <Btn className="w-full rounded-full mt-4 mb-4 py-[15px]" variant="secondary">Contactez-nous</Btn>
          <Btn variant="primary" className="w-full rounded-full mb-2 py-[15px]">Mentions légales</Btn>
        </div>
      </section>
      {/*<PointUpdater /> 
      <LogoutButton/>*/}
      
    </div>
  );
}

export default UserProfile;
