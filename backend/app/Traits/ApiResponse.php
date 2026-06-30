<?php
namespace App\Traits;

trait ApiResponse
{
    protected function success($data = null, string $message = 'Success', int $code = 200)
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data'    => $data,
            'errors'  => null,
        ], $code);
    }

    protected function error(string $message = 'Error', $errors = null, int $code = 400)
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'data'    => null,
            'errors'  => $errors,
        ], $code);
    }
}
