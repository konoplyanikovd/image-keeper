import LogoComponent from './Logo';
import ButtonComponent from './Button';
import { imagesStore } from '../stores';
import { getI18nByModule } from '../utils';
import { createRef } from 'react';

const t = await getI18nByModule('Empty');

const Empty = () => {
    const { addFile, toggleUploadModal, toggleEditorModal } = imagesStore;
    const fileInputRef = createRef();
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <div><LogoComponent /></div>
            <div className='font-inter text-center mt-14 max-w-md'>
                <div className='color-gray-900 text-3xl font-bold'>{t('noImagesUploadedYet')}</div>
                <div className='color-gray-500 text-base font-normal leading-tight tracking-tighter mt-4'>
                    {t('uploadFirstImage')}
                </div>
            </div>
            <div 
                className='mt-8'
                onDragOver={e => (e.preventDefault(), e.stopPropagation())} 
                onDrop={e => (e.preventDefault(),e.stopPropagation(),addFile(e.dataTransfer.files[0]),toggleEditorModal())}
            >
                <ButtonComponent imgSrc="/upload.svg" text={t('uploadImage')} click={() => fileInputRef.current.click() } />
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={e => (e.preventDefault(),e.stopPropagation(),addFile(e.target.files[0]),toggleEditorModal())}
                    hidden
                />
            </div>
        </div>
    )
};
export default Empty;