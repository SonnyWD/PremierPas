import Btn from "../../components/btn"
import PregnancyWeeks from "./components/calendarPregnancy";
import logo from "../../assets/img/logo.png";
import CardExpert from "./components/cardExpert";
import CardTeam from "./components/cardTeam"
import { fakeTeam } from "../../assets/data/fakeExpert";
import { dayQuestion } from "../../assets/data/fakeQuestions";
import ParentCard from "./components/parentCard";
import BabyCard from "./components/babyCard";
import { useUser } from '../../context/userContext';
import { FaPencilAlt } from "react-icons/fa";

function Welcome() {

  const dayDate = new Date();
  const index = dayDate.getDay() % dayQuestion.length;
  const questionDuJour = dayQuestion[index];

  const { user, userLoading } = useUser();

  if (userLoading) {
    return <div>Chargement des informations de l'utilisateur...</div>;
  }

  if (!user || !user.babyId) {
    return <div>Aucun bébé trouvé pour l'utilisateur connecté ou informations manquantes.</div>;
  }

  const babyId = user.babyId;

    return (
      <>
        <div className="bg-primary-bg pb-30 pt-5 font-primary-text 
                        bg-gradient-to-b from-[#FFF6EB] from-[24.52%] via-[#F7DFC7] via-[84.13%] to-[#EFC7A2] to-[100%] bg-fixed">
          <div className="flex m-5 rounded-2xl p-3 shadow-[0px_-4px_5.8px_0px_rgba(160,172,177,0.20)]
                          bg-gradient-to-b from-[#ADD2D1] from-[0%] via-[#FFF6EB] via-[65%] to-[#FFF6EB]/0 to-[100%]">
            <div>
                <img src={logo} alt="" className="w-66"/>
            </div>

            <div className=" flex flex-col text-bleu-clair">
              <p className="font-title-secondary">Gagnez un abo à vie sur Premier Pas</p>
              <p>Dans le cas d’un formulaire, on associera un label avec un autre élément du formulaire pour</p>
            </div>
          </div>
          <div className="flex my-6">
            <Btn variant="secondary" className="mr-5 flex justify-center gap-4 items-center rounded-full ml-auto py-2.5 my-4 title-bleu">Modifier ma grossesse <FaPencilAlt/> </Btn>
          </div>

          <PregnancyWeeks/>
          <section className="m-5">
            <h2 className="font-title-primary mb-4 ml-1">Ma grossesse</h2>
            <div>
                <ParentCard/>
                <Btn className="w-full bg-bleu-clair rounded-full my-4">Voir mes notes</Btn>
                <BabyCard babyId={babyId}/>
              <Btn className="w-full rounded-full mt-4 mb-8" variant="secondary">Ajouter un enfant</Btn>
              <h3 className="text-orange text-center mb-6">Le corps de la maman</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis corporis eius fugiat ab consequatur obcaecati cumque odio officia natus hic.</p>
              <Btn variant="primary" className="w-full rounded-full mt-6 mb-2">En savoir plus</Btn>
            </div>
            
          </section>
          <section className="m-5">
            <h2 className="font-title-primary mb-4 ml-1">Ce que disent les experts</h2>
            <div className="flex gap-4 px-3 overflow-x-auto hide-scrollbar">
              <CardExpert/>
              <CardExpert/>
              <CardExpert/>
              <CardExpert/>
              <CardExpert/>
            </div>
            
          </section>
          <section className="m-5">
            <h2 className="font-title-primary mb-4 ml-1">La question du jour !</h2>
                <div className="bg-primary-bg rounded-2xl p-3">
                  <div className="flex justify-between mb-6 mt-3">
                  <div className="flex justify-around text-secondary-bg">
                    <p className="px-3 pb-0.5 bg-orange text-center rounded-full flex m-auto">{questionDuJour.author}</p>
                    <p className="pl-2">{questionDuJour.pregnantSince}</p>
                  </div>  
                  <p className="bg-bleu-clair text-white px-3 pb-0.5 rounded-full flex m-auto">{questionDuJour.status}</p>
                  </div>
                  <p className="w-5/6 text-center m-auto mb-6">"{questionDuJour.question}</p>
                  <Btn className="flex items-center rounded-full border-secondary-bg h-15 w-full mb-2"><img src={questionDuJour.expertImg} alt="" className="w-12 h-12 object-cover rounded-full"/><span className="ml-auto">{questionDuJour.answer}</span></Btn>
            </div>
          </section>
          <section className="m-5">
            <h2 className="font-title-primary mb-4 ml-2.5">L'équipe Premier Pas</h2>
            
            <div className="flex gap-4 px-3 overflow-x-auto hide-scrollbar">
              {fakeTeam.map((card, index) => 
                <CardTeam key={index} name={card.name} role={card.role} image={card.image}/>
              )}
            </div>
          </section>
        </div>
        
      </>
    );
  }
  
  export default Welcome;
  