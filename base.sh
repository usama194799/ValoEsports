echo 'radius@123' | sudo -S bash -c 'mkdir -p /var/www/muxarena-api/app/Modules/Shared/Controllers && cat << "EOF" > /var/www/muxarena-api/app/Modules/Shared/Controllers/BaseController.php
<?php

namespace App\Modules\Shared\Controllers;

use Illuminate\Routing\Controller;

class BaseController extends Controller
{
    public function success($data, $message = "Success", $code = 200)
    {
        return response()->json([
            "success" => true,
            "message" => $message,
            "data" => $data
        ], $code);
    }

    public function error($message = "Error", $code = 400)
    {
        return response()->json([
            "success" => false,
            "message" => $message
        ], $code);
    }
}
EOF
'
