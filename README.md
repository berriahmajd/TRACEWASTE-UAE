# TRACEWASTE-UAE 🌍♻️

Plateforme digitale centralisée permettant le suivi en temps réel de tous les flux de déchets à l'échelle nationale, avec traçabilité complète et données interconnectées entre émirats.

## 🎯 Problèmes Ciblés

- ✅ Données fragmentées et non-standardisées entre émirats
- ✅ Absence de visibilité sur les volumes réels de déchets
- ✅ Impossibilité de mesurer l'efficacité du recyclage
- ✅ Marchés secondaires de matériaux sous-développés

## 💡 Solution Proposée

Système **IoT + Blockchain** avec interface unifiée permettant à chaque acteur (ménages, entreprises, municipalités, recycleurs) d'enregistrer et suivre les déchets via:
- QR codes
- Puces RFID
- Tableau de bord analytique en temps réel

## 🚀 Fonctionnalités

### Pour les Particuliers
- Enregistrement du type d'utilisateur (Individual, Residence, Villa, Office)
- Signalement du nombre de fois de sortie des déchets
- Sélection du type de déchets
- Capture de photo (recommandée)
- Suivi en temps réel via traçabilité GPS

### Pour les Professionnels
- Enregistrement d'entreprises/usines/industries
- Gestion des flux de déchets volumineux
- Rapports détaillés par type de déchets
- Intégration IoT/RFID pour suivi automatisé

### Tableau de Bord
- Score de recyclage personnel
- Total de déchets signalés
- Taux de recyclage en %
- CO2 économisé
- Points de récompense

## 📱 Installation

```bash
# Installer les dépendances
npm install

# Lancer l'application
expo start

# Pour Android
expo start --android

# Pour iOS
expo start --ios
```

## 🔧 Configuration

Créer un fichier `.env` basé sur `.env.example`:

```
EXPO_PUBLIC_API_URL=https://api.tracewaste-uae.com
EXPO_PUBLIC_ENVIRONMENT=production
```

## 📋 Types de Déchets Supportés

- Plastique
- Papier
- Organique
- Métal
- Verre
- Électronique
- Textile
- Matières dangereuses
- Autres

## 👥 Types d'Utilisateurs

### Particuliers
- Individual
- Residence
- Villa
- Office

### Professionnels
- Company
- Factory
- Industry

## 🔒 Sécurité

- Authentification JWT
- Chiffrement des données sensibles
- Permissions granulaires par rôle
- Audit trail complet

## 📊 Traçabilité

Chaque rapport de déchets inclut:
- Identité de l'utilisateur
- Type et quantité de déchets
- Localisation GPS
- Timestamp
- Photo optionnelle
- Statut (reported → collected → recycled)

## 🏆 Système de Récompenses

- Points pour chaque rapport
- Bonus pour taux de recyclage élevé
- Rédemption contre produits écologiques
- Ranking national

## 📞 Support

Pour toute question sur l'implémentation backend, consulter la documentation API complète.

## 📄 License

MIT License - TRACEWASTE-UAE Project