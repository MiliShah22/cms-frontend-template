type CardProps = {
    title: string;
    value: string | number;
    children?: React.ReactNode;
};

export default function Card({ title, value, children }: CardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {title}
            </h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                {value}
            </p>
            {children}
        </div>
    );
}
