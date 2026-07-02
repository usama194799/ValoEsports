echo 'radius@123' | sudo -S bash -c '
cd /var/www/muxarena-api

echo "Fixing permissions..."
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache
# Also ensure radius can write
usermod -a -G www-data radius

echo "Running migrations and seeders..."
php artisan migrate --force
php artisan db:seed --force

echo "Creating storage link..."
php artisan storage:link

echo "Creating HealthCheckController..."
mkdir -p app/Http/Controllers
cat << "EOF" > app/Http/Controllers/HealthCheckController.php
<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Storage;
use Illuminate\Routing\Controller;

class HealthCheckController extends Controller
{
    public function index()
    {
        $dbStatus = "disconnected";
        try {
            DB::connection()->getPdo();
            $dbStatus = "connected";
        } catch (\Exception $e) {}

        $redisStatus = "disconnected";
        try {
            Redis::connection()->ping();
            $redisStatus = "connected";
        } catch (\Exception $e) {}

        $storageStatus = "error";
        try {
            Storage::disk("local")->put("health.txt", "ok");
            if (Storage::disk("local")->exists("health.txt")) {
                $storageStatus = "ok";
                Storage::disk("local")->delete("health.txt");
            }
        } catch (\Exception $e) {}

        return response()->json([
            "status" => "ok",
            "database" => $dbStatus,
            "redis" => $redisStatus,
            "storage" => $storageStatus,
            "queue" => "ready",
            "version" => "1.0.0"
        ]);
    }
}
EOF

echo "Adding route..."
if ! grep -q "HealthCheckController" routes/api.php; then
    echo "Route::get(\"/health\", [\App\Http\Controllers\HealthCheckController::class, \"index\"]);" >> routes/api.php
fi

echo "Running production cache commands..."
php artisan optimize
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

echo "DONE"
'
