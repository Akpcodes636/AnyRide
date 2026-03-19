import { NextRequest, NextResponse } from 'next/server';

// Mock data storage - replace with actual database
let rideRequests: any[] = [];

// Increase ride fare (legacy endpoint)
export async function PUT(request: NextRequest, { params }: { params: { request_id: string } }) {
  try {
    const requestId = parseInt(params.request_id);
    const body = await request.json();
    const { new_fare } = body;
    
    const requestIndex = rideRequests.findIndex(r => r.id === requestId);
    
    if (requestIndex === -1) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Ride request not found',
          error: 'Not found'
        },
        { status: 404 }
      );
    }

    const rideRequest = rideRequests[requestIndex];
    
    // Check if request is in a status that allows fare increase
    if (!['pending', 'accepted', 'confirmed'].includes(rideRequest.status)) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Fare cannot be updated in current status',
          error: 'Invalid status'
        },
        { status: 400 }
      );
    }

    // Validate new fare
    if (!new_fare || new_fare <= 0) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'New fare must be a positive number',
          error: 'Validation error'
        },
        { status: 400 }
      );
    }

    // Check if new fare is higher than current
    if (new_fare <= rideRequest.estimated_price) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'New fare must be higher than current estimated price',
          error: 'Invalid fare'
        },
        { status: 400 }
      );
    }

    rideRequests[requestIndex] = {
      ...rideRequest,
      estimated_price: new_fare,
      fare_updated_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    return NextResponse.json({
      status: 'success',
      message: 'Fare updated successfully',
      data: rideRequests[requestIndex]
    });

  } catch (error) {
    console.error('Error updating fare:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Failed to update fare',
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}
