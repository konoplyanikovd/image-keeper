import type { Image } from '../types/Image';

export default function (images:Image[] = []) {
    const result: Record<string, Record<string, Image[]>> = {};
    const imagesWithParsedDate = images.map(i => Object.assign(i, { createdDate: new Date(Date.parse(i?.createdAt ?? '01.01.2000')) }));

    let months = [...(new Set(imagesWithParsedDate.map(i => i.createdDate.getMonth())))].sort();

    months.forEach(m => {
        const monthName = `${m + 1}`;
        const imagesInMonth = imagesWithParsedDate.filter(i => i.createdDate.getMonth() === m);
        const daysInMonth = imagesInMonth.map(i => i.createdDate.getDate());

        result[monthName] = {};
        daysInMonth.forEach(d => result[monthName][d] = 
            imagesInMonth.filter(i => i.createdDate.getDate() === d).sort((a, b) => a.createdDate.getDate() - b.createdDate.getDate()));
    });
    return result;
};