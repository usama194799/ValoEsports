echo 'radius@123' | sudo -S bash -c 'mkdir -p /var/www/muxarena-api/app/Modules/Shared/Interfaces && cat << "EOF" > /var/www/muxarena-api/app/Modules/Shared/Interfaces/RepositoryInterface.php
<?php

namespace App\Modules\Shared\Interfaces;

interface RepositoryInterface
{
    public function all();
    public function find($id);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
}
EOF
'
