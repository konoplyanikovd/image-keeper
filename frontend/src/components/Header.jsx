import '../styles/Header.css'
import StubComponent from './Stub';
import LogoComponent from './Logo';
import ButtonComponent from './Button';
import { imagesStore } from '../stores';
import { observer } from "mobx-react-lite";
import { useEffect } from 'react';
import { getI18nByModule, changeLocale } from '../utils';

const t = await getI18nByModule('Header');

const Header = observer(() => {
    const { entities, isLoading, loadEntities, toggleUploadModal } = imagesStore;

    useEffect(() => { loadEntities() }, []);
    
    if (!isLoading && entities.length === 0) return <></>;
    
    return (
        <div className="header-size flex justify-between items-center pt-6 pl-50p pr-50p border-b border-gray-200">
            <div>
                <LogoComponent />
                <div className='mt-3'>
                    {isLoading 
                        ? <StubComponent height="15" width="138" />
                        : <div className='fonr-inter font-normal text-13 leading-tight tracking-tighter color-gray-500'>{entities.length} {t('imagesStoredInKeeper')}</div>}
                </div>
            </div>
            <div className='fonr-inter font-normal leading-tight tracking-tighter cursor-pointer'>
                <div onClick={() => (changeLocale('ru-RU'), location.reload(), console.log(123))}>Русский</div>
                <div onClick={() => (changeLocale('en-EN'), location.reload(), console.log(321))}>English</div>
            </div>
            <div>
                <ButtonComponent imgSrc="/upload.svg" text={t('uploadImage')} click={() => toggleUploadModal() } isLoading={isLoading} />
            </div>
        </div>
    )
});
export default Header;