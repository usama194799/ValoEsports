echo 'radius@123' | sudo -S bash -c 'cat << "EOF" > /var/www/muxarena-api/test_container.php
<?php
require __DIR__ . "/vendor/autoload.php";
$app = require_once __DIR__ . "/bootstrap/app.php";
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$router = $app->make("router");
$routes = $router->getRoutes();
$errors = [];

foreach ($routes as $route) {
    $action = $route->getAction();
    if (isset($action["controller"])) {
        $controllerStr = explode("@", $action["controller"])[0];
        try {
            $app->make($controllerStr);
        } catch (\Throwable $e) {
            $errors[$controllerStr] = $e->getMessage();
        }
    }
}

if (empty($errors)) {
    echo "NO_DI_ERRORS\n";
} else {
    echo "DI_ERRORS_FOUND:\n";
    print_r($errors);
}
EOF
php /var/www/muxarena-api/test_container.php
'
