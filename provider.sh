echo 'radius@123' | sudo -S bash -c 'cat << "EOF" > /var/www/muxarena-api/app/Providers/AppServiceProvider.php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $modulesPath = app_path("Modules");
        if (is_dir($modulesPath)) {
            $modules = array_diff(scandir($modulesPath), [".", ".."]);
            foreach ($modules as $module) {
                $interfaceDir = "$modulesPath/$module/Interfaces";
                $repoDir = "$modulesPath/$module/Repositories";
                if (is_dir($interfaceDir) && is_dir($repoDir)) {
                    $interfaces = array_diff(scandir($interfaceDir), [".", ".."]);
                    foreach ($interfaces as $interfaceFile) {
                        if (str_ends_with($interfaceFile, "Interface.php")) {
                            $interfaceName = basename($interfaceFile, ".php");
                            $repoName = str_replace("Interface", "", $interfaceName);
                            $interfaceClass = "App\\Modules\\$module\\Interfaces\\$interfaceName";
                            $repoClass = "App\\Modules\\$module\\Repositories\\$repoName";
                            if (file_exists("$repoDir/$repoName.php")) {
                                $this->app->bind($interfaceClass, $repoClass);
                            }
                        }
                    }
                }
            }
        }
    }

    public function boot(): void
    {
        //
    }
}
EOF
'
