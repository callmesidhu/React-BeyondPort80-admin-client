"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Building2,
  Briefcase,
  Globe,
  MapPin,
  CalendarClock,
  MessageSquare,
} from "lucide-react";

export default function NewRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/request/show`)
      .then((res) => {
        // sort by created_at (latest first)
        const sorted = res.data.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setRequests(sorted);
      })
      .catch((err) => {
        console.error("Error fetching requests:", err);
      });
  }, []);

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-5xl space-y-6">
        <h2 className="text-2xl font-bold text-center">New Requests</h2>
        
        {/* 2 cards per row on large screens */}
        <div className="grid gap-6 lg:grid-cols-2">
          {requests.map((req) => (
            <div
              key={req.id}
              className="p-5 rounded-2xl shadow-md bg-white border border-gray-200 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" /> {req.name}
              </h3>

              <div className="mt-3 space-y-2 text-gray-700 text-sm">
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" /> {req.email}
                </p>
                <p className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-500" />{" "}
                  {req.organization}
                </p>
                <p className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gray-500" />{" "}
                  {req.designation}
                </p>
                <p className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-500" /> {req.domain}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" /> {req.location}
                </p>
                <p className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-500 mt-[2px]" />
                  {req.reason}
                </p>
                <p className="flex items-center gap-2 text-xs text-gray-500">
                  <CalendarClock className="w-4 h-4" />
                  {new Date(req.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
