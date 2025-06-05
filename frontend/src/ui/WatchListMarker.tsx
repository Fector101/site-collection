import { BookmarkCheck, Eye, FilterX, Users } from "lucide-react";

export function WatchListMarker({ text }: { text: string }) {
    let defaultIcon = <FilterX className="filter-icon" />;
    if (text === 'Watching') {
        defaultIcon = <Eye className="filter-icon" />;
    } else if (text === 'Completed') {
        defaultIcon = <BookmarkCheck className="filter-icon" />;
    } else if (text === 'Public Lists') {
        defaultIcon = <Users className="filter-icon" />;
    }
    return (
        <div className={`flex algin-items-cen marker ${text.toLowerCase().replace(' ', '-')}`} key={text}>
            {defaultIcon}
            <p>{text}</p>
        </div>
    );
}
