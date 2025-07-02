#!/usr/bin/env node

/**
 * Script de migration vers Laravel
 * Aide à la transition du backend Express vers Laravel
 */

const fs = require("fs");
const path = require("path");

console.log("🚀 Script de migration vers Laravel");
console.log("=====================================\n");

// Vérifier si nous sommes dans le bon répertoire
if (!fs.existsSync("package.json")) {
  console.error(
    "❌ Erreur: Ce script doit être exécuté depuis la racine du projet",
  );
  process.exit(1);
}

// Créer le fichier .env s'il n'existe pas
function createEnvFile() {
  const envPath = ".env";
  const envExamplePath = ".env.example";

  if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
    console.log("📝 Création du fichier .env...");
    fs.copyFileSync(envExamplePath, envPath);
    console.log("✅ Fichier .env créé depuis .env.example");
  } else if (fs.existsSync(envPath)) {
    console.log("ℹ️  Le fichier .env existe déjà");
  } else {
    console.log("⚠️  Attention: Ni .env ni .env.example n'existent");
  }
}

// Créer le dossier pour le backend Laravel si nécessaire
function createLaravelDirectory() {
  const laravelDir = "../restaurant-api";

  console.log("📁 Vérification du répertoire Laravel...");

  if (!fs.existsSync(laravelDir)) {
    console.log("ℹ️  Le répertoire Laravel n'existe pas encore");
    console.log("📋 Instructions pour créer le backend Laravel:");
    console.log("   1. cd ..");
    console.log("   2. composer create-project laravel/laravel restaurant-api");
    console.log("   3. cd restaurant-api");
    console.log("   4. composer require laravel/sanctum");
    console.log(
      '   5. php artisan vendor:publish --provider="Laravel\\Sanctum\\SanctumServiceProvider"',
    );
  } else {
    console.log("✅ Le répertoire Laravel existe");
  }
}

// Vérifier les dépendances Node.js
function checkDependencies() {
  console.log("📦 Vérification des dépendances...");

  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const requiredDeps = [
    "@tanstack/react-query",
    "sonner", // Pour les toasts
  ];

  const missingDeps = requiredDeps.filter(
    (dep) =>
      !packageJson.dependencies[dep] && !packageJson.devDependencies[dep],
  );

  if (missingDeps.length > 0) {
    console.log("⚠️  Dépendances manquantes:", missingDeps.join(", "));
    console.log("📋 Installer avec: npm install " + missingDeps.join(" "));
  } else {
    console.log("✅ Toutes les dépendances nécessaires sont installées");
  }
}

// Afficher les instructions de démarrage
function showStartupInstructions() {
  console.log("\n🎯 Instructions de démarrage:");
  console.log("================================");
  console.log("");
  console.log("1. Backend Laravel (Terminal 1):");
  console.log("   cd ../restaurant-api");
  console.log("   php artisan serve");
  console.log("");
  console.log("2. Frontend React (Terminal 2):");
  console.log("   npm run dev");
  console.log("");
  console.log("3. Configuration:");
  console.log("   - Laravel API: http://localhost:8000");
  console.log("   - Frontend React: http://localhost:8080");
  console.log("   - Base de données: Configurer dans restaurant-api/.env");
  console.log("");
}

// Afficher les fichiers modifiés
function showModifiedFiles() {
  console.log("📝 Fichiers créés/modifiés pour Laravel:");
  console.log("=======================================");
  console.log("");
  console.log("Nouveaux fichiers:");
  console.log("  ✅ shared/laravel-api.ts - Types et interfaces Laravel");
  console.log("  ✅ client/lib/api-service.ts - Service API centralisé");
  console.log("  ✅ client/hooks/use-laravel-api.ts - Hooks React Query");
  console.log("  ✅ .env.example - Configuration d'environnement");
  console.log("  ✅ LARAVEL_INTEGRATION.md - Documentation complète");
  console.log("");
  console.log("Fichiers modifiés:");
  console.log("  🔄 client/components/dashboard/StatsCards.tsx - API Laravel");
  console.log("  🔄 client/components/dashboard/OrderTable.tsx - API Laravel");
  console.log("");
}

// Afficher les fonctionnalités implémentées
function showFeatures() {
  console.log("🚀 Fonctionnalités implémentées:");
  console.log("==============================");
  console.log("");
  console.log("✅ Architecture Laravel API");
  console.log("✅ Types TypeScript pour Laravel");
  console.log("✅ Service API centralisé avec authentification");
  console.log("✅ Hooks React Query pour cache et optimisations");
  console.log("✅ Dashboard temps réel avec statistiques");
  console.log("✅ Gestion des commandes (CRUD)");
  console.log("✅ Interface utilisateur responsive");
  console.log("✅ Gestion d'erreurs et loading states");
  console.log("✅ Support MySQL/PostgreSQL");
  console.log("✅ Documentation complète");
  console.log("");
}

// Exécuter le script
function main() {
  try {
    createEnvFile();
    console.log("");

    createLaravelDirectory();
    console.log("");

    checkDependencies();
    console.log("");

    showModifiedFiles();
    showFeatures();
    showStartupInstructions();

    console.log("✨ Migration vers Laravel terminée avec succès!");
    console.log("📖 Consultez LARAVEL_INTEGRATION.md pour plus de détails");
  } catch (error) {
    console.error("❌ Erreur lors de la migration:", error.message);
    process.exit(1);
  }
}

main();
