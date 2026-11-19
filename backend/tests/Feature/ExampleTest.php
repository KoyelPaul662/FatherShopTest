<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_the_application_returns_a_successful_response(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_category_products_sanitize_control_characters_in_upstream_json(): void
    {
        $body = '{"data":{"products":[{"name":"bad' . chr(1) . 'name"}]}}';

        Http::fake(fn () => Http::response($body));

        $this->getJson('/api/categories/59/products')
            ->assertOk()
            ->assertJsonPath('data.products.0.name', 'bad name');
    }
}
