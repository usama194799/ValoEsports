echo 'radius@123' | sudo -S bash -c 'cat << "EOF" > /var/www/muxarena-api/audit.php
<?php
require __DIR__ . "/vendor/autoload.php";

$classes = [
    "App\\Modules\\Authentication\\Controllers\\AuthController",
    "App\\Modules\\Users\\Controllers\\UserController",
    "App\\Modules\\Players\\Controllers\\PlayerProfileController",
    "App\\Modules\\Players\\Controllers\\PlayerSettingsController",
    "App\\Modules\\Tournaments\\Controllers\\TournamentController",
    "App\\Modules\\Registrations\\Controllers\\RegistrationController",
    "App\\Modules\\Registrations\\Controllers\\AdminRegistrationController",
    "App\\Modules\\Teams\\Controllers\\TeamController",
    "App\\Modules\\Teams\\Controllers\\TeamInvitationController",
    "App\\Modules\\Teams\\Controllers\\TeamJoinRequestController",
    "App\\Modules\\Teams\\Controllers\\TeamCaptainController",
    "App\\Modules\\Matches\\Controllers\\BracketController",
    "App\\Modules\\Matches\\Controllers\\MatchController",
    "App\\Modules\\Matches\\Controllers\\MatchScoreController",
    "App\\Modules\\Matches\\Controllers\\MatchDisputeController"
];

$missing = [];
foreach ($classes as $c) {
    if (!class_exists($c)) {
        $missing[] = $c;
    }
}
echo "MISSING_CONTROLLERS:\n";
print_r($missing);
EOF
php /var/www/muxarena-api/audit.php
'
