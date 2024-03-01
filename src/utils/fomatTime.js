export const fomatTime = (time) => {
    const dateTime = new Date(time);
    const day = dateTime.getDate();
    const month = dateTime.getMonth() + 1;
    const year = dateTime.getFullYear();
    const hour = dateTime.getHours();
    const minute = dateTime.getMinutes();

    const pad = (num) => (num < 10 ? "0" + num : num);

    const formattedDate = `${pad(day)}-${pad(month)}-${year}`;
    const formattedTime = `${pad(hour)}:${pad(minute)}`;

    return `${formattedTime} ${formattedDate}`;
};