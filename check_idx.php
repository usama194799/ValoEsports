<?php
require '/var/www/muxarena-api/vendor/autoload.php';
$app = require_once '/var/www/muxarena-api/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$pdo = \Illuminate\Support\Facades\DB::connection()->getPdo();
$tables = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
$missing = [];
foreach($tables as $t) {
    $cols = $pdo->query("SHOW COLUMNS FROM `$t`")->fetchAll(PDO::FETCH_ASSOC);
    $idxs = $pdo->query("SHOW INDEX FROM `$t`")->fetchAll(PDO::FETCH_ASSOC);
    $idxCols = array_column($idxs, 'Column_name');
    foreach($cols as $c) {
        if (strpos($c['Field'], '_id') !== false && !in_array($c['Field'], $idxCols)) {
            $missing[] = "$t.{$c['Field']}";
        }
    }
}
if (empty($missing)) {
    echo "No missing indexes.\n";
} else {
    echo "Missing Indexes on:\n" . implode("\n", $missing) . "\n";
}
