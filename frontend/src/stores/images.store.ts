import { makeAutoObservable, runInAction, action } from 'mobx';
import type { Image } from '../types/Image';
import { fetchBackend, FetchMethodsType } from '../api.backend';
import { eventBus } from '../utils/index';

export class ImagesStore {
    entities: Image[] = [];
    isLoading = true;
    isDisplayUploadModal = false;
    isDisplayEditorModal = false;
    currentImage: Image | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    toggleUploadModal = action(() => this.isDisplayUploadModal = !this.isDisplayUploadModal);
    
    toggleEditorModal = action(() => this.isDisplayEditorModal = !this.isDisplayEditorModal);

    uploadFile = async (method: FetchMethodsType) => await fetchBackend<Image>('images', this.currentImage, method);
    
    addFile = (file: {name: string, size: number, type: string}) => {
        runInAction(() => 
            this.currentImage  = {
                name: file.name,
                size: `${file.size}`,
                path: null
            }
        );

        const reader = new FileReader();
        reader.onload = action(async (e: Event & { target?: EventTarget & { result: string }}) => {
            this.currentImage!.path = e.target?.result ?? '';
            
            const image = await this.uploadFile('PUT');
            this.currentImage = image;
            if (image) {
                runInAction(() => this.entities = [...this.entities, image]);
                eventBus.emit("notification", {body: `Image #${image.id} is uploaded`, type: 'success', title: 'Done!'});
            }
        });
        reader.readAsDataURL(file as unknown as Blob);
    };

    editFile = action(async (file: Image) => {
        this.currentImage = file;
        
        const image = await this.uploadFile('POST');
        if (image) { 
            runInAction(() => {
                this.currentImage = null;
                this.entities = [...this.entities.filter(x => x.id !== image.id), image];
            })
            eventBus.emit("notification", {body: `Image #${image.id} is changed`, type: 'success', title: 'Done!'});
        }
    });

    deleteFile = async (id: Image['id']) => {
        if (!id) return;
        await fetchBackend(`images/${id}`, null, 'DELETE');
        runInAction(() => this.entities = [...this.entities.filter(x => x.id !== id)]);
        eventBus.emit("notification", {body: `Image #${id} is remove`, type: 'success', title: 'Done!'});
    };
    
    setCurrentFileById = (id: Image['id']) => {
        if (!id) return;
        const file = this.entities.find(e => e.id === id);
        if (file) runInAction(() => this.currentImage = file);
    };

    loadEntities = async () => {
        runInAction(() => this.isLoading = true);
        const images = await fetchBackend('images');
        if (images) runInAction(() => this.entities = images);
        runInAction(() => this.isLoading = false);
    }
}

export default new ImagesStore();