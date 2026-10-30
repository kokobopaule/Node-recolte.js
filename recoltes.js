// MEMBRE 3 — Récoltes : calculer la production, le rendement et le revenu.
// Fiche : fiches/3-recoltes.md · Vérifier : npm run test:recoltes

// Renvoie le total des kilos récoltés sur une parcelle. Aucune récolte : 0.

const cultures = [
  { code: 'cacao', nom: 'Cacao', prixKg: 2000, humiditeMin: 40, humiditeMax: 70 },
  { code: 'manioc', nom: 'Manioc', prixKg: 100, humiditeMin: 30, humiditeMax: 60 },
];
const parcelles = [
  { id: 'A1', producteur: 'Ama', localite: 'Man', culture: 'manioc', surface: 2 },
  { id: 'A2', producteur: 'Moussa', localite: 'Odienné', culture: 'cacao', surface: 1.5 },
];
const recoltes = [
  { parcelle: 'A1', date: '2026-09-01', kg: 5000 },
  { parcelle: 'A2', date: '2026-09-15', kg: 400 },
  { parcelle: 'A1', date: '2026-10-01', kg: 3000 },
];

export function totalRecolte(recoltes, idParcelle) {
  return recoltes
    .filter((recolte) => recolte.parcelle === idParcelle)
    .reduce((total, recolte) => total + recolte.kg, 0);
}
// Renvoie le rendement en kg par hectare, arrondi à l'entier le plus proche.
// Une surface nulle ou négative est une erreur : on lance une RangeError.
export function rendement(kg, surface) {
  if (surface <= 0) {
    throw new RangeError('La surface doit être supérieure à 0');
  }

  return Math.round(kg / surface);
}
// Renvoie le revenu estimé en FCFA.
export function revenu(kg, prixKg) {
  return kg * prixKg;
}

// Renvoie une ligne de bilan par parcelle, dans le même ordre que parcelles.
// Chaque ligne : { id, producteur, culture, kg, rendement, revenu }

export function bilanRecoltes(parcelles, recoltes, cultures) {
  return parcelles.map((parcelle) => {
    const culture = cultures.find(
      (element) => element.code === parcelle.culture,
    );

    if (!culture) {
      throw new Error(`Culture inconnue : ${parcelle.culture}`);
    }

    const kg = totalRecolte(recoltes, parcelle.id);

    return {
      id: parcelle.id,
      producteur: parcelle.producteur,
      culture: parcelle.culture,
      kg,
      rendement: rendement(kg, parcelle.surface),
      revenu: revenu(kg, culture.prixKg),
    };
  });
}

// Renvoie une COPIE du bilan, triée du plus grand revenu au plus petit.
// Le tableau reçu ne doit pas changer d'ordre.
export function classerParRevenu(bilan) {
  return [...bilan].sort((a, b) => b.revenu - a.revenu);
}