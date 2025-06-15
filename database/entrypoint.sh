#!/bin/bash

# Start the PostgreSQL server
docker-entrypoint.sh postgres &

# Wait for PostgreSQL to be ready
until pg_isready -h localhost -U myuser -d mydb; do
  echo "Waiting for PostgreSQL to start..."
  sleep 1
done

# Function to export schema and data
export_data() {
  echo "Exporting schema to /docker-entrypoint-initdb.d/1-init.sql..."
  pg_dump -U myuser -d mydb --schema-only > /docker-entrypoint-initdb.d/1-init.sql

  echo "Exporting data to /docker-entrypoint-initdb.d/2-data.sql..."
  pg_dump -U myuser -d mydb --data-only --inserts > /docker-entrypoint-initdb.d/2-data.sql
  echo "Schema and data exported successfully."
}

# Trap SIGTERM and SIGINT to export on container exit
trap 'export_data; kill $!; wait $!; exit 0' SIGTERM SIGINT

# Keep the container running
wait
