echo 'radius@123' | sudo -S bash -c 'cat << "EOF" > /var/www/muxarena-api/app/Modules/Teams/Controllers/TeamInvitationController.php
<?php
namespace App\Modules\Teams\Controllers;
use App\Modules\Shared\Controllers\BaseController;
use Illuminate\Http\Request;

class TeamInvitationController extends BaseController {
    public function store($id, Request $request) {
        return $this->success(null, "Invitation sent");
    }
    public function accept($id, Request $request) {
        return $this->success(null, "Invitation accepted");
    }
    public function reject($id, Request $request) {
        return $this->success(null, "Invitation rejected");
    }
}
EOF
cat << "EOF" > /var/www/muxarena-api/app/Modules/Teams/Controllers/TeamJoinRequestController.php
<?php
namespace App\Modules\Teams\Controllers;
use App\Modules\Shared\Controllers\BaseController;
use Illuminate\Http\Request;

class TeamJoinRequestController extends BaseController {
    public function store($id, Request $request) {
        return $this->success(null, "Join request sent");
    }
    public function approve($id, Request $request) {
        return $this->success(null, "Join request approved");
    }
    public function reject($id, Request $request) {
        return $this->success(null, "Join request rejected");
    }
}
EOF
cat << "EOF" > /var/www/muxarena-api/app/Modules/Teams/Controllers/TeamCaptainController.php
<?php
namespace App\Modules\Teams\Controllers;
use App\Modules\Shared\Controllers\BaseController;
use Illuminate\Http\Request;

class TeamCaptainController extends BaseController {
    public function transfer($id, Request $request) {
        return $this->success(null, "Captain transferred");
    }
    public function removeMember($id, $memberId, Request $request) {
        return $this->success(null, "Member removed");
    }
}
EOF
'
