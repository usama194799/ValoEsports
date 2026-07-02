echo 'radius@123' | sudo -S bash -c '
cd /var/www/muxarena-api
echo "--- ENV ---"
grep -E "DB_|REDIS_|CACHE_|QUEUE_" .env
echo "--- PERMISSIONS ---"
ls -ld storage storage/logs storage/framework storage/framework/cache storage/framework/sessions storage/framework/views
echo "--- MIGRATE STATUS ---"
php artisan migrate:status
echo "--- CACHE STATUS ---"
php artisan cache:clear
php artisan route:clear
php artisan config:clear
php artisan view:clear
'
