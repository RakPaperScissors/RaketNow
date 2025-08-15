import { Calendar, Star } from 'lucide-react';

export default function FinishedJobs() {
    const jobs = [
        {
            title: "Job 1",
            client: "Xander",
            description: "ofmdmad",
            date: "2024-10-01",
            rating: 3.5
        },
        {
            title: "Job 2",
            client: "Jhaye",
            description: "ofmdmad",
            date: "2024-20-01",
            rating: 3.5
        },
    ];

    return (
        <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto my-10">
            {/* Header */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Finished Jobs</h2>
                <button className="text-sm text-orange-500 hover:underline">
                    View All
                </button>
            </div>
            {/* Jobs List */}
            <div className="space-y-4">
                {jobs.map((job, index) => (
                    <div key={index} className="border rounded-lg p-4 flex flex-col space-y-2 hover:shadow-md transition">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-gray-800">{job.title}</h3>
                                <p className="text-sm text-gray-500">Client: {job.client}</p>
                            </div>
                            <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                                Completed
                            </span>
                        </div>

                        <p className="text-sm text-gray-600">{job.description}</p>

                        <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center text-gray-500 text-sm">
                                <Calendar className='w-4 h-4 mr-1' />
                                Completed: {job.date}
                            </div>
                            <div className="flex items-center text-yellow-500 text-sm font-medium">
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