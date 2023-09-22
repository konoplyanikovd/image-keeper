import '../styles/Image.css';
import { useState } from 'react';
import { imagesStore } from '../stores';
import { getI18nByModule } from '../utils';

const t = await getI18nByModule('Image');

export default ({ label, path, id, name }) => {
    const { toggleEditorModal, setCurrentFileById, deleteFile } = imagesStore;

    const [isVisibleMenu, setVisibleMenu] = useState(false);

    return (
        <div className='relative font-inter'>
            {label && (<div className='
                                absolute z-20
                                top-0 right-0 
                                color-gray-900  
                                text-sm 
                                font-normal 
                                tracking-tighter 
                                leading-tight 
                                label-sizes p-1.5
                                text-right
                                bg-yellow-a
                                mr-1.5 -mt-1.5 
                                overflow-hidden
                                box-content
                                rounded-md'
                        >{label}</div>)}
            {isVisibleMenu && (
                <div className='
                        absolute z-10
                        flex flex-col 
                        top-0 bottom-0 
                        left-0 right-0 
                        justify-end 
                        backdrop-opacity-20 
                        bg-black/30
                        font-inter text-lg
                        font-normal 
                        tracking-tighter 
                        leading-tight p-5
                        color-yellow-a
                        rounded-10p'
                        onClick={() => setVisibleMenu(false)}
                >
                    <a className='flex flex-row cursor-pointer items-end' href={path} download={name}>
                        <img src='/download.svg' className='w-6 h-6' />
                        <div className='ml-1.5'>{t('download')}</div>
                    </a>
                    <div className='flex flex-row cursor-pointer mt-4 items-end' onClick={() => (setCurrentFileById(id),toggleEditorModal())}>
                        <img src='/edit.svg' className='w-6 h-6' />
                        <div className='ml-1.5'>{t('editLabel')}</div>
                    </div>
                    <div className='flex flex-row cursor-pointer mt-4 items-end' onClick={() => (deleteFile(id))}>
                        <img src='/delete.svg' className='w-6 h-6' />
                        <div className='ml-1.5'>{t('delete')}</div>
                    </div>
                </div>
            )}
            <img src={path} className="image-sizes rounded-10p" onClick={() => setVisibleMenu(true)} />
        </div>
    )
}