// ############################################################
// COMPONENT IN USE IF POV OF SOMEONE ELSE VIEWING YOUR PROFILE
// ############################################################

import { Briefcase, Award, Users } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function RecentActivity({ rakets }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto my-10">
      <h2 className="text-lg text-[#0c2c57] font-semibold mb-4">
        Recent activity
      </h2>
      <div className="space-y-4">
        {rakets.length > 0 ? (
          rakets.map((raket, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-[#ff7c2b] rounded-full flex items-center justify-center">
                <Briefcase className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">
                  {raket.title}
                </p>
                <p className="text-xs text-gray-500">
                  Posted{" "}
                  {formatDistanceToNow(new Date(raket.dateCreated), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-[#0c2c57] text-sm">No recent activity.</p>
        )}
      </div>
    </div>
  );
}
