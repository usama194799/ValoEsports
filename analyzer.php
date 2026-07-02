<?php
require '/var/www/muxarena-api/vendor/autoload.php';

function check_file($path) {
    $content = file_get_contents($path);
    $tokens = token_get_all($content);
    $missing = [];
    
    $namespace = '';
    $inNamespace = false;
    $inUse = false;
    $currentUse = '';
    
    for ($i = 0; $i < count($tokens); $i++) {
        $token = $tokens[$i];
        if (is_array($token)) {
            if ($token[0] === T_NAMESPACE) {
                $inNamespace = true;
            } elseif ($token[0] === T_USE) {
                $inUse = true;
                $currentUse = '';
            } elseif ($inNamespace && ($token[0] === T_STRING || $token[0] === T_NAME_QUALIFIED || $token[0] === T_NAME_FULLY_QUALIFIED)) {
                $namespace .= $token[1];
            } elseif ($inUse && ($token[0] === T_STRING || $token[0] === T_NAME_QUALIFIED || $token[0] === T_NAME_FULLY_QUALIFIED)) {
                $currentUse .= $token[1];
            }
        } else {
            if ($token === ';' || $token === '{') {
                if ($inNamespace) {
                    $inNamespace = false;
                }
                if ($inUse) {
                    $inUse = false;
                    $class = ltrim($currentUse, '\\');
                    if (strpos($class, 'App\\') === 0) {
                        if (!class_exists($class) && !interface_exists($class) && !trait_exists($class)) {
                            $missing[] = $class;
                        }
                    }
                }
            }
        }
    }
    
    // Check extending and implementing using regex for simplicity
    if (preg_match('/class\s+\w+\s+extends\s+([\\\\a-zA-Z0-9_]+)/', $content, $matches)) {
        $class = $matches[1];
        if (strpos($class, 'App\\') === 0 && !class_exists($class)) {
            $missing[] = $class;
        }
    }
    if (preg_match('/class\s+\w+\s+implements\s+([\\\\a-zA-Z0-9_,\s]+)/', $content, $matches)) {
        $interfaces = explode(',', str_replace(' ', '', $matches[1]));
        foreach ($interfaces as $iface) {
            if (strpos($iface, 'App\\') === 0 && !interface_exists($iface)) {
                $missing[] = $iface;
            }
        }
    }

    return array_unique($missing);
}

$iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator('/var/www/muxarena-api/app'));
$allMissing = [];

foreach ($iterator as $file) {
    if ($file->isFile() && $file->getExtension() === 'php') {
        $missing = check_file($file->getPathname());
        if (!empty($missing)) {
            $allMissing[$file->getPathname()] = $missing;
        }
    }
}

if (empty($allMissing)) {
    echo "NO_ERRORS_FOUND\n";
} else {
    echo "MISSING_CLASSES_FOUND:\n";
    print_r($allMissing);
}
