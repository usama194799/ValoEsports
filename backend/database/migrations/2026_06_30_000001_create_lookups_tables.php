<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->string('code', 2)->unique();
            $table->string('name');
        });
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->string('icon_url')->nullable();
        });
        Schema::create('game_ranks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('game_id')->constrained('games')->cascadeOnDelete();
            $table->string('name');
            $table->integer('tier_level');
        });
        Schema::create('regions', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('name');
        });
    }
    public function down() {
        Schema::dropIfExists('regions');
        Schema::dropIfExists('game_ranks');
        Schema::dropIfExists('games');
        Schema::dropIfExists('countries');
    }
};
