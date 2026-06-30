<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class MakeModuleCommand extends Command
{
    protected $signature = 'make:module {name}';
    protected $description = 'Create a new feature module structure';

    public function handle()
    {
        $name = $this->argument('name');
        $basePath = app_path("Modules/{$name}");

        $folders = [
            'Controllers', 'Services', 'Repositories', 'Interfaces',
            'DTOs', 'Requests', 'Resources', 'Enums', 'Actions',
            'Policies', 'Observers', 'Events', 'Listeners'
        ];

        foreach ($folders as $folder) {
            $path = "{$basePath}/{$folder}";
            if (!File::exists($path)) {
                File::makeDirectory($path, 0755, true);
            }
        }

        $this->info("Module {$name} created successfully!");
    }
}
