<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LookupSeeder extends Seeder {
    public function run() {
        DB::table('countries')->insert([
            ['code' => 'US', 'name' => 'United States'],
            ['code' => 'GB', 'name' => 'United Kingdom'],
            ['code' => 'DE', 'name' => 'Germany'],
            ['code' => 'FR', 'name' => 'France'],
            ['code' => 'JP', 'name' => 'Japan'],
            ['code' => 'KR', 'name' => 'South Korea'],
        ]);
        
        DB::table('regions')->insert([
            ['code' => 'NA', 'name' => 'North America'],
            ['code' => 'EU', 'name' => 'Europe'],
            ['code' => 'ASIA', 'name' => 'Asia Pacific'],
            ['code' => 'SA', 'name' => 'South America'],
        ]);
    }
}
