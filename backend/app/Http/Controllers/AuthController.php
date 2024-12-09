<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

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

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|max:256',
            'username' => 'required|max:256|unique:users',
            'email' => 'required|max:256|email:rfc,dns|unique:users',
            '' => '',
        ]);


        $user_id = Str::random(16);

        $data = [
            "id" => $user_id,
            "name" => $request->name,
            "username" => $request->username,
            "email" => $request->email,
            "followers" => 0,
            "following" => json_encode([]),
            "liked_contents" => json_encode([]),
            "password" => bcrypt($request->password)
        ];

        User::create($data);

        $credentials = request(['email', 'password']);

        if (! $token = Auth::attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Kesalahan'
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
