
export function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
      <div className="inline-block p-3 bg-primary-light dark:bg-primary-bg/50 rounded-lg">
        <Icon className="h-6 w-6 text-primary dark:text-primary-dark" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}