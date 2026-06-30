<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('teams', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('tag')->unique();
            $table->string('logo_url')->nullable();
            $table->string('banner_url')->nullable();
            $table->foreignUuid('owner_id')->constrained('users');
            $table->foreignId('game_id')->constrained('games');
            $table->string('status')->default('active');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('team_members', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('team_id')->constrained('teams')->cascadeOnDelete();
            $table->foreignUuid('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('role')->default('player');
            $table->timestamp('joined_at')->useCurrent();
            $table->unique(['team_id', 'user_id']);
        });
    }
    public function down() {
        Schema::dropIfExists('team_members');
        Schema::dropIfExists('teams');
    }
};
