<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('tournaments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('slug')->unique();
            $table->foreignId('game_id')->constrained('games');
            $table->foreignId('region_id')->constrained('regions');
            $table->string('status')->default('draft'); // draft, registration, ongoing, completed
            $table->decimal('prize_pool', 12, 2)->default(0);
            $table->decimal('entry_fee', 8, 2)->default(0);
            $table->integer('max_teams');
            $table->timestamp('start_date')->nullable();
            $table->timestamp('end_date')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            $table->index(['status', 'game_id']);
        });

        Schema::create('tournament_registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('tournament_id')->constrained('tournaments')->cascadeOnDelete();
            $table->foreignUuid('team_id')->constrained('teams')->cascadeOnDelete();
            $table->string('status')->default('pending'); // pending, approved, rejected
            $table->timestamps();
            $table->unique(['tournament_id', 'team_id']);
        });
    }
    public function down() {
        Schema::dropIfExists('tournament_registrations');
        Schema::dropIfExists('tournaments');
    }
};
