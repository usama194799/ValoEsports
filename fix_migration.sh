echo 'radius@123' | sudo -S bash -c 'cat << "EOF" > /var/www/muxarena-api/database/migrations/2026_06_30_000080_create_match_engine_tables.php
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up() {
        Schema::create("bracket_nodes", function (Blueprint $table) {
            $table->id();
            $table->foreignUuid("bracket_id")->constrained("brackets")->cascadeOnDelete();
            $table->foreignUuid("match_id")->constrained("matches")->cascadeOnDelete();
            $table->foreignUuid("next_match_id")->nullable()->constrained("matches")->nullOnDelete();
            $table->boolean("is_grand_final")->default(false);
            $table->timestamps();
        });
        Schema::create("match_maps", function (Blueprint $table) {
            $table->id();
            $table->foreignUuid("match_id")->constrained("matches")->cascadeOnDelete();
            $table->string("map_name");
            $table->string("status")->default("pending");
            $table->foreignUuid("winner_id")->nullable()->constrained("teams")->nullOnDelete();
            $table->timestamps();
        });
        Schema::create("match_statistics", function (Blueprint $table) {
            $table->id();
            $table->foreignUuid("match_id")->constrained("matches")->cascadeOnDelete();
            $table->foreignUuid("user_id")->constrained("users")->cascadeOnDelete();
            $table->foreignUuid("team_id")->constrained("teams")->cascadeOnDelete();
            $table->integer("kills")->default(0);
            $table->integer("deaths")->default(0);
            $table->integer("assists")->default(0);
            $table->integer("damage")->default(0);
            $table->integer("headshots")->default(0);
            $table->boolean("is_mvp")->default(false);
            $table->timestamps();
        });
        Schema::create("match_events", function (Blueprint $table) {
            $table->id();
            $table->foreignUuid("match_id")->constrained("matches")->cascadeOnDelete();
            $table->string("type");
            $table->json("details")->nullable();
            $table->timestamp("event_time")->useCurrent();
        });
        Schema::create("match_disputes", function (Blueprint $table) {
            $table->id();
            $table->foreignUuid("match_id")->constrained("matches")->cascadeOnDelete();
            $table->foreignUuid("team_id")->constrained("teams")->cascadeOnDelete();
            $table->text("reason");
            $table->string("evidence_url")->nullable();
            $table->string("status")->default("open");
            $table->foreignUuid("resolved_by")->nullable()->constrained("users")->nullOnDelete();
            $table->timestamps();
        });
    }
    public function down() {
        Schema::dropIfExists("match_disputes");
        Schema::dropIfExists("match_events");
        Schema::dropIfExists("match_statistics");
        Schema::dropIfExists("match_maps");
        Schema::dropIfExists("bracket_nodes");
    }
};
EOF
'
