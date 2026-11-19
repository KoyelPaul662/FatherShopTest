<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CategoryController extends Controller
{
    public function index()
    {
        try {
            // Added withoutVerifying() only for local development to bypass SSL certificate errors. Not required in production.

            $response = Http::withoutVerifying()->get('https://fatherstock-cache.b-cdn.net/category/hot-category.json');

            if (!$response->successful()) {
                return response()->json(['message' => 'Categories not found'], 404);
            }

            $data = $response->json();

            if (empty($data['response'])) {
                return response()->json(['message' => 'Categories not found'], 404);
            }

            return response()->json($data);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Something went wrong'], 500);
        }
    }

    public function products($id)
    {
        try {
            // Added withoutVerifying() only for local development to bypass SSL certificate errors. Not required in production.

            $response = Http::withoutVerifying()->get(
                "https://fatherstock-cache.b-cdn.net/category/{$id}.json"
            );

            if (!$response->successful()) {
                return response()->json([
                    'message' => 'Products not found'
                ], 404);
            }

           $data = $response->json();
            if (empty($data)) {
                return response()->json([
                    'message' => 'Products not found'
                ], 404);
            }

            return response()->json($data);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong'
            ], 500);
        }
    }

    public function productDetails($id)
    {
        try {
            // Added withoutVerifying() only for local development to bypass SSL certificate errors. Not required in production.

            $response = Http::withoutVerifying()->get("https://fatherstock-cache.b-cdn.net/cache/{$id}-f1.json");

            if (!$response->successful()) {
                return response()->json(['message' => 'Product not found'], 404);
            }

            $data = $response->json();
            if (empty($data)) {
                return response()->json(['message' => 'Product not found'], 404);
            }

            return response()->json($data);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Something went wrong'], 500);
        }
    }
}
