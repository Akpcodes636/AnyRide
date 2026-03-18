import { NextRequest, NextResponse } from 'next/server';

// Mock data storage - replace with actual database
let rideRequests: any[] = [];

// Reject ride request (legacy endpoint)
export async function POST(request: NextRequest, { params }: { params: { request_id: string } }) {
  try {
    const requestId = parseInt(params.request_id);
    const body = await request.json();
    const { driver_id, reason } = body;
    
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
    
    // Check if request is in pending or accepted status
    if (!['pending', 'accepted'].includes(rideRequest.status)) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Ride request cannot be rejected in current status',
          error: 'Invalid status'
        },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!driver_id) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Driver ID is required',
          error: 'Validation error'
        },
        { status: 400 }
      );
    }

    rideRequests[requestIndex] = {
      ...rideRequest,
      status: 'rejected',
      fk_driver_id: driver_id,
      rejection_reason: reason || 'Driver rejected request',
      rejected_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    return NextResponse.json({
      status: 'success',
      message: 'Ride request rejected successfully',
      data: rideRequests[requestIndex]
    });

  } catch (error) {
    console.error('Error rejecting ride request:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Failed to reject ride request',
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}
