# Test Technique API 🔧

Une API simple pour gérer des **utilisateurs** et des **transactions**, construite avec Node.js, Express et Supabase.

## 🔎 Base URL

`https://test-technique-api.onrender.com/`

---

## 🚀 Endpoints

Toutes les requêtes acceptent et renvoient du JSON. Utilisez l'en-tête `Content-Type: application/json` pour les requêtes POST.

### 1) Créer un utilisateur

- **URL** : `POST /api/user`
- **But** : créer un nouvel utilisateur

Requête (exemple) :

```json
{
	"nom": "Dupont",
	"email": "dupont@example.com",
	"téléphone": "0601020304"
}
```

Validation :
- `nom`, `email`, `téléphone` sont obligatoires
- `téléphone` : 10 chiffres
- `email` : format valide

Réponse succès (201) :

```json
{
	"success": true,
	"message": "Utilisateur créé avec succès",
	"data": { /* utilisateur créé */ }
}
```

Erreurs possibles :
- 400 : champs manquants / format invalide / utilisateur existant
- 500 : erreur serveur

---

### 2) Créer une transaction

- **URL** : `POST /api/transaction`
- **But** : créer une transaction

Requête (exemple) :

```json
{
	"montant": 150.5,
	"statut": "SUCCES",
	"date": "2025-12-16"
}
```

Validation :
- `montant`, `statut`, `date` sont obligatoires
- `montant` : nombre strictement positif
- `statut` : **"EN COURS"**, **"ECHOUEE"** ou **"SUCCES"**

Réponse succès (200) :

```json
{
	"succes": true,
	"message": "Transaction crée avec success",
	"data": [ /* transaction(s) créées */ ]
}
```

Erreurs possibles :
- 400 : données invalides (ex. montant négatif, statut invalide)
- 500 : erreur serveur

---

### 3) Lister les transactions

- **URL** : `GET /api/transaction`
- **But** : récupérer la liste des transactions

Réponse succès (200) :

```json
{
	"succes": true,
	"message": "Liste des transactions",
	"data": [
		{ "id": 1, "montant": 150.5, "statut": "SUCCES", "date": "2025-12-16" },
		{ "id": 2, "montant": 50.0, "statut": "ECHOUEE", "date": "2025-12-15" }
	]
}
```

---

## 🛠️ Installation et exécution locale

1. Cloner le dépôt
```bash
git clone https://github.com/jean-emmvnuel/test_technique_api.git
cd test-technique-api
```
2. Installer les dépendances
```bash
npm install
```
3. Créer un fichier `.env` à la racine et définir :

```
SUPABASE_KEY=your_supabase_key_here
PORT=3000
```

4. Démarrer en mode développement

npm run dev
```

L'API sera disponible sur `http://localhost:3000/` (ou le PORT défini).

---

## ⚠️ Remarques & bonnes pratiques

- Le projet utilise Supabase pour la persistance. La clé Supabase doit être fournie via la variable d'environnement `SUPABASE_KEY`.

- Les messages d'erreur sont renvoyés en texte dans `message` et les codes HTTP pertinents (400/500) sont utilisés pour indiquer la cause.

---

## Exemples rapides (curl)

Créer un utilisateur :

```bash
curl -X POST "https://test-technique-api.onrender.com/api/user" \
	-H "Content-Type: application/json" \
	-d '{"nom":"Dupont","email":"dupont@example.com","téléphone":"0601020304"}'
```

Créer une transaction :

```bash
curl -X POST "https://test-technique-api.onrender.com/api/transaction" \
	-H "Content-Type: application/json" \
	-d '{"montant":100, "statut":"EN COURS", "date":"2025-12-16"}'
```

Lister les transactions :

```bash
curl "https://test-technique-api.onrender.com/api/transaction"
```



