"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [telemetry, setTelemetry] = useState<any>(null);

  useEffect(() => {
    const fetchTelemetry = async () => {
      const data = await window.electron.getTelemetry();
      setTelemetry(data);
    };
    fetchTelemetry();

    // Refresh and fetch updated telemetry data every 15 seconds
    const interval = setInterval(fetchTelemetry, 15_000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-amber-50">
      <h2 className="text-2xl font-bold">System Telemetry</h2>
      <div className="gap-2 p-4 w-[500px] flex flex-col bg-gray-50 rounded-lg shadow-md mt-4">
        <pre>{telemetry && JSON.stringify(telemetry, null, 2)}</pre>
      </div>
    </div>
  );
}
