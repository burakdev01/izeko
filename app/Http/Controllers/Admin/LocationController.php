<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\District;
use App\Models\Province;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function getDistricts(Province $province)
    {
        return response()->json($province->districts()->orderBy('name')->get(['id', 'name']));
    }

    public function getNeighborhoods(District $district)
    {
        return response()->json($district->neighborhoods()->orderBy('name')->get(['id', 'name']));
    }
}
