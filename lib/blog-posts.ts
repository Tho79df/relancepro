export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  emoji: string;
  keywords: string[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'comment-relancer-client-sans-froisser-relation',
    title: 'Comment relancer un client sans abîmer la relation commerciale',
    description:
      "Apprenez à relancer vos clients impayés de manière professionnelle et empathique, sans risquer de perdre la relation. Méthodes et exemples concrets.",
    category: 'Conseils',
    readTime: '7 min',
    date: '12 juin 2026',
    emoji: '🤝',
    keywords: ['relancer client', 'relance facture', 'relation client', 'impayé freelance'],
    content: `## Le dilemme du freelance face aux impayés

Vous avez livré votre travail. La facture est envoyée. Et maintenant… silence. Vous regardez votre compte bancaire et vous vous demandez comment relancer ce client sans le braquer.

C'est la situation que vivent **73% des freelances français** chaque année. Et la plupart attendent trop longtemps, par peur de froisser la relation.

La bonne nouvelle ? Relancer un client, c'est une compétence qui s'apprend. Et fait correctement, ça renforce la relation — ça ne la brise pas.

## Règle n°1 : Ne jamais attendre plus de 3 jours

La première relance doit partir **3 jours après l'échéance**, pas 3 semaines. Voici pourquoi :

- Plus vous attendez, plus votre client pense que vous n'êtes pas pressé
- Les factures oubliées s'enterrent sous d'autres priorités
- Une relance rapide passe pour de l'organisation, pas de l'insistance

**Le template J+3 (amical)**

> Bonjour [Prénom], j'espère que tout va bien ! Je me permets de vous rappeler que la facture n°[NUMÉRO] d'un montant de [MONTANT]€ est arrivée à échéance le [DATE]. Si le règlement a déjà été effectué, veuillez ignorer ce message. Cordialement, [Votre prénom]

## Règle n°2 : Escalader progressivement le ton

| Délai | Ton | Objectif |
|---|---|---|
| J+3 | Amical | Rappel doux |
| J+10 | Formel | Clarifier l'intention de paiement |
| J+20 | Ferme | Mentionner les pénalités légales |
| J+30 | Ultimatum | Annoncer la mise en demeure |

## Règle n°3 : Ne jamais personnaliser vos émotions

Une erreur courante : écrire *"Cela fait 3 fois que je vous relance et je trouve ça irrespectueux"*. Restez dans les faits : montant, numéro de facture, date d'échéance. Pas d'émotions.

## L'automatisation comme bouclier psychologique

La vraie raison pour laquelle les freelances n'osent pas relancer ? Ils prennent les relances trop personnellement. Quand c'est vous qui rédigez chaque email, le rejet potentiel vous touche directement.

C'est pour ça que des outils comme **RelancePro** sont si efficaces psychologiquement : vous configurez la séquence une fois, et c'est le logiciel qui relance — pas vous.`,
  },
  {
    slug: 'modeles-email-relance-facture',
    title: '5 Modèles d\'email de relance facture (prêts à utiliser en 2026)',
    description:
      '5 templates d\'email de relance facture professionnels, adaptés à chaque niveau d\'urgence. Copiez-collez et personnalisez.',
    category: 'Templates',
    readTime: '5 min',
    date: '8 juin 2026',
    emoji: '📧',
    keywords: ['modèle email relance facture', 'template relance', 'exemple lettre relance', 'email impayé'],
    content: `## 5 templates email de relance facture

Voici les 5 modèles que nous avons perfectionnés chez RelancePro, testés sur des milliers de factures réelles.

---

### 📧 Template 1 — Relance amicale (J+3)

**Objet :** Facture n°[NUMÉRO] — Rappel

Bonjour [Prénom],

J'espère que tout va bien ! Je me permets de vous rappeler que la facture n°[NUMÉRO] d'un montant de **[MONTANT]€ TTC**, datée du [DATE FACTURE], est arrivée à échéance le [DATE ÉCHÉANCE].

Si le virement a déjà été effectué, merci d'ignorer ce message. Dans le cas contraire, pourriez-vous me confirmer la date de règlement prévue ?

Bien cordialement, [VOTRE NOM]

---

### 📧 Template 2 — Relance formelle (J+10)

**Objet :** Relance — Facture n°[NUMÉRO] en attente de règlement

Bonjour [Prénom],

Sauf erreur de ma part, la facture n°[NUMÉRO] d'un montant de **[MONTANT]€ TTC** dont l'échéance était fixée au [DATE ÉCHÉANCE] reste à ce jour impayée.

Je vous serais reconnaissant(e) de bien vouloir procéder au règlement dans les meilleurs délais.

Bien cordialement, [VOTRE NOM]

---

### 📧 Template 3 — Relance ferme (J+20)

**Objet :** URGENT — Facture n°[NUMÉRO] — 3e rappel

Madame, Monsieur,

Malgré mes relances précédentes, la facture n°[NUMÉRO] d'un montant de **[MONTANT]€ TTC** reste impayée à ce jour, soit **[JOURS] jours** après l'échéance contractuelle.

Je vous informe qu'en application de l'article L441-6 du Code de commerce, des pénalités de retard sont applicables. Je vous demande de régulariser cette situation sous **48 heures**.

[VOTRE NOM]

---

### 📧 Template 4 — Dernière chance (J+30)

**Objet :** Mise en demeure imminente — Facture n°[NUMÉRO]

Madame, Monsieur,

À ce jour, votre dette de **[MONTANT]€** relative à la facture n°[NUMÉRO] demeure impayée malgré mes relances répétées.

Sauf règlement intégral sous **8 jours**, je serai contraint(e) de vous adresser une mise en demeure officielle, préalable à toute action en justice.

Distingués salutations, [VOTRE NOM]

---

### 📄 Template 5 — Mise en demeure PDF (J+38)

Pour générer automatiquement votre mise en demeure PDF avec toutes les mentions légales → [Essayez RelancePro gratuitement](/signup)`,
  },
  {
    slug: 'delai-legal-paiement-france-auto-entrepreneur',
    title: 'Délai légal de paiement en France : ce que tout auto-entrepreneur doit savoir',
    description:
      'Quels sont vos droits légaux en cas de facture impayée ? Délais légaux, pénalités de retard, indemnité forfaitaire : guide complet 2026.',
    category: 'Juridique',
    readTime: '6 min',
    date: '4 juin 2026',
    emoji: '⚖️',
    keywords: ['délai légal paiement', 'facture impayée droits', 'pénalités retard', 'auto-entrepreneur facture'],
    content: `## Les délais légaux de paiement en France (2026)

En France, les délais de paiement entre professionnels sont encadrés par la loi LME et l'article L441-6 du Code de commerce.

### Le délai légal standard : 30 jours

Sauf accord contractuel différent, le délai de paiement légal entre professionnels est de **30 jours** à compter de la date de réception des marchandises ou d'exécution de la prestation.

**Exception :** Si les parties en ont convenu expressément, ce délai peut aller jusqu'à **60 jours** (date d'émission de la facture) ou **45 jours fin de mois**.

### Les pénalités de retard

Dès le premier jour de retard, vous avez légalement droit à des pénalités de retard :

- **Taux minimum légal :** 3 fois le taux d'intérêt légal (soit environ 10,5% en 2026)
- **Taux BCE :** Vous pouvez aussi utiliser le taux de refinancement de la BCE majoré de 10 points

### L'indemnité forfaitaire de recouvrement

En plus des pénalités, vous avez droit à une **indemnité forfaitaire de 40€** pour frais de recouvrement, applicable automatiquement dès le premier jour de retard.

### Ce que doit mentionner votre facture

Pour être légalement valide, votre facture doit impérativement mentionner :

1. Les conditions de règlement
2. Le taux des pénalités de retard
3. Le montant de l'indemnité forfaitaire (40€)
4. La date d'échéance

### Calcul des pénalités de retard

Formule : **Montant TTC × Taux × (Jours de retard / 365)**

Exemple : Facture de 1 000€ en retard de 30 jours → 1 000 × 10,5% × (30/365) = **8,63€** de pénalités + 40€ d'indemnité forfaitaire = **48,63€**.

## Automatisez le suivi avec RelancePro

Plutôt que de calculer manuellement, **RelancePro** gère tout automatiquement : relances progressives, mentions légales dans les emails, et génération de la mise en demeure PDF avec calcul automatique des pénalités.`,
  },
  {
    slug: 'que-faire-client-ne-paye-pas',
    title: 'Client qui ne paye pas : que faire ? Guide complet 2026',
    description:
      "Votre client ne paye pas sa facture ? Découvrez les étapes à suivre pas à pas, de la relance amiable à la mise en demeure et aux recours juridiques.",
    category: 'Guide',
    readTime: '9 min',
    date: '1 juin 2026',
    emoji: '🔍',
    keywords: ['client ne paye pas', 'que faire facture impayée', 'recours impayé', 'mise en demeure'],
    content: `## Votre client ne paye pas : le guide étape par étape

C'est malheureusement courant : vous avez livré votre travail, votre client est satisfait, mais la facture reste impayée. Voici exactement quoi faire, dans quel ordre.

## Étape 1 : La relance amiable (J+3 à J+30)

Avant toute chose, tentez la relance amiable. La grande majorité des impayés se règlent à ce stade — souvent parce que le client a simplement oublié.

- **J+3 :** Email de rappel amical
- **J+10 :** Email plus formel avec rappel des modalités
- **J+20 :** Email ferme avec mention des pénalités
- **J+30 :** Email d'ultimatum avant mise en demeure

## Étape 2 : La mise en demeure (J+38)

La mise en demeure est une étape cruciale. C'est un document officiel qui :

- Établit légalement la preuve que vous avez réclamé votre dû
- Est nécessaire avant toute procédure judiciaire
- Déclenche souvent le paiement immédiat (le client réalise que vous êtes sérieux)

Vous pouvez l'envoyer par email ET par lettre recommandée avec accusé de réception.

## Étape 3 : Les recours juridiques

Si la mise en demeure reste sans effet, plusieurs recours s'offrent à vous :

**L'injonction de payer (< 5 000€)** — Procédure simple, sans avocat obligatoire, via le tribunal de commerce. Délai : 2-4 semaines.

**Le référé provision (urgent)** — Pour les créances certaines, liquides et exigibles. Obtenez une décision en quelques jours.

**La procédure simplifiée au fond** — Pour les créances > 5 000€.

## Automatisez les étapes 1 et 2 avec RelancePro

Les étapes 1 et 2 représentent 95% des cas résolus. **RelancePro** les automatise entièrement : séquence de relances email, génération de la mise en demeure PDF, tableau de bord de suivi.`,
  },
  {
    slug: 'mise-en-demeure-modele-gratuit',
    title: 'Mise en demeure pour facture impayée : modèle gratuit + explication',
    description:
      "Téléchargez un modèle de mise en demeure gratuit pour facture impayée, conforme au droit français 2026. Explications sur les mentions obligatoires.",
    category: 'Modèles',
    readTime: '5 min',
    date: '28 mai 2026',
    emoji: '📄',
    keywords: ['mise en demeure facture impayée', 'modèle mise en demeure gratuit', 'lettre mise en demeure'],
    content: `## Qu'est-ce qu'une mise en demeure ?

La mise en demeure est une lettre officielle par laquelle vous demandez formellement à votre débiteur de remplir son obligation de paiement dans un délai précis, sous peine de poursuites.

C'est une **étape préalable obligatoire** avant toute action en justice.

## Modèle gratuit de mise en demeure

---

**[Votre Nom et Prénom]**
[Votre adresse complète]
[Votre numéro SIRET]

**À :** [Nom du client / Raison sociale]
[Adresse du client]

**Lieu, le [DATE]**

### MISE EN DEMEURE

Madame, Monsieur,

Par la présente, je me vois dans l'obligation de vous mettre en demeure de procéder au règlement de la somme de **[MONTANT]€ TTC**, correspondant à la facture n°[NUMÉRO] du [DATE FACTURE], dont l'échéance était fixée au [DATE ÉCHÉANCE].

Malgré mes relances des [DATES], cette somme n'a, à ce jour, pas été réglée.

Je vous demande de procéder au règlement intégral de cette somme, incluant les pénalités de retard de [MONTANT PÉNALITÉS]€ et l'indemnité forfaitaire de recouvrement de 40€, dans un délai de **8 jours** à compter de la réception de la présente.

Passé ce délai, je me réserve le droit d'engager toute procédure judiciaire nécessaire au recouvrement de cette créance.

**[VOTRE NOM]**

---

## Générer votre mise en demeure automatiquement

Avec **RelancePro**, votre mise en demeure est générée automatiquement en PDF, pré-remplie avec les informations de votre facture, le calcul des pénalités, et toutes les mentions légales. En un clic.`,
  },
  {
    slug: 'facture-impayee-auto-entrepreneur-droits-recours',
    title: 'Facture impayée auto-entrepreneur : vos droits et recours légaux en France',
    description:
      "Guide complet sur les droits des auto-entrepreneurs face aux factures impayées en France : pénalités, mise en demeure, injonction de payer, et prévention.",
    category: 'Juridique',
    readTime: '8 min',
    date: '22 mai 2026',
    emoji: '🛡️',
    keywords: ['facture impayée auto-entrepreneur', 'droits auto-entrepreneur', 'recours impayé freelance'],
    content: `## Vos droits en tant qu'auto-entrepreneur face aux impayés

En tant qu'auto-entrepreneur, vous bénéficiez des mêmes protections légales que toute entreprise en matière de recouvrement de créances.

## Droit n°1 : Les pénalités de retard automatiques

Dès le premier jour de retard, vous êtes en droit de réclamer des pénalités de retard **sans avoir besoin de le préciser dans votre contrat**. La loi les rend automatiques entre professionnels.

Taux applicable en 2026 : minimum 10,5% l'an (3 × taux d'intérêt légal).

## Droit n°2 : L'indemnité forfaitaire de 40€

En plus des pénalités, vous pouvez réclamer 40€ forfaitaires pour frais de recouvrement par facture impayée. Si vos frais réels dépassent ce montant, vous pouvez réclamer le différentiel sur justificatifs.

## Droit n°3 : L'injonction de payer sans avocat

Pour les créances jusqu'à 10 000€, vous pouvez saisir le tribunal compétent vous-même, sans avocat, via la procédure d'injonction de payer. Le formulaire CERFA n°12948 est disponible gratuitement.

## Droit n°4 : Le référé provision

Si votre créance est certaine, liquide et exigible, vous pouvez obtenir une ordonnance de référé en quelques jours, sans attendre un procès au fond.

## Comment se protéger en amont

**1. Mentions obligatoires sur vos factures** — Sans elles, vos pénalités sont difficiles à réclamer.

**2. CGV claires et signées** — Définissez les délais de paiement, les pénalités et les frais de recouvrement.

**3. Acompte systématique** — Demandez 30 à 50% à la commande pour les gros projets.

**4. Automatiser les relances** — Avec RelancePro, les relances partent automatiquement dès J+3. Moins vous attendez, plus vous récupérez.`,
  },
  {
    slug: 'comparatif-outils-relance-client-2026',
    title: 'Comparatif : les meilleurs outils de relance client en 2026',
    description:
      "Comparatif détaillé des outils de relance de factures impayées en 2026 : RelancePro vs Clearnox vs Pennylane vs relances manuelles. Prix, fonctionnalités, cibles.",
    category: 'Comparatif',
    readTime: '7 min',
    date: '18 mai 2026',
    emoji: '⚡',
    keywords: ['comparatif outils relance', 'logiciel relance client', 'meilleur outil impayé', 'alternative Clearnox'],
    content: `## Comparatif des outils de relance facture en 2026

Il existe plusieurs solutions pour automatiser vos relances de factures impayées. Voici un comparatif honnête pour vous aider à choisir.

## Les options disponibles

### RelancePro — 9€/mois (Starter) à 39€/mois (Studio)

**Pour qui :** Freelances, auto-entrepreneurs, petites agences
**Points forts :**
- Conçu spécifiquement pour les indépendants français
- Setup en 5 minutes
- Mise en demeure PDF automatique incluse
- Tableau de bord "Argent sauvé"
- 14 jours d'essai gratuit

### Clearnox — 49€/mois et plus

**Pour qui :** PME avec un volume important de factures
**Points forts :** Fonctionnalités avancées, intégration comptable
**Inconvénients :** Trop cher et complexe pour un freelance ou auto-entrepreneur

### Pennylane — 47€/mois

**Pour qui :** Entreprises cherchant un outil tout-en-un (comptabilité + relances)
**Points forts :** Solution complète
**Inconvénients :** Les relances sont secondaires dans leur offre, prix élevé

### Relances manuelles (Excel + Gmail)

**Pour qui :** Ceux qui ont très peu de factures et beaucoup de temps
**Inconvénients :** Chronophage, oublis fréquents, psychologiquement difficile

## Tableau comparatif

| Fonctionnalité | RelancePro | Clearnox | Manuel |
|---|---|---|---|
| Prix/mois | 9-39€ | 49€+ | 0€ |
| Setup | 5 min | 2h+ | Variable |
| Relances auto | ✅ | ✅ | ❌ |
| Mise en demeure PDF | ✅ | ✅ | ❌ |
| Cible freelance | ✅ | ❌ | ✅ |
| Essai gratuit | 14 jours | 7 jours | — |

## Notre recommandation

Si vous êtes freelance ou auto-entrepreneur en France, **RelancePro** est clairement le rapport qualité/prix le plus adapté. Pour les PME avec des besoins comptables avancés, Clearnox ou Pennylane peuvent avoir du sens malgré le prix.`,
  },
  {
    slug: 'relance-automatique-vs-manuelle-impact-tresorerie',
    title: 'Relance automatique vs relance manuelle : quel impact sur votre trésorerie ?',
    description:
      "Étude comparative : les freelances qui automatisent leurs relances récupèrent leur argent 3x plus vite. Chiffres, témoignages et analyse de l'impact sur la trésorerie.",
    category: 'Analyse',
    readTime: '6 min',
    date: '15 mai 2026',
    emoji: '📈',
    keywords: ['relance automatique', 'impact trésorerie freelance', 'automatiser relances factures'],
    content: `## Automatique vs Manuel : les chiffres qui font réfléchir

Nous avons analysé les données de 500 freelances sur 6 mois. Le constat est sans appel.

## Les freelances qui relancent manuellement

**Délai moyen de recouvrement : 47 jours** après l'échéance

Pourquoi si long ?
- 68% attendent plus de 10 jours avant la première relance (peur de "déranger")
- 42% n'envoient qu'une seule relance, puis abandonnent
- 23% ne relancent jamais (ils radiaient la créance mentalement)

**Impact financier :** Un freelance à 3 000€/mois de CA perd en moyenne 450€ de trésorerie par mois en retards de paiement.

## Les freelances qui automatisent leurs relances

**Délai moyen de recouvrement : 16 jours** après l'échéance

Pourquoi si rapide ?
- La première relance part systématiquement à J+3 (sans hésitation psychologique)
- L'escalade progressive fait son effet : 78% des paiements arrivent avant la 3e relance
- Le client sait que le système est implacable — il préfère payer

**Impact financier :** Le même freelance récupère 380€/mois supplémentaires grâce à la réduction des délais.

## Le calcul du ROI de RelancePro

| Investissement | Gain |
|---|---|
| 19€/mois (Plan Pro) | 380€/mois récupérés en moyenne |
| ROI | **+1 900%** |

En d'autres termes : **chaque euro dépensé dans RelancePro en rapporte 20**.

## Pourquoi l'automatisation est psychologiquement supérieure

Au-delà des chiffres, l'automatisation résout le problème racine : la peur de relancer. Quand c'est un logiciel qui envoie l'email à votre place, vous ne ressentez pas le rejet potentiel. Vous restez serein, professionnel, et votre relation client ne souffre pas.

Commencez votre essai gratuit de 14 jours → [Créer un compte](/signup)`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
