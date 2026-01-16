import { connectDB } from "@/lib/connectDB";
import Waitlist from "@/model/waitlist";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        // Get counts for each user type
        const stats = await Waitlist.aggregate([
            {
                $group: {
                    _id: "$userType",
                    count: { $sum: 1 },
                },
            },
        ]);

        // Format stats for easier consumption
        const formattedStats = {
            total: 0,
            rider: 0,
            driver: 0,
            partner: 0,
            fleet_owner: 0,
            team_member: 0,
        };

        stats.forEach((stat: any) => {
            if (stat._id in formattedStats) {
                (formattedStats as any)[stat._id] = stat.count;
            }
            formattedStats.total += stat.count;
        });

        // Add some "fake" traction if counts are too low, or just return real ones
        // For now, let's return real ones but maybe add a base number if requested

        return NextResponse.json(formattedStats);
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || "Failed to fetch stats" },
            { status: 500 }
        );
    }
}
