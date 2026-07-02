echo 'radius@123' | sudo -S bash -c '
cd /var/www/muxarena-api
echo "Running migrations and seeders..."
php artisan migrate --force
php artisan db:seed --force
echo "DONE"
'
