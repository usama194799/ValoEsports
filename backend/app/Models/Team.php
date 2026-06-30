<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;

class Team extends Model {
    use HasUuids, SoftDeletes;
    protected $fillable = ['name', 'tag', 'logo_url', 'banner_url', 'owner_id', 'game_id', 'status'];

    public function owner() { return $this->belongsTo(User::class, 'owner_id'); }
    public function game() { return $this->belongsTo(Game::class); }
    public function members() { return $this->belongsToMany(User::class, 'team_members')->withPivot('role_id'); }
    public function tournaments() { return $this->belongsToMany(Tournament::class, 'tournament_registrations'); }
}
