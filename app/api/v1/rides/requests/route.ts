import { NextRequest, NextResponse } from 'next/server';

// Mock data storage - replace with actual database
let rideRequests: any[] = [];
let requestIdCounter = 1;

// Create ride request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['pickup_lat', 'pickup_lon', 'dropoff_lat', 'dropoff_lon', 
                           'pickup_address', 'dropoff_address', 'estimated_price', 
                           'rideType', 'paymentMethod', 'fk_customer_id'];
    
    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === null) {
        return NextResponse.json(
          { 
            status: 'error',
            message: `Missing required field: ${field}`,
            error: 'Validation error'
          },
          { status: 400 }
        );
      }
    }

    const newRequest = {
      id: requestIdCounter++,
      fk_customer_id: body.fk_customer_id,
      fk_driver_id: null,
      fk_vehicle_id: null,
      fk_ride_id: null,
      status: 'pending',
      pickup_lat: body.pickup_lat,
      pickup_lon: body.pickup_lon,
      dropoff_lat: body.dropoff_lat,
      dropoff_lon: body.dropoff_lon,
      pickup_address: body.pickup_address,
      dropoff_address: body.dropoff_address,
      estimated_price: body.estimated_price,
      ride_type: body.rideType,
      payment_method: body.paymentMethod,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    rideRequests.push(newRequest);

    return NextResponse.json({
      status: 'success',
      message: 'Ride request created successfully',
      data: newRequest
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating ride request:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Failed to create ride request',
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}

// List ride requests
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const skip = parseInt(searchParams.get('skip') || '0');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const customer_id = searchParams.get('customer_id');
    const driver_id = searchParams.get('driver_id');

    let filteredRequests = rideRequests;
    
    if (status) {
      filteredRequests = rideRequests.filter(req => req.status === status);
    }
    
    if (customer_id) {
      filteredRequests = filteredRequests.filter(req => req.fk_customer_id === parseInt(customer_id));
    }
    
    if (driver_id) {
      filteredRequests = filteredRequests.filter(req => req.fk_driver_id === parseInt(driver_id));
    }

    const paginatedRequests = filteredRequests.slice(skip, skip + limit);

    return NextResponse.json({
      status: 'success',
      message: 'Ride requests retrieved successfully',
      data: paginatedRequests,
      pagination: {
        total: filteredRequests.length,
        skip,
        limit
      }
    });

  } catch (error) {
    console.error('Error fetching ride requests:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Failed to fetch ride requests',
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}
