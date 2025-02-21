# 📝 Projet: Application de Gestion des Professeurs

## 🎯 Objectif

Le but de ce projet est de développer une application web permettant la gestion des professeurs d'une institution académique. Les principales fonctionnalités incluent la saisie des informations des professeurs, l'importation des données via Excel et la génération de cartes professionnelles. Ce projet a été développé en **23 jours**.

## 📋 Fonctionnalités de l'application

1. **Inscription et Connexion** : Authentification des utilisateurs.

2. **Ajout d'un Professeur** : Formulaire permettant d'ajouter un professeur avec ses informations.
   
3. **Envoi d'Email Automatique** : Lorsqu'un administrateur ajoute un professeur, un email est envoyé automatiquement avec ses informations de connexion (email et mot de passe temporaire). L'email contient un lien vers la plateforme et encourage le professeur à modifier son mot de passe dès la première connexion.

4. **Modification des Données** : Fonctionnalité pour mettre à jour les informations des professeurs.

5. **Suppression d'un Professeur** : Option pour supprimer un professeur de la base de données.

6. **Importation via Excel** : Chargement et validation des fichiers Excel (.xls, .xlsx).

7. **Génération de Cartes Professionnelles** : Création de cartes PDF avec QR Code.

## 🔄 Définition des Daily Stand Up

Pour assurer une bonne communication entre les membres de l'équipe avec limitation des tâches en cours.

## 🔧 Répartition des Tâches

### 🎨 **Saida Alaba**

- Développement du frontend avec React.js
- Création des interfaces utilisateurs
-  Implémentation des fonctionnalités d'importation et exportation de fichiers
- Génération des cartes professionnelles en PDF
- -Documentation

### 🎨 **Asmae Lahroub**

- Développement du backend avec Node.js et Express.js
- Conception et gestion de la base de données MongoDB
- Intégration avec l'API backend
- Gestion de l'authentification et des autorisations
- Intégration de l'affichage de l'état d'activation des comptes après l'envoi de l'email
- Développement du service d'envoi d'emails avec Nodemailer



## 🚀 Commandes pour Démarrer le Projet

### 📌 Démarrer le Backend

1. Accédez au dossier backend :
   ```bash
   cd backend
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez le serveur :
   ```bash
   npm start
   ```

### 📌 Démarrer le Frontend

1. Accédez au dossier frontend :
   ```bash
   cd frontend
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez l'application :
   ```bash
   npm run dev
   ```

## 🛠️ Technologies Utilisées

- ⚛️ **React.js** : Framework pour le front-end
- 🗄️ **MongoDB** : Base de données NoSQL
- 🧩 **Express.js** : Framework pour le développement de l'API côté serveur
- 🖥️ **Node.js** : Environnement d'exécution JavaScript côté serveur
- 📄 **Multer & pdfkit** : Gestion des fichiers et génération de PDF
-  📧 **Nodemailer** : Envoi d'emails via des services SMTP


## 📸 Captures d'écran

### 🔑 Login
![login](https://github.com/LahroubAsmae/GestionProfesseurs/blob/main/assets/login.png)



### 📋 Dashboard Professeurs
![Dashboard](https://github.com/LahroubAsmae/GestionProfesseurs/blob/main/assets/dashbordAdmin.png)


### 📄 Ajouter un Professeur
![Ajout Professeur](https://github.com/LahroubAsmae/GestionProfesseurs/blob/main/assets/Ajoutprofesseur.png)
![Envoie Email](https://github.com/LahroubAsmae/GestionProfesseurs/blob/main/assets/e31f9f91-149b-4816-9a4b-444189b49671.jpg)


### 📜 Importer un Fichier Excel
![Import Excel](https://github.com/LahroubAsmae/GestionProfesseurs/blob/main/assets/importExcel.png)
![](https://github.com/LahroubAsmae/GestionProfesseurs/blob/main/assets/FichierExcel.png)


### 🎟️ Carte Professionnelle Générée
![Carte Professionnelle](https://github.com/LahroubAsmae/GestionProfesseurs/blob/main/assets/GeneratCard.png)
![carte pdf](https://github.com/LahroubAsmae/GestionProfesseurs/blob/main/assets/pdf.png)
![details scan](https://github.com/LahroubAsmae/GestionProfesseurs/blob/main/assets/ScanCard.jpg)

### 🎟️ Gestion des utilisateurs
![liste professeurs](https://github.com/LahroubAsmae/GestionProfesseurs/blob/main/assets/ListeProfessur.png)
### 🎟️ Espace de Professeur
![Profile](https://github.com/LahroubAsmae/GestionProfesseurs/blob/main/assets/ProfesseurProfile.png)
![Modifier Profile](https://github.com/LahroubAsmae/GestionProfesseurs/blob/main/assets/UpdateProfile.png)

