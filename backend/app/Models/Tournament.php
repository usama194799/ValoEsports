<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tournament extends Model {
    use HasUuids, SoftDeletes;
    protected $fillable = ['name', 'slug', 'game_id', 'region_id', 'status_id', 'prize_pool', 'entry_fee', 'max_teams', 'start_date', 'end_date'];
    protected $casts = ['prize_pool' => 'decimal:2', 'entry_fee' => 'decimal:2', 'start_date' => 'datetime', 'end_date' => 'datetime'];

    public function game() { return $this->belongsTo(Game::class); }
    public function region() { return $this->belongsTo(Region::class); }
    public function status() { return $this->belongsTo(TournamentStatus::class); }
    public function brackets() { return $this->hasMany(Bracket::class); }
    public function matches() { return $this->hasMany(MatchModel::class); }
    public function teams() { return $this->belongsToMany(Team::class, 'tournament_registrations')->withPivot('status'); }
}
