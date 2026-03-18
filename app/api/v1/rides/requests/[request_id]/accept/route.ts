import { NextRequest, NextResponse } from 'next/server';

// Mock data storage - replace with actual database
let rideRequests: any[] = [];

// Accept ride request
export async function POST(request: NextRequest, { params }: { params: { request_id: string } }) {
  try {
    const requestId = parseInt(params.request_id);
    const body = await request.json();
    const { driver_id, vehicle_id, estimated_arrival } = body;
    
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
    
    // Check if request is in pending status
    if (rideRequest.status !== 'pending') {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Ride request cannot be accepted in current status',
          error: 'Invalid status'
        },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!driver_id || !vehicle_id) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Driver ID and Vehicle ID are required',
          error: 'Validation error'
        },
        { status: 400 }
      );
    }

    rideRequests[requestIndex] = {
      ...rideRequest,
      status: 'accepted',
      fk_driver_id: driver_id,
      fk_vehicle_id: vehicle_id,
      estimated_arrival: estimated_arrival,
      accepted_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    return NextResponse.json({
      status: 'success',
      message: 'Ride request accepted successfully',
      data: rideRequests[requestIndex]
    });

  } catch (error) {
    console.error('Error accepting ride request:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Failed to accept ride request',
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}
