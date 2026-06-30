<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;

class MatchModel extends Model {
    use HasUuids, SoftDeletes;
    protected $table = 'matches';
    protected $fillable = ['tournament_id', 'round_id', 'team_a_id', 'team_b_id', 'winner_id', 'status_id', 'scheduled_at', 'best_of'];
    protected $casts = ['scheduled_at' => 'datetime'];

    public function tournament() { return $this->belongsTo(Tournament::class); }
    public function teamA() { return $this->belongsTo(Team::class, 'team_a_id'); }
    public function teamB() { return $this->belongsTo(Team::class, 'team_b_id'); }
    public function winner() { return $this->belongsTo(Team::class, 'winner_id'); }
    public function games() { return $this->hasMany(MatchGame::class, 'match_id'); }
}
