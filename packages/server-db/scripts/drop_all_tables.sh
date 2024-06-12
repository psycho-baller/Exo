#!/bin/bash
# ! This currently doesn't work with turso
# Make sure to set the following environment variable and source it before running this script:
# - DB_PATH: the path to your SQLite database file

db=$DB_PATH

echo "Dropping all tables from $db..."

# Create a variable with the command to list all tables
tables=$(sqlite3 $db ".tables")

# Loop through the tables and drop each one
for table in $tables; do
  echo "Dropping $table from $db..."
  sqlite3 $db "DROP TABLE $table"
done

echo "All tables dropped from $db."
