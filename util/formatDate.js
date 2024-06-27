import { formatDistanceToNow, format } from "date-fns";

export default function formatCustomDate(dateString) {
    const currentDate = new Date();
    const inputDate = new Date(dateString);

    // Kiểm tra xem có phải là hôm nay không
    if (currentDate.toDateString() === inputDate.toDateString()) {
        return `Hôm nay lúc ${format(inputDate, "HH:mm")}`;
    }

    // Kiểm tra xem có phải là hôm qua không
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);
    if (yesterday.toDateString() === inputDate.toDateString()) {
        return `Hôm qua lúc ${format(inputDate, "HH:mm")}`;
    }

    // Nếu không phải hôm nay hoặc hôm qua, sử dụng formatDistanceToNow
    return formatDistanceToNow(inputDate, { addSuffix: true });
}

const inputDateString = "2023-11-24T15:04:58.809Z";
const formattedDate = formatCustomDate(inputDateString);
