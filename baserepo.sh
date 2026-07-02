echo 'radius@123' | sudo -S bash -c 'mkdir -p /var/www/muxarena-api/app/Modules/Shared/Repositories && cat << "EOF" > /var/www/muxarena-api/app/Modules/Shared/Repositories/BaseRepository.php
<?php

namespace App\Modules\Shared\Repositories;

use App\Modules\Shared\Interfaces\RepositoryInterface;
use Illuminate\Database\Eloquent\Model;

abstract class BaseRepository implements RepositoryInterface
{
    protected Model $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->all();
    }

    public function find($id)
    {
        return $this->model->findOrFail($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update($id, array $data)
    {
        $record = $this->find($id);
        $record->update($data);
        return $record;
    }

    public function delete($id)
    {
        $record = $this->find($id);
        return $record->delete();
    }
}
EOF
'
