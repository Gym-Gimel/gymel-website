export const committeeMembers = [
  {
    role: "Présidente",
    name: "Anne Debonneville Messieux",
    email: "president@gymel.ch",
    bio: ["Présidente de la Gym de Gimel. La description détaillée n'est pas publiée sur le site actuel."]
  },
  {
    role: "Responsable trésorerie, sponsors et équipements",
    name: "Adriano Schepis",
    email: "caissier@gymel.ch",
    bio: [
      "Installé en Suisse depuis 10 ans, dont 5 à Gimel, j'ai découvert ici bien plus qu'un simple village : une vraie communauté. C'est avec beaucoup d'enthousiasme que j'ai rejoint le comité de la gym, un groupe passionné, dynamique et profondément humain.",
      "En tant que trésorier, je suis responsable de la gestion financière de l'association. Mon rôle consiste à veiller à l'équilibre des comptes, à la transparence des dépenses et à la bonne allocation des ressources pour soutenir nos projets sportifs et communautaires.",
      "Mon ambition est de contribuer activement au développement de notre association, afin qu'elle continue à grandir et devienne un véritable pilier pour la communauté de Gimel et ses environs.",
      "« Je suis trésorier, mais ce que je préfère compter, ce ne sont pas les francs… ce sont les sourires et les moments partagés. »"
    ]
  },
  {
    role: "Responsable administratif",
    name: "Maud Zumstein",
    email: "secretaire@gymel.ch",
    bio: [
      "Gimel, c'est mon village de cœur : j'y ai grandi et j'ai moi-même fait partie d'une société de gym.",
      "Depuis 8 ans, je suis secrétaire du comité – courriels, PV, réunions, flyers et co-organisation des événements : je suis toujours partante pour faire bouger les choses !",
      "Ce que j'aime dans la gym ? Sa diversité, son esprit d'équipe et les liens qu'elle crée.",
      "Et en dehors de ça ? Je voyage, je lis, je rigole beaucoup… surtout avec ceux qui me sont chers."
    ]
  },
  {
    role: "Responsable technique",
    name: "Sophie Debonneville",
    email: "technique@gymel.ch",
    bio: [
      "Je suis active dans la société de gym de Gimel depuis trois ans maintenant. Lorsque j'ai entendu que le comité cherchait des membres supplémentaires, cela m'a paru une évidence de rejoindre ma sœur et les copines. J'ai un profond sentiment d'appartenance à cette société.",
      "J'y ai activement fait mes débuts en tant que pupillette, puis gymnaste. Les retours de concours, depuis le bas des Platerons jusqu'au terrain de gym, accompagnés de la fanfare de Gimel, me rappellent cette fierté quand nous traversions le village avec nos médailles.",
      "C'est pour ces moments de partage et de rassemblement que je trouve important de faire perdurer cette société."
    ]
  },
  {
    role: "Responsable des membres et caissière formatrice",
    name: "Pauline Champendal",
    email: "paulinec@gymel.ch",
    bio: [
      "Pauline Champendal – Responsable des membres & Caissière formatrice",
      "Native de Gimel, j'y ai grandi entre les sauts, les roulades et les souvenirs de gym. Même si je n'y habite plus depuis mes 18 ans, mon attachement à la société est resté intact !",
      "Depuis 2019, j'occupe le poste de trésorière, et dès 2025, je vais concentrer davantage mon engagement sur la gestion des membres et la formation, tout en continuant à assurer mon rôle de caissière formatrice.",
      "C'est un plaisir pour moi de contribuer à la vie de notre société et d'aider à la faire évoluer pour les générations futures !"
    ]
  }
] as const;

export const registrationInfo = {
  intro:
    "Vous souhaitez rejoindre la Gym de Gimel ou inscrire votre enfant à l'un de nos cours ? Retrouvez ici les informations utiles concernant les inscriptions, les cotisations, les équipements, les fermetures annuelles, les démissions et les autorisations photos.",
  closures: [
    "Jeûne fédéral : lundi 21 septembre 2026",
    "Vacances d'automne : du samedi 10 octobre au dimanche 25 octobre 2026",
    "Vacances d'hiver : du jeudi 24 décembre 2026 au dimanche 10 janvier 2027",
    "Relâches : du samedi 6 février au dimanche 14 février 2027",
    "Vacances de Pâques : du vendredi 26 mars au dimanche 11 avril 2027",
    "Pont de l'Ascension : du jeudi 6 mai 2027",
    "Lundi de Pentecôte : lundi 17 mai 2027",
    "Vacances d'été : du samedi 3 juillet au dimanche 22 août 2027"
  ],
  fees: [
    "Cotisation annuelle : CHF 120.- par membre.",
    "En cas d'inscription à un deuxième cours, aucune cotisation annuelle supplémentaire n'est facturée.",
    "Dès le 3ème enfant ou membre d'une même famille vivant à la même adresse, un rabais de 20% est appliqué."
  ],
  resignation:
    "Toute démission doit être annoncée oralement au moniteur ou à la monitrice, puis confirmée par écrit à la Gym de Gimel, par e-mail à info@gymel.ch ou par courrier postal.",
  registrationForm:
    "Pour effectuer une inscription, il faut télécharger le formulaire officiel, le remplir avec les informations demandées, puis l'envoyer par e-mail à info@gymel.ch.",
  equipment:
    "Pour commander des équipements, il faut télécharger le formulaire officiel, le remplir, puis l'envoyer par e-mail à info@gymel.ch.",
  documents: {
    registrationForm: "/documents/form-inscription-2627.pdf",
    equipmentOrder: "/documents/form-commande-equipement.pdf"
  },
  photos:
    "La Gym de Gimel se réserve le droit de photographier ou de filmer ses membres lors des cours, concours, fêtes ou autres manifestations. Toute opposition, ainsi que tout changement d'adresse, de téléphone ou d'e-mail, doit être communiqué par écrit à info@gymel.ch."
} as const;

export const anniversarySponsors = [
  {
    name: "Banque Raiffeisen",
    note: "Soutien financier particulièrement important pour la fête des 125 ans.",
    status: "A récupérer: logo officiel"
  },
  {
    name: "Fondation Belle Saison",
    note: "Partenaire affiché sur la page d'accueil actuelle des 125 ans.",
    status: "A récupérer: image fondation-belle-saison"
  }
] as const;

export const historicalSponsors = [
  {
    name: "Logos LC vert 2",
    note: "Visuel sponsor présent sur la page sponsor actuelle.",
    status: "A identifier précisément avant publication"
  },
  {
    name: "Pizzeria Allaman",
    note: "Sponsor présent sur la page sponsor actuelle.",
    status: "A récupérer: logo officiel"
  }
] as const;
