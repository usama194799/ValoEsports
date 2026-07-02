echo 'radius@123' | sudo -S php -r '
foreach (["/var/www/muxarena-api/database"] as $dir) {
    if (is_dir($dir)) {
        foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir)) as $f) {
            if ($f->isFile() && $f->getExtension() === "php") {
                $content = file_get_contents($f);
                if (strpos($content, "\\n") !== false) {
                    file_put_contents($f, str_replace("\\n", "\n", $content));
                }
            }
        }
    }
}
'
