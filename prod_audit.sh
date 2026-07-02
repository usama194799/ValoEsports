echo 'radius@123' | sudo -S bash -c 'cat << "EOF" > /var/www/muxarena-api/prod_audit.php
<?php
require __DIR__ . "/vendor/autoload.php";
$app = require_once __DIR__ . "/bootstrap/app.php";
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$issues = [];

// 1. Env check
if (env("APP_DEBUG") === true) $issues[] = "SECURITY: APP_DEBUG is true in production!";
if (env("APP_ENV") !== "production") $issues[] = "SECURITY: APP_ENV is not production!";

// 2. Database Indexes check
$pdo = \Illuminate\Support\Facades\DB::connection()->getPdo();
$tables = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
foreach ($tables as $table) {
    $columns = $pdo->query("SHOW COLUMNS FROM `$table`")->fetchAll(PDO::FETCH_ASSOC);
    $indexes = $pdo->query("SHOW INDEX FROM `$table`")->fetchAll(PDO::FETCH_ASSOC);
    $indexCols = array_column($indexes, "Column_name");
    
    foreach ($columns as $col) {
        if (strpos($col["Field"], "_id") !== false && !in_array($col["Field"], $indexCols)) {
            $issues[] = "PERFORMANCE: Missing index on `$table`.`{$col['Field']}`";
        }
    }
}

// 3. Queue Config Check
if (env("QUEUE_CONNECTION") === "sync") {
    $issues[] = "PERFORMANCE: QUEUE_CONNECTION is sync (blocking) instead of redis/database.";
}

if (empty($issues)) {
    echo "AUDIT_PASS\n";
} else {
    echo "AUDIT_ISSUES:\n";
    foreach ($issues as $issue) {
        echo "- $issue\n";
    }
}
EOF
php /var/www/muxarena-api/prod_audit.php

echo "--- NGINX CONFIG ---"
cat /etc/nginx/sites-available/default || echo "No default site"

echo "--- SUPERVISOR CONFIG ---"
ls -la /etc/supervisor/conf.d/ || echo "No supervisor configs"
'
