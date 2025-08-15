import { Briefcase, Award, Users} from 'lucide-react';

export default function RecentActivity() {

    const activities = [
        {
            title: "test 1",
            time: "2 hours ago"
        },
        {
            title: "test 2",
            time: "3 hours ago"
        },
    ];

    return (
        <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto my-10">
            <h2 className="text-lg font-semibold mb-4">Recent activity</h2>
            <div className="space-y-4">
                {activities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3"> 
                        <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded=full flex items-center justify-center">
                            <Briefcase />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">Title</p>
                            <p className="text-xs text-gray-500">Time</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}