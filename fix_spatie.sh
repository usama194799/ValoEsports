echo 'radius@123' | sudo -S bash -c '
cd /var/www/muxarena-api
echo "Publishing Spatie permissions migration..."
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"

echo "Running migrations and seeders again..."
php artisan migrate:fresh --seed --force
'
