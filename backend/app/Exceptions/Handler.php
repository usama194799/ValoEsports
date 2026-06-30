<?php
namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use App\Traits\ApiResponse;

class Handler extends ExceptionHandler
{
    use ApiResponse;

    public function register(): void
    {
        $this->renderable(function (Throwable $e, $request) {
            if ($request->is('api/*')) {
                return $this->error(
                    $e->getMessage(),
                    method_exists($e, 'errors') ? $e->errors() : null,
                    $this->isHttpException($e) ? $e->getStatusCode() : 500
                );
            }
        });
    }
}
