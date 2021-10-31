<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;

class PostIndexController extends Controller
{
    // Authenticated request for posts to include non-published posts, and the CRUD functions

    public function __construct(){
        $this->middleware(['auth:sanctum']);
    }

    public function __invoke(){
        return PostResource::collection(Post::latest()->get());
    }
}
