import '../styles/Image.css';
import ModalComponent from './Modal';
import ButtonComponent from './Button';
import { imagesStore } from '../stores';
import { observer } from "mobx-react-lite";
import { useState } from 'react';
import { getI18nByModule } from '../utils';

const t = await getI18nByModule('Editor');

const Editor = observer(() => {
    const { isDisplayEditorModal, currentImage, editFile, toggleEditorModal } = imagesStore;
    
    const _label = currentImage === null || [null, undefined].includes(currentImage.label) ? t('enterCustomLabel') : currentImage.label;
    const [label, setLabel] = useState(_label);

    return isDisplayEditorModal && (
        <ModalComponent>
            <div className='flex flex-col justify-center items-center h-screen relative w-full root-size mx-auto'>
                <div className='font-inter text-center color-gray-900 text-2xl font-semibold'>{t('setCustomLabel')}</div>
                <div className='mt-10'>
                    <img className='image-sizes rounded-10p' src={currentImage === null ? '' : currentImage.path} />
                </div>
                <div 
                    contentEditable 
                    suppressContentEditableWarning
                    className='
                        font-inter 
                        text-center
                        color-purple-800 
                        text-lg mt-5
                        font-normal 
                        leading-tight 
                        tracking-tighter'
                    onInput={e => setLabel(e.currentTarget.textContent.substring(0, 100))}
                >
                    {_label}
                </div>
                <div 
                    className='
                        font-inter 
                        text-center 
                        color-gray-500 
                        text-base mt-2.5
                        font-normal 
                        leading-tight 
                        tracking-tighter'
                >
                    {t('100CharsMax')}
                </div>
                <div className='mt-10'>
                    <ButtonComponent imgSrc="/check.svg" text={t('save')} click={() => (editFile({...currentImage, label }),toggleEditorModal()) } />
                </div>
                <div className='absolute top-0 right-0 pt-50p pr-50p'>
                    <ButtonComponent imgSrc="/close.svg" text={t('closeEditor')} click={() => (toggleEditorModal()) } />
                </div>
            </div>
        </ModalComponent>
    )
});
export default Editor;