"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/app/components/others_ui/admin/AdminSidebar";
import AdminHeader from "@/app/components/others_ui/admin/AdminHeader";
import {
  Search,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Download,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

/* ================= TYPES ================= */

type Stats = {
  totalRevenue: number;
  completedTrips: number;
  platformCommission: number;
  driverPayouts: number;
};

type ChartData = {
  name: string;
  value: number;
};

type EarningsData = {
  name: string;
  platform: number;
  drivers: number;
};

type Trip = {
  id: string;
  date: string;
  rider: string;
  driver: string;
  fare: number;
  commission: number;
  driverEarnings: number;
  status: string;
};

/* API TYPES */

type SettingsResponse = {
  data?: {
    commission_percentage?: number;
  };
};

type StatsResponse = {
  data?: {
    revenue?: { total: number };
    rides?: { completed: number };
  };
};

type AnalyticsItem = {
  date: string;
  revenue: number;
};

type AnalyticsResponse = {
  data?: {
    revenue_over_time?: AnalyticsItem[];
  };
};

type RideItem = {
  id: number;
  created_at: string;
  customer_name?: string;
  driver_name?: string;
  ride_price?: number;
  status?: string;
};

type RidesResponse = {
  data?: {
    rides?: RideItem[];
  };
};

/* ================= UI COMPONENT ================= */

const StatCard = ({
  label,
  value,
  trend,
  isPositive = true,
}: {
  label: string;
  value: string;
  trend?: string;
  isPositive?: boolean;
}) => (
  <div className="bg-white border rounded-2xl p-6 flex flex-col gap-3">
    <span className="text-xs font-bold text-gray-400 uppercase">{label}</span>
    <div className="flex items-center justify-between">
      <span className="text-xl font-bold text-[#0B153D]">{value}</span>
      {trend && (
        <div
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
            isPositive
              ? "text-green-600 bg-green-100"
              : "text-red-600 bg-red-100"
          }`}
        >
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {trend}
        </div>
      )}
    </div>
  </div>
);

/* ================= MAIN ================= */

export default function FinancialManagementScreen() {
  const [stats, setStats] = useState<Stats>({
    totalRevenue: 0,
    completedTrips: 0,
    platformCommission: 0,
    driverPayouts: 0,
  });

  const [revenueData, setRevenueData] = useState<ChartData[]>([]);
  const [earningsData, setEarningsData] = useState<EarningsData[]>([]);
  const [tripsData, setTripsData] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [showStatusFilter, setShowStatusFilter] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        if (!token) return;

        const headers = { Authorization: `Bearer ${token}` };

        const [settingsRes, statsRes, analyticsRes, ridesRes] =
          await Promise.all([
            fetch("https://anyride.techenex.online/api/v1/admin/settings", { headers }),
            fetch("https://anyride.techenex.online/api/v1/admin/dashboard/stats", { headers }),
            fetch("https://anyride.techenex.online/api/v1/admin/dashboard/analytics", { headers }),
            fetch("https://anyride.techenex.online/api/v1/admin/rides", { headers }),
          ]);

        const settings = (await settingsRes.json()) as SettingsResponse;
        const statsData = (await statsRes.json()) as StatsResponse;
        const analyticsData = (await analyticsRes.json()) as AnalyticsResponse;
        const ridesDataObj = (await ridesRes.json()) as RidesResponse;

        const commissionRate =
          settings.data?.commission_percentage !== undefined
            ? settings.data.commission_percentage / 100
            : 0.2;

        /* ===== Stats ===== */
        if (statsData.data) {
          const total = statsData.data.revenue?.total ?? 0;

          setStats({
            totalRevenue: total,
            completedTrips: statsData.data.rides?.completed ?? 0,
            platformCommission: total * commissionRate,
            driverPayouts: total * (1 - commissionRate),
          });
        }

        /* ===== Charts ===== */
        if (analyticsData.data?.revenue_over_time) {
          const last7 = analyticsData.data.revenue_over_time.slice(-7);

          setRevenueData(
            last7.map((item) => ({
              name: item.date.split("-")[2],
              value: item.revenue,
            }))
          );

          setEarningsData(
            last7.map((item) => ({
              name: item.date.split("-")[2],
              platform: item.revenue * commissionRate,
              drivers: item.revenue * (1 - commissionRate),
            }))
          );
        }

        /* ===== Trips ===== */
        if (ridesDataObj.data?.rides) {
          setTripsData(
            ridesDataObj.data.rides.map((r) => ({
              id: `#${r.id.toString().padStart(5, "0")}`,
              date: new Date(r.created_at).toLocaleDateString("en-GB"),
              rider: r.customer_name ?? "N/A",
              driver: r.driver_name ?? "N/A",
              fare: r.ride_price ?? 0,
              commission: (r.ride_price ?? 0) * commissionRate,
              driverEarnings: (r.ride_price ?? 0) * (1 - commissionRate),
              status: r.status ?? "Unknown",
            }))
          );
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F5F5F7]">
      <AdminSidebar />

      <main className="flex-1 lg:ml-[300px] p-6">
        <AdminHeader />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <StatCard label="Revenue" value={`CDF ${stats.totalRevenue}`} />
          <StatCard label="Trips" value={`${stats.completedTrips}`} />
          <StatCard label="Commission" value={`CDF ${stats.platformCommission}`} />
          <StatCard label="Payouts" value={`CDF ${stats.driverPayouts}`} />
        </div>

        {/* Chart */}
        <div className="mt-10 bg-white p-6 rounded-xl">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area dataKey="value" stroke="#A20601" fill="#FDECEC" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Table */}
        <div className="mt-10 bg-white p-6 rounded-xl">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Rider</th>
                  <th>Driver</th>
                  <th>Fare</th>
                </tr>
              </thead>
              <tbody>
                {tripsData.map((t) => (
                  <tr key={t.id}>
                    <td>{t.id}</td>
                    <td>{t.date}</td>
                    <td>{t.rider}</td>
                    <td>{t.driver}</td>
                    <td>{t.fare}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}