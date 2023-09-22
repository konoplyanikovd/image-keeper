import '../styles/Upload.css';
import ModalComponent from './Modal';
import { imagesStore } from '../stores';
import { observer } from "mobx-react-lite";
import { getI18nByModule } from '../utils';

const t = await getI18nByModule('Upload');

const Upload = observer(({ dropCallback = (e) => console.log(e.dataTransfer.files)}) => {
    const { isDisplayUploadModal, addFile, toggleUploadModal, toggleEditorModal } = imagesStore;

    return isDisplayUploadModal && (
        <ModalComponent>
            <div 
                className='h-full w-full flex flex-col justify-center items-center' 
                onDragOver={e => (e.preventDefault(), e.stopPropagation())} 
                onDrop={e => (e.preventDefault(),e.stopPropagation(),addFile(e.dataTransfer.files[0]),dropCallback(e),toggleUploadModal(),toggleEditorModal())}
            >
                <img src="/upload.svg" className="filter-green-a upload-sizes" />
                <div className='font-inter text-center mt-3.5'>
                    <div className='color-gray-900 text-3xl font-bold'>{t('uploadFile')}</div>
                    <div className='color-gray-500 text-base font-normal leading-tight tracking-tighter mt-3.5'>{t('dropYourfile')}</div>
                </div>
            </div>
        </ModalComponent>
    )
});
export default Upload;