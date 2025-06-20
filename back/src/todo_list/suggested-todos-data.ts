interface Tache {
  description: string;
  done: boolean;
}

interface SuggestedTodoItem {
  key: number;
  title: string;
  taches: Tache[];
  isPremium: boolean;
}

export const SUGGESTED_TODOS: SuggestedTodoItem[] = [
  {
    key: 1,
    title: 'Préparer la chambre du bébé',
    taches: [
      { description: 'Monter le lit', done: false },
      { description: 'Installer la table à langer', done: false },
      { description: 'Décorer la chambre', done: false }
    ],
    isPremium: false
  },
  {
    key: 2,
    title: 'Faire la valise pour la maternité',
    taches: [
      { description: 'Préparer les vêtements du bébé', done: false },
      { description: 'Préparer les affaires de la maman', done: false },
      { description: 'Préparer les papiers administratifs', done: false }
    ],
    isPremium: false
  },
  {
    key: 3,
    title: 'Choisir le prénom du bébé',
    taches: [
      { description: 'Lister les prénoms préférés', done: false },
      { description: 'Discuter avec le partenaire', done: false },
      { description: 'Valider ensemble le choix final', done: false }
    ],
    isPremium: false
  },
  {
    key: 4,
    title: 'Organiser les rdv médicaux',
    taches: [
      { description: 'Suivi de grossesse avec la sage-femme', done: false },
      { description: 'Échographies', done: false },
      { description: 'Préparer les papiers de la maternité', done: false }
    ],
    isPremium: false
  },
  {
    key: 5,
    title: 'Les indispensables pour l’arrivée',
    taches: [
      { description: 'Couches et produits d’hygiène', done: false },
      { description: 'Vêtements pour les premiers mois', done: false },
      { description: 'Biberons et tétines', done: false }
    ],
    isPremium: false
  },
  {
    key: 6,
    title: 'Organiser le retour à la maison',
    taches: [
      { description: 'Prévoir les repas à l’avance', done: false },
      { description: 'Nettoyer l’appartement', done: false },
      { description: 'Organiser l’aide familiale', done: false }
    ],
    isPremium: false
  },
  {
    key: 7,
    title: 'S’informer sur l’alimentation',
    taches: [
      { description: 'Lire des ressources fiables', done: false },
      { description: 'Participer à un atelier ou poser des questions à la sage-femme', done: false },
      { description: 'Choisir les accessoires nécessaires', done: false }
    ],
    isPremium: false
  },
  {
    key: 8,
    title: 'Démarches administratives',
    taches: [
      { description: 'Déclarer la naissance à la CAF', done: false },
      { description: 'Prévenir la mutuelle', done: false },
      { description: 'Préparer la déclaration à la mairie', done: false }
    ],
    isPremium: true
  }
];
