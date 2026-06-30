<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GameSeeder extends Seeder {
    public function run() {
        $valId = DB::table('games')->insertGetId(['name' => 'Valorant', 'slug' => 'valorant']);
        $csId = DB::table('games')->insertGetId(['name' => 'CS2', 'slug' => 'cs2']);
        $lolId = DB::table('games')->insertGetId(['name' => 'League of Legends', 'slug' => 'lol']);

        // Valorant Ranks
        DB::table('game_ranks')->insert([
            ['game_id' => $valId, 'name' => 'Iron', 'tier_level' => 1],
            ['game_id' => $valId, 'name' => 'Bronze', 'tier_level' => 2],
            ['game_id' => $valId, 'name' => 'Silver', 'tier_level' => 3],
            ['game_id' => $valId, 'name' => 'Gold', 'tier_level' => 4],
            ['game_id' => $valId, 'name' => 'Platinum', 'tier_level' => 5],
            ['game_id' => $valId, 'name' => 'Diamond', 'tier_level' => 6],
            ['game_id' => $valId, 'name' => 'Ascendant', 'tier_level' => 7],
            ['game_id' => $valId, 'name' => 'Immortal', 'tier_level' => 8],
            ['game_id' => $valId, 'name' => 'Radiant', 'tier_level' => 9],
        ]);
    }
}
