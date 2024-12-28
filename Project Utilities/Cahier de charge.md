### Cahier des Charges Consolidé : Application Web de Génération et d'Évaluation de Quizz

---

#### **1. Contexte et Objectifs**
L'objectif de l'application est de fournir une plateforme intuitive pour créer, gérer, et passer des quizz, principalement orientée sur des sujets éducatifs comme les concepts SQL. L'application vise à :
- Permettre aux utilisateurs de générer des quizz basés sur des préférences spécifiques.
- Fournir un environnement interactif pour répondre aux quizz et enregistrer les résultats.
- Visualiser l'historique des performances et des détails des quizz passés.

L'application est développée avec **Next.js** pour le frontend et backend, utilisant une base de données relationnelle **MySQL**.

---

#### **2. Fonctionnalités**

##### **2.1. Gestion des utilisateurs**
- **Inscription et connexion sécurisées :**
  - Création d’un compte utilisateur avec un email, un mot de passe sécurisé (haché), et un nom d'utilisateur unique.
  - Authentification via email et mot de passe.
  - Sessions sécurisées avec des tokens JWT.
- **Profil utilisateur :**
  - Gestion et accès à l’historique des quizz et des tentatives.

##### **2.2. Création de quizz**
- **Formulaire interactif pour définir les préférences :**
  - Prompt pour décrire le sujet du quizz.
  - Nombre de questions souhaitées.
  - Niveau de difficulté (débutant, intermédiaire, avancé).
  - Type de questions : QCM ou questions ouvertes.
- **Génération automatique des questions :**
  - Utilisation d’une API ou d’un modèle interne pour générer les questions et les réponses.
  - Sauvegarde des quizz dans une base de données.

##### **2.3. Passage de quizz**
- **Interface utilisateur conviviale :**
  - Affichage des questions une à une sous forme de cartes.
  - Validation des réponses utilisateur avec un feedback instantané ou différé.
- **Types de questions pris en charge :**
  - QCM : réponses multiples avec une seule correcte.
  - Questions ouvertes : saisie libre par l'utilisateur.

##### **2.4. Feedback et résultats**
- Affichage détaillé des résultats après chaque quizz :
  - Réponses données et corrections.
  - Explications pour chaque question.
  - Calcul du score total et taux de réussite.
- Visualisation de l’état du quizz : réussi ou échoué.

##### **2.5. Gestion de l'historique**
- Accès à l’historique des quizz et des tentatives :
  - Date et heure.
  - Score obtenu.
  - Détails des réponses et feedback.

##### **2.6. Suppression des données**
- Option pour supprimer des quizz ou des tentatives spécifiques.

---

#### **3. Architecture Technique**

##### **3.1. Frontend**
- Framework utilisé : **Next.js**.
- Bibliothèque UI : **Chakra UI**.
- Fonctionnalités dynamiques :
  - Gestion des états pour les réponses utilisateur.
  - Navigation entre différentes pages (création, passage de quizz, feedback, historique).

##### **3.2. Backend**
- Framework : **Next.js API Routes**.
- ORM : **Prisma**.
- API pour la génération de quizz : intégration avec des services externes ou locaux.

##### **3.3. Base de données**
Structure relationnelle avec les tables suivantes :
- `users` : gestion des utilisateurs.
- `quizzes` : stockage des quizz générés.
- `questions` : détails des questions associées aux quizz.
- `options` : réponses possibles pour les QCM.
- `quiz_attempts` : tentatives utilisateur avec leurs scores.
- `user_answers` : réponses saisies par les utilisateurs.

---

#### **4. Interfaces Utilisateur**

##### **4.1 Pages principales**
- Page d'accueil : présentation de l'application.
- Page d'inscription/connexion.
- Page de création de quizz : formulaire de saisie.
- Page de quizz : affichage interactif des questions.
- Page de feedback : résumé des résultats.
- Page d’historique : liste des quizz passés avec accès aux détails.

---

#### **5. Sécurité**
- Hashage des mots de passe avec **bcrypt**.
- Gestion des sessions sécurisées avec **JWT**.
- Validation des données côté serveur pour éviter les injections et autres vulnérabilités.

---

#### **6. Tests**
- Tests unitaires pour les fonctionnalités clés.
- Tests d'intégration pour assurer une interaction fluide entre le frontend, backend, et base de données.
- Tests UX pour valider l’expérience utilisateur sur différents appareils.

---

#### **7. Livrables**
- Application web fonctionnelle avec :
  - Génération, passage et feedback des quizz.
  - Gestion des utilisateurs et de leurs historiques.
- Documentation technique détaillée.
- Scripts pour initialiser la base de données.
- Plans de tests et résultats associés.

---
