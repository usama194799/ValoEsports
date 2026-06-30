<?php
namespace App\Modules\Shared\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as LaravelBaseController;
use App\Traits\ApiResponse;

class BaseController extends LaravelBaseController
{
    use AuthorizesRequests, ValidatesRequests, ApiResponse;
}
