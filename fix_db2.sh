echo 'radius@123' | sudo -S bash -c '
cd /var/www/muxarena-api
echo "Removing conflicting default migrations..."
rm -f database/migrations/0001_01_01_000000_create_users_table.php

echo "Fixing DatabaseSeeder..."
sed -i "s/RoleSeeder::class/RolesAndPermissionsSeeder::class/g" database/seeders/DatabaseSeeder.php

echo "Running fresh migrations and seeders..."
php artisan migrate:fresh --seed --force
'
