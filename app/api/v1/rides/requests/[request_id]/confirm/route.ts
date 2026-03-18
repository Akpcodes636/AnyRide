import { NextRequest, NextResponse } from 'next/server';

// Mock data storage - replace with actual database
let rideRequests: any[] = [];

// Rider confirms accepted ride
export async function POST(request: NextRequest, { params }: { params: { request_id: string } }) {
  try {
    const requestId = parseInt(params.request_id);
    
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
    
    // Check if request is in accepted status
    if (rideRequest.status !== 'accepted') {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Ride request must be accepted before confirmation',
          error: 'Invalid status'
        },
        { status: 400 }
      );
    }

    rideRequests[requestIndex] = {
      ...rideRequest,
      status: 'confirmed',
      confirmed_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    return NextResponse.json({
      status: 'success',
      message: 'Ride request confirmed successfully',
      data: rideRequests[requestIndex]
    });

  } catch (error) {
    console.error('Error confirming ride request:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Failed to confirm ride request',
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}
