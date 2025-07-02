# Intégration Laravel Backend

Ce document explique comment configurer et utiliser Laravel comme backend API pour le système de gestion restaurant.

## Architecture

Le projet utilise maintenant une architecture séparée :

- **Frontend** : React + Vite (port 8080)
- **Backend** : Laravel API (port 8000)
- **Base de données** : MySQL ou PostgreSQL

## Configuration Laravel

### 1. Installation Laravel

```bash
# Créer un nouveau projet Laravel
composer create-project laravel/laravel restaurant-api
cd restaurant-api

# Installer Sanctum pour l'authentification API
composer require laravel/sanctum

# Publier la configuration Sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### 2. Configuration Base de Données

Copier le fichier `.env.example` vers `.env` et configurer :

```env
# MySQL
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=restaurant_db
DB_USERNAME=root
DB_PASSWORD=your_password

# PostgreSQL (Alternative)
# DB_CONNECTION=pgsql
# DB_HOST=127.0.0.1
# DB_PORT=5432
# DB_DATABASE=restaurant_db
# DB_USERNAME=postgres
# DB_PASSWORD=your_password

# Configuration API
APP_URL=http://localhost:8000
SANCTUM_STATEFUL_DOMAINS=localhost:8080,127.0.0.1:8080
CORS_ALLOWED_ORIGINS=http://localhost:8080
```

### 3. Migrations de Base de Données

Créer les migrations nécessaires :

```bash
# Utilisateurs (déjà existant avec modification)
php artisan make:migration add_role_to_users_table

# Catégories
php artisan make:migration create_categories_table

# Produits
php artisan make:migration create_products_table

# Commandes
php artisan make:migration create_orders_table

# Articles de commande
php artisan make:migration create_order_items_table
```

#### Schema des tables

**Categories**

```php
Schema::create('categories', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->text('description')->nullable();
    $table->string('image_url')->nullable();
    $table->boolean('is_active')->default(true);
    $table->timestamps();
});
```

**Products**

```php
Schema::create('products', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->text('description')->nullable();
    $table->integer('price'); // Prix en centimes
    $table->foreignId('category_id')->constrained()->onDelete('cascade');
    $table->string('image_url')->nullable();
    $table->boolean('is_available')->default(true);
    $table->timestamps();
});
```

**Orders**

```php
Schema::create('orders', function (Blueprint $table) {
    $table->id();
    $table->string('order_number')->unique();
    $table->string('table_number');
    $table->string('customer_name')->nullable();
    $table->enum('status', ['pending', 'validated', 'in_progress', 'served', 'cancelled'])->default('pending');
    $table->integer('total_price'); // Prix en centimes
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->timestamps();
});
```

**Order Items**

```php
Schema::create('order_items', function (Blueprint $table) {
    $table->id();
    $table->foreignId('order_id')->constrained()->onDelete('cascade');
    $table->foreignId('product_id')->constrained()->onDelete('cascade');
    $table->integer('quantity');
    $table->integer('unit_price'); // Prix en centimes
    $table->integer('total_price'); // Prix en centimes
    $table->text('notes')->nullable();
    $table->timestamps();
});
```

**Users (ajouter rôle)**

```php
Schema::table('users', function (Blueprint $table) {
    $table->enum('role', ['admin', 'manager', 'serveur', 'cuisinier'])->default('serveur');
});
```

### 4. Modèles Eloquent

Créer les modèles avec les relations :

```bash
php artisan make:model Category
php artisan make:model Product
php artisan make:model Order
php artisan make:model OrderItem
```

### 5. Controllers API

```bash
php artisan make:controller Api/CategoryController --api
php artisan make:controller Api/ProductController --api
php artisan make:controller Api/OrderController --api
php artisan make:controller Api/DashboardController
php artisan make:controller Api/AuthController
```

### 6. Routes API

Dans `routes/api.php` :

```php
use App\Http\Controllers\Api\{
    AuthController,
    CategoryController,
    ProductController,
    OrderController,
    DashboardController
};

// Authentification
Route::post('/auth/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);

    // Dashboard
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

    // Ressources API
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('products', ProductController::class);
    Route::apiResource('orders', OrderController::class);
    Route::apiResource('users', UserController::class);
});
```

### 7. Configuration CORS

Dans `config/cors.php` :

```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_methods' => ['*'],
'allowed_origins' => [env('CORS_ALLOWED_ORIGINS', 'http://localhost:8080')],
'allowed_origins_patterns' => [],
'allowed_headers' => ['*'],
'exposed_headers' => [],
'max_age' => 0,
'supports_credentials' => false,
```

## Configuration Frontend

### 1. Variables d'environnement

Créer un fichier `.env` basé sur `.env.example` :

```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME="Restaurant Management System"
```

### 2. Service API

Le service API est déjà configuré dans `client/lib/api-service.ts` et utilise automatiquement la variable d'environnement `VITE_API_URL`.

### 3. Hooks React Query

Les hooks sont disponibles dans `client/hooks/use-laravel-api.ts` pour :

- Dashboard statistiques
- Gestion des commandes (CRUD)
- Gestion des produits (CRUD)
- Authentification

## Déploiement

### 1. Déploiement Laravel

```bash
# Installation des dépendances
composer install --optimize-autoloader --no-dev

# Configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Migrations
php artisan migrate --force

# Démarrage du serveur
php artisan serve --host=0.0.0.0 --port=8000
```

### 2. Déploiement Frontend

```bash
# Build de production
npm run build

# Démarrage du serveur
npm start
```

## Utilisation

### 1. Démarrage en développement

**Backend Laravel :**

```bash
cd restaurant-api
php artisan serve
```

**Frontend React :**

```bash
npm run dev
```

### 2. Fonctionnalités implémentées

- ✅ Statistiques dashboard en temps réel
- ✅ Gestion des commandes avec React Query
- ✅ Interface utilisateur responsive
- ✅ Authentification API avec Sanctum
- ✅ Cache et optimisations
- ✅ Gestion d'erreurs
- ✅ Loading states

### 3. Points d'API disponibles

- `GET /api/dashboard/stats` - Statistiques dashboard
- `GET /api/orders` - Liste des commandes (paginée)
- `POST /api/orders` - Créer une commande
- `PUT /api/orders/{id}` - Modifier une commande
- `DELETE /api/orders/{id}` - Supprimer une commande
- `GET /api/products` - Liste des produits
- `GET /api/categories` - Liste des catégories

## Structure des Données

Toutes les API suivent le format Laravel standard :

```json
{
  "data": {...},
  "message": "Success",
  "success": true
}
```

Les prix sont stockés en centimes pour éviter les problèmes de précision décimale.

## Migration depuis Express

1. Les anciens endpoints Express peuvent être désactivés
2. Toutes les données sont maintenant gérées par Laravel
3. L'authentification utilise Laravel Sanctum
4. Les types TypeScript sont mis à jour pour Laravel

Cette architecture permet une meilleure scalabilité, sécurité et maintenabilité du système.
