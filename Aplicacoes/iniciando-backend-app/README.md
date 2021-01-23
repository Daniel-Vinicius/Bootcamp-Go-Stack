# Iniciando Backend do App

ORM

```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "docker",
  "database": "gostack_gobarber",
  "migrations": [
    "./src/database/migrations/*.ts" // caminho para pasta de migrations
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations" // caminho para pasta de migrations sem *.ts
  }
}

```
KISS Simples e Estupido

