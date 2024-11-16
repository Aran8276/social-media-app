<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{

    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = Auth::attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Email atau password salah'
            ], 401);
        }

        return $this->respondWithToken($token);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'success' => true,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60
        ], 200);
    }

    public function me()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => "Akun tidak sah"
            ], 401);
        }
        return response()->json(Auth::user());
    }

    public function logout()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Log out gagal'
            ], 401);
        }

        Auth::logout();
        return response()->json([
            'success' => true,
            'message' => "Log out sukses"
        ], 200);
    }

    public function refresh()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Refresh gagal'
            ]);
        }

        return $this->respondWithToken(Auth::refresh());
    }
}
