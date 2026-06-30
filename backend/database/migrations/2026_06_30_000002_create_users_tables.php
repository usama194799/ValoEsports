<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->string('password');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('status')->default('active');
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });
        
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('avatar_url')->nullable();
            $table->string('banner_url')->nullable();
            $table->text('bio')->nullable();
            $table->foreignId('country_id')->nullable()->constrained('countries');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('user_games', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('game_id')->constrained('games')->cascadeOnDelete();
            $table->foreignId('rank_id')->nullable()->constrained('game_ranks');
            $table->string('in_game_name')->nullable();
            $table->unique(['user_id', 'game_id']);
        });
    }
    public function down() {
        Schema::dropIfExists('user_games');
        Schema::dropIfExists('user_profiles');
        Schema::dropIfExists('users');
    }
};
