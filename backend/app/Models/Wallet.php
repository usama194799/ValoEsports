<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;

class Wallet extends Model {
    use HasUuids, SoftDeletes;
    protected $fillable = ['user_id', 'balance_coins', 'balance_cash', 'currency_id'];
    protected $casts = ['balance_coins' => 'decimal:8', 'balance_cash' => 'decimal:4'];

    public function user() { return $this->belongsTo(User::class); }
    public function transactions() { return $this->hasMany(Transaction::class); }
}
