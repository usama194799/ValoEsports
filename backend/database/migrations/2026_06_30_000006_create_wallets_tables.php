<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('wallets', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained('users')->cascadeOnDelete();
            $table->decimal('balance_coins', 18, 8)->default(0);
            $table->decimal('balance_cash', 18, 4)->default(0);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('transactions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('wallet_id')->constrained('wallets')->cascadeOnDelete();
            $table->string('type'); // deposit, withdrawal, entry_fee, reward
            $table->decimal('amount', 18, 8);
            $table->string('reference')->unique();
            $table->string('status')->default('pending'); // pending, completed, failed
            $table->nullableUuidMorphs('source');
            $table->timestamps();
            $table->softDeletes();
            
            $table->index(['wallet_id', 'status']);
        });
    }
    public function down() {
        Schema::dropIfExists('transactions');
        Schema::dropIfExists('wallets');
    }
};
