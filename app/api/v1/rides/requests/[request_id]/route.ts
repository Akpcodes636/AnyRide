import { NextRequest, NextResponse } from 'next/server';

// Mock data storage - replace with actual database
let rideRequests: any[] = [];

// Get ride request by ID
export async function GET(request: NextRequest, { params }: { params: { request_id: string } }) {
  try {
    const requestId = parseInt(params.request_id);
    
    const request = rideRequests.find(r => r.id === requestId);
    
    if (!request) {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Ride request not found',
          error: 'Not found'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 'success',
      message: 'Ride request retrieved successfully',
      data: request
    });

  } catch (error) {
    console.error('Error fetching ride request:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Failed to fetch ride request',
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}
