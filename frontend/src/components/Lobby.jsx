import ImageComponent from './Image';
import EmptyComponent from './Empty';
import StubComponent from './Stub';
import { imagesStore } from '../stores';
import { observer } from "mobx-react-lite";
import imagesGrouper from '../utils/imagesGrouper';
import getMonthName from '../utils/getMonthName';
import { useEffect, useState } from 'react';

export const Lobby = observer(() => {
    const { entities, isLoading } = imagesStore;
    const [imagesGroupedByMonthsAsDictionary, setImagesGroupedByMonthsAsDictionary] = useState([]);

    useEffect(() => { 
        if (entities.length) setImagesGroupedByMonthsAsDictionary(imagesGrouper(entities));
    }, [entities]);

    const getMarkup = (title, images) => (
        <div className='pt-12 pb-1' key={(Math.random() * 1000)}>
            <div className='color-gray-200 fonr-inter text-3xl leading-none tracking-tight font-bold flex flex-row items-center pb-3'>
                {title}
            </div>
            <div className='flex flex-row gap-4 flex-wrap'>
                {images}
            </div>
        </div>
    );
    
    const getTtitleMarkup = (month, day, count) => (
        <>
            <span>{month}</span>
            <span>&nbsp;{`‘${day}`}</span>
            <div className='px-2.5 ml-2.5 text-xl tracking-tight text-white rounded-10p bg-green-a pb-0.5 -mb-1'>{count}</div>
        </>
    );

    if (isLoading) {
        return (
            <div className='pl-50p pr-50p'>
                {getMarkup(<StubComponent width='214' height='29' />, [335, 150, 335, 150, 335].map(w => <StubComponent width={w} height='200' key={Math.random()*1000}/>))}
            </div>
        );
    } else if (entities.length === 0) {
        return (
            <EmptyComponent />
        );
    } else {
        return (
            <div className='pl-50p pr-50p'>
                {Object.keys(imagesGroupedByMonthsAsDictionary).map(monthNum => 
                    Object.keys(imagesGroupedByMonthsAsDictionary[monthNum]).map(day => 
                        getMarkup(
                            getTtitleMarkup(getMonthName(monthNum), day, imagesGroupedByMonthsAsDictionary[monthNum][day].length),
                            imagesGroupedByMonthsAsDictionary[monthNum][day].map(image => <ImageComponent { ...{ path: image.path, label: image.label, key:(Math.random()*1000), id: image.id, name: image.name } } />)
                        )
                    )
                )}
            </div>
        );
    }
});
export default Lobby;