type FooterColumnProps = {
    title: string;
    children: React.ReactNode;
};

const FooterColumn = ({ title, children }: FooterColumnProps) => {
    return (
        <div>
            <h4 className="mb-4 flex items-center gap-2 font-semibold text-white">
                <span className="text-red-500">•</span>
                {title}
            </h4>

            <div className="space-y-3 text-sm text-gray-400">{children}</div>
        </div>
    );
};

export default FooterColumn;
