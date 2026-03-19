import { NextRequest, NextResponse } from 'next/server';

// Mock data storage - replace with actual database
let rideRequests: any[] = [];

// Cancel ride request
export async function POST(request: NextRequest, { params }: { params: { request_id: string } }) {
  try {
    const requestId = parseInt(params.request_id);
    const body = await request.json();
    const { reason } = body;
    
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
    
    // Check if request can be cancelled
    if (!['pending', 'accepted', 'confirmed'].includes(rideRequest.status)) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Ride request cannot be cancelled in current status',
          error: 'Invalid status'
        },
        { status: 400 }
      );
    }

    rideRequests[requestIndex] = {
      ...rideRequest,
      status: 'cancelled',
      cancellation_reason: reason || 'Customer cancelled request',
      cancelled_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    return NextResponse.json({
      status: 'success',
      message: 'Ride request cancelled successfully',
      data: rideRequests[requestIndex]
    });

  } catch (error) {
    console.error('Error cancelling ride request:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Failed to cancel ride request',
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}
