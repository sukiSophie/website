declare module 'aplayer' {
    interface APlayerOptions {
        container: HTMLElement;
        order?: 'list' | 'random';
        preload?: 'none' | 'metadata' | 'auto';
        listMaxHeight?: string;
        volume?: number;
        mutex?: boolean;
        lrcType?: number;
        audio: any[];
        fixed?: boolean;
        mini?: boolean;
        autoplay?: boolean;
        theme?: string;
        loop?: 'all' | 'one' | 'none';
        order?: 'list' | 'random';
        preload?: 'none' | 'metadata' | 'auto';
        volume?: number;
        mutex?: boolean;
        lrcType?: number;
        listFolded?: boolean;
        listMaxHeight?: string;
        storageName?: string;
    }

    interface APlayer {
        audio: {
            name: string;
            artist: string;
            url: string;
            cover: string;
            lrc: string;
            theme?: string;
            type?: string;
        };
        play(): void;
        pause(): void;
        toggle(): void;
        seek(time: number): void;
        volume(volume: number, remember?: boolean): void;
        skipBack(): void;
        skipForward(): void;
        destroy(): void;
        on(event: string, callback: Function): void;
        off(event: string, callback?: Function): void;
    }

    class APlayer {
        constructor(options: APlayerOptions);
    }

    export = APlayer;
} 