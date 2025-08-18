// ############################################################
// COMPONENT IN USE IF POV OF SOMEONE ELSE VIEWING YOUR PROFILE
// ############################################################
import { Calendar, Star } from "lucide-react";

export default function FinishedJobs({ jobs }) {
  if (!jobs || jobs.length === 0) {
    return null;
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto my-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg text-[#0c2c57] font-semibold">Finished Jobs</h2>
        <button className="text-sm text-orange-500 hover:underline">
          View All
        </button>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 flex flex-col shadow-sm"
          >
            {/* Job Title + Status */}
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-[#0c2c57]">{job.title}</h3>
                <p className="text-sm text-gray-500">
                  Client: {job.client.firstName} {job.client.lastName}
                </p>
              </div>
              <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                Completed
              </span>
            </div>

            {/* Job Description */}
            <p className="text-sm text-gray-600 mb-3">{job.description}</p>

            {/* Date + Rating */}
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                Completed:{" "}
                {new Date(job.completedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center text-yellow-500 font-medium">
                <Star className="w-4 h-4 mr-1 fill-yellow-500" />
                {job.rating.toFixed(1)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
