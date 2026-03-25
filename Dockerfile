FROM php:8.4-apache

# 1. Instalar herramientas del sistema (git, unzip)
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# 2. Instalar extensiones de PHP (PDO MySQL)
RUN docker-php-ext-install pdo pdo_mysql

# 3. Habilitar mod_rewrite de Apache (Obligatorio para que funcionen las rutas de Laravel)
RUN a2enmod rewrite

# 4. Copiar Composer oficial
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 5. Directorio de trabajo
WORKDIR /var/www/html