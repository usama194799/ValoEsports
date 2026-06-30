<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transaction extends Model {
    use HasUuids, SoftDeletes;
    protected $fillable = ['wallet_id', 'type_id', 'amount', 'reference', 'status', 'source_type', 'source_id'];
    protected $casts = ['amount' => 'decimal:8'];

    public function wallet() { return $this->belongsTo(Wallet::class); }
    public function source() { return $this->morphTo(); }
}
