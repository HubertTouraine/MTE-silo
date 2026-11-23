// Secteurs clients : utilisés sur l'accueil et la page « Nos clients ».
export const SECTEURS = [
  { id: 'organismes-stockeurs', title: 'Organismes stockeurs', icon: 'silo',
    text: 'Coopératives et négoces : silos de collecte, manutention à haut débit, séchage et nettoyage pour recevoir la récolte dans les meilleures conditions.' },
  { id: 'agriculteurs', title: 'Agriculteurs', icon: 'tractor',
    text: 'Stockage à la ferme, séchoir et manutention dimensionnés pour votre exploitation, avec un interlocuteur proche et réactif.' },
  { id: 'meuniers', title: 'Meuniers', icon: 'mill',
    text: 'Stockage et préparation des blés avant écrasement : nettoyage, manutention douce et dépoussiérage.' },
  { id: 'usines-aliment', title: 'Usines d’aliment', icon: 'factory',
    text: 'Réception, stockage et transfert des matières premières, avec des circuits de manutention fiables et asservis.' },
  { id: 'stations-semence', title: 'Stations de semence', icon: 'sprout',
    text: 'Nettoyage, calibrage et manutention respectueuse des graines, pour préserver la qualité des lots.' },
  { id: 'agroalimentaire', title: 'Industries agro-alimentaires', icon: 'package',
    text: 'Équipements de stockage et de transfert sur mesure, intégrés à vos process et à vos contraintes de sécurité.' },
] as const;
