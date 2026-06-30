<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable {
    use HasUuids, SoftDeletes;
    protected $fillable = ['username', 'email', 'password', 'status'];
    protected $hidden = ['password', 'remember_token'];
    protected $casts = ['email_verified_at' => 'datetime', 'password' => 'hashed'];

    public function profile() { return $this->hasOne(UserProfile::class); }
    public function wallet() { return $this->hasOne(Wallet::class); }
    public function deviceSessions() { return $this->hasMany(DeviceSession::class); }
    public function teams() { return $this->belongsToMany(Team::class, 'team_members')->withPivot('role_id'); }
    public function games() { return $this->belongsToMany(Game::class, 'user_games')->withPivot('rank_id'); }
    public function conversations() { return $this->belongsToMany(Conversation::class, 'conversation_participants'); }
}
