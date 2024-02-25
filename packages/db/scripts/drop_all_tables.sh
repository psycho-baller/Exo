#!/bin/bash
# Make sure to set the following environment variables and source them before running this script:
# - DB_USER
# - DB_NAME
# - DB_HOST (if you're not using localhost)
# - MYSQL_PWD (if you have a password set for the MySQL user)
user=$DB_USER
db=$DB_NAME
host=$DB_HOST

echo "Dropping all tables from $db..."

# Create a variable with the command to list all tables
tables=$(mysql -u $user -h $host -Nse 'SHOW TABLES' $db)

# Loop through the tables and drop each one
for table in $tables; do
  echo "Dropping $table from $db..."
  mysql -u $user -h $host -e "DROP TABLE \`$table\`" $db
done

echo "All tables dropped from $db."
