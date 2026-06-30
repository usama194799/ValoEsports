<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserProfile extends Model {
    use HasUuids, SoftDeletes;
    protected $fillable = ['user_id', 'first_name', 'last_name', 'avatar_url', 'banner_url', 'bio', 'country_id'];

    public function user() { return $this->belongsTo(User::class); }
    public function country() { return $this->belongsTo(Country::class); }
}
