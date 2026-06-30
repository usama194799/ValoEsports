<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('rounds', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tournament_id')->constrained('tournaments')->cascadeOnDelete();
            $table->string('name');
            $table->integer('order');
            $table->timestamps();
        });

        Schema::create('matches', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tournament_id')->constrained('tournaments')->cascadeOnDelete();
            $table->foreignUuid('round_id')->constrained('rounds')->cascadeOnDelete();
            $table->foreignUuid('team_a_id')->nullable()->constrained('teams');
            $table->foreignUuid('team_b_id')->nullable()->constrained('teams');
            $table->foreignUuid('winner_id')->nullable()->constrained('teams');
            $table->string('status')->default('scheduled'); // scheduled, live, finished, cancelled
            $table->timestamp('scheduled_at')->nullable();
            $table->integer('best_of')->default(1);
            $table->timestamps();
            $table->softDeletes();
            
            $table->index(['tournament_id', 'round_id']);
            $table->index(['team_a_id', 'team_b_id']);
        });
    }
    public function down() {
        Schema::dropIfExists('matches');
        Schema::dropIfExists('rounds');
    }
};
